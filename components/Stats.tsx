import React from "react";

const markup = `

<div class="wrap">
<div class="stats">
<div class="rv"><b data-count="12" data-suf="M+">0</b><span>Demo accounts</span></div>
<div class="rv d1"><b data-count="3200" data-suf="+">0</b><span>Stocks listed</span></div>
<div class="rv d2"><b data-count="1500" data-suf="+">0</b><span>Mutual funds</span></div>
<div class="rv d3"><b data-count="99.9" data-dec="1" data-suf="%">0</b><span>Uptime in market hours</span></div>
</div>
</div>

`;

export default function Stats() {
  return React.createElement("section", { dangerouslySetInnerHTML: { __html: markup } });
}
