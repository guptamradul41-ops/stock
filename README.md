# Seedfolio React + TypeScript structure

The Vite app lives in `seedfolio-app/`. From the workspace root, run:

```sh
npm install --prefix seedfolio-app
python -m pip install -r market-api/requirements.txt
npm run dev
```

The root npm scripts forward `dev`, `build`, `lint`, and `preview` to `seedfolio-app/`.
Vite starts the local Python market API automatically in development and preview.
Set `PYTHON` if your Python executable is not named `python`.

The dashboard market API uses `yfinance` to retrieve Yahoo Finance quotes for
selected NSE stocks, Indian indices, and India-listed ETFs. Quotes are cached for
60 seconds and may be delayed or unavailable; the dashboard displays API errors
instead of substituting sample prices. Stock marks are loaded from each
company's website favicon. Yahoo Finance quote data does not include an IPO
calendar or Indian mutual-fund scheme NAVs, so the dashboard does not invent
those values.

To use the Seedfolio components in the Vite app, copy `App.tsx`, `seedfolio.css`, `components/`, and `hooks/` into `seedfolio-app/src/`. The animation engine is mounted by `useSeedfolioEffects`.
