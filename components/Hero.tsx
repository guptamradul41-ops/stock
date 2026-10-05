import CrowdCanvas from "./CrowdCanvas";
import { useEffect } from "react";

const markup = `

<div aria-hidden="true" class="blob b1" data-par="0.25"></div><div aria-hidden="true" class="blob b2" data-par="-0.18"></div>
<div class="wrap">
<div data-par="0.1">
<h1 class="rv">Investing in <span class="swap" id="swap"><span>stocks</span></span><br/>made simple</h1>
<p class="sub rv d1">Open a free account in minutes. Buy shares, start a SIP, apply to IPOs and track everything in one clean app.</p>
<form class="signup rv d2" id="signup">
<label for="mob" style="position:absolute;left:-9999px">Mobile number</label>
<input id="mob" inputmode="numeric" maxlength="10" pattern="[0-9]{10}" placeholder="Enter 10-digit mobile number" required=""/>
<button class="btn" type="submit">Continue</button>
</form>
<p class="fine" id="fine" role="status"></p>
<div class="trust rv d3">
<div><b data-count="1.2" data-dec="1" data-suf=" Cr+">0</b><span>Demo investors</span></div>
<div><b data-count="0" data-suf="₹ 0">₹0</b><span>Account opening fee</span></div>
<div><b data-count="4.8" data-dec="1" data-suf="★">0</b><span>Sample app rating</span></div>
</div>
</div>
<div aria-hidden="true" class="stage" data-par="-0.1">
<div class="phone">
<div class="top"><span>Your portfolio</span><span>Today</span></div>
<div class="val" id="pv">₹2,48,630</div>
<div class="gain up" id="pg">+₹3,412 (1.39%)</div>
<svg class="chart" preserveaspectratio="none" viewbox="0 0 260 130">
<defs><lineargradient id="fg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#00b386" stop-opacity=".35"></stop><stop offset="1" stop-color="#00b386" stop-opacity="0"></stop></lineargradient></defs>
<path class="fl" d="M0 100 C25 96 40 70 65 78 S105 40 130 52 S175 90 200 48 S240 20 260 18 L260 130 L0 130Z"></path>
<path class="ln" d="M0 100 C25 96 40 70 65 78 S105 40 130 52 S175 90 200 48 S240 20 260 18"></path>
</svg>
<div class="row"><div>Sunrise Motors<small>12 shares</small></div><span class="up">+2.1%</span></div>
<div class="row"><div>Index Fund Plus<small>SIP ₹5,000</small></div><span class="up">+0.8%</span></div>
<div class="row"><div>Bluewave Telecom<small>40 shares</small></div><span class="down">-0.6%</span></div>
</div>
<div class="float f1"><span class="down" style="display:none"></span>Order placed<b class="up">Bought 10 shares</b></div>
<div class="float f2">Monthly SIP<b>₹5,000</b></div>
<div class="float f3">IPO allotted<b class="up">Congrats! 🎉</b></div>
</div>
</div>

`;

type HeroProps = {
  onCreateAccount: (mobile: string) => void;
};

export default function Hero({ onCreateAccount }: HeroProps) {
  useEffect(() => {
    const signup = document.querySelector<HTMLFormElement>("#signup");
    if (!signup) return;
    const form = signup;

    function handleSubmit(event: SubmitEvent) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const mobile = form.querySelector<HTMLInputElement>("#mob")?.value ?? "";
      onCreateAccount(mobile);
    }

    form.addEventListener("submit", handleSubmit, true);
    return () => form.removeEventListener("submit", handleSubmit, true);
  }, [onCreateAccount]);

  return (
    <section className="hero">
      <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
      <div dangerouslySetInnerHTML={{ __html: markup }} />
    </section>
  );
}
