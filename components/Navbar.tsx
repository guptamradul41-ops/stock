type NavbarProps = {
  onLogin: () => void;
};

export default function Navbar({ onLogin }: NavbarProps) {
  return (
    <header className="nav">
      <div className="wrap">
        <a aria-label="Seedfolio home" className="logo" href="#top">
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
        <nav aria-label="Main" className="links">
          <a href="#products">Products</a>
          <a href="#trending">Stocks</a>
          <a href="#sip">Calculators</a>
          <a href="#faq">Help</a>
        </nav>
        <button
          aria-haspopup="dialog"
          className="btn"
          onClick={onLogin}
          type="button"
        >
          Login / Sign up
        </button>
      </div>
    </header>
  );
}
