import React from "react";

const markup = `

<div class="xstick">
<div class="xmedia" id="xm"><div class="xinner">
<div class="xhead"><span>Portfolio value</span><span class="up">+18.4% this year</span></div>
<div class="xval" data-max="1248630">₹0</div>
<svg aria-hidden="true" class="xchart" preserveaspectratio="none" viewbox="0 0 400 160"><path d="M0 140 C40 130 60 110 100 118 S160 70 200 84 S260 120 300 60 S360 30 400 14" id="xline" pathlength="1"></path></svg>
<div class="xstats"><div><small>Stocks</small><b>₹7.2L</b></div><div><small>Mutual funds</small><b>₹4.1L</b></div><div><small>IPO gains</small><b>₹38K</b></div></div>
</div></div>
<div class="xtitles"><h2 id="xw1">Your money,</h2><h2 id="xw2">in motion</h2></div>
<p class="xhint" id="xh">Keep scrolling to expand</p>
</div>

`;

export default function PortfolioScene() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const className = reduceMotion ? "growth-scene portfolio-growth-scene" : "xscene growth-scene portfolio-growth-scene";

  return React.createElement("section", { className, dangerouslySetInnerHTML: { __html: markup } });
}
