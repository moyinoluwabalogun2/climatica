import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  Home,
  Leaf,
  LogOut,
  Menu,
  Recycle,
  Search,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  UserRound,
  Users,
  Weight,
  X,
  XCircle,
} from "lucide-react";

import {
  Link,
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


/* =========================================================
   DEMO DATA
========================================================= */

const initialUsers = [
  {
    id: 1,
    name: "Daniel A.",
    email: "daniel@example.com",
    role: "individual",
    status: "Active",
    joined: "Today",
  },

  {
    id: 2,
    name: "Greenfield Academy",
    email: "school@greenfield.test",
    role: "school",
    status: "Active",
    joined: "Yesterday",
  },

  {
    id: 3,
    name: "EcoFoods Nigeria Ltd",
    email: "business@ecofoods.test",
    role: "business",
    status: "Active",
    joined: "2 days ago",
  },

  {
    id: 4,
    name: "EcoLoop Recovery",
    email: "recycler@ecoloop.test",
    role: "recycler",
    status: "Pending Verification",
    joined: "3 days ago",
  },

  {
    id: 5,
    name: "Sarah K.",
    email: "sarah@example.com",
    role: "individual",
    status: "Active",
    joined: "4 days ago",
  },
];


const initialVerificationRequests = [
  {
    id: 1,
    name: "EcoLoop Recovery Services",
    email: "hello@ecoloop.test",
    location: "Ota, Ogun",
    materials: "Plastic, Metal, Paper",
    documents: "3 documents",
    submitted: "Today · 9:20 AM",
    status: "pending",
  },

  {
    id: 2,
    name: "GreenPath Waste Solutions",
    email: "greenpath@example.com",
    location: "Abeokuta, Ogun",
    materials: "Plastic, E-Waste",
    documents: "4 documents",
    submitted: "Yesterday",
    status: "pending",
  },

  {
    id: 3,
    name: "CleanCity PSP",
    email: "cleancity@example.com",
    location: "Sango-Ota, Ogun",
    materials: "Plastic, Paper, Metal",
    documents: "2 documents",
    submitted: "2 days ago",
    status: "pending",
  },
];


const initialMarketplaceReports = [
  {
    id: 1,
    title: "Possible misleading laptop listing",
    listing: "HP EliteBook Laptop",
    seller: "Daniel A.",
    reason: "Potentially inaccurate item condition",
    reportedBy: "2 users",
    severity: "medium",
    time: "Today · 10:12 AM",
    status: "open",
  },

  {
    id: 2,
    title: "Battery listed in wrong category",
    listing: "Mixed Battery Pack",
    seller: "Community Seller",
    reason: "Hazardous waste listed as a normal material",
    reportedBy: "1 user",
    severity: "high",
    time: "Yesterday",
    status: "open",
  },

  {
    id: 3,
    title: "Possible duplicate listing",
    listing: "Reusable Storage Containers",
    seller: "Sarah K.",
    reason: "Duplicate marketplace entry",
    reportedBy: "1 user",
    severity: "low",
    time: "2 days ago",
    status: "open",
  },
];


const collections = [
  {
    id: 1,
    source: "Greenfield Estate",
    recycler: "EcoLoop Recovery",
    material: "PET Plastic",
    amount: "24 kg",
    status: "Completed",
    date: "Today",
  },

  {
    id: 2,
    source: "BrightPath Academy",
    recycler: "GreenCycle",
    material: "Paper",
    amount: "31 kg",
    status: "Scheduled",
    date: "Tomorrow",
  },

  {
    id: 3,
    source: "EcoFoods Nigeria Ltd",
    recycler: "Community PSP",
    material: "Aluminium",
    amount: "18 kg",
    status: "Pending",
    date: "18 Sep",
  },

  {
    id: 4,
    source: "Campus Food Court",
    recycler: "EcoPoint",
    material: "Plastic",
    amount: "42 kg",
    status: "Completed",
    date: "Yesterday",
  },
];


const activity = [
  {
    id: 1,
    title: "Recycler verification submitted",
    detail:
      "EcoLoop Recovery Services requested verification.",
    time: "Today · 9:20 AM",
    icon: ShieldCheck,
  },

  {
    id: 2,
    title: "Marketplace report received",
    detail:
      "A potentially hazardous listing requires review.",
    time: "Today · 8:45 AM",
    icon: AlertTriangle,
  },

  {
    id: 3,
    title: "Collection completed",
    detail:
      "24 kg of PET plastic was recorded as recovered.",
    time: "Yesterday",
    icon: Truck,
  },

  {
    id: 4,
    title: "New school account",
    detail:
      "A prototype school account joined Climatica.",
    time: "Yesterday",
    icon: GraduationCap,
  },
];


const analyticsMonths = [
  {
    month: "APR",
    users: "42%",
    recovery: "48%",
  },

  {
    month: "MAY",
    users: "51%",
    recovery: "56%",
  },

  {
    month: "JUN",
    users: "59%",
    recovery: "62%",
  },

  {
    month: "JUL",
    users: "69%",
    recovery: "70%",
  },

  {
    month: "AUG",
    users: "82%",
    recovery: "79%",
  },

  {
    month: "SEP",
    users: "94%",
    recovery: "88%",
  },
];


function AdminDashboard() {
  const {
    user,
    signOut,
  } = useAuth();


  const navigate =
    useNavigate();


  const [
    activeView,
    setActiveView,
  ] = useState("overview");


  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);


  const [
    users,
    setUsers,
  ] = useState(
    initialUsers
  );


  const [
    verificationRequests,
    setVerificationRequests,
  ] = useState(
    initialVerificationRequests
  );


  const [
    marketplaceReports,
    setMarketplaceReports,
  ] = useState(
    initialMarketplaceReports
  );


  const [
    selectedUser,
    setSelectedUser,
  ] = useState(null);


  const [
    selectedVerification,
    setSelectedVerification,
  ] = useState(null);


  const [
    selectedReport,
    setSelectedReport,
  ] = useState(null);


  const [
    userSearch,
    setUserSearch,
  ] = useState("");


  const pendingVerificationCount =
    verificationRequests.filter(
      (item) =>
        item.status ===
        "pending"
    ).length;


  const openReportsCount =
    marketplaceReports.filter(
      (item) =>
        item.status ===
        "open"
    ).length;


  const filteredUsers =
    useMemo(() => {
      const query =
        userSearch
          .trim()
          .toLowerCase();


      if (!query) {
        return users;
      }


      return users.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(query) ||
          item.email
            .toLowerCase()
            .includes(query) ||
          item.role
            .toLowerCase()
            .includes(query)
      );
    }, [
      users,
      userSearch,
    ]);


  const selectView = (
    view
  ) => {
    setActiveView(view);

    setMobileMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const handleSignOut = () => {
    signOut();

    navigate("/");
  };


  const updateVerification = (
    id,
    status
  ) => {
    setVerificationRequests(
      (current) =>
        current.map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  status,
                }
              : item
        )
    );


    if (
      selectedVerification?.id ===
      id
    ) {
      setSelectedVerification(
        (current) => ({
          ...current,
          status,
        })
      );
    }
  };


  const updateReport = (
    id,
    status
  ) => {
    setMarketplaceReports(
      (current) =>
        current.map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  status,
                }
              : item
        )
    );


    if (
      selectedReport?.id ===
      id
    ) {
      setSelectedReport(
        (current) => ({
          ...current,
          status,
        })
      );
    }
  };


  const toggleUserStatus = (
    id
  ) => {
    setUsers(
      (current) =>
        current.map(
          (item) =>
            item.id === id
              ? {
                  ...item,

                  status:
                    item.status ===
                    "Suspended"
                      ? "Active"
                      : "Suspended",
                }
              : item
        )
    );


    setSelectedUser(
      (current) =>
        current?.id === id
          ? {
              ...current,

              status:
                current.status ===
                "Suspended"
                  ? "Active"
                  : "Suspended",
            }
          : current
    );
  };


  const topbarTitle = {
    overview:
      "Platform overview",

    users:
      "User management",

    verification:
      "Recycler verification",

    marketplace:
      "Marketplace moderation",

    collections:
      "Collection activity",

    analytics:
      "Platform analytics",
  }[activeView];


  return (
    <main className="admin-dashboard">

      {/* ===================================================
          SIDEBAR
      ==================================================== */}

      <aside
        className={`
          admin-sidebar

          ${
            mobileMenuOpen
              ? "mobile-open"
              : ""
          }
        `}
      >

        <div className="admin-sidebar-top">

          <Link
            to="/"
            className="admin-dashboard-logo"
          >
            <img
              src={climaticaLogo}
              alt="Climatica"
            />
          </Link>


          <button
            type="button"
            className="admin-mobile-close"
            onClick={() =>
              setMobileMenuOpen(false)
            }
          >
            <X size={21} />
          </button>

        </div>


        <div className="admin-profile-card">

          <div className="admin-profile-icon">

            <ShieldCheck
              size={23}
            />

          </div>


          <div>

            <span>
              Administrator
            </span>


            <strong>
              {user?.name ||
                "Climatica Admin"}
            </strong>

          </div>

        </div>


        <nav className="admin-nav">

          <AdminNavButton
            active={
              activeView ===
              "overview"
            }
            icon={Home}
            label="Overview"
            onClick={() =>
              selectView(
                "overview"
              )
            }
          />


          <AdminNavButton
            active={
              activeView ===
              "users"
            }
            icon={Users}
            label="User Accounts"
            onClick={() =>
              selectView(
                "users"
              )
            }
          />


          <AdminNavButton
            active={
              activeView ===
              "verification"
            }
            icon={ShieldCheck}
            label="Verification"
            badge={
              pendingVerificationCount
            }
            onClick={() =>
              selectView(
                "verification"
              )
            }
          />


          <AdminNavButton
            active={
              activeView ===
              "marketplace"
            }
            icon={ShoppingBag}
            label="Marketplace"
            badge={
              openReportsCount
            }
            warning
            onClick={() =>
              selectView(
                "marketplace"
              )
            }
          />


          <AdminNavButton
            active={
              activeView ===
              "collections"
            }
            icon={Truck}
            label="Collections"
            onClick={() =>
              selectView(
                "collections"
              )
            }
          />


          <AdminNavButton
            active={
              activeView ===
              "analytics"
            }
            icon={BarChart3}
            label="Analytics"
            onClick={() =>
              selectView(
                "analytics"
              )
            }
          />

        </nav>


        <div className="admin-sidebar-divider" />


        <nav className="admin-secondary-nav">

          <Link to="/">

            <Leaf size={19} />

            Public Website
          </Link>


          <Link to="/marketplace">

            <ShoppingBag
              size={19}
            />

            View Marketplace
          </Link>


          <Link to="/recycling">

            <Recycle size={19} />

            Recycling Locator
          </Link>

        </nav>


        <div className="admin-sidebar-bottom">

          <div className="admin-control-note">

            <ShieldCheck
              size={20}
            />


            <div>

              <strong>
                Human oversight
              </strong>


              <p>
                Verification and
                moderation decisions
                remain administrator
                controlled.
              </p>

            </div>

          </div>


          <button
            type="button"
            className="admin-signout"
            onClick={
              handleSignOut
            }
          >
            <LogOut size={18} />

            Sign out
          </button>

        </div>

      </aside>


      {mobileMenuOpen && (
        <button
          type="button"
          className="admin-mobile-overlay"
          onClick={() =>
            setMobileMenuOpen(false)
          }
        />
      )}


      {/* ===================================================
          MAIN
      ==================================================== */}

      <section className="admin-main">

        <header className="admin-topbar">

          <div className="admin-mobile-brand">

            <button
              type="button"
              className="admin-menu-button"
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


          <div className="admin-topbar-copy">

            <span>
              Administration
            </span>


            <strong>
              {topbarTitle}
            </strong>

          </div>


          <div className="admin-topbar-actions">

            <button
              type="button"
              className="admin-topbar-icon"
            >
              <Search size={19} />
            </button>


            <button
              type="button"
              className="admin-topbar-icon admin-notification"
            >
              <Bell size={19} />

              {(pendingVerificationCount +
                openReportsCount) >
                0 && (
                <span />
              )}
            </button>


            <div className="admin-topbar-user">

              <div>

                <span>
                  Administrator
                </span>


                <strong>
                  {user?.name ||
                    "Climatica Admin"}
                </strong>

              </div>


              <div className="admin-small-avatar">

                <ShieldCheck
                  size={19}
                />

              </div>

            </div>

          </div>

        </header>


        <div className="admin-content">

          {activeView ===
            "overview" && (
            <AdminOverview
              pendingVerificationCount={
                pendingVerificationCount
              }
              openReportsCount={
                openReportsCount
              }
              verificationRequests={
                verificationRequests
              }
              marketplaceReports={
                marketplaceReports
              }
              onOpenVerification={() =>
                selectView(
                  "verification"
                )
              }
              onOpenMarketplace={() =>
                selectView(
                  "marketplace"
                )
              }
              onOpenCollections={() =>
                selectView(
                  "collections"
                )
              }
              onSelectVerification={
                setSelectedVerification
              }
              onSelectReport={
                setSelectedReport
              }
            />
          )}


          {activeView ===
            "users" && (
            <UsersView
              users={
                filteredUsers
              }
              search={
                userSearch
              }
              setSearch={
                setUserSearch
              }
              onSelect={
                setSelectedUser
              }
            />
          )}


          {activeView ===
            "verification" && (
            <VerificationView
              requests={
                verificationRequests
              }
              onSelect={
                setSelectedVerification
              }
              onApprove={(
                id
              ) =>
                updateVerification(
                  id,
                  "approved"
                )
              }
              onReject={(
                id
              ) =>
                updateVerification(
                  id,
                  "rejected"
                )
              }
            />
          )}


          {activeView ===
            "marketplace" && (
            <MarketplaceModerationView
              reports={
                marketplaceReports
              }
              onSelect={
                setSelectedReport
              }
            />
          )}


          {activeView ===
            "collections" && (
            <AdminCollectionsView />
          )}


          {activeView ===
            "analytics" && (
            <AnalyticsView />
          )}


          <div className="admin-prototype-note">

            <Leaf size={17} />


            <p>
              Accounts, verification
              applications, reports,
              collections and platform
              analytics shown here are
              prototype data. Production
              administration will use
              authenticated permissions,
              persisted records and
              audit logs.
            </p>

          </div>

        </div>

      </section>


      {/* ===================================================
          MODALS
      ==================================================== */}

      {selectedVerification && (
        <VerificationModal
          request={
            selectedVerification
          }
          onClose={() =>
            setSelectedVerification(
              null
            )
          }
          onApprove={() =>
            updateVerification(
              selectedVerification.id,
              "approved"
            )
          }
          onReject={() =>
            updateVerification(
              selectedVerification.id,
              "rejected"
            )
          }
        />
      )}


      {selectedReport && (
        <ReportModal
          report={
            selectedReport
          }
          onClose={() =>
            setSelectedReport(
              null
            )
          }
          onDismiss={() =>
            updateReport(
              selectedReport.id,
              "dismissed"
            )
          }
          onRemove={() =>
            updateReport(
              selectedReport.id,
              "removed"
            )
          }
        />
      )}


      {selectedUser && (
        <UserModal
          account={
            selectedUser
          }
          onClose={() =>
            setSelectedUser(
              null
            )
          }
          onToggle={() =>
            toggleUserStatus(
              selectedUser.id
            )
          }
        />
      )}

    </main>
  );
}


/* =========================================================
   SIDEBAR BUTTON
========================================================= */

function AdminNavButton({
  active,
  icon: Icon,
  label,
  badge,
  warning,
  onClick,
}) {
  return (
    <button
      type="button"
      className={
        active
          ? "active"
          : ""
      }
      onClick={onClick}
    >
      <Icon size={19} />

      {label}

      {badge > 0 && (
        <span
          className={`
            admin-nav-count

            ${
              warning
                ? "warning"
                : ""
            }
          `}
        >
          {badge}
        </span>
      )}
    </button>
  );
}


/* =========================================================
   OVERVIEW
========================================================= */

function AdminOverview({
  pendingVerificationCount,
  openReportsCount,
  verificationRequests,
  marketplaceReports,
  onOpenVerification,
  onOpenMarketplace,
  onOpenCollections,
  onSelectVerification,
  onSelectReport,
}) {
  return (
    <>
      <section className="admin-welcome">

        <div>

          <div className="admin-eyebrow">

            <ShieldCheck
              size={16}
            />

            Platform administration

          </div>


          <h1>
            See the platform.
            <br />

            <span>
              Review what matters.
            </span>
          </h1>


          <p>
            Monitor platform activity,
            review recycler applications,
            respond to marketplace
            reports and maintain
            oversight of Climatica.
          </p>

        </div>


        <div className="admin-attention-card">

          <span>
            Needs attention
          </span>


          <button
            type="button"
            onClick={
              onOpenVerification
            }
          >

            <strong>
              {
                pendingVerificationCount
              }
            </strong>


            <div>

              <span>
                Verification
              </span>

              <p>
                Recycler applications
              </p>

            </div>


            <ChevronRight
              size={18}
            />

          </button>


          <button
            type="button"
            onClick={
              onOpenMarketplace
            }
          >

            <strong>
              {openReportsCount}
            </strong>


            <div>

              <span>
                Moderation
              </span>

              <p>
                Marketplace reports
              </p>

            </div>


            <ChevronRight
              size={18}
            />

          </button>

        </div>

      </section>


      <section className="admin-section">

        <div className="admin-section-heading">

          <div>

            <span>
              Platform snapshot
            </span>


            <h2>
              Climatica at
              a glance.
            </h2>

          </div>


          <p>
            Prototype platform-level
            metrics across users,
            marketplace activity,
            recycling and collections.
          </p>

        </div>


        <div className="admin-stat-grid">

          <AdminStat
            icon={Users}
            value="1,284"
            label="Registered accounts"
            note="Prototype total"
          />


          <AdminStat
            icon={Recycle}
            value="46"
            label="Recycler profiles"
            note="Demo partners"
          />


          <AdminStat
            icon={ShoppingBag}
            value="318"
            label="Marketplace listings"
            note="Prototype activity"
          />


          <AdminStat
            icon={Weight}
            value="8.4 t"
            label="Materials recovered"
            note="Demo total"
          />

        </div>

      </section>


      <section className="admin-two-column">

        <article className="admin-panel">

          <div className="admin-panel-heading">

            <div>

              <span>
                Verification
              </span>


              <h2>
                Applications
                needing review.
              </h2>

            </div>


            <ShieldCheck
              size={24}
            />

          </div>


          <div className="admin-overview-list">

            {verificationRequests
              .slice(0, 3)
              .map(
                (item) => (
                  <button
                    type="button"
                    className="admin-overview-row"
                    key={item.id}
                    onClick={() =>
                      onSelectVerification(
                        item
                      )
                    }
                  >

                    <div className="admin-overview-icon">

                      <Recycle
                        size={19}
                      />

                    </div>


                    <div>

                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        {item.location}
                      </span>

                    </div>


                    <span
                      className={`
                        admin-status-pill
                        ${item.status}
                      `}
                    >
                      {item.status}
                    </span>

                  </button>
                )
              )}

          </div>


          <button
            type="button"
            className="admin-panel-action"
            onClick={
              onOpenVerification
            }
          >
            Open Verification Queue

            <ArrowRight
              size={17}
            />
          </button>

        </article>


        <article className="admin-panel">

          <div className="admin-panel-heading">

            <div>

              <span>
                Moderation
              </span>


              <h2>
                Marketplace
                reports.
              </h2>

            </div>


            <AlertTriangle
              size={24}
            />

          </div>


          <div className="admin-overview-list">

            {marketplaceReports
              .slice(0, 3)
              .map(
                (report) => (
                  <button
                    type="button"
                    className="admin-overview-row"
                    key={
                      report.id
                    }
                    onClick={() =>
                      onSelectReport(
                        report
                      )
                    }
                  >

                    <div
                      className={`
                        admin-overview-icon
                        warning
                      `}
                    >

                      <AlertTriangle
                        size={19}
                      />

                    </div>


                    <div>

                      <strong>
                        {
                          report.title
                        }
                      </strong>

                      <span>
                        {
                          report.listing
                        }
                      </span>

                    </div>


                    <span
                      className={`
                        admin-report-severity
                        ${
                          report.severity
                        }
                      `}
                    >
                      {
                        report.severity
                      }
                    </span>

                  </button>
                )
              )}

          </div>


          <button
            type="button"
            className="admin-panel-action"
            onClick={
              onOpenMarketplace
            }
          >
            Open Moderation

            <ArrowRight
              size={17}
            />
          </button>

        </article>

      </section>


      <section className="admin-two-column">

        <article className="admin-panel">

          <div className="admin-panel-heading">

            <div>

              <span>
                Collection activity
              </span>


              <h2>
                Recent recovery.
              </h2>

            </div>


            <Truck size={24} />

          </div>


          <CollectionList
            items={
              collections.slice(
                0,
                3
              )
            }
          />


          <button
            type="button"
            className="admin-panel-action"
            onClick={
              onOpenCollections
            }
          >
            View Collections

            <ArrowRight
              size={17}
            />
          </button>

        </article>


        <article className="admin-panel">

          <div className="admin-panel-heading">

            <div>

              <span>
                Platform activity
              </span>


              <h2>
                Latest events.
              </h2>

            </div>


            <Clock3 size={24} />

          </div>


          <ActivityList />

        </article>

      </section>
    </>
  );
}


/* =========================================================
   USERS VIEW
========================================================= */

function UsersView({
  users,
  search,
  setSearch,
  onSelect,
}) {
  return (
    <section className="admin-workspace-view">

      <div className="admin-view-header">

        <div>

          <span className="admin-view-label">
            User accounts
          </span>


          <h1>
            Manage who uses
            Climatica.
          </h1>


          <p>
            Review prototype accounts
            across individuals,
            businesses, schools and
            recycler organisations.
          </p>

        </div>

      </div>


      <div className="admin-user-toolbar">

        <div className="admin-user-search">

          <Search size={18} />


          <input
            type="search"
            placeholder="Search name, email or account type..."
            value={search}
            onChange={(
              event
            ) =>
              setSearch(
                event.target.value
              )
            }
          />

        </div>


        <span>
          {users.length} results
        </span>

      </div>


      <div className="admin-table-wrap">

        <table className="admin-table">

          <thead>

            <tr>

              <th>
                Account
              </th>

              <th>
                Type
              </th>

              <th>
                Status
              </th>

              <th>
                Joined
              </th>

              <th />

            </tr>

          </thead>


          <tbody>

            {users.map(
              (account) => (
                <tr key={account.id}>

                  <td>

                    <div className="admin-user-cell">

                      <div className="admin-user-cell-avatar">

                        {getRoleIcon(
                          account.role
                        )}

                      </div>


                      <div>

                        <strong>
                          {account.name}
                        </strong>

                        <span>
                          {account.email}
                        </span>

                      </div>

                    </div>

                  </td>


                  <td>

                    <span className="admin-role-pill">
                      {formatRole(
                        account.role
                      )}
                    </span>

                  </td>


                  <td>

                    <span
                      className={`
                        admin-user-status
                        ${
                          account.status ===
                          "Suspended"
                            ? "suspended"
                            : account.status ===
                              "Pending Verification"
                              ? "pending"
                              : "active"
                        }
                      `}
                    >
                      {account.status}
                    </span>

                  </td>


                  <td>
                    {account.joined}
                  </td>


                  <td>

                    <button
                      type="button"
                      className="admin-table-action"
                      onClick={() =>
                        onSelect(
                          account
                        )
                      }
                    >
                      Review

                      <ChevronRight
                        size={16}
                      />
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </section>
  );
}


/* =========================================================
   VERIFICATION
========================================================= */

function VerificationView({
  requests,
  onSelect,
  onApprove,
  onReject,
}) {
  return (
    <section className="admin-workspace-view">

      <div className="admin-view-header">

        <div>

          <span className="admin-view-label">
            Recycler verification
          </span>


          <h1>
            Review before
            approving.
          </h1>


          <p>
            Verification means
            Climatica has reviewed
            submitted information.
            It does not guarantee or
            endorse every future
            transaction.
          </p>

        </div>

      </div>


      <div className="admin-verification-grid">

        {requests.map(
          (request) => (
            <article
              className="admin-verification-card"
              key={request.id}
            >

              <div className="admin-verification-card-top">

                <div className="admin-verification-card-icon">

                  <Recycle size={23} />

                </div>


                <span
                  className={`
                    admin-status-pill
                    ${request.status}
                  `}
                >
                  {request.status}
                </span>

              </div>


              <span className="admin-card-label">
                Recycler / PSP
              </span>


              <h3>
                {request.name}
              </h3>


              <p className="admin-verification-email">
                {request.email}
              </p>


              <div className="admin-verification-meta">

                <div>

                  <span>
                    Location
                  </span>

                  <strong>
                    {
                      request.location
                    }
                  </strong>

                </div>


                <div>

                  <span>
                    Documents
                  </span>

                  <strong>
                    {
                      request.documents
                    }
                  </strong>

                </div>

              </div>


              <div className="admin-verification-materials">

                <span>
                  Materials handled
                </span>

                <strong>
                  {request.materials}
                </strong>

              </div>


              <button
                type="button"
                className="admin-review-button"
                onClick={() =>
                  onSelect(
                    request
                  )
                }
              >
                Review Application

                <ArrowRight
                  size={17}
                />
              </button>


              {request.status ===
                "pending" && (
                <div className="admin-card-actions">

                  <button
                    type="button"
                    onClick={() =>
                      onReject(
                        request.id
                      )
                    }
                  >
                    <X size={16} />

                    Reject
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      onApprove(
                        request.id
                      )
                    }
                  >
                    <Check size={16} />

                    Approve
                  </button>

                </div>
              )}

            </article>
          )
        )}

      </div>

    </section>
  );
}


/* =========================================================
   MARKETPLACE MODERATION
========================================================= */

function MarketplaceModerationView({
  reports,
  onSelect,
}) {
  return (
    <section className="admin-workspace-view">

      <div className="admin-view-header">

        <div>

          <span className="admin-view-label">
            Marketplace moderation
          </span>


          <h1>
            Review reported
            content.
          </h1>


          <p>
            Reported listings are
            reviewed manually before
            dismissal or removal.
          </p>

        </div>

      </div>


      <div className="admin-report-grid">

        {reports.map(
          (report) => (
            <article
              className="admin-report-card"
              key={report.id}
            >

              <div className="admin-report-card-top">

                <div
                  className={`
                    admin-report-card-icon
                    ${report.severity}
                  `}
                >

                  <AlertTriangle
                    size={22}
                  />

                </div>


                <span
                  className={`
                    admin-report-state
                    ${report.status}
                  `}
                >
                  {report.status}
                </span>

              </div>


              <span className="admin-card-label">
                Marketplace report
              </span>


              <h3>
                {report.title}
              </h3>


              <p>
                {report.reason}
              </p>


              <div className="admin-report-information">

                <div>

                  <span>
                    Listing
                  </span>

                  <strong>
                    {report.listing}
                  </strong>

                </div>


                <div>

                  <span>
                    Seller
                  </span>

                  <strong>
                    {report.seller}
                  </strong>

                </div>


                <div>

                  <span>
                    Reported by
                  </span>

                  <strong>
                    {
                      report.reportedBy
                    }
                  </strong>

                </div>

              </div>


              <button
                type="button"
                className="admin-review-button"
                onClick={() =>
                  onSelect(
                    report
                  )
                }
              >
                Review Report

                <ArrowRight
                  size={17}
                />
              </button>

            </article>
          )
        )}

      </div>

    </section>
  );
}


/* =========================================================
   COLLECTIONS
========================================================= */

function AdminCollectionsView() {
  return (
    <section className="admin-workspace-view">

      <div className="admin-view-header">

        <div>

          <span className="admin-view-label">
            Collections
          </span>


          <h1>
            Platform recovery
            activity.
          </h1>


          <p>
            Review prototype
            collection activity
            connecting users,
            organisations and
            recyclers.
          </p>

        </div>

      </div>


      <div className="admin-stat-grid">

        <AdminStat
          icon={Truck}
          value="38"
          label="Collections"
          note="This month · demo"
        />


        <AdminStat
          icon={Weight}
          value="1.82 t"
          label="Collected"
          note="Prototype"
        />


        <AdminStat
          icon={CheckCircle2}
          value="31"
          label="Completed"
          note="Demo records"
        />


        <AdminStat
          icon={Recycle}
          value="12"
          label="Active recyclers"
          note="Prototype"
        />

      </div>


      <div className="admin-collection-page-list">

        {collections.map(
          (item) => (
            <article
              className="admin-collection-card"
              key={item.id}
            >

              <div className="admin-collection-card-icon">

                <Recycle size={22} />

              </div>


              <div className="admin-collection-card-main">

                <span>
                  {item.source}
                </span>


                <h3>
                  {item.material}
                </h3>


                <div>

                  <span>
                    <Weight size={14} />

                    {item.amount}
                  </span>


                  <span>
                    <Truck size={14} />

                    {item.recycler}
                  </span>


                  <span>
                    <Clock3 size={14} />

                    {item.date}
                  </span>

                </div>

              </div>


              <span
                className={`
                  admin-collection-status
                  ${
                    item.status
                      .toLowerCase()
                  }
                `}
              >
                {item.status}
              </span>

            </article>
          )
        )}

      </div>

    </section>
  );
}


/* =========================================================
   ANALYTICS
========================================================= */

function AnalyticsView() {
  return (
    <section className="admin-workspace-view">

      <div className="admin-view-header">

        <div>

          <span className="admin-view-label">
            Platform analytics
          </span>


          <h1>
            Understand how
            Climatica is used.
          </h1>


          <p>
            Prototype analytics for
            account activity,
            recovery and platform
            participation.
          </p>

        </div>

      </div>


      <div className="admin-stat-grid">

        <AdminStat
          icon={Users}
          value="+18%"
          label="User growth"
          note="Prototype trend"
        />


        <AdminStat
          icon={Recycle}
          value="72%"
          label="Recovery activity"
          note="Demo metric"
        />


        <AdminStat
          icon={ShoppingBag}
          value="318"
          label="Marketplace listings"
          note="Prototype"
        />


        <AdminStat
          icon={Truck}
          value="38"
          label="Collections"
          note="This month"
        />

      </div>


      <div className="admin-analytics-grid">

        <article className="admin-analytics-card">

          <div className="admin-panel-heading">

            <div>

              <span>
                Platform growth
              </span>


              <h2>
                Account activity.
              </h2>

            </div>


            <BarChart3 size={24} />

          </div>


          <div className="admin-chart">

            {analyticsMonths.map(
              (item) => (
                <AnalyticsBar
                  key={
                    item.month
                  }
                  month={
                    item.month
                  }
                  value={
                    item.users
                  }
                />
              )
            )}

          </div>

        </article>


        <article className="admin-analytics-card">

          <div className="admin-panel-heading">

            <div>

              <span>
                Recovery activity
              </span>


              <h2>
                Material recovery.
              </h2>

            </div>


            <Recycle size={24} />

          </div>


          <div className="admin-chart">

            {analyticsMonths.map(
              (item) => (
                <AnalyticsBar
                  key={
                    item.month
                  }
                  month={
                    item.month
                  }
                  value={
                    item.recovery
                  }
                />
              )
            )}

          </div>

        </article>

      </div>


      <section className="admin-two-column">

        <article className="admin-panel">

          <div className="admin-panel-heading">

            <div>

              <span>
                Account mix
              </span>


              <h2>
                Platform users.
              </h2>

            </div>


            <Users size={24} />

          </div>


          <AccountMix
            label="Individuals"
            value="920"
            width="72%"
            icon={UserRound}
          />


          <AccountMix
            label="Schools"
            value="188"
            width="38%"
            icon={GraduationCap}
          />


          <AccountMix
            label="Businesses"
            value="130"
            width="27%"
            icon={
              BriefcaseBusiness
            }
          />


          <AccountMix
            label="Recycler / PSP"
            value="46"
            width="14%"
            icon={Recycle}
          />

        </article>


        <article className="admin-principle-card">

          <div className="admin-principle-icon">

            <ShieldCheck
              size={30}
            />

          </div>


          <span>
            Administration
          </span>


          <h2>
            Data informs.
            People decide.
          </h2>


          <p>
            Analytics can help
            administrators understand
            platform activity, but
            moderation and verification
            remain manual decisions.
          </p>

        </article>

      </section>

    </section>
  );
}


/* =========================================================
   SMALL COMPONENTS
========================================================= */

function AdminStat({
  icon: Icon,
  value,
  label,
  note,
}) {
  return (
    <article className="admin-stat-card">

      <div className="admin-stat-icon">

        <Icon size={23} />

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


function CollectionList({
  items,
}) {
  return (
    <div className="admin-collection-list">

      {items.map(
        (item) => (
          <div
            className="admin-collection-row"
            key={item.id}
          >

            <div className="admin-collection-row-icon">

              <Recycle size={19} />

            </div>


            <div>

              <strong>
                {item.material}
              </strong>

              <span>
                {item.source}
              </span>

              <small>
                {item.recycler}
              </small>

            </div>


            <div className="admin-collection-row-end">

              <strong>
                {item.amount}
              </strong>

              <span>
                {item.status}
              </span>

            </div>

          </div>
        )
      )}

    </div>
  );
}


function ActivityList() {
  return (
    <div className="admin-activity-list">

      {activity.map(
        (item) => {
          const Icon =
            item.icon;


          return (
            <div
              className="admin-activity-item"
              key={item.id}
            >

              <div className="admin-activity-icon">

                <Icon size={19} />

              </div>


              <div>

                <strong>
                  {item.title}
                </strong>

                <p>
                  {item.detail}
                </p>

                <span>
                  {item.time}
                </span>

              </div>

            </div>
          );
        }
      )}

    </div>
  );
}


function AnalyticsBar({
  month,
  value,
}) {
  return (
    <div className="admin-chart-column">

      <div>

        <span
          style={{
            height: value,
          }}
        >
          <small>
            {value}
          </small>
        </span>

      </div>


      <strong>
        {month}
      </strong>

    </div>
  );
}


function AccountMix({
  icon: Icon,
  label,
  value,
  width,
}) {
  return (
    <div className="admin-account-mix">

      <div className="admin-account-mix-icon">

        <Icon size={19} />

      </div>


      <div className="admin-account-mix-main">

        <div>

          <strong>
            {label}
          </strong>

          <span>
            {value}
          </span>

        </div>


        <div className="admin-account-mix-bar">

          <span
            style={{
              width,
            }}
          />

        </div>

      </div>

    </div>
  );
}


function getRoleIcon(role) {
  if (role === "school") {
    return (
      <GraduationCap
        size={18}
      />
    );
  }


  if (role === "business") {
    return (
      <BriefcaseBusiness
        size={18}
      />
    );
  }


  if (role === "recycler") {
    return (
      <Recycle size={18} />
    );
  }


  return (
    <UserRound size={18} />
  );
}


function formatRole(role) {
  if (role === "recycler") {
    return "Recycler / PSP";
  }


  return (
    role.charAt(0).toUpperCase() +
    role.slice(1)
  );
}


/* =========================================================
   VERIFICATION MODAL
========================================================= */

function VerificationModal({
  request,
  onClose,
  onApprove,
  onReject,
}) {
  return (
    <div
      className="admin-modal-backdrop"
      onMouseDown={onClose}
    >

      <div
        className="admin-review-modal"
        onMouseDown={(
          event
        ) =>
          event.stopPropagation()
        }
      >

        <button
          type="button"
          className="admin-modal-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>


        <div className="admin-modal-icon">

          <ShieldCheck
            size={27}
          />

        </div>


        <span className="admin-modal-eyebrow">
          Verification review
        </span>


        <h2>
          {request.name}
        </h2>


        <p>
          Review the organisation's
          prototype application before
          recording an administrative
          decision.
        </p>


        <div className="admin-modal-grid">

          <div>

            <span>
              Email
            </span>

            <strong>
              {request.email}
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
              Documents
            </span>

            <strong>
              {request.documents}
            </strong>

          </div>


          <div>

            <span>
              Submitted
            </span>

            <strong>
              {request.submitted}
            </strong>

          </div>

        </div>


        <div className="admin-modal-information">

          <span>
            Materials handled
          </span>

          <strong>
            {request.materials}
          </strong>

        </div>


        <div className="admin-document-box">

          <FileText size={21} />


          <div>

            <strong>
              Verification documents
            </strong>

            <p>
              Prototype document
              review area.
            </p>

          </div>


          <button
            type="button"
          >
            Review
          </button>

        </div>


        {request.status ===
          "pending" ? (
          <div className="admin-modal-actions">

            <button
              type="button"
              onClick={
                onReject
              }
            >
              <XCircle
                size={17}
              />

              Reject
            </button>


            <button
              type="button"
              onClick={
                onApprove
              }
            >
              <CheckCircle2
                size={17}
              />

              Approve Recycler
            </button>

          </div>
        ) : (
          <div
            className={`
              admin-modal-result
              ${request.status}
            `}
          >
            {request.status ===
            "approved" ? (
              <CheckCircle2
                size={18}
              />
            ) : (
              <XCircle
                size={18}
              />
            )}

            Application{" "}
            {request.status}
          </div>
        )}


        <div className="admin-modal-note">

          <Leaf size={15} />

          Prototype verification only.
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   REPORT MODAL
========================================================= */

function ReportModal({
  report,
  onClose,
  onDismiss,
  onRemove,
}) {
  return (
    <div
      className="admin-modal-backdrop"
      onMouseDown={onClose}
    >

      <div
        className="admin-review-modal"
        onMouseDown={(
          event
        ) =>
          event.stopPropagation()
        }
      >

        <button
          type="button"
          className="admin-modal-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>


        <div className="admin-modal-icon warning">

          <AlertTriangle
            size={27}
          />

        </div>


        <span className="admin-modal-eyebrow">
          Marketplace report
        </span>


        <h2>
          {report.title}
        </h2>


        <p>
          Review the report before
          deciding whether the listing
          should remain or be removed.
        </p>


        <div className="admin-modal-information">

          <span>
            Report reason
          </span>

          <strong>
            {report.reason}
          </strong>

        </div>


        <div className="admin-modal-grid">

          <div>

            <span>
              Listing
            </span>

            <strong>
              {report.listing}
            </strong>

          </div>


          <div>

            <span>
              Seller
            </span>

            <strong>
              {report.seller}
            </strong>

          </div>


          <div>

            <span>
              Reported by
            </span>

            <strong>
              {report.reportedBy}
            </strong>

          </div>


          <div>

            <span>
              Severity
            </span>

            <strong>
              {report.severity}
            </strong>

          </div>

        </div>


        {report.status ===
          "open" ? (
          <div className="admin-modal-actions">

            <button
              type="button"
              onClick={
                onDismiss
              }
            >
              <Check size={17} />

              Dismiss Report
            </button>


            <button
              type="button"
              className="admin-danger-button"
              onClick={
                onRemove
              }
            >
              <Trash2 size={17} />

              Remove Listing
            </button>

          </div>
        ) : (
          <div className="admin-modal-result approved">

            <CheckCircle2
              size={18}
            />

            Report{" "}
            {report.status}
          </div>
        )}


        <div className="admin-modal-note">

          <Leaf size={15} />

          Prototype moderation only.
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   USER MODAL
========================================================= */

function UserModal({
  account,
  onClose,
  onToggle,
}) {
  return (
    <div
      className="admin-modal-backdrop"
      onMouseDown={onClose}
    >

      <div
        className="admin-review-modal"
        onMouseDown={(
          event
        ) =>
          event.stopPropagation()
        }
      >

        <button
          type="button"
          className="admin-modal-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>


        <div className="admin-modal-icon">

          <UserRound size={27} />

        </div>


        <span className="admin-modal-eyebrow">
          Account review
        </span>


        <h2>
          {account.name}
        </h2>


        <p>
          Review this prototype
          account and its current
          platform status.
        </p>


        <div className="admin-modal-grid">

          <div>

            <span>
              Email
            </span>

            <strong>
              {account.email}
            </strong>

          </div>


          <div>

            <span>
              Account type
            </span>

            <strong>
              {formatRole(
                account.role
              )}
            </strong>

          </div>


          <div>

            <span>
              Status
            </span>

            <strong>
              {account.status}
            </strong>

          </div>


          <div>

            <span>
              Joined
            </span>

            <strong>
              {account.joined}
            </strong>

          </div>

        </div>


        <button
          type="button"
          className={
            account.status ===
            "Suspended"
              ? "admin-user-reactivate"
              : "admin-user-suspend"
          }
          onClick={onToggle}
        >
          {account.status ===
          "Suspended" ? (
            <>
              <CheckCircle2
                size={17}
              />

              Reactivate Account
            </>
          ) : (
            <>
              <XCircle
                size={17}
              />

              Suspend Account
            </>
          )}
        </button>


        <div className="admin-modal-note">

          <Leaf size={15} />

          Prototype account action only.
        </div>

      </div>

    </div>
  );
}


export default AdminDashboard;