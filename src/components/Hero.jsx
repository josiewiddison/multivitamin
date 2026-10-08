import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Buy from "./Buy";
const slices = [
  ["pear", -8, 44, 32, -26],
  ["strawberry", 78, 11, 29, 22],
  ["orange", 83, 53, 25, -12],
  ["spinach", 25, 64, 13, 16],
];
export default function Hero({ reduceMotion }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (reduceMotion) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const mobile = window.innerWidth < 700;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: mobile ? "+=1000" : "+=1700",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });
        tl.to(
          ".slice",
          {
            x: (i) => ((slices[i][1] - 50) * window.innerWidth) / 35,
            y: (i) => ((slices[i][2] - 50) * window.innerHeight) / 24,
            rotation: (i) => slices[i][4] * 3,
            scale: 1.25,
            duration: 1.6,
            ease: "power1.in",
          },
          0,
        )
          .to(".hero-title,.hero-bottom", { opacity: 0, duration: 0.45 }, 0.1)
          .to(
            ".bottle-layer",
            { scale: 0.82, opacity: 0, y: 60, duration: 0.65 },
            0.8,
          )
          .fromTo(
            ".reveal",
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.75 },
            1.35,
          );
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [reduceMotion]);
  return (
    <section
      className="hero"
      ref={ref}
      aria-label="Amen Fruits and Veggies bundle"
    >
      <div className="hero-title">
        <p className="eyebrow">A DIFFERENT KIND OF DAILY RITUAL</p>
        <h1>
          FRUITS +<br />
          VEGGIES.
        </h1>
      </div>
      <div className="installation" aria-hidden="true">
        {slices.map(([name, x, y, w, r], i) => (
          <img
            key={i}
            className="slice"
            src={`/assets/${name}.webp`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${w}%`,
              transform: `rotate(${r}deg)`,
            }}
            alt=""
          />
        ))}
      </div>
      <img
        className="bottle-layer"
        src="/assets/bottles.webp"
        alt="Amen Fruits and Amen Veggies, 90 vegetable capsules in each bottle"
        width="900"
        height="900"
      />
      <div className="hero-bottom">
        <p>
          Two plant-based blends.
          <br />
          One everyday ritual.
        </p>
        <Buy>Explore the bundle</Buy>
        <a className="scroll-cue" href="#variety">
          SCROLL TO DISCOVER <span>↓</span>
        </a>
      </div>
      <div className="reveal">
        <p className="eyebrow">LET VARIETY IN</p>
        <h2>
          MAKE ROOM
          <br />
          FOR VARIETY.
        </h2>
        <p>
          Nature doesn’t do one note.
          <br />
          Neither should your plate.
        </p>
      </div>
    </section>
  );
}
