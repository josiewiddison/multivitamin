import React from "react";
import { PRODUCT } from "../data";
export default function Buy({ children = "Shop at Codeage", className = "" }) {
  return (
    <a
      className={`button ${className}`}
      href={PRODUCT}
      target="_blank"
      rel="noreferrer"
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
