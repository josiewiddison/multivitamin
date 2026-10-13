import React, { useLayoutEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";
gsap.registerPlugin(ScrollTrigger);

import { PRODUCT, ingredients, caution } from "./data";
import Buy from "./components/Buy";
import Hero from "./components/Hero";
import Chapter from "./components/Chapter";
import Facts from "./components/Facts";
function App() {
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useLayoutEffect(() => {
    if (reduceMotion) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray(".chapter-art").forEach((el) =>
          gsap.fromTo(
            el,
            { y: 60, rotation: -5 },
            {
              y: -35,
              rotation: 3,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest(".chapter"),
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          ),
        );
      });
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [reduceMotion]);
  return (
    <>
      <a className="skip" href="#variety">
        Skip to content
      </a>
      <header>
        <a className="brand" href="#" aria-label="Amen home">
          AMEN<span>®</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#variety">The ingredients</a>
          <a href="#inside">What’s inside</a>
        </nav>
        <Buy className="nav-buy">Shop the bundle</Buy>
      </header>
      <main className={reduceMotion ? "motion-reduced" : ""}>
        <Hero reduceMotion={reduceMotion} />
        <section id="variety" className="variety section-pad">
          <p className="eyebrow">A CLOSER LOOK AT NATURE</p>
          <h2>
            NOTHING ORDINARY.
            <br />
            JUST EVERYDAY FOODS.
          </h2>
          <div>
            <p>
              Five ingredients. Five reasons to keep your plate interesting.
            </p>
            <p>
              These are editorial selections from the blends, not a ranking by
              amount. The nutrition described below belongs to whole foods.
              These capsules do not replace produce or provide the equivalent
              fibre, nutrients, or benefits of a serving.
            </p>
          </div>
        </section>
        {ingredients.map((item, i) => (
          <Chapter key={item.name} item={item} index={i} />
        ))}
        <Facts />
        <section id="routine" className="routine section-pad">
          <p className="eyebrow">KEEP IT SIMPLE</p>
          <h2>
            YOUR DAY.
            <br />
            YOUR RITUAL.
          </h2>
          <div className="routine-body">
            <span className="big-one">1</span>
            <div>
              <h3>Capsule daily.</h3>
              <p>
                Codeage’s suggested use: take 1 capsule daily with 8 ounces of
                water or your favourite beverage. May be taken with or without
                food.
              </p>
              <p>
                Each bottle’s serving size is one capsule. Follow the directions
                on your own bottle and consult Codeage if the bundle
                instructions need clarification.
              </p>
              <a href="#cautions">Read directions & cautions ↓</a>
            </div>
          </div>
        </section>
        <section id="shop" className="purchase section-pad">
          <div>
            <p className="eyebrow">AMEN FRUITS + VEGGIES BUNDLE</p>
            <h2>
              A LITTLE
              <br />
              MORE NATURE.
            </h2>
            <p>Two bottles. 90 vegetable capsules each.</p>
            <p className="price">
              $46.99 <span>USD · one-time purchase</span>
            </p>
            <Buy>Shop at Codeage</Buy>
            <p className="fine">
              Available when checked October 8, 2026.
              <br />
              Final price and availability are confirmed at Codeage.
              <br />
              Opens the original retailer’s product page.
            </p>
          </div>
          <img
            src="./assets/bottles.webp"
            loading="lazy"
            alt="Amen Fruits and Veggies supplement bundle"
            width="900"
            height="900"
          />
        </section>
        <section className="faq section-pad">
          <h2>
            A FEW GOOD
            <br />
            QUESTIONS.
          </h2>
          {[
            [
              "What does the bundle contain?",
              "One bottle of Amen Fruits and one bottle of Amen Veggies, each containing 90 vegetable capsules. The fruit blend is 700 mg per capsule; the veggie blend is 633 mg per capsule.",
            ],
            [
              "Does this replace eating fruit and vegetables?",
              "No. Enjoy a variety of fruit and vegetables as part of your everyday diet. The supplement is not equivalent to a serving of produce, and the label does not establish amounts of individual vitamins or minerals.",
            ],
            [
              "Is it suitable for a vegan diet?",
              "Codeage lists the bundle as vegan, plant-based, non-GMO, and free of gluten, dairy, soy, wheat, yeast, and artificial ingredients. Review the complete ingredient list for your own allergies and sensitivities.",
            ],
            [
              "How do I take it?",
              "The manufacturer states: take 1 capsule daily with 8 ounces of water or your favourite beverage, with or without food. Check your bottle directions. Each bottle has a serving size of one capsule.",
            ],
            ["Who should check with a physician first?", caution],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
      </main>
      <footer id="cautions">
        <div className="footer-top">
          <a className="brand" href="#">
            AMEN®
          </a>
          <p>MAKE ROOM FOR VARIETY.</p>
          <a href="#">Back to top ↑</a>
        </div>
        <div className="footer-notes">
          <div>
            <p>{caution}</p>
            <p>
              This product is not intended to diagnose, treat, cure, or prevent
              any disease. These statements have not been evaluated by the Food
              and Drug Administration.
            </p>
          </div>
          <div>
            <p>
              Product and label source: <a href={PRODUCT}>Codeage</a>
              <br />
              Whole-food nutrition:{" "}
              <a href="https://www.myplate.gov/eat-healthy/fruits">
                USDA MyPlate fruits
              </a>{" "}
              &{" "}
              <a href="https://www.myplate.gov/eat-healthy/vegetables">
                vegetables
              </a>
              .
            </p>
            <p>
              Independent editorial website. Genuine product photographs from
              Codeage. Botanical imagery generated with AI.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <button
            className="motion-control"
            aria-pressed={reduceMotion}
            onClick={() => setReduceMotion((value) => !value)}
          >
            {reduceMotion ? "Reduced motion on" : "Reduce motion"}
          </button>
          <span>AMEN FRUITS + VEGGIES</span>
          <span>AN EDITORIAL EXPLORATION · 2026</span>
        </div>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
