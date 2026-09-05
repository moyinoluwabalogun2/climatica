import {
  ChevronRight,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";

import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./Navbar.css";

import {
  useEffect,
  useState,
} from "react";

import climaticaLogo
  from "../assets/climatica-logo.png";

import {
  useAuth,
} from "../context/AuthContext";


function Navbar() {
  const {
    user,
    signOut,
  } = useAuth();


  const location =
    useLocation();

  const navigate =
    useNavigate();


  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);


  /* =====================================
     DASHBOARD ROUTE
  ====================================== */

  const getDashboardPath = () => {
    if (!user) {
      return "/login";
    }


    switch (user.role) {
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
  };


  /* =====================================
     CLOSE MOBILE MENU AFTER NAVIGATION
  ====================================== */

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);


  /* =====================================
     LOCK PAGE WHILE MENU OPEN
  ====================================== */

  useEffect(() => {
    if (!mobileMenuOpen) {
      return undefined;
    }


    const previousOverflow =
      document.body.style.overflow;


    document.body.style.overflow =
      "hidden";


    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [mobileMenuOpen]);


  /* =====================================
     ESC KEY
  ====================================== */

  useEffect(() => {
    const handleEscape = (
      event
    ) => {
      if (
        event.key === "Escape"
      ) {
        setMobileMenuOpen(false);
      }
    };


    window.addEventListener(
      "keydown",
      handleEscape
    );


    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);


  /* =====================================
     LOG OUT
  ====================================== */

  const handleSignOut = () => {
    signOut();

    setMobileMenuOpen(false);

    navigate("/");
  };


  return (
    <>
      <header className="navbar">

        <div className="navbar-container">

          {/* ============================
              LOGO
          ============================ */}

          <Link
            to="/"
            className="navbar-brand"
            aria-label="Climatica Home"
          >
            <img
              src={climaticaLogo}
              alt="Climatica"
              className="navbar-logo"
            />
          </Link>


          {/* ============================
              MAIN NAVIGATION
              ORIGINAL DESKTOP DESIGN
          ============================ */}

          <nav className="navbar-links">

            <NavLink
              to="/"
              end
              className={({
                isActive,
              }) =>
                isActive
                  ? "active"
                  : ""
              }
            >
              Home
            </NavLink>


            <NavLink
              to="/identify"
              className={({
                isActive,
              }) =>
                isActive
                  ? "active"
                  : ""
              }
            >
              Identify Waste
            </NavLink>


            <NavLink
              to="/learn"
              className={({
                isActive,
              }) =>
                isActive
                  ? "active"
                  : ""
              }
            >
              Learn
            </NavLink>


            <NavLink
              to="/marketplace"
              className={({
                isActive,
              }) =>
                isActive
                  ? "active"
                  : ""
              }
            >
              Marketplace
            </NavLink>


            <NavLink
              to="/recycling"
              className={({
                isActive,
              }) =>
                isActive
                  ? "active"
                  : ""
              }
            >
              Find Recycling
            </NavLink>

          </nav>


          {/* ============================
              VISITOR ACTIONS
              ORIGINAL DESIGN
          ============================ */}

          {!user && (
            <div className="navbar-actions">

              <Link
                to="/login"
                className="login-button"
              >
                Log in
              </Link>


              <Link
                to="/register"
                className="get-started-button"
              >
                Get Started
              </Link>

            </div>
          )}


          {/* ============================
              LOGGED-IN ACTIONS
              ORIGINAL DESIGN
          ============================ */}

          {user && (
            <div className="navbar-actions navbar-user-actions">

              <Link
                to={getDashboardPath()}
                className="navbar-user"
              >

                <span className="navbar-user-icon">

                  <UserRound
                    size={17}
                  />

                </span>


                <span className="navbar-user-info">

                  <small>
                    Signed in
                  </small>


                  <strong>
                    {user.name}
                  </strong>

                </span>

              </Link>


              <Link
                to={getDashboardPath()}
                className="get-started-button"
              >
                Dashboard
              </Link>


              <button
                type="button"
                className="navbar-logout-button"
                onClick={
                  handleSignOut
                }
                aria-label="Log out"
              >
                <LogOut
                  size={17}
                />
              </button>

            </div>
          )}


          {/* ============================
              MOBILE HAMBURGER
          ============================ */}

          <button
            type="button"
            className="navbar-mobile-toggle"
            onClick={() =>
              setMobileMenuOpen(true)
            }
            aria-label="Open navigation"
          >
            <Menu size={23} />
          </button>

        </div>

      </header>


      {/* =================================
          MOBILE DARK OVERLAY
      ================================== */}

      <button
        type="button"
        className={`
          navbar-mobile-overlay
          ${
            mobileMenuOpen
              ? "open"
              : ""
          }
        `}
        onClick={() =>
          setMobileMenuOpen(false)
        }
        aria-label="Close navigation"
      />


      {/* =================================
          MOBILE DRAWER
      ================================== */}

      <aside
        className={`
          navbar-mobile-drawer
          ${
            mobileMenuOpen
              ? "open"
              : ""
          }
        `}
      >

        <div className="navbar-mobile-header">

          <Link
            to="/"
            className="navbar-mobile-logo"
          >
            <img
              src={climaticaLogo}
              alt="Climatica"
            />
          </Link>


          <button
            type="button"
            className="navbar-mobile-close"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            aria-label="Close menu"
          >
            <X size={22} />
          </button>

        </div>


        {/* =================================
            MOBILE USER
        ================================== */}

        {user ? (
          <Link
            to={getDashboardPath()}
            className="navbar-mobile-user"
          >

            <span className="navbar-mobile-user-icon">

              <UserRound
                size={20}
              />

            </span>


            <span className="navbar-mobile-user-copy">

              <small>
                Signed in
              </small>


              <strong>
                {user.name}
              </strong>

            </span>


            <ChevronRight
              size={18}
            />

          </Link>
        ) : (
          <div className="navbar-mobile-guest">

            <small>
              Climatica
            </small>


            <strong>
              Everyday waste.
              Everyday climate action.
            </strong>

          </div>
        )}


        {/* =================================
            MOBILE NAVIGATION
        ================================== */}

        <nav className="navbar-mobile-links">

          <NavLink
            to="/"
            end
          >
            <span>
              Home
            </span>

            <ChevronRight
              size={17}
            />
          </NavLink>


          <NavLink
            to="/identify"
          >
            <span>
              Identify Waste
            </span>

            <ChevronRight
              size={17}
            />
          </NavLink>


          <NavLink
            to="/learn"
          >
            <span>
              Learn
            </span>

            <ChevronRight
              size={17}
            />
          </NavLink>


          <NavLink
            to="/marketplace"
          >
            <span>
              Marketplace
            </span>

            <ChevronRight
              size={17}
            />
          </NavLink>


          <NavLink
            to="/recycling"
          >
            <span>
              Find Recycling
            </span>

            <ChevronRight
              size={17}
            />
          </NavLink>

        </nav>


        {/* =================================
            MOBILE ACTIONS
        ================================== */}

        <div className="navbar-mobile-actions">

          {!user ? (
            <>
              <Link
                to="/login"
                className="navbar-mobile-login"
              >
                Log in
              </Link>


              <Link
                to="/register"
                className="navbar-mobile-start"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                to={getDashboardPath()}
                className="navbar-mobile-dashboard"
              >
                Dashboard
              </Link>


              <button
                type="button"
                className="navbar-mobile-signout"
                onClick={
                  handleSignOut
                }
              >
                <LogOut
                  size={17}
                />

                Sign out
              </button>
            </>
          )}

        </div>

      </aside>
    </>
  );
}


export default Navbar;