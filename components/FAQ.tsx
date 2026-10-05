import React from "react";

const markup = `

<div class="wrap">
<p class="eyebrow rv">Help</p>
<h2 class="t rv d1">Common questions</h2>
<div class="faq rv d2">
<details><summary>Is Seedfolio a real broker?</summary><p>No. This page is a design demo with simulated data. No account can be opened and no orders can be placed.</p></details>
<details><summary>What do I need to open an account?</summary><p>On a real platform you would typically need a PAN, Aadhaar, a bank account and a mobile number linked to Aadhaar.</p></details>
<details><summary>Are SIP returns guaranteed?</summary><p>No. The calculator uses the rate you choose. Actual market returns go up and down.</p></details>
<details><summary>Can I lose money investing in stocks?</summary><p>Yes. Share prices change, and you can get back less than you invested.</p></details>
</div>
</div>

`;

export default function FAQ() {
  return React.createElement("section", { dangerouslySetInnerHTML: { __html: markup } });
}
