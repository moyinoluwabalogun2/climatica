import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  GraduationCap,
  Leaf,
  LockKeyhole,
  Mail,
  Recycle,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import {
  useAuth,
} from "../context/AuthContext";

import climaticaLogo
  from "../assets/climatica-logo.png";

import leafBackground
  from "../assets/cta-leaf-bg.png";

import "./Login.css";


/* =========================================================
   ROLE DASHBOARD ROUTING
========================================================= */

function getDashboardPath(role) {
  switch (role) {
    case "recycler":
      return "/recycler-dashboard";

    case "school":
      return "/school-dashboard";

    case "business":
      return "/business-dashboard";

    case "admin":
      return "/admin-dashboard";

    default:
      return "/dashboard";
  }
}


/* =========================================================
   DEMO ACCOUNTS
========================================================= */

const demoRoles = [
  {
    role: "individual",

    label: "Individual",

    description:
      "Personal climate action",

    email:
      "individual@climatica.app",

    password:
      "Individual123!",

    icon:
      UserRound,
  },

  {
    role: "recycler",

    label:
      "Recycler / PSP",

    description:
      "Recovery operations",

    email:
      "recycler@climatica.app",

    password:
      "Recycler123!",

    icon:
      Recycle,
  },

  {
    role: "school",

    label:
      "School",

    description:
      "Education workspace",

    email:
      "school@climatica.app",

    password:
      "School123!",

    icon:
      GraduationCap,
  },

  {
    role: "business",

    label:
      "Business",

    description:
      "Waste management",

    email:
      "business@climatica.app",

    password:
      "Business123!",

    icon:
      BriefcaseBusiness,
  },

  {
    role: "admin",

    label:
      "Admin",

    description:
      "Platform administration",

    email:
      "admin@climatica.app",

    password:
      "Admin123!",

    icon:
      ShieldCheck,
  },
];


/* =========================================================
   LOGIN
========================================================= */

function Login() {
  const {
    signIn,
    signInDemoRole,
  } = useAuth();


  const navigate =
    useNavigate();


  const location =
    useLocation();


  const [
    email,
    setEmail,
  ] = useState("");


  const [
    password,
    setPassword,
  ] = useState("");


  const [
    showPassword,
    setShowPassword,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState("");


  const [
    loading,
    setLoading,
  ] = useState(false);


  const redirectFrom =
    location.state?.from;


  /* =======================================================
     GO TO CORRECT DASHBOARD
  ======================================================= */

  const goToAccount = (
    account
  ) => {
    navigate(
      redirectFrom ||
        getDashboardPath(
          account.role
        ),
      {
        replace: true,
      }
    );
  };


  /* =======================================================
     NORMAL LOGIN
  ======================================================= */

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    setError("");


    if (!email.trim()) {
      setError(
        "Enter your email address."
      );

      return;
    }


    if (!password.trim()) {
      setError(
        "Enter your password."
      );

      return;
    }


    setLoading(true);


    try {
      const account =
        signIn({
          email,
          password,
        });


      goToAccount(
        account
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  };


  /* =======================================================
     ONE-CLICK DEMO LOGIN
  ======================================================= */

  const handleDemoLogin = (
    role
  ) => {
    setError("");


    try {
      const account =
        signInDemoRole(
          role
        );


      goToAccount(
        account
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to open this demo account."
      );
    }
  };


  return (
    <main
      className="climatica-login-page"
      style={{
        backgroundImage:
          `linear-gradient(
            rgba(1, 21, 13, 0.76),
            rgba(1, 21, 13, 0.90)
          ),
          url(${leafBackground})`,
      }}
    >

      {/* ===================================================
          LOGIN SHELL
      ==================================================== */}

      <section className="login-shell">

        {/* =================================================
            LEFT PANEL
        ================================================== */}

        <aside className="login-brand-panel">

          <div className="login-brand-top">

            <Link
              to="/"
              className="login-logo"
            >
              <img
                src={climaticaLogo}
                alt="Climatica"
              />
            </Link>


            <Link
              to="/"
              className="login-back-link"
            >
              <ArrowLeft
                size={16}
              />

              Back home
            </Link>

          </div>


          <div className="login-brand-decoration login-decoration-one" />

          <div className="login-brand-decoration login-decoration-two" />


          <div className="login-brand-copy">

            <div className="login-eyebrow">

              <Leaf size={16} />

              Your climate action workspace

            </div>


            <h1>
              Welcome
              <br />

              back.
            </h1>


            <p>
              Continue identifying
              waste, managing recovery,
              learning and taking
              practical climate action.
            </p>

          </div>

        </aside>


        {/* =================================================
            RIGHT LOGIN PANEL
        ================================================== */}

        <section className="login-form-panel">

          <div className="login-form-content">

            <header className="login-heading">

              <span>
                Sign in
              </span>


              <h2>
                Access your
                Climatica account.
              </h2>


              <p>
                Sign in with your
                credentials or explore
                one of the prepared
                prototype dashboards.
              </p>

            </header>


            {/* =============================================
                FORM
            ============================================== */}

            <form
              className="login-form"
              onSubmit={
                handleSubmit
              }
            >

              <label className="login-field">

                <span>
                  Email address
                </span>


                <div className="login-input-wrap">

                  <Mail size={19} />


                  <input
                    type="email"
                    value={email}
                    onChange={(
                      event
                    ) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />

                </div>

              </label>


              <label className="login-field">

                <span>
                  Password
                </span>


                <div className="login-input-wrap">

                  <LockKeyhole
                    size={19}
                  />


                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(
                      event
                    ) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />


                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (current) =>
                          !current
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff
                        size={18}
                      />
                    ) : (
                      <Eye
                        size={18}
                      />
                    )}
                  </button>

                </div>

              </label>


              {error && (
                <div
                  className="login-error"
                  role="alert"
                >
                  {error}
                </div>
              )}


              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >

                <span>
                  {loading
                    ? "Signing in..."
                    : "Sign In"}
                </span>


                {!loading && (
                  <ArrowRight
                    size={19}
                  />
                )}

              </button>

            </form>


            {/* =============================================
                DIVIDER
            ============================================== */}

            <div className="login-divider">

              <span>
                Explore a demo
              </span>

            </div>


            {/* =============================================
                DEMO ROLES
            ============================================== */}

            <div className="login-demo-grid">

              {demoRoles.map(
                (demo) => {
                  const Icon =
                    demo.icon;


                  return (
                    <button
                      type="button"
                      className="login-demo-card"
                      key={demo.role}
                      onClick={() =>
                        handleDemoLogin(
                          demo.role
                        )
                      }
                    >

                      <div className="login-demo-icon">

                        <Icon
                          size={20}
                        />

                      </div>


                      <div className="login-demo-copy">

                        <strong>
                          {demo.label}
                        </strong>


                        <span>
                          {
                            demo.description
                          }
                        </span>

                      </div>


                      <ArrowRight
                        size={17}
                      />

                    </button>
                  );
                }
              )}

            </div>


            {/* =============================================
                CREDENTIALS
            ============================================== */}

            <details className="login-demo-credentials">

              <summary>
                View demo email & password credentials
              </summary>


              <div className="login-credential-list">

                {demoRoles.map(
                  (demo) => (
                    <div
                      className="login-credential-row"
                      key={demo.role}
                    >

                      <strong>
                        {demo.label}
                      </strong>


                      <div>

                        <span>
                          {demo.email}
                        </span>


                        <code>
                          {demo.password}
                        </code>

                      </div>

                    </div>
                  )
                )}

              </div>

            </details>


            {/* =============================================
                CREATE ACCOUNT
            ============================================== */}

            <p className="login-create-copy">

              Don't have an account?{" "}

              <Link
                to="/register"
                state={{
                  from:
                    redirectFrom,
                }}
              >
                Create account
              </Link>

            </p>


            {/* =============================================
                PROTOTYPE NOTE
            ============================================== */}

            <div className="login-prototype-note">

              <Leaf size={16} />


              <p>
                Prototype authentication.
                Demo and self-created
                accounts are stored in
                this browser until the
                production backend is
                connected.
              </p>

            </div>

          </div>

        </section>

      </section>

    </main>
  );
}


export default Login;