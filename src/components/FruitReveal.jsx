import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const varieties = [
  "pear",
  "strawberry",
  "orange",
  "blueberry",
  "apple",
  "tomato",
  "spinach",
  "carrot",
];
const stillLife = [
  ["pear", "5%", "49%", "29%", -20],
  ["strawberry", "78%", "15%", "26%", 12],
  ["orange", "73%", "59%", "27%", -12],
];

export default function FruitReveal({ staticView = false }) {
  const layerRef = useRef(null);
  useEffect(() => {
    const layer = layerRef.current;
    const host = layer.closest(".hero");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    let lastPoint = null,
      sequence = 0;
    let staticNodes = [];
    const active = new Map();
    const recentCells = new Map();

    const preload = varieties.map((name) => {
      const image = new Image();
      image.src = `/assets/${name}.webp`;
      return image;
    });

    function remove(node) {
      const timeline = active.get(node);
      timeline?.kill();
      active.delete(node);
      node.remove();
    }

    function clear() {
      for (const node of [...active.keys()]) remove(node);
      for (const node of staticNodes) node.remove();
      staticNodes = [];
      recentCells.clear();
      lastPoint = null;
    }

    function staticArrangement() {
      clear();
      if (!(staticView || reduced.matches || coarse.matches)) return;
      for (const [name, x, y, size, rotation] of stillLife) {
        const image = document.createElement("img");
        image.src = `/assets/${name}.webp`;
        image.alt = "";
        image.className = "fruit-pop fruit-pop-static";
        Object.assign(image.style, {
          left: x,
          top: y,
          width: size,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        });
        layer.appendChild(image);
        staticNodes.push(image);
      }
    }

    function pop(x, y, touch = false) {
      if (staticView || reduced.matches) return;
      const bounds = host.getBoundingClientRect();
      const step = bounds.width < 700 ? 85 : 115;
      const column = Math.round(x / step);
      const row = Math.round(y / step);
      const cell = `${column}:${row}`;
      const now = performance.now();
      if (now - (recentCells.get(cell) ?? -Infinity) < 650) return;
      recentCells.set(cell, now);
      for (const [key, time] of recentCells)
        if (now - time > 1600) recentCells.delete(key);
      const index = sequence++;
      const name = varieties[index % varieties.length];
      const size =
        bounds.width < 700 ? 145 + (index % 3) * 25 : 205 + (index % 3) * 35;
      const rotation = [-12, 0, 12, 0][index % 4];
      const image = document.createElement("img");
      image.src = `/assets/${name}.webp`;
      image.alt = "";
      image.className = "fruit-pop";
      // A loose square grid gives the gesture a crisp, composed rhythm.
      Object.assign(image.style, {
        left: `${Math.max(size / 2 + 10, Math.min(bounds.width - size / 2 - 10, column * step))}px`,
        top: `${Math.max(size / 2 + 90, Math.min(bounds.height - size / 2 - 80, row * step))}px`,
        width: `${size}px`,
        zIndex: String(index % 8),
      });
      layer.appendChild(image);
      if (active.size >= 7) remove(active.keys().next().value);
      gsap.set(image, {
        xPercent: -50,
        yPercent: -50,
        y: 55,
        scale: 0.35,
        opacity: 0,
        rotation: rotation - 8,
        clipPath: "inset(45% 0% 45% 0%)",
      });
      const timeline = gsap
        .timeline({
          onComplete: () => {
            active.delete(image);
            image.remove();
          },
        })
        .to(image, {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.48,
          ease: "back.out(1.8)",
        })
        .to(image, { y: -9, duration: 0.35, ease: "sine.inOut" }, 0.48)
        .to(
          image,
          {
            y: 65,
            scale: 0.65,
            opacity: 0,
            rotation: rotation + 6,
            duration: 0.42,
            ease: "power2.in",
          },
          touch ? 1.2 : 0.95,
        );
      active.set(image, timeline);
    }

    function move(event) {
      if (staticView || reduced.matches) return;
      const bounds = host.getBoundingClientRect();
      const point = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      if (point.y < 95 || point.y > bounds.height - 95) return;
      if (
        lastPoint &&
        Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y) < 60
      )
        return;
      lastPoint = point;
      pop(point.x, point.y, event.pointerType !== "mouse");
    }
    function leave() {
      lastPoint = null;
    }
    const visibility = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        for (const node of [...active.keys()]) remove(node);
        lastPoint = null;
      }
    });
    visibility.observe(host);
    staticArrangement();
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerdown", move, { passive: true });
    host.addEventListener("pointerleave", leave);
    reduced.addEventListener("change", staticArrangement);
    coarse.addEventListener("change", staticArrangement);
    return () => {
      clear();
      visibility.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerdown", move);
      host.removeEventListener("pointerleave", leave);
      reduced.removeEventListener("change", staticArrangement);
      coarse.removeEventListener("change", staticArrangement);
      for (const image of preload) image.onload = null;
    };
  }, [staticView]);
  return (
    <div
      ref={layerRef}
      className="fruit-window fruit-pop-layer"
      aria-hidden="true"
    />
  );
}
