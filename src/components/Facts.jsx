import React from "react";
import { fruitList, veggieList } from "../data";
export default function Facts() {
  return (
    <section id="inside" className="inside section-pad">
      <div className="section-intro">
        <p className="eyebrow">THE BUNDLE, IN DETAIL</p>
        <h2>
          TWO BLENDS.
          <br />
          FULL TRANSPARENCY.
        </h2>
        <p>
          Fruit powders in one bottle. Vegetables, mushrooms, greens, and herbs
          in the other. A supplement to a varied diet.
        </p>
      </div>
      <div className="blend-grid">
        <article>
          <h3>
            FRUITS<span>700 mg</span>
          </h3>
          <p>Raw Whole Fruits Blend per capsule</p>
          <p>90 capsules · 90 servings</p>
          <details>
            <summary>
              Read every ingredient <span>+</span>
            </summary>
            <p>{fruitList}</p>
            <p>Other ingredient: methylcellulose capsule.</p>
          </details>
        </article>
        <article>
          <h3>
            VEGGIES<span>633 mg</span>
          </h3>
          <p>Raw Whole Veggies Blend per capsule</p>
          <p>90 capsules · 90 servings</p>
          <details>
            <summary>
              Read every ingredient <span>+</span>
            </summary>
            <p>{veggieList}</p>
            <p>Other ingredient: methylcellulose capsule.</p>
          </details>
        </article>
      </div>
      <details className="label-details">
        <summary>
          Supplement facts — original label <span>+</span>
        </summary>
        <p>
          Serving size: 1 capsule per bottle. Daily Values are not established
          for either blend. Individual ingredient amounts are not disclosed.
        </p>
        <a href="/assets/facts.jpg" target="_blank" rel="noreferrer">
          <img
            loading="lazy"
            src="/assets/facts.jpg"
            alt="Supplement facts: fruit blend 700 mg, vegetable blend 633 mg, serving size one capsule, 90 servings per bottle. Full ingredient lists are provided above."
            width="2000"
            height="2000"
          />
          <span>Open full-resolution label ↗</span>
        </a>
      </details>
      <p className="fine">
        VEGAN · NON-GMO · GLUTEN FREE · DAIRY FREE · SOY FREE
        <br />
        Attributes as listed by Codeage. Current label includes shiitake; the
        product page text omits it.
      </p>
    </section>
  );
}
