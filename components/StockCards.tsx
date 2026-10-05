import { useEffect, useRef, useState } from "react";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

const GRID_SIZE = 64;
const logoAssets = Object.entries(
  import.meta.glob("../seedfolio-app/src/assets/company-logos/*.svg", {
    eager: true,
    import: "default",
    query: "?url",
  }),
)
  .sort(([first], [second]) => first.localeCompare(second))
  .map(([path, asset]) => ({
    name: path.split("/").pop()?.replace(/^NSE_/, "").replace(/\.svg$/, "") ?? "Company",
    src: String(asset),
  }));

const cards = [
  {
    title: "Stocks",
    value: "₹2,48,630",
    description: "Buy and sell shares in two taps, with live prices.",
    color: "k1",
    visual: (
      <svg aria-hidden="true" className="kart" viewBox="0 0 300 140">
        <path d="M0 110 C30 105 50 80 80 88 S130 40 160 55 S210 100 235 58 S280 25 300 20 L300 140 L0 140Z" fill="rgba(255,255,255,.16)" />
        <path d="M0 110 C30 105 50 80 80 88 S130 40 160 55 S210 100 235 58 S280 25 300 20" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="5" />
      </svg>
    ),
  },
  {
    title: "Mutual funds",
    value: "₹5,000 / month",
    description: "Start a SIP from just ₹100 and stop whenever you like.",
    color: "k2",
    visual: (
      <svg aria-hidden="true" className="kart" viewBox="0 0 300 140">
        <g fill="#fff">
          <rect height="30" opacity=".45" rx="6" width="24" x="8" y="110" />
          <rect height="42" opacity=".5" rx="6" width="24" x="44" y="98" />
          <rect height="56" opacity=".55" rx="6" width="24" x="80" y="84" />
          <rect height="70" opacity=".6" rx="6" width="24" x="116" y="70" />
          <rect height="84" opacity=".7" rx="6" width="24" x="152" y="56" />
          <rect height="100" opacity=".8" rx="6" width="24" x="188" y="40" />
          <rect height="116" opacity=".9" rx="6" width="24" x="224" y="24" />
          <rect height="132" rx="6" width="24" x="260" y="8" />
        </g>
      </svg>
    ),
  },
  {
    title: "IPOs",
    value: "3.4x subscribed",
    description: "Apply with UPI and watch the allotment update live.",
    color: "k3",
    visual: (
      <svg aria-hidden="true" className="kart" viewBox="0 0 300 140">
        <rect fill="rgba(255,255,255,.14)" height="112" rx="20" stroke="#fff" strokeWidth="3" width="260" x="20" y="14" />
        <line stroke="#fff" strokeDasharray="7 7" strokeWidth="3" x1="206" x2="206" y1="14" y2="126" />
        <rect fill="#fff" height="10" rx="5" width="110" x="42" y="42" />
        <rect fill="#fff" height="10" opacity=".6" rx="5" width="80" x="42" y="64" />
        <rect fill="#fff" height="10" opacity=".4" rx="5" width="96" x="42" y="86" />
        <path d="M226 72 l14 14 l26 -30" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />
      </svg>
    ),
  },
  {
    title: "Options",
    value: "Live Greeks",
    description: "Option chain with margin shown before every order.",
    color: "k4",
    visual: (
      <svg aria-hidden="true" className="kart" viewBox="0 0 300 140">
        <line stroke="rgba(255,255,255,.5)" strokeDasharray="6 6" strokeWidth="2" x1="0" x2="300" y1="100" y2="100" />
        <path d="M0 100 L120 100 L300 20" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />
        <circle cx="120" cy="100" fill="#fff" r="8" />
      </svg>
    ),
  },
  {
    title: "Goals",
    value: "72% to ₹10L",
    description: "Track every goal and see how close you are.",
    color: "k5",
    visual: (
      <svg aria-hidden="true" className="kart" viewBox="0 0 300 140">
        <g fill="none" strokeWidth="18" transform="translate(150 70) rotate(-90)">
          <circle r="52" stroke="rgba(255,255,255,.2)" />
          <circle r="52" stroke="#fff" strokeDasharray="235 327" strokeLinecap="round" />
        </g>
      </svg>
    ),
  },
];

export default function StockCards() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sectionRef = useRef<HTMLElement>(null);
  const [gridShape, setGridShape] = useState({ columns: 0, rows: 0 });
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const resizeObserver = new ResizeObserver(() => {
      const columns = Math.ceil(section.clientWidth / GRID_SIZE);
      const rows = Math.ceil(section.clientHeight / GRID_SIZE);
      setGridShape((current) =>
        current.columns === columns && current.rows === rows
          ? current
          : { columns, rows },
      );
    });

    resizeObserver.observe(section);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cards-scene"
      className="cards-section"
    >
      <div
        className="cards-logo-layer"
        aria-hidden="true"
        style={{ gridTemplateColumns: `repeat(${gridShape.columns}, ${GRID_SIZE}px)` }}
      >
        {Array.from({ length: gridShape.columns * gridShape.rows }, (_, index) => {
          const logo = logoAssets[index % logoAssets.length];
          return (
            <div
              key={index}
              className={`cards-logo-cell${hoveredCell === index ? " is-hovered" : ""}`}
              onPointerEnter={() => setHoveredCell(index)}
              onPointerLeave={() => setHoveredCell(null)}
            >
              {hoveredCell === index && logo && (
                <img
                  className={`cards-grid-logo${hoveredCell === index ? " is-highlighted" : ""}`}
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="wrap">
        <Swiper
          className="cards-swiper"
          modules={[EffectCards]}
          effect="cards"
          centeredSlides
          grabCursor
          loop
          spaceBetween={40}
          speed={reduceMotion ? 0 : 1500}
        >
          {cards.map((card) => (
            <SwiperSlide key={card.title}>
              <article className={`kcard ${card.color}`} aria-label={`${card.title}: ${card.value}`}>
                <header>
                  <h3>{card.title}</h3>
                </header>
                {card.visual}
                <footer>
                  <div className="kbig">{card.value}</div>
                  <p>{card.description}</p>
                </footer>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
