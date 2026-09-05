import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  Leaf,
  LockKeyhole,
  Mail,
  Recycle,
  UserRound,
  Users,
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

import authBackground
  from "../assets/cta-leaf-bg.png";

import "./Register.css";


function getDashboardPath(role) {
  switch (role) {
    case "recycler":
      return "/recycler-dashboard";

    case "school":
      return "/school-dashboard";

    case "business":
      return "/business-dashboard";

    default:
      return "/dashboard";
  }
}


const accountTypes = [
  {
    id: "individual",

    title: "Individual",

    description:
      "Identify waste, learn, recycle, use the marketplace and earn rewards.",

    icon: UserRound,
  },

  {
    id: "recycler",

    title: "Recycler / PSP",

    description:
      "Receive material opportunities and manage collection activity.",

    icon: Recycle,
  },

  {
    id: "school",

    title: "School",

    description:
      "Support environmental learning, challenges and school activity.",

    icon: GraduationCap,
  },

  {
    id: "business",

    title: "Business",

    description:
      "Manage organisational waste activities, recovery and reporting.",

    icon: BriefcaseBusiness,
  },
];


function Register() {
  const navigate =
    useNavigate();

  const location =
    useLocation();


  const {
    register,
  } = useAuth();


  const [
    name,
    setName,
  ] = useState("");


  const [
    email,
    setEmail,
  ] = useState("");


  const [
    password,
    setPassword,
  ] = useState("");


  const [
    role,
    setRole,
  ] = useState(
    "individual"
  );


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


  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    setError("");


    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        "Complete all required fields."
      );

      return;
    }


    if (
      password.length < 6
    ) {
      setError(
        "Use at least 6 characters for your password."
      );

      return;
    }


    setLoading(true);


    try {
      const account =
        register({
          name,
          email,
          password,
          role,
        });


      navigate(
        redirectFrom ||
          getDashboardPath(
            account.role
          ),
        {
          replace: true,
        }
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <main
      className="
        climatica-auth-page
        climatica-register-page
      "
      style={{
        backgroundImage:
          `url(${authBackground})`,
      }}
    >

      <div className="climatica-auth-overlay" />


      <header className="climatica-auth-nav">

        <Link
          to="/"
          className="climatica-auth-logo"
        >
          <img
            src={climaticaLogo}
            alt="Climatica"
          />
        </Link>


        <Link
          to="/"
          className="climatica-auth-back"
        >
          <ArrowLeft size={17} />

          Back home
        </Link>

      </header>


      <div className="climatica-register-layout">

        {/* LEFT HEADING */}

        <section className="register-heading">

          <div className="climatica-auth-eyebrow">

            <Users size={16} />

            Join Climatica

          </div>


          <h1>
            Create your
            <span>
              {" "}account.
            </span>
          </h1>


          <p>
            Choose how you will use
            Climatica. The platform
            experience adapts to
            individuals, recyclers,
            schools and businesses.
          </p>

        </section>


        {/* RIGHT FORM */}

        <form
          className="register-main-card"
          onSubmit={
            handleSubmit
          }
        >

          {/* ACCOUNT TYPE */}

          <div className="register-section">

            <div className="register-section-heading">

              <span>
                01
              </span>


              <div>

                <h2>
                  How will you
                  use Climatica?
                </h2>


                <p>
                  Select the account
                  type that best
                  describes you.
                </p>

              </div>

            </div>


            <div className="account-type-grid">

              {accountTypes.map(
                (type) => {
                  const Icon =
                    type.icon;


                  return (
                    <button
                      type="button"
                      key={type.id}
                      className={`
                        account-type-card

                        ${
                          role ===
                          type.id
                            ? "active"
                            : ""
                        }
                      `}
                      onClick={() =>
                        setRole(
                          type.id
                        )
                      }
                    >

                      <div className="account-type-icon">

                        <Icon
                          size={23}
                        />

                      </div>


                      <div className="account-type-copy">

                        <strong>
                          {type.title}
                        </strong>


                        <p>
                          {
                            type.description
                          }
                        </p>

                      </div>


                      <div className="account-type-check">

                        {role ===
                          type.id && (
                          <Check
                            size={15}
                          />
                        )}

                      </div>

                    </button>
                  );
                }
              )}

            </div>

          </div>


          {/* DETAILS */}

          <div className="register-section">

            <div className="register-section-heading">

              <span>
                02
              </span>


              <div>

                <h2>
                  Your details
                </h2>


                <p>
                  Create your prototype
                  account profile.
                </p>

              </div>

            </div>


            <div className="register-field-grid">

              <label className="auth-form-field">

                <span>
                  {role ===
                  "individual"
                    ? "Full name"
                    : "Organisation name"}
                </span>


                <div className="auth-input-wrap">

                  <UserRound
                    size={18}
                  />


                  <input
                    type="text"
                    value={name}
                    onChange={(
                      event
                    ) =>
                      setName(
                        event.target.value
                      )
                    }
                    placeholder={
                      role ===
                      "individual"
                        ? "Your full name"
                        : "Organisation name"
                    }
                    autoComplete="name"
                    required
                  />

                </div>

              </label>


              <label className="auth-form-field">

                <span>
                  Email address
                </span>


                <div className="auth-input-wrap">

                  <Mail size={18} />


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


              <label className="auth-form-field register-password-field">

                <span>
                  Password
                </span>


                <div className="auth-input-wrap">

                  <LockKeyhole
                    size={18}
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
                    placeholder="Minimum 6 characters"
                    autoComplete="new-password"
                    required
                  />


                  <button
                    type="button"
                    className="auth-password-toggle"
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

            </div>

          </div>


          {error && (
            <div className="auth-form-error">
              {error}
            </div>
          )}


          <div className="register-submit-row">

            <div>

              <Leaf size={16} />


              <p>
                Prototype account —
                production authentication
                will use Supabase after
                prototype approval.
              </p>

            </div>


            <button
              type="submit"
              className="
                auth-main-button
                register-submit-button
              "
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Account"}

              {!loading && (
                <ArrowRight
                  size={18}
                />
              )}
            </button>

          </div>


          <p className="auth-switch-copy register-login-copy">

            Already have an
            account?{" "}

            <Link
              to="/login"
              state={{
                from:
                  redirectFrom,
              }}
            >
              Sign in
            </Link>

          </p>

        </form>

      </div>

    </main>
  );
}


export default Register;