import React from "react";

const markup = `

<div class="wrap"><p class="scrub" id="scrub">Investing should feel like checking the weather: quick, clear and nothing to decode. Seedfolio shows your money, your risk and your next step on one screen.</p></div>

`;

export default function ScrollStatement() {
  return React.createElement("section", { dangerouslySetInnerHTML: { __html: markup } });
}
