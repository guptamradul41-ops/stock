import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";

type DashboardProps = {
  onLogout: () => void;
};

type MarketQuote = {
  name: string;
  symbol: string;
  ticker: string;
  price: number;
  changePercent: number;
  currency: string;
  marketDate: string;
  kind: "stock" | "index" | "etf";
  imageUrl?: string;
  accent?: string;
};

type MarketData = {
  provider: string;
  fetchedAt: string;
  stocks: MarketQuote[];
  indexes: MarketQuote[];
  etfs: MarketQuote[];
  warnings: string[];
};

const indianNumber = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatPrice(quote: MarketQuote) {
  return `${quote.currency === "INR" ? "₹" : ""}${indianNumber.format(quote.price)}`;
}

function formatChange(change: number) {
  return `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
}

function StockLogo({ quote }: { quote: MarketQuote }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!quote.imageUrl || imageFailed) {
    return (
      <div
        className="dashboard-stock-icon"
        style={{ "--stock-accent": quote.accent ?? "#5367ff" } as CSSProperties}
      >
        {quote.symbol.slice(0, 2)}
      </div>
    );
  }
  return (
    <img
      alt=""
      className="dashboard-stock-logo"
      onError={() => setImageFailed(true)}
      src={quote.imageUrl}
    />
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.2 4.2" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [marketError, setMarketError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState("");
  const [activeTab, setActiveTab] = useState("Home");
  const [profileOpen, setProfileOpen] = useState(false);

  const loadMarketData = useCallback(async () => {
    setIsLoading(true);
    setMarketError("");
    try {
      const response = await fetch("/api/market");
      const result: MarketData | { error?: string } = await response.json();
      if (!response.ok) {
        throw new Error(
          "error" in result && result.error
            ? result.error
            : `Market data request failed (${response.status}).`,
        );
      }
      if (!("stocks" in result) || !Array.isArray(result.stocks)) {
        throw new Error("The market API returned an invalid quote response.");
      }
      setMarketData(result);
    } catch (error) {
      setMarketError(
        error instanceof Error ? error.message : "Unable to load market data.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMarketData();
  }, [loadMarketData]);

  const allQuotes = useMemo(
    () => [
      ...(marketData?.stocks ?? []),
      ...(marketData?.indexes ?? []),
      ...(marketData?.etfs ?? []),
    ],
    [marketData],
  );

  const matchingSuggestions = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term || selectedStock || !marketData) return [];
    return allQuotes
      .filter(
        (stock) =>
          stock.name.toLowerCase().includes(term) ||
          stock.symbol.toLowerCase().includes(term),
      )
      .slice(0, 5);
  }, [allQuotes, marketData, query, selectedStock]);

  const visibleStocks = useMemo(() => {
    if (!marketData) return [];
    const stockList =
      selectedStock || query.trim()
        ? allQuotes
        : activeTab === "Mutual funds"
          ? marketData.etfs
          : marketData.stocks;
    const term = query.trim().toLowerCase();
    return stockList.filter(
      (stock) =>
        (!selectedStock || stock.ticker === selectedStock) &&
        (!term ||
          stock.name.toLowerCase().includes(term) ||
          stock.symbol.toLowerCase().includes(term)),
    );
  }, [activeTab, allQuotes, marketData, query, selectedStock]);

  function selectSuggestion(stock: MarketQuote) {
    setQuery(stock.name);
    setSelectedStock(stock.ticker);
  }

  function handleSearchChange(value: string) {
    setQuery(value);
    setSelectedStock("");
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <a aria-label="Seedfolio dashboard" className="logo" href="#dashboard">
          <i>
            <svg
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
              viewBox="0 0 20 20"
            >
              <path d="M3 14l5-5 3 3 6-7" />
            </svg>
          </i>
          Seedfolio
        </a>
        <nav
          aria-label="Dashboard navigation"
          className="dashboard-header-nav"
        >
            <button
              aria-current={activeTab === "Home" ? "page" : undefined}
              className={activeTab === "Home" ? "active" : ""}
              onClick={() => {
                setActiveTab("Home");
                setProfileOpen(false);
                handleSearchChange("");
              }}
              type="button"
            >
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z" />
              </svg>
              <span>Home</span>
            </button>
            <button
              aria-current={activeTab === "IPOs" ? "page" : undefined}
              className={activeTab === "IPOs" ? "active" : ""}
              onClick={() => {
                setActiveTab("IPOs");
                setProfileOpen(false);
                setQuery("");
                setSelectedStock("");
              }}
              type="button"
            >
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path d="M4 19V5m0 14h16M7 15l4-4 3 2 6-7" />
              </svg>
              <span>IPOs</span>
            </button>
            <button
              aria-current={activeTab === "Mutual funds" ? "page" : undefined}
              className={activeTab === "Mutual funds" ? "active" : ""}
              onClick={() => {
                setActiveTab("Mutual funds");
                setProfileOpen(false);
                setQuery("");
                setSelectedStock("");
              }}
              type="button"
            >
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3v18m9-9H3" />
              </svg>
              <span>Mutual funds</span>
            </button>
            <button
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              className={activeTab === "Profile" ? "active" : ""}
              onClick={() => {
                setActiveTab("Profile");
                setProfileOpen((open) => !open);
              }}
              type="button"
            >
              <MenuIcon />
              <span>Profile</span>
            </button>
        </nav>
        <section
          aria-label="Search stocks"
          className="dashboard-search-section dashboard-header-search"
        >
          <label className="dashboard-search">
            <SearchIcon />
            <input
              aria-autocomplete="list"
              aria-controls="stock-suggestions"
              aria-expanded={matchingSuggestions.length > 0}
              onChange={(event) => {
                handleSearchChange(event.target.value);
                setActiveTab("Home");
                setProfileOpen(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setQuery("");
                  setSelectedStock("");
                }
                if (event.key === "Enter" && matchingSuggestions.length) {
                  event.preventDefault();
                  selectSuggestion(matchingSuggestions[0]);
                }
              }}
              placeholder="Search stocks, ETFs and more"
              role="combobox"
              value={query}
            />
            {query && (
              <button
                aria-label="Clear search"
                className="dashboard-search-clear"
                onClick={() => handleSearchChange("")}
                type="button"
              >
                ×
              </button>
            )}
          </label>
          {matchingSuggestions.length > 0 && (
            <ul
              className="dashboard-suggestions"
              id="stock-suggestions"
              role="listbox"
            >
              {matchingSuggestions.map((stock) => (
                <li key={stock.symbol}>
                  <button
                    onClick={() => selectSuggestion(stock)}
                    role="option"
                    type="button"
                  >
                    <span className="dashboard-suggestion-symbol">{stock.symbol}</span>
                    <span className="dashboard-suggestion-name">{stock.name}</span>
                    <span className={stock.changePercent >= 0 ? "up" : "down"}>
                      {formatChange(stock.changePercent)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
        <span className="dashboard-market-status">
          <i /> Yahoo Finance
        </span>
      </header>

      <main className="dashboard-main" id="dashboard">
        <section className="dashboard-welcome">
          <p className="dashboard-eyebrow">YOUR MONEY, IN MOTION</p>
          <h1>Good morning!</h1>
          <p>What would you like to explore today?</p>
        </section>
        {marketError && (
          <div className="dashboard-market-error" role="alert">
            <div>
              <strong>Live market data is unavailable.</strong>
              <p>{marketError}</p>
            </div>
            <button onClick={() => void loadMarketData()} type="button">
              Try again
            </button>
          </div>
        )}
        {isLoading && !marketData && !marketError && (
          <p aria-live="polite" className="dashboard-market-loading" role="status">
            Loading Indian market quotes from Yahoo Finance…
          </p>
        )}

        <section className="dashboard-market-strip" aria-label="Market snapshot">
          {(marketData?.indexes ?? []).slice(0, 3).map((quote) => (
            <div key={quote.ticker}>
              <span>{quote.name}</span>
              <strong>{formatPrice(quote)}</strong>
              <small className={quote.changePercent >= 0 ? "up" : "down"}>
                {quote.changePercent >= 0 ? "▲ " : "▼ "}
                {Math.abs(quote.changePercent).toFixed(2)}%
              </small>
            </div>
          ))}
        </section>
        {marketData && (
          <p className="dashboard-market-attribution">
            {marketData.provider} · latest available trading date{" "}
            {marketData.indexes[0]?.marketDate ?? marketData.stocks[0]?.marketDate}
          </p>
        )}

        <section className="dashboard-stocks">
          <div className="dashboard-section-heading">
            <div>
              <p className="dashboard-eyebrow">
                {activeTab === "IPOs"
                  ? "NEW OPPORTUNITIES"
                  : activeTab === "Mutual funds"
                    ? "EXCHANGE-TRADED FUNDS"
                    : query
                      ? "SEARCH RESULTS"
                      : "HANDPICKED FOR YOU"}
              </p>
              <h2>
                {activeTab === "IPOs"
                    ? "Indian IPO information"
                    : activeTab === "Mutual funds"
                      ? "Popular India-listed ETFs"
                      : query
                        ? "Matching stocks"
                        : "Popular stocks"}
              </h2>
            </div>
            <span className="dashboard-demo-label">
              {marketData?.provider ?? "LIVE DATA"}
            </span>
          </div>

          {activeTab === "Mutual funds" && !query && marketData && (
            <div className="dashboard-data-notice dashboard-fund-notice">
              <strong>These are ETFs, not mutual-fund scheme NAVs.</strong>
              <p>
                Yahoo Finance provides exchange quotes for these India-listed
                ETFs. Indian mutual-fund scheme NAVs require a separate data
                source.
              </p>
            </div>
          )}

          {activeTab === "IPOs" ? (
            <div className="dashboard-data-notice" role="status">
              <strong>IPO listings aren’t available through Yahoo Finance quotes.</strong>
              <p>
                This screen won’t show unverified issue dates, price bands, or
                subscription status. An IPO-specific data source is needed for
                current Indian issue information.
              </p>
            </div>
          ) : isLoading && !marketData ? (
            <p aria-live="polite" className="dashboard-market-loading" role="status">
              Loading quotes…
            </p>
          ) : marketError && !marketData ? null : visibleStocks.length ? (
            <div className="dashboard-feature-grid">
              {visibleStocks.map((stock) => (
                <article className="dashboard-feature-card" key={stock.ticker}>
                    <div className="dashboard-stock-top">
                      <div
                        className="dashboard-stock-icon"
                      >
                        {stock.imageUrl ? (
                          <StockLogo quote={stock} />
                        ) : (
                          stock.symbol.slice(0, 2)
                        )}
                      </div>
                      <span className={stock.changePercent >= 0 ? "up" : "down"}>
                        {formatChange(stock.changePercent)}
                      </span>
                    </div>
                    <p className="dashboard-stock-name">{stock.name}</p>
                    <p className="dashboard-stock-symbol">{stock.symbol}</p>
                    <div className="dashboard-stock-bottom">
                      <strong>{formatPrice(stock)}</strong>
                      <span className="dashboard-quote-date">{stock.marketDate}</span>
                    </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="dashboard-empty">
              <span aria-hidden="true">⌕</span>
              <strong>{query ? "No matching instruments" : "No quotes available"}</strong>
              <p>
                {query
                    ? "Try searching by company name or ticker symbol."
                    : "Yahoo Finance returned no quotes for this market."}
              </p>
            </div>
          )}
          {marketData?.warnings.length ? (
            <p className="dashboard-market-warning" role="status">
              Yahoo Finance did not return {marketData.warnings.length} requested
              quote{marketData.warnings.length === 1 ? "" : "s"}.
            </p>
          ) : null}
          <p className="dashboard-disclaimer">
            Quotes may be delayed and prices are not investment advice.
          </p>
        </section>
      </main>

      {profileOpen && (
        <div className="dashboard-profile-menu" role="menu">
          <div className="dashboard-profile-summary">
            <strong>Seedfolio user</strong>
            <span>Demo account</span>
          </div>
          <button onClick={onLogout} role="menuitem" type="button">
            Log out
          </button>
        </div>
      )}

    </div>
  );
}
