import React from "react";

const markup = `

<div class="track" id="track"></div>

`;

export default function MarketTicker() {
  return React.createElement("div", { className: "ticker", dangerouslySetInnerHTML: { __html: markup } });
}
