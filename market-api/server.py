from __future__ import annotations

import json
import logging
import os
import threading
import time
from datetime import date
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any
from urllib.parse import urlparse

import yfinance as yf

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

STOCKS = [
    ("RELIANCE.NS", "Reliance Industries", "reliance.com", "#5367ff"),
    ("TCS.NS", "Tata Consultancy Services", "tcs.com", "#00b386"),
    ("HDFCBANK.NS", "HDFC Bank", "hdfcbank.com", "#eb5b3c"),
    ("ICICIBANK.NS", "ICICI Bank", "icicibank.com", "#8a5cf6"),
    ("INFY.NS", "Infosys", "infosys.com", "#2786a3"),
    ("BHARTIARTL.NS", "Bharti Airtel", "airtel.in", "#dc8b26"),
    ("SBIN.NS", "State Bank of India", "sbi.co.in", "#5367ff"),
    ("ITC.NS", "ITC Limited", "itcportal.com", "#00b386"),
    ("LT.NS", "Larsen & Toubro", "larsentoubro.com", "#eb5b3c"),
    ("HINDUNILVR.NS", "Hindustan Unilever", "hul.co.in", "#8a5cf6"),
    ("BAJFINANCE.NS", "Bajaj Finance", "bajajfinserv.in", "#2786a3"),
    ("KOTAKBANK.NS", "Kotak Mahindra Bank", "kotak.com", "#dc8b26"),
    ("AXISBANK.NS", "Axis Bank", "axisbank.com", "#5367ff"),
    ("MARUTI.NS", "Maruti Suzuki India", "marutisuzuki.com", "#00b386"),
    ("SUNPHARMA.NS", "Sun Pharmaceutical", "sunpharma.com", "#eb5b3c"),
    ("TATAMOTORS.NS", "Tata Motors", "tatamotors.com", "#8a5cf6"),
    ("TATASTEEL.NS", "Tata Steel", "tatasteel.com", "#2786a3"),
    ("WIPRO.NS", "Wipro", "wipro.com", "#dc8b26"),
    ("ADANIENT.NS", "Adani Enterprises", "adani.com", "#5367ff"),
    ("ONGC.NS", "Oil and Natural Gas Corporation", "ongcindia.com", "#00b386"),
    ("NTPC.NS", "NTPC Limited", "ntpc.co.in", "#eb5b3c"),
    ("POWERGRID.NS", "Power Grid Corporation", "powergrid.in", "#8a5cf6"),
    ("TITAN.NS", "Titan Company", "titancompany.in", "#2786a3"),
    ("ULTRACEMCO.NS", "UltraTech Cement", "ultratechcement.com", "#dc8b26"),
    ("NESTLEIND.NS", "Nestle India", "nestle.in", "#5367ff"),
    ("ASIANPAINT.NS", "Asian Paints", "asianpaints.com", "#00b386"),
]

INDEXES = [
    ("^NSEI", "NIFTY 50"),
    ("^BSESN", "SENSEX"),
    ("^NSEBANK", "NIFTY BANK"),
    ("^CNXIT", "NIFTY IT"),
]

ETFS = [
    ("NIFTYBEES.NS", "Nippon India Nifty 50 ETF", "Nifty 50"),
    ("JUNIORBEES.NS", "Nippon India Nifty Next 50 ETF", "Nifty Next 50"),
    ("BANKBEES.NS", "Nippon India Bank ETF", "Banking"),
    ("GOLDBEES.NS", "Nippon India Gold ETF", "Gold"),
]

ALL_SYMBOLS = [item[0] for item in STOCKS + INDEXES + ETFS]
CACHE_SECONDS = 60
cache_lock = threading.Lock()
cache: dict[str, Any] = {"created_at": 0.0, "payload": None}


def quote_row(data: Any, symbol: str, name: str, kind: str) -> dict[str, Any] | None:
    try:
        closes = data[symbol]["Close"].dropna()
        if len(closes) < 1:
            return None
        daily_closes = closes.groupby(closes.index.date).last()
        price = float(daily_closes.iloc[-1])
        previous = float(daily_closes.iloc[-2]) if len(daily_closes) > 1 else price
        change = ((price - previous) / previous * 100) if previous else 0.0
        market_date = daily_closes.index[-1]
        return {
            "symbol": symbol.removesuffix(".NS"),
            "ticker": symbol,
            "name": name,
            "price": price,
            "changePercent": change,
            "currency": "INR",
            "marketDate": market_date.isoformat() if isinstance(market_date, date) else str(market_date),
            "kind": kind,
        }
    except (KeyError, IndexError, TypeError, ValueError, AttributeError):
        return None


def get_market_data() -> dict[str, Any]:
    with cache_lock:
        if cache["payload"] and time.time() - cache["created_at"] < CACHE_SECONDS:
            return cache["payload"]

    history = yf.download(
        ALL_SYMBOLS,
        period="5d",
        interval="5m",
        group_by="ticker",
        threads=False,
        progress=False,
        auto_adjust=False,
        timeout=20,
    )
    if history.empty:
        raise RuntimeError("Yahoo Finance returned no Indian market quotes.")

    stocks = []
    for ticker, name, domain, accent in STOCKS:
        quote = quote_row(history, ticker, name, "stock")
        if quote:
            quote.update(
                {
                    "imageUrl": f"https://www.google.com/s2/favicons?domain={domain}&sz=128",
                    "accent": accent,
                }
            )
            stocks.append(quote)

    indexes = [
        quote
        for ticker, name in INDEXES
        if (quote := quote_row(history, ticker, name, "index")) is not None
    ]
    funds = [
        quote
        for ticker, name, category in ETFS
        if (quote := quote_row(history, ticker, name, "etf")) is not None
    ]

    if not stocks:
        raise RuntimeError("Yahoo Finance returned no NSE stock quotes.")

    payload = {
        "provider": "Yahoo Finance via yfinance",
        "currency": "INR",
        "fetchedAt": date.today().isoformat(),
        "stocks": stocks,
        "indexes": indexes,
        "etfs": funds,
        "warnings": [
            f"No quote was returned for {item[0]}."
            for item in STOCKS + INDEXES + ETFS
            if item[0] not in {quote["ticker"] for quote in stocks + indexes + funds}
        ],
    }
    with cache_lock:
        cache["created_at"] = time.time()
        cache["payload"] = payload
    return payload


class MarketHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        path = urlparse(self.path).path
        if path == "/api/health":
            self.send_json(200, {"status": "ok", "provider": "Yahoo Finance via yfinance"})
            return
        if path != "/api/market":
            self.send_json(404, {"error": "API route not found."})
            return
        try:
            self.send_json(200, get_market_data())
        except Exception as error:
            logging.exception("Unable to retrieve Yahoo Finance market quotes")
            self.send_json(502, {"error": f"Unable to load Indian market quotes: {error}"})

    def send_json(self, status: int, payload: dict[str, Any]) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format_string: str, *args: Any) -> None:
        logging.info("%s - %s", self.address_string(), format_string % args)


def main() -> None:
    host = os.environ.get("MARKET_API_HOST", "127.0.0.1")
    port = int(os.environ.get("MARKET_API_PORT", "8765"))
    server = ThreadingHTTPServer((host, port), MarketHandler)
    logging.info("Indian market API listening at http://%s:%s", host, port)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        logging.info("Stopping market API")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
