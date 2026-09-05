import {
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Home,
  Leaf,
  LogOut,
  MapPin,
  Menu,
  Package,
  Recycle,
  Search,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  Truck,
  UserRound,
  Weight,
  X,
  XCircle,
} from "lucide-react";

import {
  Link,
  NavLink,
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


/* =========================================
   SAMPLE COLLECTION REQUESTS
========================================= */

const initialRequests = [
  {
    id: 1,

    material:
      "PET Plastic Bottles",

    quantity:
      "18 kg",

    requester:
      "Greenfield Estate",

    location:
      "Sango-Ota, Ogun",

    distance:
      "2.4 km",

    requestedTime:
      "Today · 2:00 PM",

    urgency:
      "Today",

    description:
      "Sorted PET bottles from a residential collection point.",

    status:
      "pending",
  },

  {
    id: 2,

    material:
      "Aluminium Cans",

    quantity:
      "9 kg",

    requester:
      "Campus Food Court",

    location:
      "Ota, Ogun",

    distance:
      "3.1 km",

    requestedTime:
      "Today · 4:30 PM",

    urgency:
      "Today",

    description:
      "Clean aluminium drink cans separated from general waste.",

    status:
      "pending",
  },

  {
    id: 3,

    material:
      "Cardboard & Paper",

    quantity:
      "32 kg",

    requester:
      "BrightPath Academy",

    location:
      "Iju, Ogun",

    distance:
      "5.7 km",

    requestedTime:
      "Tomorrow · 10:00 AM",

    urgency:
      "Tomorrow",

    description:
      "Paper and flattened cardboard from school administrative activities.",

    status:
      "pending",
  },

  {
    id: 4,

    material:
      "Small Electronics",

    quantity:
      "6 items",

    requester:
      "Ada M.",

    location:
      "Ado-Odo, Ogun",

    distance:
      "7.2 km",

    requestedTime:
      "Friday · 11:00 AM",

    urgency:
      "Flexible",

    description:
      "Two damaged phones, chargers and small electronic accessories.",

    status:
      "pending",
  },
];


const materialOpportunities = [
  {
    id: 1,

    material:
      "PET Plastic",

    volume:
      "42 kg",

    area:
      "Ota",

    source:
      "Community collection",

    distance:
      "3.5 km",
  },

  {
    id: 2,

    material:
      "Aluminium",

    volume:
      "21 kg",

    area:
      "Sango-Ota",

    source:
      "Hospitality business",

    distance:
      "4.8 km",
  },

  {
    id: 3,

    material:
      "Cardboard",

    volume:
      "58 kg",

    area:
      "Abeokuta",

    source:
      "Retail business",

    distance:
      "11 km",
  },
];


const recentActivity = [
  {
    id: 1,

    title:
      "Plastic collection completed",

    detail:
      "24 kg recovered from Green Estate.",

    time:
      "Today · 9:15 AM",

    icon:
      CheckCircle2,
  },

  {
    id: 2,

    title:
      "New collection request received",

    detail:
      "Aluminium cans available in Ota.",

    time:
      "Today · 8:42 AM",

    icon:
      Bell,
  },

  {
    id: 3,

    title:
      "Recovery record updated",

    detail:
      "Weekly recovered material total increased.",

    time:
      "Yesterday",

    icon:
      Weight,
  },
];


function RecyclerDashboard() {
  const {
    user,
    signOut,
  } = useAuth();


  const navigate =
    useNavigate();


  const [
    requests,
    setRequests,
  ] = useState(
    initialRequests
  );


  const [
    available,
    setAvailable,
  ] = useState(true);


  const [
    selectedRequest,
    setSelectedRequest,
  ] = useState(null);


  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);


  const updateRequestStatus = (
    id,
    status
  ) => {
    setRequests(
      (current) =>
        current.map(
          (request) =>
            request.id === id
              ? {
                  ...request,
                  status,
                }
              : request
        )
    );


    if (
      selectedRequest?.id ===
      id
    ) {
      setSelectedRequest(
        (current) => ({
          ...current,
          status,
        })
      );
    }
  };


  const pendingCount =
    requests.filter(
      (request) =>
        request.status ===
        "pending"
    ).length;


  const handleSignOut = () => {
    signOut();

    navigate("/");
  };


  return (
    <main className="recycler-dashboard">

      {/* =====================================
          SIDEBAR
      ====================================== */}

      <aside
        className={`
          recycler-sidebar

          ${
            mobileMenuOpen
              ? "mobile-open"
              : ""
          }
        `}
      >

        <div className="recycler-sidebar-top">

          <Link
            to="/"
            className="recycler-logo"
          >
            <img
              src={climaticaLogo}
              alt="Climatica"
            />
          </Link>


          <button
            type="button"
            className="recycler-mobile-close"
            onClick={() =>
              setMobileMenuOpen(
                false
              )
            }
          >
            <X size={21} />
          </button>

        </div>


        {/* PROFILE */}

        <div className="recycler-profile-card">

          <div className="recycler-avatar">

            <Recycle
              size={24}
            />

          </div>


          <div>

            <span>
              Recycler / PSP
            </span>


            <strong>
              {user?.name ||
                "Recycler"}
            </strong>

          </div>


          <ShieldCheck
            size={18}
          />

        </div>


        {/* MAIN NAV */}

        <nav className="recycler-nav">

          <NavLink
            to="/recycler-dashboard"
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


          <button
            type="button"
          >
            <Truck size={19} />

            Collection Requests

            {pendingCount > 0 && (
              <span className="recycler-nav-count">
                {pendingCount}
              </span>
            )}
          </button>


          <button
            type="button"
          >
            <Package size={19} />

            Material Opportunities
          </button>


          <button
            type="button"
          >
            <MapPin size={19} />

            Service Area
          </button>


          <button
            type="button"
          >
            <Weight size={19} />

            Recovery Records
          </button>

        </nav>


        <div className="recycler-sidebar-divider" />


        <nav className="recycler-secondary-nav">

          <Link to="/recycling">

            <MapPin size={19} />

            Public Locator
          </Link>


          <Link to="/marketplace">

            <Recycle size={19} />

            Marketplace
          </Link>


          <button
            type="button"
          >
            <UserRound
              size={19}
            />

            Organisation Profile
          </button>

        </nav>


        {/* BOTTOM */}

        <div className="recycler-sidebar-bottom">

          <div className="recycler-verification-card">

            <ShieldCheck
              size={22}
            />


            <div>

              <strong>
                Verified recycler
              </strong>


              <p>
                Prototype verification
                status.
              </p>

            </div>

          </div>


          <button
            type="button"
            className="recycler-signout"
            onClick={
              handleSignOut
            }
          >
            <LogOut
              size={18}
            />

            Sign out
          </button>

        </div>

      </aside>


      {/* MOBILE OVERLAY */}

      {mobileMenuOpen && (
        <button
          type="button"
          className="recycler-mobile-overlay"
          onClick={() =>
            setMobileMenuOpen(
              false
            )
          }
        />
      )}


      {/* =====================================
          MAIN
      ====================================== */}

      <section className="recycler-main">

        {/* TOPBAR */}

        <header className="recycler-topbar">

          <div className="recycler-mobile-brand">

            <button
              type="button"
              className="recycler-menu-button"
              onClick={() =>
                setMobileMenuOpen(
                  true
                )
              }
            >
              <Menu size={22} />
            </button>


            <img
              src={climaticaLogo}
              alt="Climatica"
            />

          </div>


          <div className="recycler-topbar-copy">

            <span>
              Recycler operations
            </span>


            <strong>
              Collection overview
            </strong>

          </div>


          <div className="recycler-topbar-actions">

            <button
              type="button"
              className="recycler-topbar-icon"
            >
              <Search
                size={19}
              />
            </button>


            <button
              type="button"
              className="recycler-topbar-icon recycler-bell"
            >
              <Bell
                size={19}
              />

              {pendingCount >
                0 && (
                <span />
              )}
            </button>


            <div className="recycler-topbar-user">

              <div>

                <span>
                  Signed in as
                </span>


                <strong>
                  {user?.name}
                </strong>

              </div>


              <div className="recycler-small-avatar">

                <Recycle
                  size={19}
                />

              </div>

            </div>

          </div>

        </header>


        {/* =====================================
            CONTENT
        ====================================== */}

        <div className="recycler-content">

          {/* =================================
              WELCOME / AVAILABILITY
          ================================== */}

          <section className="recycler-welcome">

            <div>

              <div className="recycler-eyebrow">

                <Recycle
                  size={15}
                />

                Recovery operations

              </div>


              <h1>
                Recover more.
                <br />

                <span>
                  Waste less.
                </span>
              </h1>


              <p>
                Review incoming collection
                requests, discover available
                materials and manage your
                recovery activity from one
                workspace.
              </p>

            </div>


            <div className="recycler-availability-card">

              <div className="availability-heading">

                <div>

                  <span>
                    Collection status
                  </span>


                  <strong>
                    {available
                      ? "Available"
                      : "Unavailable"}
                  </strong>

                </div>


                <button
                  type="button"
                  className={
                    available
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setAvailable(
                      (current) =>
                        !current
                    )
                  }
                  aria-label="Toggle availability"
                >

                  {available ? (
                    <ToggleRight
                      size={36}
                    />
                  ) : (
                    <ToggleLeft
                      size={36}
                    />
                  )}

                </button>

              </div>


              <p>
                {available
                  ? "You are currently visible as available for new collection opportunities."
                  : "New collection opportunities are currently paused."
                }
              </p>


              <div
                className={`
                  availability-status

                  ${
                    available
                      ? "online"
                      : "offline"
                  }
                `}
              >

                <span />

                {available
                  ? "Accepting requests"
                  : "Requests paused"
                }

              </div>

            </div>

          </section>


          {/* =================================
              STATS
          ================================== */}

          <section className="recycler-section">

            <div className="recycler-section-heading">

              <div>

                <span>
                  Operations snapshot
                </span>


                <h2>
                  Today's activity.
                </h2>

              </div>


              <p>
                Prototype metrics showing
                how operational information
                could be presented to a
                recycler or PSP.
              </p>

            </div>


            <div className="recycler-stat-grid">

              <RecyclerStat
                icon={Bell}
                value={
                  pendingCount
                }
                label="Pending requests"
                note="Need review"
              />


              <RecyclerStat
                icon={Truck}
                value="18"
                label="Collections completed"
                note="This month · demo"
              />


              <RecyclerStat
                icon={Weight}
                value="420 kg"
                label="Materials recovered"
                note="This month · demo"
              />


              <RecyclerStat
                icon={CheckCircle2}
                value="92%"
                label="Response rate"
                note="Prototype metric"
              />

            </div>

          </section>


          {/* =================================
              REQUESTS
          ================================== */}

          <section className="recycler-section">

            <div className="recycler-section-heading recycler-heading-actions">

              <div>

                <span>
                  Incoming collections
                </span>


                <h2>
                  Collection requests.
                </h2>

              </div>


              <button
                type="button"
                className="recycler-view-all"
              >
                View all requests

                <ArrowRight
                  size={17}
                />
              </button>

            </div>


            <div className="collection-request-grid">

              {requests.map(
                (request) => (
                  <CollectionRequestCard
                    key={
                      request.id
                    }
                    request={
                      request
                    }
                    onAccept={() =>
                      updateRequestStatus(
                        request.id,
                        "accepted"
                      )
                    }
                    onDecline={() =>
                      updateRequestStatus(
                        request.id,
                        "declined"
                      )
                    }
                    onView={() =>
                      setSelectedRequest(
                        request
                      )
                    }
                  />
                )
              )}

            </div>

          </section>


          {/* =================================
              OPPORTUNITIES + SERVICE
          ================================== */}

          <section className="recycler-two-column">

            {/* MATERIAL OPPORTUNITIES */}

            <article className="recycler-panel">

              <div className="recycler-panel-heading">

                <div>

                  <span>
                    Material opportunities
                  </span>


                  <h2>
                    Recoverable materials
                    nearby.
                  </h2>

                </div>


                <Package
                  size={24}
                />

              </div>


              <div className="material-opportunity-list">

                {materialOpportunities.map(
                  (item) => (
                    <div
                      className="material-opportunity"
                      key={
                        item.id
                      }
                    >

                      <div className="material-opportunity-icon">

                        <Recycle
                          size={21}
                        />

                      </div>


                      <div className="material-opportunity-copy">

                        <strong>
                          {item.material}
                        </strong>


                        <span>
                          {item.source}
                        </span>


                        <div>

                          <small>

                            <Weight
                              size={13}
                            />

                            {
                              item.volume
                            }

                          </small>


                          <small>

                            <MapPin
                              size={13}
                            />

                            {
                              item.area
                            }

                          </small>

                        </div>

                      </div>


                      <div className="material-distance">

                        <span>
                          {
                            item.distance
                          }
                        </span>


                        <ChevronRight
                          size={18}
                        />

                      </div>

                    </div>
                  )
                )}

              </div>

            </article>


            {/* SERVICE AREA */}

            <article className="recycler-panel recycler-service-panel">

              <div className="recycler-panel-heading">

                <div>

                  <span>
                    Service coverage
                  </span>


                  <h2>
                    Where you operate.
                  </h2>

                </div>


                <MapPin
                  size={24}
                />

              </div>


              <div className="service-radius-visual">

                <div className="service-ring ring-three" />

                <div className="service-ring ring-two" />

                <div className="service-ring ring-one" />


                <div className="service-centre">

                  <Truck
                    size={24}
                  />

                </div>


                <span className="service-point point-one" />

                <span className="service-point point-two" />

                <span className="service-point point-three" />

              </div>


              <div className="service-radius-info">

                <div>

                  <span>
                    Current radius
                  </span>


                  <strong>
                    12 km
                  </strong>

                </div>


                <button
                  type="button"
                >
                  Edit service area
                </button>

              </div>


              <div className="service-area-tags">

                <span>
                  Ota
                </span>

                <span>
                  Sango-Ota
                </span>

                <span>
                  Iju
                </span>

                <span>
                  Ado-Odo
                </span>

              </div>

            </article>

          </section>


          {/* =================================
              PERFORMANCE + ACTIVITY
          ================================== */}

          <section className="recycler-two-column recycler-bottom-grid">

            {/* WEEKLY RECOVERY */}

            <article className="recycler-panel">

              <div className="recycler-panel-heading">

                <div>

                  <span>
                    Weekly recovery
                  </span>


                  <h2>
                    Material collected.
                  </h2>

                </div>


                <Weight
                  size={24}
                />

              </div>


              <div className="recovery-summary">

                <div>

                  <strong>
                    126 kg
                  </strong>


                  <span>
                    Demo total this week
                  </span>

                </div>


                <div className="recovery-summary-badge">

                  <ArrowRight
                    size={15}
                  />

                  Active week

                </div>

              </div>


              <div className="recovery-chart">

                <RecoveryBar
                  day="Mon"
                  value="42%"
                  amount="12"
                />

                <RecoveryBar
                  day="Tue"
                  value="61%"
                  amount="18"
                />

                <RecoveryBar
                  day="Wed"
                  value="47%"
                  amount="14"
                />

                <RecoveryBar
                  day="Thu"
                  value="82%"
                  amount="25"
                />

                <RecoveryBar
                  day="Fri"
                  value="66%"
                  amount="20"
                />

                <RecoveryBar
                  day="Sat"
                  value="100%"
                  amount="30"
                />

                <RecoveryBar
                  day="Sun"
                  value="24%"
                  amount="7"
                />

              </div>


              <div className="recovery-chart-label">

                <span>
                  kg recovered
                </span>


                <strong>
                  Prototype activity
                </strong>

              </div>

            </article>


            {/* RECENT ACTIVITY */}

            <article className="recycler-panel">

              <div className="recycler-panel-heading">

                <div>

                  <span>
                    Recent activity
                  </span>


                  <h2>
                    Operations log.
                  </h2>

                </div>


                <Clock3
                  size={24}
                />

              </div>


              <div className="recycler-activity-list">

                {recentActivity.map(
                  (item) => {
                    const Icon =
                      item.icon;


                    return (
                      <div
                        className="recycler-activity-item"
                        key={
                          item.id
                        }
                      >

                        <div className="recycler-activity-icon">

                          <Icon
                            size={19}
                          />

                        </div>


                        <div>

                          <strong>
                            {
                              item.title
                            }
                          </strong>


                          <p>
                            {
                              item.detail
                            }
                          </p>


                          <span>
                            {
                              item.time
                            }
                          </span>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </article>

          </section>


          {/* =================================
              PROTOTYPE NOTE
          ================================== */}

          <div className="recycler-prototype-note">

            <Leaf size={17} />


            <p>
              Collection requests,
              recycler verification,
              distances, recovery records
              and operational figures on
              this screen are sample
              prototype data. Live data
              will come from verified
              users, recycler profiles
              and collection activity.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          REQUEST MODAL
      ====================================== */}

      {selectedRequest && (
        <RequestDetailsModal
          request={
            selectedRequest
          }
          onClose={() =>
            setSelectedRequest(
              null
            )
          }
          onAccept={() =>
            updateRequestStatus(
              selectedRequest.id,
              "accepted"
            )
          }
          onDecline={() =>
            updateRequestStatus(
              selectedRequest.id,
              "declined"
            )
          }
        />
      )}

    </main>
  );
}



/* =========================================
   STAT COMPONENT
========================================= */

function RecyclerStat({
  icon: Icon,
  value,
  label,
  note,
}) {
  return (
    <article className="recycler-stat-card">

      <div className="recycler-stat-icon">

        <Icon
          size={23}
        />

      </div>


      <div>

        <strong>
          {value}
        </strong>


        <span>
          {label}
        </span>


        <small>
          {note}
        </small>

      </div>

    </article>
  );
}



/* =========================================
   COLLECTION REQUEST CARD
========================================= */

function CollectionRequestCard({
  request,
  onAccept,
  onDecline,
  onView,
}) {
  return (
    <article className="collection-request-card">

      <div className="request-card-top">

        <div className="request-material-icon">

          <Recycle
            size={23}
          />

        </div>


        <div className="request-status-area">

          <span
            className={`
              request-status
              ${request.status}
            `}
          >
            {request.status}
          </span>

        </div>

      </div>


      <span className="request-material-label">
        Material
      </span>


      <h3>
        {request.material}
      </h3>


      <div className="request-quantity">

        <Weight size={16} />

        <strong>
          {request.quantity}
        </strong>

      </div>


      <div className="request-meta">

        <span>

          <MapPin size={15} />

          {request.location}

        </span>


        <span>

          <Truck size={15} />

          {request.distance}

        </span>


        <span>

          <Clock3 size={15} />

          {request.requestedTime}

        </span>

      </div>


      <div className="request-requester">

        <UserRound
          size={17}
        />


        <div>

          <span>
            Requested by
          </span>

          <strong>
            {request.requester}
          </strong>

        </div>

      </div>


      <button
        type="button"
        className="request-details-button"
        onClick={onView}
      >
        View request

        <ArrowRight
          size={17}
        />
      </button>


      {request.status ===
        "pending" && (
        <div className="request-action-row">

          <button
            type="button"
            className="request-decline-button"
            onClick={
              onDecline
            }
          >
            <X size={16} />

            Decline
          </button>


          <button
            type="button"
            className="request-accept-button"
            onClick={
              onAccept
            }
          >
            <Check size={16} />

            Accept
          </button>

        </div>
      )}


      {request.status ===
        "accepted" && (
        <div className="request-confirmed">

          <CheckCircle2
            size={17}
          />

          Collection accepted

        </div>
      )}


      {request.status ===
        "declined" && (
        <div className="request-declined">

          <XCircle
            size={17}
          />

          Request declined

        </div>
      )}

    </article>
  );
}



/* =========================================
   RECOVERY BAR
========================================= */

function RecoveryBar({
  day,
  value,
  amount,
}) {
  return (
    <div className="recovery-bar-column">

      <div className="recovery-bar-area">

        <span
          style={{
            height: value,
          }}
        >
          <small>
            {amount}
          </small>
        </span>

      </div>


      <strong>
        {day}
      </strong>

    </div>
  );
}



/* =========================================
   REQUEST DETAILS MODAL
========================================= */

function RequestDetailsModal({
  request,
  onClose,
  onAccept,
  onDecline,
}) {
  return (
    <div
      className="recycler-modal-backdrop"
      onMouseDown={
        onClose
      }
    >

      <div
        className="request-modal"
        onMouseDown={(
          event
        ) =>
          event.stopPropagation()
        }
      >

        <button
          type="button"
          className="request-modal-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>


        <div className="request-modal-icon">

          <Truck size={28} />

        </div>


        <span className="request-modal-eyebrow">
          Collection request
        </span>


        <h2>
          {request.material}
        </h2>


        <p className="request-modal-description">
          {request.description}
        </p>


        <div className="request-modal-grid">

          <div>

            <span>
              Quantity
            </span>

            <strong>
              {request.quantity}
            </strong>

          </div>


          <div>

            <span>
              Distance
            </span>

            <strong>
              {request.distance}
            </strong>

          </div>


          <div>

            <span>
              Location
            </span>

            <strong>
              {request.location}
            </strong>

          </div>


          <div>

            <span>
              Requested time
            </span>

            <strong>
              {
                request.requestedTime
              }
            </strong>

          </div>

        </div>


        <div className="request-modal-requester">

          <UserRound
            size={20}
          />


          <div>

            <span>
              Requested by
            </span>

            <strong>
              {request.requester}
            </strong>

          </div>

        </div>


        {request.status ===
          "pending" ? (
          <div className="request-modal-actions">

            <button
              type="button"
              className="request-decline-button"
              onClick={
                onDecline
              }
            >
              <X size={17} />

              Decline
            </button>


            <button
              type="button"
              className="request-accept-button"
              onClick={
                onAccept
              }
            >
              <Check
                size={17}
              />

              Accept Collection
            </button>

          </div>
        ) : (
          <div
            className={`
              request-modal-result
              ${request.status}
            `}
          >

            {request.status ===
            "accepted" ? (
              <CheckCircle2
                size={18}
              />
            ) : (
              <XCircle
                size={18}
              />
            )}


            Request{" "}
            {request.status}

          </div>
        )}


        <div className="request-modal-note">

          <Leaf size={15} />

          Prototype request —
          no real collection has
          been scheduled.

        </div>

      </div>

    </div>
  );
}


export default RecyclerDashboard;