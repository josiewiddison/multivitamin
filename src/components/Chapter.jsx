import React from "react";
export default function Chapter({ item, index }) {
  const name = item.name.toLowerCase();
  return (
    <section
      className={`chapter chapter-${name}`}
      style={{ "--accent": item.color }}
    >
      <div className="chapter-heading">
        <span className="eyebrow">{item.blend}</span>
        <h2>
          {item.name.toUpperCase()}
          <span>.</span>
        </h2>
      </div>
      <div className="chapter-art" aria-hidden="true">
        <img
          loading="lazy"
          src={`./assets/${name}.webp`}
          alt=""
          width="1000"
          height="1000"
        />
        {(index === 0 || index === 1 || index === 4) && (
          <img
            loading="lazy"
            className="echo"
            src={`./assets/${name}.webp`}
            alt=""
          />
        )}
        {index === 0 && (
          <img
            loading="lazy"
            className="echo echo-two"
            src="./assets/blueberry.webp"
            alt=""
          />
        )}
      </div>
      <div className="chapter-copy">
        <h3>
          {item.title.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i === 0 && <br />}
            </React.Fragment>
          ))}
        </h3>
        <p>{item.text}</p>
        <span className="fine">WHOLE-FOOD PERSPECTIVE</span>
      </div>
    </section>
  );
}
