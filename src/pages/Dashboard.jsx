import {
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock3,
  GraduationCap,
  Heart,
  Home,
  Leaf,
  LogOut,
  MapPin,
  Menu,
  PackageCheck,
  Recycle,
  Repeat2,
  Search,
  ShoppingBag,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  X,
} from "lucide-react";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useMemo,
  useState,
} from "react";

import {
  useAuth,
} from "../context/AuthContext";

import climaticaLogo
  from "../assets/climatica-logo.png";

import demoWasteResults
  from "../data/demoWasteResults";


const stats = [
  {
    label: "Items identified",
    value: "12",
    note: "Prototype activity",
    icon: Camera,
  },

  {
    label: "Items recycled",
    value: "5",
    note: "Demo progress",
    icon: Recycle,
  },

  {
    label: "Items reused",
    value: "3",
    note: "Demo progress",
    icon: Repeat2,
  },

  {
    label: "Climate points",
    value: "140",
    note: "Prototype rewards",
    icon: Sparkles,
  },
];


const activity = [
  {
    id: 1,
    type: "identify",
    title: "Identified PET Plastic Bottle",
    description:
      "Climatica recommended recycling as the most suitable next action.",
    time: "Today",
    icon: Camera,
  },

  {
    id: 2,
    type: "learn",
    title: "Completed a plastics lesson",
    description:
      "You explored practical guidance for common household plastics.",
    time: "Yesterday",
    icon: GraduationCap,
  },

  {
    id: 3,
    type: "marketplace",
    title: "Saved a reusable laptop",
    description:
      "The item was added to your prototype marketplace saves.",
    time: "2 days ago",
    icon: Heart,
  },

  {
    id: 4,
    type: "recycle",
    title: "Viewed a recycling location",
    description:
      "You explored a nearby sample recovery option.",
    time: "3 days ago",
    icon: MapPin,
  },
];


const savedListings = [
  {
    id: 1,
    title: "HP EliteBook Laptop",
    category: "Electronics",
    price: "₦145,000",
    location: "Ota, Ogun",
  },

  {
    id: 2,
    title: "University Textbook Bundle",
    category: "Books",
    price: "₦12,000",
    location: "Abeokuta, Ogun",
  },
];


function Dashboard() {
  const {
    user,
    signOut,
  } = useAuth();

  const navigate =
    useNavigate();

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);


  /* =========================================
     MOST RECENT IDENTIFICATION
  ========================================= */

  const recentIdentification =
    useMemo(() => {
      const selectedItem =
        sessionStorage.getItem(
          "climatica-demo-item"
        ) || "Plastic bottle";


      return (
        demoWasteResults[
          selectedItem
        ] ||
        demoWasteResults[
          "Plastic bottle"
        ]
      );
    }, []);


  const handleSignOut = () => {
    signOut();

    navigate("/");
  };


  return (
    <main className="user-dashboard">

      {/* =====================================
          SIDEBAR
      ====================================== */}

      <aside
        className={`
          dashboard-sidebar

          ${
            mobileMenuOpen
              ? "mobile-open"
              : ""
          }
        `}
      >

        <div className="dashboard-sidebar-top">

          <Link
            to="/"
            className="dashboard-logo"
          >
            <img
              src={climaticaLogo}
              alt="Climatica"
            />
          </Link>


          <button
            type="button"
            className="dashboard-mobile-close"
            onClick={() =>
              setMobileMenuOpen(false)
            }
          >
            <X size={21} />
          </button>

        </div>


        {/* USER */}

        <div className="dashboard-profile-card">

          <div className="dashboard-avatar">

            <UserRound
              size={23}
            />

          </div>


          <div>

            <span>
              Individual account
            </span>

            <strong>
              {user?.name || "User"}
            </strong>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="dashboard-nav">

          <NavLink
            to="/dashboard"
            end
            className={({
              isActive,
            }) =>
              isActive
                ? "active"
                : ""
            }
          >
            <Home size={19} />

            Overview
          </NavLink>


          <Link to="/identify">

            <Camera size={19} />

            Identify Waste
          </Link>


          <Link to="/recycling">

            <MapPin size={19} />

            Find Recycling
          </Link>


          <Link to="/marketplace">

            <ShoppingBag size={19} />

            Marketplace
          </Link>


          <Link to="/learn">

            <BookOpen size={19} />

            Education Hub
          </Link>

        </nav>


        <div className="dashboard-sidebar-divider" />


        <div className="dashboard-secondary-nav">

          <button
            type="button"
          >
            <Award size={19} />

            Rewards
          </button>


          <button
            type="button"
          >
            <Heart size={19} />

            Saved Items
          </button>


          <button
            type="button"
          >
            <UserRound size={19} />

            Profile
          </button>

        </div>


        {/* SIDEBAR BOTTOM */}

        <div className="dashboard-sidebar-bottom">

          <div className="dashboard-mini-impact">

            <Leaf size={19} />

            <div>

              <strong>
                One action at a time.
              </strong>

              <p>
                Keep useful materials
                in circulation whenever
                possible.
              </p>

            </div>

          </div>


          <button
            type="button"
            className="dashboard-signout"
            onClick={
              handleSignOut
            }
          >
            <LogOut size={18} />

            Sign out
          </button>

        </div>

      </aside>


      {/* =====================================
          MOBILE OVERLAY
      ====================================== */}

      {mobileMenuOpen && (
        <button
          type="button"
          className="dashboard-mobile-overlay"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          aria-label="Close navigation"
        />
      )}


      {/* =====================================
          MAIN AREA
      ====================================== */}

      <section className="dashboard-main">

        {/* HEADER */}

        <header className="dashboard-topbar">

          <div className="dashboard-mobile-brand">

            <button
              type="button"
              className="dashboard-menu-button"
              onClick={() =>
                setMobileMenuOpen(true)
              }
            >
              <Menu size={22} />
            </button>


            <img
              src={climaticaLogo}
              alt="Climatica"
            />

          </div>


          <div className="dashboard-topbar-copy">

            <span>
              Personal dashboard
            </span>

            <strong>
              Welcome back,{" "}
              {user?.name?.split(" ")[0] ||
                "there"}
            </strong>

          </div>


          <div className="dashboard-topbar-actions">

            <button
              type="button"
              className="dashboard-search-button"
              aria-label="Search"
            >
              <Search size={19} />
            </button>


            <button
              type="button"
              className="dashboard-notification-button"
              aria-label="Notifications"
            >
              <Bell size={19} />

              <span />
            </button>


            <div className="dashboard-topbar-user">

              <div>

                <span>
                  Signed in as
                </span>

                <strong>
                  {user?.name}
                </strong>

              </div>


              <div className="dashboard-small-avatar">

                <UserRound
                  size={19}
                />

              </div>

            </div>

          </div>

        </header>


        {/* =====================================
            PAGE CONTENT
        ====================================== */}

        <div className="dashboard-content">

          {/* =================================
              WELCOME
          ================================== */}

          <section className="dashboard-welcome">

            <div className="dashboard-welcome-copy">

              <div className="dashboard-eyebrow">

                <Leaf size={15} />

                Your climate action

              </div>


              <h1>
                Small choices.
                <br />

                <span>
                  Visible progress.
                </span>
              </h1>


              <p>
                Identify what you have,
                understand your options and
                keep track of the practical
                actions you take through
                Climatica.
              </p>

            </div>


            <div className="dashboard-points-card">

              <div className="dashboard-points-icon">

                <Sparkles
                  size={25}
                />

              </div>


              <span>
                Climate Points
              </span>


              <strong>
                140
              </strong>


              <p>
                Prototype reward balance
              </p>


              <div className="points-progress">

                <span>
                  <span />
                </span>

              </div>


              <div className="points-progress-copy">

                <span>
                  140 points
                </span>

                <span>
                  200 next level
                </span>

              </div>

            </div>

          </section>


          {/* =================================
              QUICK ACTIONS
          ================================== */}

          <section className="dashboard-section">

            <div className="dashboard-section-heading">

              <div>

                <span>
                  Quick actions
                </span>

                <h2>
                  What do you want
                  to do today?
                </h2>

              </div>

            </div>


            <div className="dashboard-quick-grid">

              <QuickAction
                to="/identify"
                icon={Camera}
                title="Identify waste"
                description="Show Climatica an item and understand what it is."
                button="Identify"
              />


              <QuickAction
                to="/recycling"
                icon={MapPin}
                title="Find recycling"
                description="Explore suitable recycling and collection options."
                button="Find a location"
              />


              <QuickAction
                to="/marketplace"
                icon={ShoppingBag}
                title="Use marketplace"
                description="Buy, sell, give away or barter useful items."
                button="Explore"
              />


              <QuickAction
                to="/learn"
                icon={GraduationCap}
                title="Learn"
                description="Build better waste habits through practical lessons."
                button="Start learning"
              />

            </div>

          </section>


          {/* =================================
              STATS
          ================================== */}

          <section className="dashboard-section">

            <div className="dashboard-section-heading dashboard-heading-row">

              <div>

                <span>
                  Demo snapshot
                </span>

                <h2>
                  Your activity
                  at a glance.
                </h2>

              </div>


              <p>
                These figures are sample
                prototype data used to
                demonstrate how user progress
                could be presented.
              </p>

            </div>


            <div className="dashboard-stat-grid">

              {stats.map(
                (stat) => {
                  const Icon =
                    stat.icon;


                  return (
                    <article
                      className="dashboard-stat-card"
                      key={
                        stat.label
                      }
                    >

                      <div className="dashboard-stat-icon">

                        <Icon
                          size={22}
                        />

                      </div>


                      <div>

                        <strong>
                          {stat.value}
                        </strong>

                        <span>
                          {stat.label}
                        </span>

                        <small>
                          {stat.note}
                        </small>

                      </div>

                    </article>
                  );
                }
              )}

            </div>

          </section>


          {/* =================================
              IDENTIFICATION + CHALLENGE
          ================================== */}

          <section className="dashboard-two-column">

            {/* RECENT IDENTIFICATION */}

            <article className="dashboard-panel">

              <div className="dashboard-panel-heading">

                <div>

                  <span>
                    Recent identification
                  </span>

                  <h2>
                    What you
                    checked last.
                  </h2>

                </div>


                <Link
                  to="/identify"
                  className="dashboard-small-link"
                >
                  Identify another

                  <ArrowRight
                    size={16}
                  />
                </Link>

              </div>


              <div className="recent-identification-card">

                <div className="recent-identification-icon">

                  <Recycle
                    size={34}
                  />

                </div>


                <div className="recent-identification-copy">

                  <div className="recent-success-tag">

                    <CheckCircle2
                      size={15}
                    />

                    Recyclable

                  </div>


                  <h3>
                    {
                      recentIdentification.name
                    }
                  </h3>


                  <p>
                    {
                      recentIdentification.summary
                    }
                  </p>


                  <div className="recent-identification-details">

                    <span>

                      Material

                      <strong>
                        {
                          recentIdentification.material
                        }
                      </strong>

                    </span>


                    <span>

                      Category

                      <strong>
                        {
                          recentIdentification.category
                        }
                      </strong>

                    </span>

                  </div>


                  <Link
                    to="/options"
                    className="dashboard-primary-link"
                  >
                    See recommended actions

                    <ArrowRight
                      size={17}
                    />
                  </Link>

                </div>

              </div>

            </article>


            {/* CHALLENGE */}

            <article className="dashboard-panel dashboard-challenge-panel">

              <div className="dashboard-panel-heading">

                <div>

                  <span>
                    Current challenge
                  </span>

                  <h2>
                    One day without
                    single-use plastic.
                  </h2>

                </div>

              </div>


              <div className="dashboard-challenge-content">

                <div className="dashboard-challenge-icon">

                  <Trophy
                    size={33}
                  />

                </div>


                <p>
                  Pay attention to the
                  disposable plastic you
                  use during one normal day
                  and look for practical
                  alternatives.
                </p>


                <div className="challenge-progress-row">

                  <span>
                    Progress
                  </span>

                  <strong>
                    40%
                  </strong>

                </div>


                <div className="challenge-progress-bar">

                  <span />

                </div>


                <div className="challenge-reward">

                  <Sparkles
                    size={17}
                  />

                  <span>
                    Complete to earn
                  </span>

                  <strong>
                    +20 points
                  </strong>

                </div>


                <Link
                  to="/learn"
                  className="dashboard-outline-link"
                >
                  Continue Challenge

                  <ArrowRight
                    size={17}
                  />
                </Link>

              </div>

            </article>

          </section>


          {/* =================================
              ACTIVITY
          ================================== */}

          <section className="dashboard-two-column dashboard-bottom-grid">

            {/* ACTIVITY */}

            <article className="dashboard-panel">

              <div className="dashboard-panel-heading">

                <div>

                  <span>
                    Recent activity
                  </span>

                  <h2>
                    Your latest actions.
                  </h2>

                </div>

              </div>


              <div className="dashboard-activity-list">

                {activity.map(
                  (item) => {
                    const Icon =
                      item.icon;


                    return (
                      <div
                        className="dashboard-activity-item"
                        key={
                          item.id
                        }
                      >

                        <div className="dashboard-activity-icon">

                          <Icon
                            size={19}
                          />

                        </div>


                        <div className="dashboard-activity-copy">

                          <strong>
                            {item.title}
                          </strong>

                          <p>
                            {
                              item.description
                            }
                          </p>

                        </div>


                        <span className="dashboard-activity-time">

                          <Clock3
                            size={14}
                          />

                          {item.time}

                        </span>

                      </div>
                    );
                  }
                )}

              </div>

            </article>


            {/* SAVED ITEMS */}

            <article className="dashboard-panel">

              <div className="dashboard-panel-heading">

                <div>

                  <span>
                    Saved marketplace items
                  </span>

                  <h2>
                    Keep an eye
                    on these.
                  </h2>

                </div>


                <Link
                  to="/marketplace"
                  className="dashboard-small-link"
                >
                  Marketplace

                  <ArrowRight
                    size={16}
                  />
                </Link>

              </div>


              <div className="dashboard-saved-list">

                {savedListings.map(
                  (item) => (
                    <article
                      className="dashboard-saved-item"
                      key={
                        item.id
                      }
                    >

                      <div className="dashboard-saved-icon">

                        <PackageCheck
                          size={22}
                        />

                      </div>


                      <div>

                        <span>
                          {
                            item.category
                          }
                        </span>

                        <h3>
                          {item.title}
                        </h3>

                        <div>

                          <strong>
                            {item.price}
                          </strong>

                          <small>
                            <MapPin
                              size={12}
                            />

                            {
                              item.location
                            }
                          </small>

                        </div>

                      </div>


                      <Link
                        to="/marketplace"
                        aria-label={
                          `View ${item.title}`
                        }
                      >
                        <ChevronRight
                          size={19}
                        />
                      </Link>

                    </article>
                  )
                )}

              </div>

            </article>

          </section>


          {/* =================================
              LEARNING
          ================================== */}

          <section className="dashboard-learning-card">

            <div className="dashboard-learning-icon">

              <BookOpen
                size={29}
              />

            </div>


            <div className="dashboard-learning-copy">

              <span>
                Continue learning
              </span>


              <h2>
                Why batteries need
                special handling.
              </h2>


              <p>
                Continue building practical
                knowledge with a short lesson
                on safe battery handling and
                responsible disposal.
              </p>

            </div>


            <div className="dashboard-learning-progress">

              <div>

                <span>
                  Lesson progress
                </span>

                <strong>
                  25%
                </strong>

              </div>


              <div className="learning-progress-bar">

                <span />

              </div>


              <Link
                to="/learn"
              >
                Continue Lesson

                <ArrowRight
                  size={17}
                />
              </Link>

            </div>

          </section>


          {/* =================================
              PROTOTYPE NOTE
          ================================== */}

          <div className="dashboard-prototype-note">

            <Leaf size={17} />

            <p>
              Dashboard statistics,
              rewards, saved items and
              challenge progress currently
              use prototype data. They will
              later come from the user's
              account and platform activity.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}



/* =========================================
   QUICK ACTION COMPONENT
========================================= */

function QuickAction({
  to,
  icon: Icon,
  title,
  description,
  button,
}) {
  return (
    <Link
      to={to}
      className="dashboard-quick-card"
    >

      <div className="dashboard-quick-icon">

        <Icon
          size={24}
          strokeWidth={1.7}
        />

      </div>


      <div>

        <h3>
          {title}
        </h3>


        <p>
          {description}
        </p>

      </div>


      <span className="dashboard-quick-action">

        {button}

        <ArrowRight
          size={16}
        />

      </span>

    </Link>
  );
}


export default Dashboard;