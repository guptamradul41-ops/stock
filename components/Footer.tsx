import React from "react";

const markup = `
<div class="kbig">₹2,48,630</div><p>Buy and sell shares in two taps, with live prices.</p>
`;

export default function Footer() {
  return React.createElement("footer", { dangerouslySetInnerHTML: { __html: markup } });
}
