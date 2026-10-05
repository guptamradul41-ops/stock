import React from "react";

const markup = `

<div class="xstick">
<div class="xmedia"><div class="xinner">
<div class="xhead"><span>₹10,000 SIP for 10 years</span><span class="up">+₹11.2L gains</span></div>
<div class="xval" data-max="2323391">₹0</div>
<div aria-hidden="true" class="xbars">
<i data-h="10"></i><i data-h="16"></i><i data-h="23"></i><i data-h="31"></i><i data-h="40"></i><i data-h="50"></i><i data-h="62"></i><i data-h="75"></i><i data-h="87"></i><i data-h="100"></i>
</div>
<div class="xstats"><div><small>Invested</small><b>₹12L</b></div><div><small>Gains</small><b>₹11.2L</b></div><div><small>Final value</small><b>₹23.2L</b></div></div>
</div></div>
<div class="xtitles"><h2>Start small,</h2><h2>grow big</h2></div>
<p class="xhint">Keep scrolling</p>
</div>

`;

export default function SIPGrowthScene() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const className = reduceMotion ? "growth-scene sip-growth-scene" : "xscene growth-scene sip-growth-scene";

  return React.createElement("section", { className, dangerouslySetInnerHTML: { __html: markup } });
}
