import React from "react";

const markup = `

<div class="wrap">
<p class="eyebrow rv">Stocks</p>
<h2 class="t rv d1">Trending right now</h2>
<div aria-label="Filter" class="pills rv d2" role="group">
<button aria-pressed="true" class="pill" data-f="gain">Top gainers</button>
<button aria-pressed="false" class="pill" data-f="lose">Top losers</button>
<button aria-pressed="false" class="pill" data-f="vol">Most traded</button>
</div>
<div class="cards" id="cards"></div>
<p class="fine" style="margin-top:14px">Prices are simulated for this demo and update every few seconds.</p>
</div>

`;

export default function TrendingStocks() {
  return React.createElement("section", { dangerouslySetInnerHTML: { __html: markup } });
}
