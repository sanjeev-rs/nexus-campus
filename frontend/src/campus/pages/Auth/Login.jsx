import { useState } from "react";
import { FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Authentication will be connected to the NEXUS backend later.
    console.log("Login submitted");
  };

  return (
    <main className="login-page">

      {/* =====================================================
          LEFT — NEXUS VISUAL
      ===================================================== */}

      <section className="login-visual">

        <img
          src="/login-image.png"
          alt="NEXUS Campus Intelligence"
          className="login-visual-image"
        />

        <div className="login-visual-overlay"></div>

        <div className="login-visual-content">

          

          <div className="login-visual-bottom">

          </div>

        </div>

      </section>


      {/* =====================================================
          RIGHT — LOGIN
      ===================================================== */}

      <section className="login-auth">

        <div className="login-auth-background">
          <div className="auth-glow auth-glow-one"></div>
          <div className="auth-glow auth-glow-two"></div>
          <div className="auth-ring auth-ring-one"></div>
          <div className="auth-ring auth-ring-two"></div>
        </div>


        <div className="login-auth-content">

          {/* BRAND */}

          <div className="login-brand">

            <div className="login-logo">
              N
            </div>

            <div className="login-brand-name">
              NEXUS
            </div>

            <div className="login-brand-subtitle">
              CAMPUS INTELLIGENCE SYSTEM
            </div>

          </div>


          {/* LOGIN CARD */}

          <div className="login-card">

            <div className="login-card-header">

              <div className="login-label">
                CAMPUS ACCESS
              </div>

              <h1>
                Welcome back.
              </h1>

              <p>
                Enter your campus credentials to
                continue into NEXUS.
              </p>

            </div>


            <form
              className="login-form"
              onSubmit={handleSubmit}
            >

              {/* EMAIL */}

              <div className="form-group">

                <label htmlFor="campus-email">
                  CAMPUS EMAIL
                </label>

                <input
                  id="campus-email"
                  type="email"
                  placeholder="you@campus.edu"
                  autoComplete="email"
                  required
                />

              </div>


              {/* PASSWORD */}

              <div className="form-group">

                <div className="password-label">

                  <label htmlFor="campus-password">
                    PASSWORD
                  </label>

                  <button
                    type="button"
                    className="forgot-password"
                    onClick={() =>
                      console.log("Forgot password")
                    }
                  >
                    Forgot password?
                  </button>

                </div>


                <div className="password-input">

                  <input
                    id="campus-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff size={19} />
                    ) : (
                      <FiEye size={19} />
                    )}
                  </button>

                </div>

              </div>


              {/* BUTTON */}

              <button
                type="submit"
                className="login-button"
              >

                <span>
                  Enter Campus
                </span>

                <FiArrowRight size={20} />

              </button>

            </form>


            {/* CARD FOOTER */}

            <div className="login-card-footer">

              <span>NEXUS</span>

              <span className="login-footer-dot">
                •
              </span>

              <span>
                SECURE CAMPUS ACCESS
              </span>

            </div>

          </div>


          {/* PAGE FOOTER */}

          <div className="login-bottom">

            <span>
              © 2026 NEXUS
            </span>

            <span>
              CAMPUS INTELLIGENCE SYSTEM
            </span>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Login;