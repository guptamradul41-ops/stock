import React from "react";

const markup = `

<div class="wrap">
<p class="eyebrow rv">Calculators</p>
<h2 class="t rv d1">See what a monthly SIP could become</h2>
<div class="sip rv d2">
<div>
<div class="ctl"><div class="lb"><label for="amt">Monthly investment</label><b id="amtv">₹10,000</b></div><input id="amt" max="100000" min="500" step="500" type="range" value="10000"/></div>
<div class="ctl"><div class="lb"><label for="yrs">Time period</label><b id="yrsv">10 yrs</b></div><input id="yrs" max="30" min="1" step="1" type="range" value="10"/></div>
<div class="ctl"><div class="lb"><label for="rate">Expected return (p.a.)</label><b id="ratev">12%</b></div><input id="rate" max="30" min="1" step="0.5" type="range" value="12"/></div>
<p class="fine">Illustration only. Real returns vary and are not guaranteed.</p>
</div>
<div class="res">
<svg aria-hidden="true" class="donut" viewbox="0 0 120 120">
<circle cx="60" cy="60" r="44" stroke="var(--indigo-soft)"></circle>
<circle cx="60" cy="60" id="dInv" r="44" stroke="var(--indigo)" stroke-dasharray="0 277"></circle>
<circle cx="60" cy="60" id="dGain" r="44" stroke="var(--teal)" stroke-dasharray="0 277" stroke-dashoffset="0"></circle>
</svg>
<div class="legend"><span><i style="background:var(--indigo)"></i>Invested <b id="rInv"></b></span><span><i style="background:var(--teal)"></i>Gains <b id="rGain"></b></span></div>
<div><div style="color:var(--muted);font-weight:600">Total value</div><div class="big" id="rTot"></div></div>
</div>
</div>
</div>

`;

export default function SIPCalculator() {
  return React.createElement("section", { dangerouslySetInnerHTML: { __html: markup } });
}
