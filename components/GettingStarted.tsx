import React from "react";

const markup = `

<div class="wrap">
<div class="getting-started-frame">
<p class="eyebrow rv">Get started</p>
<h2 class="t rv d1">Your first investment in 3 steps</h2>
<div aria-hidden="true" class="stline"><i id="stfill"></i></div>
<div class="steps">
<div class="step rv"><div class="no">1</div><h3>Sign up</h3><p>Enter your mobile number and verify with a one-time code.</p></div>
<div class="step rv d1"><div class="no">2</div><h3>Complete KYC</h3><p>Upload your PAN and Aadhaar details. It takes a few minutes.</p></div>
<div class="step rv d2"><div class="no">3</div><h3>Add money and invest</h3><p>Fund your account by UPI and place your first order.</p></div>
</div>
</div>
</div>

`;

export default function GettingStarted() {
  return React.createElement("section", { dangerouslySetInnerHTML: { __html: markup } });
}
