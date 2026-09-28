import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import "./Login.css";


/* =========================================================
   TEMPORARY DEVELOPMENT USERS

   These will later be replaced completely by the
   NEXUS FastAPI authentication system.
========================================================= */

const DEMO_USERS = [
  {
    email: "student@nexus.edu",
    password: "student123",
    role: "student",
    name: "NEXUS Student",
    redirect: "/student",
  },
  {
    email: "faculty@nexus.edu",
    password: "faculty123",
    role: "faculty",
    name: "NEXUS Faculty",
    redirect: "/faculty",
  },
  {
    email: "management@nexus.edu",
    password: "management123",
    role: "management",
    name: "NEXUS Management",
    redirect: "/management",
  },
];


/* =========================================================
   GOOGLE SCRIPT LOADER
========================================================= */

const GOOGLE_SCRIPT_ID = "google-identity-services";


function loadGoogleScript() {
  return new Promise((resolve, reject) => {

    // Google script already loaded
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }

    // Script already exists but has not loaded yet
    const existingScript = document.getElementById(
      GOOGLE_SCRIPT_ID
    );

    if (existingScript) {
      existingScript.addEventListener(
        "load",
        () => resolve()
      );

      existingScript.addEventListener(
        "error",
        () =>
          reject(
            new Error(
              "Unable to load Google Identity Services."
            )
          )
      );

      return;
    }

    // Create Google Identity Services script
    const script = document.createElement("script");

    script.id = GOOGLE_SCRIPT_ID;

    script.src =
      "https://accounts.google.com/gsi/client";

    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      reject(
        new Error(
          "Unable to load Google Identity Services."
        )
      );
    };

    document.head.appendChild(script);
  });
}


/* =========================================================
   LOGIN COMPONENT
========================================================= */

function Login() {

  const navigate = useNavigate();

  const googleButtonRef = useRef(null);

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);


  /* =======================================================
     EMAIL + PASSWORD LOGIN
  ======================================================= */

  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");
    setIsLoading(true);

    const normalizedEmail =
      email.trim().toLowerCase();

    const user = DEMO_USERS.find(
      (account) =>
        account.email === normalizedEmail &&
        account.password === password
    );


    setTimeout(() => {

      if (!user) {

        setError(
          "Invalid campus credentials. Please check your email and password."
        );

        setIsLoading(false);

        return;
      }


      /* -----------------------------------------------
         TEMPORARY NEXUS SESSION
      ------------------------------------------------ */

      const session = {

        isAuthenticated: true,

        email: user.email,

        name: user.name,

        role: user.role,

        loginMethod: "password",

        loginTime:
          new Date().toISOString(),

      };


      localStorage.setItem(
        "nexusAuth",
        JSON.stringify(session)
      );


      /* -----------------------------------------------
         ROLE BASED REDIRECT
      ------------------------------------------------ */

      navigate(
        user.redirect,
        {
          replace: true,
        }
      );

    }, 500);
  };


  /* =======================================================
     FORGOT PASSWORD
  ======================================================= */

  const handleForgotPassword = () => {

    setError(
      "Password recovery will be connected to the NEXUS authentication system."
    );
  };


  /* =======================================================
     GOOGLE LOGIN RESPONSE
  ======================================================= */

  const handleGoogleResponse =
    async (response) => {

      console.log(
        "Google credential received."
      );


      try {

        setError("");

        setGoogleLoading(true);


        const credential =
          response?.credential;


        if (!credential) {

          throw new Error(
            "Google did not return a credential."
          );
        }


        /*
        =====================================================
        PRODUCTION FLOW

        The Google credential must be sent to FastAPI.

        FastAPI should:

        1. Verify the Google ID token.
        2. Verify the token audience/client ID.
        3. Extract the verified Google identity.
        4. Find or create the NEXUS user.
        5. Determine the NEXUS role.
        6. Create the NEXUS authentication session/JWT.
        7. Return the authenticated user.

        =====================================================
        */


        const API_BASE_URL =
          import.meta.env.VITE_API_URL ||
          "http://127.0.0.1:8000";


        const authResponse =
          await fetch(
            `${API_BASE_URL}/auth/google`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                credential,
              }),
            }
          );


        if (!authResponse.ok) {

          let message =
            "Google authentication failed.";

          try {

            const errorData =
              await authResponse.json();

            message =
              errorData?.detail ||
              message;

          } catch {
            // Ignore invalid error response
          }

          throw new Error(message);
        }


        const data =
          await authResponse.json();


        /*
        =====================================================
        EXPECTED FASTAPI RESPONSE

        {
          "access_token": "...",
          "token_type": "bearer",
          "user": {
            "id": 1,
            "name": "Student Name",
            "email": "student@gmail.com",
            "role": "student"
          }
        }

        =====================================================
        */


        if (
          !data?.user ||
          !data?.user?.role
        ) {

          throw new Error(
            "NEXUS authentication server returned an invalid user."
          );
        }


        const role =
          data.user.role.toLowerCase();


        let redirectPath;


        if (role === "student") {

          redirectPath =
            "/student";

        } else if (role === "faculty") {

          redirectPath =
            "/faculty";

        } else if (
          role === "management"
        ) {

          redirectPath =
            "/management";

        } else {

          throw new Error(
            "Your NEXUS account does not have a valid campus role."
          );
        }


        /*
        =====================================================
        STORE NEXUS SESSION
        =====================================================
        */

        const session = {

          isAuthenticated: true,

          id:
            data.user.id,

          email:
            data.user.email,

          name:
            data.user.name,

          role,

          loginMethod: "google",

          accessToken:
            data.access_token,

          loginTime:
            new Date().toISOString(),

        };


        localStorage.setItem(
          "nexusAuth",
          JSON.stringify(session)
        );


        /*
        =====================================================
        REDIRECT TO ROLE DASHBOARD
        =====================================================
        */

        navigate(
          redirectPath,
          {
            replace: true,
          }
        );

      } catch (err) {

        console.error(
          "Google login error:",
          err
        );


        setError(
          err?.message ||
            "Unable to sign in with Google. Please try again."
        );

      } finally {

        setGoogleLoading(false);
      }
    };


  /* =======================================================
     INITIALIZE GOOGLE IDENTITY SERVICES
  ======================================================= */

  useEffect(() => {

    let cancelled = false;


    const initializeGoogle =
      async () => {

        try {

          /*
          ---------------------------------------------------
          Load Google's official Identity Services library
          ---------------------------------------------------
          */

          await loadGoogleScript();


          if (cancelled) {
            return;
          }


          if (
            !window.google ||
            !window.google.accounts ||
            !window.google.accounts.id
          ) {

            throw new Error(
              "Google Identity Services is unavailable."
            );
          }


          /*
          ---------------------------------------------------
          Google Client ID

          Add this to your .env:

          VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
          ---------------------------------------------------
          */

          const clientId =
            import.meta.env
              .VITE_GOOGLE_CLIENT_ID;


          if (!clientId) {

            console.warn(
              "VITE_GOOGLE_CLIENT_ID is not configured."
            );

            return;
          }


          /*
          ---------------------------------------------------
          Initialize Google
          ---------------------------------------------------
          */

          window.google.accounts.id.initialize({

            client_id: clientId,

            callback:
              handleGoogleResponse,

            /*
            Important:

            false means Google should not automatically
            bypass the account chooser.

            The user can choose their Google account.
            */

            auto_select: false,

            /*
            Keep the user interaction explicit.
            */

            cancel_on_tap_outside: true,

          });


          /*
          ---------------------------------------------------
          Render Google's official Sign In button
          ---------------------------------------------------
          */

          if (
            googleButtonRef.current
          ) {

            googleButtonRef.current.innerHTML =
              "";


            window.google.accounts.id.renderButton(
              googleButtonRef.current,
              {
                type: "standard",
                theme: "filled_blue",
                size: "large",
                text: "signin_with",
                shape: "rectangular",
                logo_alignment: "left",
                width: 400,
              }
            );
          }

        } catch (err) {

          console.error(
            "Google initialization error:",
            err
          );

        }
      };


    initializeGoogle();


    return () => {

      cancelled = true;

    };

  }, []);


  /* =======================================================
     RENDER
  ======================================================= */

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


          {/* =================================================
              BRAND
          ================================================= */}

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


          {/* =================================================
              LOGIN CARD
          ================================================= */}

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


            {/* =================================================
                EMAIL / PASSWORD FORM
            ================================================= */}

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
                  value={email}
                  onChange={(e) => {

                    setEmail(
                      e.target.value
                    );

                    setError("");

                  }}
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
                    onClick={
                      handleForgotPassword
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
                    value={password}
                    onChange={(e) => {

                      setPassword(
                        e.target.value
                      );

                      setError("");

                    }}
                    required
                  />


                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
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


              {/* ERROR */}

              {error && (

                <div className="login-error">

                  <span className="login-error-dot"></span>

                  <span>
                    {error}
                  </span>

                </div>

              )}


              {/* EMAIL PASSWORD BUTTON */}

              <button
                type="submit"
                className="login-button"
                disabled={
                  isLoading ||
                  googleLoading
                }
              >

                <span>

                  {isLoading
                    ? "Authenticating..."
                    : "Enter Campus"}

                </span>


                {!isLoading && (

                  <FiArrowRight
                    size={20}
                  />

                )}

              </button>


              {/* =================================================
                  DIVIDER
              ================================================= */}

              <div className="login-divider">

                <span></span>

                <p>OR</p>

                <span></span>

              </div>


              {/* =================================================
                  GOOGLE SIGN IN
              ================================================= */}

              <div className="google-login-wrapper">

                {googleLoading && (

                  <div className="google-loading">
                    Connecting to Google...
                  </div>

                )}

                <div
                  ref={googleButtonRef}
                  className="google-signin-button"
                ></div>

              </div>


            </form>


            {/* =================================================
                CARD FOOTER
            ================================================= */}

            <div className="login-card-footer">

              <span>
                NEXUS
              </span>

              <span className="login-footer-dot">
                •
              </span>

              <span>
                SECURE CAMPUS ACCESS
              </span>

            </div>


          </div>


          {/* =================================================
              PAGE FOOTER
          ================================================= */}

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