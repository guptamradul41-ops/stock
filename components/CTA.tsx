type CTAProps = {
  onSignUp: () => void;
};

export default function CTA({ onSignUp }: CTAProps) {
  return (
    <section>
      <div className="wrap">
        <div className="cta">
          <h2>Ready to start investing?</h2>
          <p>Join the waitlist for our demo launch and be first to try the app.</p>
          <button className="btn" onClick={onSignUp} type="button">
            Sign up now
          </button>
        </div>
      </div>
    </section>
  );
}
