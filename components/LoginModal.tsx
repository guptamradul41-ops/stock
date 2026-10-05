import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";

type LoginModalProps = {
  initialMobile: string;
  initialMode: "login" | "signup";
  onClose: () => void;
  onLoginSuccess: () => void;
};

export default function LoginModal({
  initialMobile,
  initialMode,
  onClose,
  onLoginSuccess,
}: LoginModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "login") {
      onLoginSuccess();
      return;
    }
    setMessage("This is a demo, so no account was created. Nothing was saved.");
  }

  function changeMode(nextMode: "login" | "signup") {
    setMode(nextMode);
    setMessage("");
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const bounds = dialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) onClose();
  }

  return (
    <dialog
      aria-labelledby="login-title"
      className="login-dialog"
      onClick={handleBackdropClick}
      onClose={onClose}
      ref={dialogRef}
    >
      <button
        aria-label="Close login dialog"
        className="login-dialog-close"
        onClick={onClose}
        type="button"
      >
        ×
      </button>
      <div aria-hidden="true" className="login-dialog-mark">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
          viewBox="0 0 20 20"
        >
          <path d="M3 14l5-5 3 3 6-7" />
        </svg>
      </div>
      <p className="login-dialog-eyebrow">Welcome to Seedfolio</p>
      <h2 id="login-title">
        {mode === "login" ? "Welcome back." : "Investing starts here."}
      </h2>
      <p className="login-dialog-copy">
        {mode === "login"
          ? "Log in securely with your registered mobile number."
          : "Create your free account with a few quick details."}
      </p>
      <div
        aria-label="Choose login or sign up"
        className="login-dialog-tabs"
        role="tablist"
      >
        <button
          aria-selected={mode === "login"}
          className={mode === "login" ? "active" : ""}
          onClick={() => changeMode("login")}
          role="tab"
          type="button"
        >
          Log in
        </button>
        <button
          aria-selected={mode === "signup"}
          className={mode === "signup" ? "active" : ""}
          onClick={() => changeMode("signup")}
          role="tab"
          type="button"
        >
          Sign up
        </button>
      </div>
      <form className="login-dialog-form" onSubmit={handleSubmit}>
        {mode === "signup" && (
          <>
            <label htmlFor="login-name">Full name</label>
            <input
              autoComplete="name"
              className="login-dialog-input"
              id="login-name"
              name="name"
              placeholder="Enter your full name"
              required
            />
            <label htmlFor="login-email">Email address</label>
            <input
              autoComplete="email"
              className="login-dialog-input"
              id="login-email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </>
        )}
        <label htmlFor="login-mobile">Mobile number</label>
        <div className="login-mobile-field">
          <span aria-hidden="true">+91</span>
          <input
            autoComplete="tel-national"
            autoFocus
            id="login-mobile"
            inputMode="numeric"
            maxLength={10}
            name="mobile"
            pattern="[0-9]{10}"
            placeholder="10-digit mobile number"
            defaultValue={initialMobile}
            required
            type="tel"
          />
        </div>
        <button className="btn login-continue" type="submit">
          {mode === "login" ? "Continue to log in" : "Create free account"}
        </button>
        <p aria-live="polite" className="login-dialog-message" role="status">
          {message}
        </p>
      </form>
      {mode === "signup" ? (
        <p className="login-dialog-terms">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      ) : (
        <p className="login-dialog-terms">
          We’ll send a one-time verification code to your mobile number.
        </p>
      )}
    </dialog>
  );
}
