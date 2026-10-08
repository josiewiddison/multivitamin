# Amen Fruits + Veggies — botanical editorial

React / JavaScript / Vite / GSAP ScrollTrigger website. A white botanical installation, independent transparent produce layers, a reversible pinned transition, five ingredient chapters, full ingredient disclosures, original supplement label, routine, FAQs, and retailer purchase links.

## Run locally

Requires Node.js 20.19+ (or 22.12+).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To build and inspect production:

```sh
npm run build
npm run preview
```

The current development preview uses http://127.0.0.1:5180/.

## Sources and assets

- Product, price, availability, directions, attributes and original bottle/label photographs: https://www.codeage.com/products/amen-fruits-veggies-vitamins-bundle-supplement and its Shopify product JSON. Checked October 8, 2026. $46.99 USD; available at verification. This is a dated snapshot, not a live inventory integration.
- The label lists 700 mg fruit blend and 633 mg veggie blend per capsule; 90 servings per bottle. The current label includes shiitake, which the page text omits. Ingredient disclosures follow the label.
- Whole-food descriptions: USDA MyPlate fruit and vegetable groups and fruit/vegetable flash cards: https://www.myplate.gov/eat-healthy/fruits, https://www.myplate.gov/eat-healthy/vegetables, https://www.myplate.gov/sites/default/files/2020-12/fruit_veggie_flash_cards.pdf. Whole-food benefits are explicitly separated from supplement claims.
- Five produce assets were generated with OpenAI ImageGen for this project. Transparent WebP assets are separate animation layers. They are illustrative macro interpretations, not scientific microscopy.
- Typography references: user-supplied text-bearing fruit editorials and MUBI's official poster https://mubi-shop.com/products/the-substance-official-poster. Exact film title font could not be verified. Anton is a licensed condensed alternative, not an exact match. Source: https://github.com/google/fonts/tree/main/ofl/anton. SIL Open Font License included in public/assets/Anton-OFL.txt.
- Genuine Codeage product photographs are used for accurate labels. Third-party product imagery remains subject to its owner's rights; obtain permission for a commercial launch. No Pinterest screenshots are redistributed.

## Accessibility and motion

Semantic headings, keyboard disclosures, skip link, focus outlines, fixed purchase navigation, native anchors. Reduced-motion preferences disable pinning and scrub animations, leaving a readable static hero and normal document flow. Mobile uses four produce layers and a shorter scroll transition.

## Limitations

Independent editorial concept, not an official Codeage storefront. Purchase buttons open the original product page; no checkout, payments, subscriptions or analytics. Confirm the directions on the bottles you receive. Individual ingredient amounts and vitamin/mineral amounts are not disclosed; no equivalents to produce servings are claimed.

## Revised art direction

The October 8 reference update replaces the saturated first-pass assets. Current specimens use pale pigments, extremely thin flesh, fine skin outlines and transmitted light. The hero contains four sparse specimens (pear, strawberry, orange and spinach), all present in the label. The five chapters alternate vertical stacks, overlapping specimens and large cropped forms.

Additional nutrition references: USDA ARS Blueberries and Health (https://www.ars.usda.gov/plains-area/gfnd/gfhnrc/docs/news-articles/2014/blueberries-and-health/); NIH ODS Vitamin C (https://ods.od.nih.gov/factsheets/VitaminC-Consumer/) and Folate (https://ods.od.nih.gov/factsheets/Folate-HealthProfessional/).

## Verification

Production build passed. Browser checks covered 1366×768 desktop and 390×844 phone layouts, forward/reverse scrubbed reveal, all eight ingredient/label/FAQ disclosures, image loading, anchor targets, purchase link destinations, no horizontal overflow, and no console errors. The explicit reduced-motion control was tested: pin spacers are removed and the static hero remains readable. The OS preference uses the same animation-disable path; changing the OS preference itself was not tested. No checkout is embedded.

## Cursor fruit interaction

The hero bottles have been removed. Whole transparent specimens now spring up and drop away as the pointer crosses a loose geometric grid. Rectangular clip reveals replace the initial soft wipe. Up to seven slices overlap, and expired nodes/timelines are removed. Fruit cycles through pear, strawberry, orange, blueberry, apple, tomato, spinach and carrot. Apple and tomato are new AI-generated lightbox assets, both ingredients present in the fruit blend. Touch users see a restrained static arrangement and can also trigger pops with a touch gesture; normal vertical scrolling remains available. Reduced-motion users receive the static arrangement without pop or pin animations.

Verified pointer gestures, whole fruit loading, automatic disappearance, reduced-motion cleanup, no hero bottles, phone layout without horizontal overflow, and production build. Screenshot: local preview captured during the gesture. The genuine bottle photograph remains in the purchase section for product identification.
