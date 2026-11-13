import { useEffect, useRef, useState } from "react";
import PaperWave from "./PaperWave.jsx";

// Login lives in a popup, so no extra page / route is loaded.
// Front-end only for now: wire `handleSubmit` to your real auth later.
export default function LoginModal({ open, onClose }) {
  const [show, setShow] = useState(false);
  const firstField = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    firstField.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect authentication here
  };

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Log in" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="login">
        <button className="login__close" onClick={onClose} aria-label="Close">×</button>

        <form className="login__form" onSubmit={handleSubmit}>
          <h2>Log in</h2>

          <label>
            Login, email or phone number
            <input ref={firstField} type="text" autoComplete="username" />
          </label>

          <label>
            Password
            <span className="field">
              <input type={show ? "text" : "password"} autoComplete="current-password" />
              <button type="button" className="field__eye" onClick={() => setShow((v) => !v)} aria-label="Show password">
                {show ? "🙈" : "👁"}
              </button>
            </span>
          </label>

          <button type="submit" className="btn btn--dark btn--block btn--lg">Log in</button>

          <div className="divider"><span>or log in with</span></div>

          <div className="social">
            <button type="button" className="social__btn" aria-label="Google"><b style={{ color: "#4285F4" }}>G</b></button>
            <button type="button" className="social__btn" aria-label="Microsoft"><b style={{ color: "#ff6a00" }}>▦</b></button>
          </div>

          <a href="#" className="login__forgot" onClick={(e) => e.preventDefault()}>Forgot login or password?</a>
        </form>

        <div className="login__art">
          <PaperWave side="left" />
          <img src="/logo-mark.png" alt="" className="login__logo" />
        </div>
      </div>
    </div>
  );
}
