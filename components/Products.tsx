import React from "react";

const markup = `

<div class="wrap">
<p class="eyebrow rv">Products</p>
<h2 class="t rv d1" id="ph">Everything you need to grow your money</h2>
<div aria-label="Products" class="tabs rv d2" id="ptabs" role="tablist">
<span aria-hidden="true" class="tabbg" id="tabbg"></span>
<button aria-controls="p0" aria-selected="true" class="tab" id="t0" role="tab">Stocks<i class="tpr"></i></button>
<button aria-controls="p1" aria-selected="false" class="tab" id="t1" role="tab">Mutual funds<i class="tpr"></i></button>
<button aria-controls="p2" aria-selected="false" class="tab" id="t2" role="tab">IPO<i class="tpr"></i></button>
<button aria-controls="p3" aria-selected="false" class="tab" id="t3" role="tab">Options<i class="tpr"></i></button>
</div>
<div aria-labelledby="t0" class="pane on" id="p0" role="tabpanel" style="--pa:#5367ff">
<div class="pc"><h3>Buy and sell shares in two taps</h3>
<ul><li>Live prices with simple charts</li><li>Set price alerts and watchlists</li><li>Clear charges shown before you confirm</li></ul>
<a class="btn" href="#start">Open free account</a></div>
<div class="mock">
<div class="it"><div class="l"><b>Sunrise Motors</b><small>Auto</small></div><svg aria-hidden="true" class="mini" viewbox="0 0 60 24"><path d="M0 20 L10 14 L20 17 L30 8 L40 11 L50 4 L60 6" pathlength="1"></path></svg><div class="up px" data-px="1284.5">₹1,284.50</div></div>
<div class="it"><div class="l"><b>Bluewave Telecom</b><small>Telecom</small></div><svg aria-hidden="true" class="mini dn" viewbox="0 0 60 24"><path d="M0 5 L10 9 L20 7 L30 14 L40 12 L50 19 L60 17" pathlength="1"></path></svg><div class="down px" data-px="412.1">₹412.10</div></div>
<div class="it"><div class="l"><b>Northstar Bank</b><small>Banking</small></div><svg aria-hidden="true" class="mini" viewbox="0 0 60 24"><path d="M0 18 L10 16 L20 12 L30 14 L40 8 L50 9 L60 3" pathlength="1"></path></svg><div class="up px" data-px="1602.75">₹1,602.75</div></div>
<button class="btn teal buy" data-label="Buy 10 shares of Sunrise Motors" type="button">Buy 10 shares of Sunrise Motors</button>
</div>
</div>
<div aria-labelledby="t1" class="pane" hidden="" id="p1" role="tabpanel" style="--pa:#00b386">
<div class="pc"><h3>Start a SIP with just ₹100</h3>
<ul><li>Direct plans with no commission</li><li>Pause or stop your SIP anytime</li><li>See returns across 1, 3 and 5 years</li></ul>
<a class="btn" href="#sip">Try the SIP calculator</a></div>
<div class="mock">
<div class="it"><div class="l"><b>Index Fund Plus</b><small>Large cap</small></div><div class="meter"><i style="--w:60%"></i></div><div class="up"><span data-cp="18.2" data-dec="1">0</span>%</div></div>
<div class="it"><div class="l"><b>Midcap Momentum</b><small>Mid cap</small></div><div class="meter"><i style="--w:82%"></i></div><div class="up"><span data-cp="24.6" data-dec="1">0</span>%</div></div>
<div class="it"><div class="l"><b>Steady Debt Fund</b><small>Debt</small></div><div class="meter"><i style="--w:25%"></i></div><div class="up"><span data-cp="7.4" data-dec="1">0</span>%</div></div>
<p class="mnote">3-year annualised returns (sample)</p>
</div>
</div>
<div aria-labelledby="t2" class="pane" hidden="" id="p2" role="tabpanel" style="--pa:#7440d6">
<div class="pc"><h3>Apply to IPOs with UPI</h3>
<ul><li>Open and upcoming issues in one list</li><li>Approve the mandate from your UPI app</li><li>Allotment status updates in real time</li></ul>
<a class="btn" href="#start">Explore IPOs</a></div>
<div class="mock">
<div class="it"><div class="l"><b>Greenline Energy</b><small>Opens in 2 days</small></div><div class="meter"><i style="--w:62%"></i></div><span class="tag">Upcoming</span></div>
<div class="it"><div class="l"><b>Pixel Foods</b><small>Closes in <span id="cd">02:14:09</span></small></div><div class="meter"><i style="--w:85%"></i></div><span class="tag"><span data-cp="3.4" data-dec="1">0</span>x</span></div>
<div class="it"><div class="l"><b>Atlas Logistics</b><small>Allotment out</small></div><div class="meter"><i style="--w:40%"></i></div><span class="tag up">+<span data-cp="12.4" data-dec="1">0</span>%</span></div>
<button class="btn apply" data-label="Apply with UPI" type="button">Apply with UPI</button>
</div>
</div>
<div aria-labelledby="t3" class="pane" hidden="" id="p3" role="tabpanel" style="--pa:#d9480f">
<div class="pc"><h3>Futures and options, with guardrails</h3>
<ul><li>Option chain with live Greeks</li><li>Margin shown before every order</li><li>Risk reminders so nothing surprises you</li></ul>
<a class="btn" href="#start">Learn more</a></div>
<div class="mock">
<div class="it"><div class="l"><b>NIFTY 24500 CE</b><small>Weekly expiry</small></div><div class="up opx" data-opx="142.3">₹142.30</div></div>
<div class="it"><div class="l"><b>NIFTY 24400 PE</b><small>Weekly expiry</small></div><div class="down opx" data-opx="96.8">₹96.80</div></div>
<div class="it"><div class="l"><b>Margin required</b><small>1 lot</small></div><div class="meter"><i style="--w:68%"></i></div><div>₹1,12,400</div></div>
<svg aria-hidden="true" class="pay" viewbox="0 0 200 70"><line stroke="var(--line)" stroke-dasharray="4 4" x1="0" x2="200" y1="52" y2="52"></line><path d="M0 52 L90 52 L200 8" pathlength="1"></path></svg>
<p class="mnote">Payoff at expiry (sample)</p>
</div>
</div>
</div>

`;

export default function Products() {
  return React.createElement("section", { id: "products", dangerouslySetInnerHTML: { __html: markup } });
}
