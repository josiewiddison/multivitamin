import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Buy from "./Buy";
import FruitReveal from "./FruitReveal";

export default function Hero({ reduceMotion }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (reduceMotion) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: window.innerWidth < 700 ? "+=700" : "+=1100",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            },
          })
          .to(
            ".hero-title,.hero-bottom,.cursor-hint,.fruit-window",
            { opacity: 0, duration: 0.65 },
            0,
          )
          .fromTo(
            ".reveal",
            { autoAlpha: 0, y: 35 },
            { autoAlpha: 1, y: 0, duration: 0.8 },
            0.55,
          )
          .to({}, { duration: 0.4 });
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [reduceMotion]);
  return (
    <section
      className="hero cursor-hero"
      ref={ref}
      aria-label="An interactive exploration of fruits and vegetables"
    >
      <FruitReveal staticView={reduceMotion} />
      <div className="hero-title">
        <p className="eyebrow">A DIFFERENT KIND OF DAILY RITUAL</p>
        <h1>
          FRUITS +<br />
          VEGGIES.
        </h1>
        <p className="cursor-hint">
          <span className="hover-hint">
            Move your cursor. Watch nature unfold.
          </span>
          <span className="touch-hint">A closer look at nature.</span>
        </p>
      </div>
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
