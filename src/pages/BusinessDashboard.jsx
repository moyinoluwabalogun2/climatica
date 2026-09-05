import {
  ArrowRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Home,
  Leaf,
  LogOut,
  MapPin,
  Menu,
  Package,
  Plus,
  Recycle,
  Search,
  TrendingUp,
  Truck,
  UserRound,
  Weight,
  X,
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

const initialWasteStreams = [
  {
    id: 1,
    category: "Paper",
    name: "Cardboard & Paper",
    amount: 174,
    unit: "kg",
    recoveryRate: 81,
    recovered: 141,
    status: "Ready",
    icon: Package,
  },

  {
    id: 2,
    category: "Plastic",
    name: "PET & Mixed Plastics",
    amount: 146,
    unit: "kg",
    recoveryRate: 66,
    recovered: 96,
    status: "Ready",
    icon: Recycle,
  },

  {
    id: 3,
    category: "Metal",
    name: "Aluminium & Metal Cans",
    amount: 96,
    unit: "kg",
    recoveryRate: 76,
    recovered: 73,
    status: "Collected",
    icon: Recycle,
  },

  {
    id: 4,
    category: "Organic",
    name: "Food & Organic Waste",
    amount: 228,
    unit: "kg",
    recoveryRate: 48,
    recovered: 109,
    status: "Needs action",
    icon: Leaf,
  },

  {
    id: 5,
    category: "E-Waste",
    name: "Small Electronics",
    amount: 42,
    unit: "kg",
    recoveryRate: 57,
    recovered: 24,
    status: "Ready",
    icon: Package,
  },

  {
    id: 6,
    category: "Plastic",
    name: "Plastic Packaging",
    amount: 118,
    unit: "kg",
    recoveryRate: 63,
    recovered: 74,
    status: "Needs action",
    icon: Recycle,
  },
];


const initialCollections = [
  {
    id: 1,
    material: "Cardboard & Paper",
    recycler: "GreenCycle Collection Centre",
    quantity: "120 kg",
    date: "12 Sep",
    time: "10:00 AM",
    site: "Main Office",
    status: "Scheduled",
  },

  {
    id: 2,
    material: "PET Plastic",
    recycler: "EcoPoint Recycling Hub",
    quantity: "75 kg",
    date: "15 Sep",
    time: "1:30 PM",
    site: "Warehouse A",
    status: "Scheduled",
  },

  {
    id: 3,
    material: "Metal Cans",
    recycler: "Recycler to be assigned",
    quantity: "42 kg",
    date: "18 Sep",
    time: "9:00 AM",
    site: "Operations Site",
    status: "Pending",
  },

  {
    id: 4,
    material: "E-Waste",
    recycler: "CleanEarth Recovery Point",
    quantity: "18 kg",
    date: "22 Sep",
    time: "11:30 AM",
    site: "Main Office",
    status: "Scheduled",
  },
];


const locations = [
  {
    id: 1,
    name: "Main Office",
    waste: "420 kg",
    recovery: 74,
  },

  {
    id: 2,
    name: "Warehouse A",
    waste: "510 kg",
    recovery: 66,
  },

  {
    id: 3,
    name: "Operations Site",
    waste: "310 kg",
    recovery: 63,
  },
];


const reports = [
  {
    id: 1,
    title: "August Waste Summary",
    type: "Monthly report",
    date: "31 Aug 2026",
    status: "Ready",
  },

  {
    id: 2,
    title: "Recovery Performance",
    type: "Operational report",
    date: "25 Aug 2026",
    status: "Ready",
  },

  {
    id: 3,
    title: "Collection Activity",
    type: "Recovery record",
    date: "18 Aug 2026",
    status: "Ready",
  },

  {
    id: 4,
    title: "Site Waste Comparison",
    type: "Location report",
    date: "12 Aug 2026",
    status: "Ready",
  },
];


const recentActivity = [
  {
    id: 1,
    title: "Cardboard collection completed",
    description:
      "86 kg was recorded as recovered from Main Office.",
    time: "Today · 9:30 AM",
    icon: CheckCircle2,
  },

  {
    id: 2,
    title: "New collection scheduled",
    description:
      "A PET plastic collection was scheduled for Warehouse A.",
    time: "Yesterday",
    icon: CalendarDays,
  },

  {
    id: 3,
    title: "Recovery performance updated",
    description:
      "The prototype business recovery rate is now 69%.",
    time: "2 days ago",
    icon: TrendingUp,
  },
];


const filterOptions = [
  "All",
  "Paper",
  "Plastic",
  "Metal",
  "Organic",
  "E-Waste",
];


function BusinessDashboard() {
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
    wasteStreams,
    setWasteStreams,
  ] = useState(
    initialWasteStreams
  );


  const [
    collections,
    setCollections,
  ] = useState(
    initialCollections
  );


  const [
    selectedFilter,
    setSelectedFilter,
  ] = useState("All");


  const [
    showWasteModal,
    setShowWasteModal,
  ] = useState(false);


  const [
    showCollectionModal,
    setShowCollectionModal,
  ] = useState(false);


  const [
    selectedCollection,
    setSelectedCollection,
  ] = useState(null);


  const [
    selectedWaste,
    setSelectedWaste,
  ] = useState(null);


  const filteredWaste =
    useMemo(
      () => {
        if (
          selectedFilter ===
          "All"
        ) {
          return wasteStreams;
        }


        return wasteStreams.filter(
          (item) =>
            item.category ===
            selectedFilter
        );
      },

      [
        selectedFilter,
        wasteStreams,
      ]
    );


  const handleSignOut = () => {
    signOut();

    navigate("/");
  };


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


  const addWasteRecord = (
    record
  ) => {
    const numericAmount =
      Number(record.amount) ||
      0;


    const recovered =
      Math.round(
        numericAmount *
        0.6
      );


    setWasteStreams(
      (current) => [
        {
          id:
            Date.now(),

          category:
            record.category,

          name:
            record.name,

          amount:
            numericAmount,

          unit:
            "kg",

          recoveryRate:
            60,

          recovered,

          status:
            "Ready",

          icon:
            record.category ===
            "Organic"
              ? Leaf
              : record.category ===
                "Paper"
                ? Package
                : Recycle,
        },

        ...current,
      ]
    );


    setSelectedFilter(
      "All"
    );

    setShowWasteModal(
      false
    );
  };


  const addCollection = (
    collection
  ) => {
    setCollections(
      (current) => [
        {
          id:
            Date.now(),

          ...collection,

          status:
            "Pending",
        },

        ...current,
      ]
    );


    setShowCollectionModal(
      false
    );
  };


  const topbarTitle = {
    overview:
      "Waste & recovery management",

    waste:
      "Waste streams",

    collections:
      "Collection management",

    performance:
      "Recovery performance",

    reports:
      "Reporting",
  }[activeView];


  return (
    <main className="business-dashboard">

      {/* ===================================================
          SIDEBAR
      ==================================================== */}

      <aside
        className={`
          business-sidebar

          ${
            mobileMenuOpen
              ? "mobile-open"
              : ""
          }
        `}
      >

        <div className="business-sidebar-top">

          <Link
            to="/"
            className="business-dashboard-logo"
          >
            <img
              src={climaticaLogo}
              alt="Climatica"
            />
          </Link>


          <button
            type="button"
            className="business-mobile-close"
            onClick={() =>
              setMobileMenuOpen(
                false
              )
            }
            aria-label="Close menu"
          >
            <X size={21} />
          </button>

        </div>


        <div className="business-profile-card">

          <div className="business-profile-icon">

            <BriefcaseBusiness
              size={23}
            />

          </div>


          <div>

            <span>
              Business account
            </span>


            <strong>
              {user?.name ||
                "Demo Business"}
            </strong>

          </div>

        </div>


        <nav className="business-nav">

          <button
            type="button"
            className={
              activeView ===
              "overview"
                ? "active"
                : ""
            }
            onClick={() =>
              selectView(
                "overview"
              )
            }
          >
            <Home size={19} />

            Overview
          </button>


          <button
            type="button"
            className={
              activeView ===
              "waste"
                ? "active"
                : ""
            }
            onClick={() =>
              selectView(
                "waste"
              )
            }
          >
            <Weight size={19} />

            Waste Streams
          </button>


          <button
            type="button"
            className={
              activeView ===
              "collections"
                ? "active"
                : ""
            }
            onClick={() =>
              selectView(
                "collections"
              )
            }
          >
            <Truck size={19} />

            Collections
          </button>


          <button
            type="button"
            className={
              activeView ===
              "performance"
                ? "active"
                : ""
            }
            onClick={() =>
              selectView(
                "performance"
              )
            }
          >
            <BarChart3
              size={19}
            />

            Recovery Performance
          </button>


          <button
            type="button"
            className={
              activeView ===
              "reports"
                ? "active"
                : ""
            }
            onClick={() =>
              selectView(
                "reports"
              )
            }
          >
            <FileText size={19} />

            Reports
          </button>

        </nav>


        <div className="business-sidebar-divider" />


        <nav className="business-secondary-nav">

          <Link to="/recycling">

            <MapPin size={19} />

            Find Recycler
          </Link>


          <Link to="/learn">

            <Leaf size={19} />

            Education Hub
          </Link>


          <button type="button">

            <UserRound
              size={19}
            />

            Organisation Profile
          </button>

        </nav>


        <div className="business-sidebar-bottom">

          <div className="business-impact-mini">

            <TrendingUp
              size={20}
            />


            <div>

              <strong>
                75% recovery target
              </strong>


              <p>
                Your prototype recovery
                rate is currently 69%.
              </p>

            </div>

          </div>


          <button
            type="button"
            className="business-signout"
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
          className="business-mobile-overlay"
          onClick={() =>
            setMobileMenuOpen(
              false
            )
          }
          aria-label="Close navigation"
        />
      )}


      {/* ===================================================
          MAIN
      ==================================================== */}

      <section className="business-main">

        {/* TOP BAR */}

        <header className="business-topbar">

          <div className="business-mobile-brand">

            <button
              type="button"
              className="business-menu-button"
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


          <div className="business-topbar-copy">

            <span>
              Business workspace
            </span>


            <strong>
              {topbarTitle}
            </strong>

          </div>


          <div className="business-topbar-actions">

            <button
              type="button"
              className="business-topbar-icon"
              aria-label="Search"
            >
              <Search size={19} />
            </button>


            <button
              type="button"
              className="business-topbar-icon business-notification"
              aria-label="Notifications"
            >
              <Bell size={19} />

              <span />
            </button>


            <div className="business-topbar-user">

              <div>

                <span>
                  Organisation
                </span>


                <strong>
                  {user?.name}
                </strong>

              </div>


              <div className="business-small-avatar">

                <BriefcaseBusiness
                  size={19}
                />

              </div>

            </div>

          </div>

        </header>


        <div className="business-content">

          {activeView ===
            "overview" && (
            <OverviewView
              wasteStreams={
                wasteStreams
              }
              collections={
                collections
              }
              onRecordWaste={() =>
                setShowWasteModal(
                  true
                )
              }
              onRequestCollection={() =>
                setShowCollectionModal(
                  true
                )
              }
              onOpenWaste={() =>
                selectView(
                  "waste"
                )
              }
              onOpenCollections={() =>
                selectView(
                  "collections"
                )
              }
              onOpenPerformance={() =>
                selectView(
                  "performance"
                )
              }
              onOpenReports={() =>
                selectView(
                  "reports"
                )
              }
              onSelectCollection={
                setSelectedCollection
              }
            />
          )}


          {activeView ===
            "waste" && (
            <WasteStreamsView
              selectedFilter={
                selectedFilter
              }
              setSelectedFilter={
                setSelectedFilter
              }
              wasteStreams={
                filteredWaste
              }
              onRecordWaste={() =>
                setShowWasteModal(
                  true
                )
              }
              onManage={
                setSelectedWaste
              }
            />
          )}


          {activeView ===
            "collections" && (
            <CollectionsView
              collections={
                collections
              }
              onNew={() =>
                setShowCollectionModal(
                  true
                )
              }
              onSelect={
                setSelectedCollection
              }
            />
          )}


          {activeView ===
            "performance" && (
            <PerformanceView />
          )}


          {activeView ===
            "reports" && (
            <ReportsView />
          )}


          <div className="business-prototype-note">

            <Leaf size={17} />


            <p>
              Waste quantities,
              recovery performance,
              collection records and
              reports shown in this
              workspace are prototype
              data. Production values
              will come from actual
              organisation activity and
              verified recovery records.
            </p>

          </div>

        </div>

      </section>


      {/* ===================================================
          MODALS
      ==================================================== */}

      {showWasteModal && (
        <RecordWasteModal
          onClose={() =>
            setShowWasteModal(
              false
            )
          }
          onSubmit={
            addWasteRecord
          }
        />
      )}


      {showCollectionModal && (
        <RequestCollectionModal
          onClose={() =>
            setShowCollectionModal(
              false
            )
          }
          onSubmit={
            addCollection
          }
        />
      )}


      {selectedCollection && (
        <CollectionDetailsModal
          collection={
            selectedCollection
          }
          onClose={() =>
            setSelectedCollection(
              null
            )
          }
        />
      )}


      {selectedWaste && (
        <WasteDetailsModal
          item={
            selectedWaste
          }
          onClose={() =>
            setSelectedWaste(
              null
            )
          }
        />
      )}

    </main>
  );
}


/* =========================================================
   OVERVIEW
========================================================= */

function OverviewView({
  wasteStreams,
  collections,
  onRecordWaste,
  onRequestCollection,
  onOpenWaste,
  onOpenCollections,
  onOpenPerformance,
  onOpenReports,
  onSelectCollection,
}) {
  return (
    <>
      <section className="business-welcome">

        <div>

          <div className="business-eyebrow">

            <BriefcaseBusiness
              size={16}
            />

            Business waste management

          </div>


          <h1>
            Understand waste.
            <br />

            <span>
              Improve recovery.
            </span>
          </h1>


          <p>
            Record your organisation's
            waste, coordinate material
            collections and understand
            where your business can
            improve recovery.
          </p>


          <div className="business-welcome-actions">

            <button
              type="button"
              onClick={
                onRecordWaste
              }
            >
              <Plus size={18} />

              Record Waste
            </button>


            <button
              type="button"
              className="business-welcome-secondary"
              onClick={
                onRequestCollection
              }
            >
              <Truck size={18} />

              Request Collection
            </button>

          </div>

        </div>


        <div className="business-target-card">

          <div className="business-target-top">

            <div>

              <span>
                Recovery rate
              </span>


              <strong>
                69%
              </strong>

            </div>


            <TrendingUp
              size={28}
            />

          </div>


          <p>
            Current prototype performance
            against a 75% recovery target.
          </p>


          <div className="business-target-bar">

            <span />

          </div>


          <div className="business-target-footer">

            <span>
              Current 69%
            </span>

            <strong>
              Goal 75%
            </strong>

          </div>

        </div>

      </section>


      <section className="business-section">

        <div className="business-section-heading">

          <div>

            <span>
              Business snapshot
            </span>


            <h2>
              Waste performance
              at a glance.
            </h2>

          </div>


          <p>
            A simple summary of the
            organisation's prototype
            waste and recovery activity.
          </p>

        </div>


        <div className="business-stat-grid">

          <BusinessStat
            icon={Weight}
            value="1.24 t"
            label="Waste recorded"
            note="This month · demo"
          />


          <BusinessStat
            icon={Recycle}
            value="860 kg"
            label="Materials recovered"
            note="Prototype total"
          />


          <BusinessStat
            icon={TrendingUp}
            value="69%"
            label="Recovery rate"
            note="Goal: 75%"
          />


          <BusinessStat
            icon={Truck}
            value="14"
            label="Collections"
            note="This month · demo"
          />

        </div>

      </section>


      <section className="business-section">

        <div className="business-section-heading business-heading-action">

          <div>

            <span>
              Waste streams
            </span>


            <h2>
              What the business
              is generating.
            </h2>

          </div>


          <button
            type="button"
            className="business-outline-button"
            onClick={
              onOpenWaste
            }
          >
            View Waste Streams

            <ArrowRight
              size={17}
            />
          </button>

        </div>


        <div className="business-overview-waste-grid">

          {wasteStreams
            .slice(0, 4)
            .map(
              (item) => (
                <OverviewWasteCard
                  key={
                    item.id
                  }
                  item={
                    item
                  }
                />
              )
            )}

        </div>

      </section>


      <section className="business-two-column">

        <article className="business-panel">

          <div className="business-panel-heading">

            <div>

              <span>
                Collection schedule
              </span>


              <h2>
                Upcoming
                collections.
              </h2>

            </div>


            <button
              type="button"
              onClick={
                onRequestCollection
              }
            >
              <Plus size={18} />
            </button>

          </div>


          <div className="business-collection-list">

            {collections
              .slice(0, 3)
              .map(
                (collection) => (
                  <CollectionRow
                    key={
                      collection.id
                    }
                    collection={
                      collection
                    }
                    onClick={() =>
                      onSelectCollection(
                        collection
                      )
                    }
                  />
                )
              )}

          </div>


          <button
            type="button"
            className="business-panel-action"
            onClick={
              onOpenCollections
            }
          >
            Manage Collections

            <ArrowRight
              size={17}
            />
          </button>

        </article>


        <article className="business-panel">

          <div className="business-panel-heading">

            <div>

              <span>
                Sites & locations
              </span>


              <h2>
                Recovery
                by site.
              </h2>

            </div>


            <MapPin size={24} />

          </div>


          <div className="business-location-list">

            {locations.map(
              (location) => (
                <LocationRow
                  key={
                    location.id
                  }
                  location={
                    location
                  }
                />
              )
            )}

          </div>

        </article>

      </section>


      <section className="business-two-column">

        <article className="business-panel">

          <div className="business-panel-heading">

            <div>

              <span>
                Performance
              </span>


              <h2>
                Recovery trend.
              </h2>

            </div>


            <BarChart3
              size={24}
            />

          </div>


          <MiniPerformance />


          <button
            type="button"
            className="business-panel-action"
            onClick={
              onOpenPerformance
            }
          >
            Open Performance

            <ArrowRight
              size={17}
            />
          </button>

        </article>


        <article className="business-panel">

          <div className="business-panel-heading">

            <div>

              <span>
                Reporting
              </span>


              <h2>
                Latest reports.
              </h2>

            </div>


            <FileText
              size={24}
            />

          </div>


          <div className="business-report-list">

            {reports
              .slice(0, 3)
              .map(
                (report) => (
                  <ReportRow
                    key={
                      report.id
                    }
                    report={
                      report
                    }
                  />
                )
              )}

          </div>


          <button
            type="button"
            className="business-panel-action"
            onClick={
              onOpenReports
            }
          >
            Open Reports

            <ArrowRight
              size={17}
            />
          </button>

        </article>

      </section>
    </>
  );
}


/* =========================================================
   WASTE STREAMS VIEW
========================================================= */

function WasteStreamsView({
  selectedFilter,
  setSelectedFilter,
  wasteStreams,
  onRecordWaste,
  onManage,
}) {
  return (
    <section className="business-workspace-view">

      <div className="business-view-header">

        <div>

          <span className="business-view-label">
            Waste streams
          </span>


          <h1>
            What your business
            is generating.
          </h1>


          <p>
            Record material streams,
            understand recovery rates
            and identify areas that
            need attention.
          </p>

        </div>


        <button
          type="button"
          className="business-primary-button"
          onClick={
            onRecordWaste
          }
        >
          <Plus size={18} />

          Record Waste
        </button>

      </div>


      <div className="business-filter-tabs">

        {filterOptions.map(
          (filter) => (
            <button
              type="button"
              key={
                filter
              }
              className={
                selectedFilter ===
                filter
                  ? "active"
                  : ""
              }
              onClick={() =>
                setSelectedFilter(
                  filter
                )
              }
            >
              {filter}
            </button>
          )
        )}

      </div>


      {wasteStreams.length >
        0 ? (
        <div className="business-waste-grid">

          {wasteStreams.map(
            (item) => (
              <WasteStreamCard
                key={
                  item.id
                }
                item={
                  item
                }
                onManage={() =>
                  onManage(
                    item
                  )
                }
              />
            )
          )}

        </div>
      ) : (
        <div className="business-empty-state">

          <Weight size={35} />


          <h3>
            No waste streams
            found.
          </h3>


          <p>
            There are no recorded
            streams in this category
            yet.
          </p>

        </div>
      )}

    </section>
  );
}


/* =========================================================
   COLLECTIONS VIEW
========================================================= */

function CollectionsView({
  collections,
  onNew,
  onSelect,
}) {
  return (
    <section className="business-workspace-view">

      <div className="business-view-header">

        <div>

          <span className="business-view-label">
            Collections
          </span>


          <h1>
            Coordinate material
            recovery.
          </h1>


          <p>
            Review upcoming collections,
            collection partners, sites
            and requested quantities.
          </p>

        </div>


        <button
          type="button"
          className="business-primary-button"
          onClick={onNew}
        >
          <Plus size={18} />

          Request Collection
        </button>

      </div>


      <div className="business-stat-grid business-collection-stats">

        <BusinessStat
          icon={Truck}
          value="4"
          label="Upcoming"
          note="Prototype schedule"
        />


        <BusinessStat
          icon={CheckCircle2}
          value="14"
          label="Completed"
          note="This month · demo"
        />


        <BusinessStat
          icon={Weight}
          value="318 kg"
          label="Scheduled weight"
          note="Prototype total"
        />


        <BusinessStat
          icon={Recycle}
          value="3"
          label="Recovery partners"
          note="Demo partners"
        />

      </div>


      <div className="business-collection-page-list">

        {collections.map(
          (collection) => (
            <article
              className="business-collection-card"
              key={
                collection.id
              }
            >

              <div className="business-collection-card-date">

                <CalendarDays
                  size={22}
                />

              </div>


              <div className="business-collection-card-main">

                <div className="business-collection-card-heading">

                  <div>

                    <span>
                      {
                        collection.site
                      }
                    </span>


                    <h3>
                      {
                        collection.material
                      }
                    </h3>

                  </div>


                  <span
                    className={`
                      business-collection-status
                      ${
                        collection.status
                          .toLowerCase()
                      }
                    `}
                  >
                    {
                      collection.status
                    }
                  </span>

                </div>


                <div className="business-collection-card-meta">

                  <span>
                    <Weight size={15} />

                    {
                      collection.quantity
                    }
                  </span>


                  <span>
                    <CalendarDays
                      size={15}
                    />

                    {
                      collection.date
                    }
                  </span>


                  <span>
                    <Clock3 size={15} />

                    {
                      collection.time
                    }
                  </span>


                  <span>
                    <Recycle size={15} />

                    {
                      collection.recycler
                    }
                  </span>

                </div>

              </div>


              <button
                type="button"
                className="business-collection-view"
                onClick={() =>
                  onSelect(
                    collection
                  )
                }
              >
                View

                <ChevronRight
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
   PERFORMANCE VIEW
========================================================= */

function PerformanceView() {
  return (
    <section className="business-workspace-view">

      <div className="business-view-header">

        <div>

          <span className="business-view-label">
            Recovery performance
          </span>


          <h1>
            See where recovery
            is improving.
          </h1>


          <p>
            Compare material recovery
            and site performance against
            the organisation's prototype
            goals.
          </p>

        </div>

      </div>


      <div className="business-stat-grid">

        <BusinessStat
          icon={TrendingUp}
          value="69%"
          label="Recovery rate"
          note="+8% demo change"
        />


        <BusinessStat
          icon={Recycle}
          value="860 kg"
          label="Recovered"
          note="This month"
        />


        <BusinessStat
          icon={Weight}
          value="380 kg"
          label="Not recovered"
          note="Prototype"
        />


        <BusinessStat
          icon={Truck}
          value="14"
          label="Collections"
          note="Completed"
        />

      </div>


      <div className="business-performance-grid">

        <article className="business-performance-card">

          <div className="business-panel-heading">

            <div>

              <span>
                Six-month trend
              </span>


              <h2>
                Recovery rate.
              </h2>

            </div>


            <BarChart3
              size={24}
            />

          </div>


          <div className="business-chart-summary">

            <div>

              <strong>
                69%
              </strong>

              <span>
                Current recovery
                rate
              </span>

            </div>


            <div>

              <TrendingUp
                size={16}
              />

              +8% improvement

            </div>

          </div>


          <div className="business-recovery-chart">

            <ChartBar
              month="APR"
              value="52%"
              height="48%"
            />

            <ChartBar
              month="MAY"
              value="57%"
              height="56%"
            />

            <ChartBar
              month="JUN"
              value="61%"
              height="65%"
            />

            <ChartBar
              month="JUL"
              value="65%"
              height="73%"
            />

            <ChartBar
              month="AUG"
              value="67%"
              height="81%"
            />

            <ChartBar
              month="SEP"
              value="69%"
              height="88%"
            />

          </div>

        </article>


        <article className="business-performance-card business-target-panel">

          <div className="business-panel-heading">

            <div>

              <span>
                Business goal
              </span>


              <h2>
                Reach 75%.
              </h2>

            </div>


            <TrendingUp
              size={24}
            />

          </div>


          <div className="business-goal-circle">

            <div>

              <strong>
                92%
              </strong>

              <span>
                of target
              </span>

            </div>

          </div>


          <div className="business-goal-details">

            <div>
              <span>
                Current
              </span>

              <strong>
                69%
              </strong>
            </div>


            <div>
              <span>
                Target
              </span>

              <strong>
                75%
              </strong>
            </div>


            <div>
              <span>
                Gap
              </span>

              <strong>
                6%
              </strong>
            </div>

          </div>

        </article>

      </div>


      <div className="business-two-column">

        <article className="business-panel">

          <div className="business-panel-heading">

            <div>

              <span>
                Site performance
              </span>


              <h2>
                Recovery
                by location.
              </h2>

            </div>


            <MapPin size={24} />

          </div>


          <div className="business-site-performance-list">

            {locations.map(
              (location) => (
                <div
                  className="business-site-performance"
                  key={
                    location.id
                  }
                >

                  <div>

                    <strong>
                      {
                        location.name
                      }
                    </strong>

                    <span>
                      {
                        location.waste
                      } waste recorded
                    </span>

                  </div>


                  <div className="business-site-progress">

                    <div>
                      <span
                        style={{
                          width:
                            `${location.recovery}%`,
                        }}
                      />
                    </div>

                    <strong>
                      {
                        location.recovery
                      }%
                    </strong>

                  </div>

                </div>
              )
            )}

          </div>

        </article>


        <article className="business-panel">

          <div className="business-panel-heading">

            <div>

              <span>
                Recent activity
              </span>


              <h2>
                Recovery updates.
              </h2>

            </div>


            <Clock3 size={24} />

          </div>


          <div className="business-activity-list">

            {recentActivity.map(
              (item) => {
                const Icon =
                  item.icon;


                return (
                  <div
                    className="business-activity-item"
                    key={
                      item.id
                    }
                  >

                    <div className="business-activity-icon">

                      <Icon
                        size={19}
                      />

                    </div>


                    <div>

                      <strong>
                        {item.title}
                      </strong>


                      <p>
                        {
                          item.description
                        }
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

        </article>

      </div>

    </section>
  );
}


/* =========================================================
   REPORTS VIEW
========================================================= */

function ReportsView() {
  return (
    <section className="business-workspace-view">

      <div className="business-view-header">

        <div>

          <span className="business-view-label">
            Reports
          </span>


          <h1>
            Turn activity
            into records.
          </h1>


          <p>
            Review prototype waste,
            recovery and collection
            summaries for your
            organisation.
          </p>

        </div>


        <button
          type="button"
          className="business-primary-button"
        >
          <Plus size={18} />

          Generate Report
        </button>

      </div>


      <div className="business-report-grid">

        {reports.map(
          (report) => (
            <article
              className="business-report-card"
              key={
                report.id
              }
            >

              <div className="business-report-card-icon">

                <FileText
                  size={24}
                />

              </div>


              <span className="business-report-type">
                {report.type}
              </span>


              <h3>
                {report.title}
              </h3>


              <p>
                Prototype report showing
                how business waste and
                recovery information can
                be summarised.
              </p>


              <div className="business-report-card-footer">

                <span>
                  {report.date}
                </span>


                <button
                  type="button"
                >
                  View Report

                  <ArrowRight
                    size={16}
                  />
                </button>

              </div>

            </article>
          )
        )}

      </div>

    </section>
  );
}


/* =========================================================
   SMALL COMPONENTS
========================================================= */

function BusinessStat({
  icon: Icon,
  value,
  label,
  note,
}) {
  return (
    <article className="business-stat-card">

      <div className="business-stat-icon">

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


function OverviewWasteCard({
  item,
}) {
  const Icon =
    item.icon;


  return (
    <article className="business-overview-waste-card">

      <div className="business-overview-waste-top">

        <div>

          <Icon size={21} />

        </div>


        <span>
          {item.category}
        </span>

      </div>


      <h3>
        {item.name}
      </h3>


      <strong>
        {item.amount}
        {item.unit}
      </strong>


      <div className="business-overview-progress-copy">

        <span>
          Recovery
        </span>

        <strong>
          {
            item.recoveryRate
          }%
        </strong>

      </div>


      <div className="business-overview-progress">

        <span
          style={{
            width:
              `${item.recoveryRate}%`,
          }}
        />

      </div>

    </article>
  );
}


function WasteStreamCard({
  item,
  onManage,
}) {
  const Icon =
    item.icon;


  const statusClass =
    item.status ===
    "Needs action"
      ? "warning"
      : "";


  return (
    <article className="business-waste-card">

      <div className="business-waste-card-top">

        <div className="business-waste-icon">

          <Icon size={23} />

        </div>


        <span
          className={`
            business-waste-status
            ${statusClass}
          `}
        >
          {item.status}
        </span>

      </div>


      <span className="business-waste-category">
        {item.category}
      </span>


      <h3>
        {item.name}
      </h3>


      <strong className="business-waste-amount">
        {item.amount}
        {item.unit}
      </strong>


      <div className="business-waste-progress-copy">

        <span>
          Recovered
        </span>


        <strong>
          {
            item.recoveryRate
          }%
        </strong>

      </div>


      <div className="business-waste-progress">

        <span
          style={{
            width:
              `${item.recoveryRate}%`,
          }}
        />

      </div>


      <p className="business-waste-recovered">

        {item.recovered} kg
        recovered

      </p>


      <div className="business-waste-footer">

        <span>

          <Recycle size={16} />

          Recovery stream

        </span>


        <button
          type="button"
          className="business-manage-button"
          onClick={
            onManage
          }
        >
          Manage

          <ChevronRight
            size={16}
          />
        </button>

      </div>

    </article>
  );
}


function CollectionRow({
  collection,
  onClick,
}) {
  const [
    day,
    month,
  ] =
    collection.date.split(" ");


  return (
    <button
      type="button"
      className="business-collection-item"
      onClick={onClick}
    >

      <div className="business-collection-date">

        <strong>
          {day}
        </strong>

        <span>
          {month}
        </span>

      </div>


      <div className="business-collection-copy">

        <strong>
          {
            collection.material
          }
        </strong>


        <span>
          {
            collection.recycler
          }
        </span>


        <div>

          <small>
            <Clock3 size={13} />

            {collection.time}
          </small>


          <small>
            <MapPin size={13} />

            {collection.site}
          </small>

        </div>

      </div>


      <div className="business-collection-end">

        <span
          className={`
            business-collection-status
            ${
              collection.status
                .toLowerCase()
            }
          `}
        >
          {collection.status}
        </span>


        <ChevronRight
          size={18}
        />

      </div>

    </button>
  );
}


function LocationRow({
  location,
}) {
  return (
    <div className="business-location-item">

      <div className="business-location-icon">

        <MapPin size={20} />

      </div>


      <div className="business-location-copy">

        <strong>
          {location.name}
        </strong>

        <span>
          {location.waste}
          {" "}recorded
        </span>

      </div>


      <div className="business-location-rate">

        <strong>
          {
            location.recovery
          }%
        </strong>

        <span>
          recovery
        </span>

      </div>

    </div>
  );
}


function ReportRow({
  report,
}) {
  return (
    <div className="business-report-item">

      <div className="business-report-icon">

        <FileText
          size={20}
        />

      </div>


      <div>

        <strong>
          {report.title}
        </strong>

        <span>
          {report.type}
        </span>

        <small>
          {report.date}
        </small>

      </div>


      <button
        type="button"
      >
        <ChevronRight
          size={19}
        />
      </button>

    </div>
  );
}


function MiniPerformance() {
  return (
    <div className="business-mini-performance">

      <div className="business-mini-performance-top">

        <div>

          <strong>
            69%
          </strong>

          <span>
            Current recovery
          </span>

        </div>


        <div>

          <TrendingUp
            size={16}
          />

          +8%
        </div>

      </div>


      <div className="business-mini-bars">

        <span
          style={{
            height: "45%",
          }}
        />

        <span
          style={{
            height: "54%",
          }}
        />

        <span
          style={{
            height: "63%",
          }}
        />

        <span
          style={{
            height: "74%",
          }}
        />

        <span
          style={{
            height: "83%",
          }}
        />

        <span
          style={{
            height: "92%",
          }}
        />

      </div>

    </div>
  );
}


function ChartBar({
  month,
  value,
  height,
}) {
  return (
    <div className="business-chart-column">

      <div className="business-chart-bar-area">

        <span
          style={{
            height,
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


/* =========================================================
   RECORD WASTE MODAL
========================================================= */

function RecordWasteModal({
  onClose,
  onSubmit,
}) {
  const [
    form,
    setForm,
  ] = useState({
    category: "Paper",
    name: "",
    amount: "",
  });


  const update = (
    key,
    value
  ) => {
    setForm(
      (current) => ({
        ...current,
        [key]: value,
      })
    );
  };


  const handleSubmit = (
    event
  ) => {
    event.preventDefault();


    if (
      !form.name.trim() ||
      !form.amount
    ) {
      return;
    }


    onSubmit(form);
  };


  return (
    <div
      className="business-modal-backdrop"
      onMouseDown={
        onClose
      }
    >

      <form
        className="business-record-modal"
        onSubmit={
          handleSubmit
        }
        onMouseDown={(
          event
        ) =>
          event.stopPropagation()
        }
      >

        <button
          type="button"
          className="business-modal-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>


        <div className="business-modal-icon">

          <Weight size={27} />

        </div>


        <span className="business-modal-eyebrow">
          Waste record
        </span>


        <h2>
          Record waste.
        </h2>


        <p>
          Add a prototype material
          stream to your organisation's
          waste records.
        </p>


        <div className="business-form-grid">

          <label>

            <span>
              Category
            </span>


            <select
              value={
                form.category
              }
              onChange={(
                event
              ) =>
                update(
                  "category",
                  event.target.value
                )
              }
            >
              <option>
                Paper
              </option>

              <option>
                Plastic
              </option>

              <option>
                Metal
              </option>

              <option>
                Organic
              </option>

              <option>
                E-Waste
              </option>
            </select>

          </label>


          <label>

            <span>
              Weight (kg)
            </span>


            <input
              type="number"
              min="1"
              value={
                form.amount
              }
              onChange={(
                event
              ) =>
                update(
                  "amount",
                  event.target.value
                )
              }
              placeholder="e.g. 80"
            />

          </label>


          <label className="business-field-full">

            <span>
              Waste stream name
            </span>


            <input
              type="text"
              value={
                form.name
              }
              onChange={(
                event
              ) =>
                update(
                  "name",
                  event.target.value
                )
              }
              placeholder="e.g. Office paper"
            />

          </label>

        </div>


        <div className="business-modal-actions">

          <button
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>


          <button
            type="submit"
          >
            <Plus size={17} />

            Add Waste Record
          </button>

        </div>


        <div className="business-modal-note">

          <Leaf size={15} />

          Prototype record only.
        </div>

      </form>

    </div>
  );
}


/* =========================================================
   REQUEST COLLECTION MODAL
========================================================= */

function RequestCollectionModal({
  onClose,
  onSubmit,
}) {
  const [
    form,
    setForm,
  ] = useState({
    material:
      "PET Plastic",

    recycler:
      "Recycler to be assigned",

    quantity:
      "50 kg",

    date:
      "20 Sep",

    time:
      "10:00 AM",

    site:
      "Main Office",
  });


  const update = (
    key,
    value
  ) => {
    setForm(
      (current) => ({
        ...current,
        [key]: value,
      })
    );
  };


  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    onSubmit(form);
  };


  return (
    <div
      className="business-modal-backdrop"
      onMouseDown={onClose}
    >

      <form
        className="business-request-modal"
        onSubmit={
          handleSubmit
        }
        onMouseDown={(
          event
        ) =>
          event.stopPropagation()
        }
      >

        <button
          type="button"
          className="business-modal-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>


        <div className="business-modal-icon">

          <Truck size={27} />

        </div>


        <span className="business-modal-eyebrow">
          Collection request
        </span>


        <h2>
          Request collection.
        </h2>


        <p>
          Create a prototype material
          collection request.
        </p>


        <div className="business-form-grid">

          <label>

            <span>
              Material
            </span>


            <select
              value={
                form.material
              }
              onChange={(
                event
              ) =>
                update(
                  "material",
                  event.target.value
                )
              }
            >
              <option>
                PET Plastic
              </option>

              <option>
                Cardboard & Paper
              </option>

              <option>
                Metal Cans
              </option>

              <option>
                Organic Waste
              </option>

              <option>
                E-Waste
              </option>
            </select>

          </label>


          <label>

            <span>
              Quantity
            </span>


            <input
              type="text"
              value={
                form.quantity
              }
              onChange={(
                event
              ) =>
                update(
                  "quantity",
                  event.target.value
                )
              }
            />

          </label>


          <label>

            <span>
              Site
            </span>


            <select
              value={
                form.site
              }
              onChange={(
                event
              ) =>
                update(
                  "site",
                  event.target.value
                )
              }
            >
              <option>
                Main Office
              </option>

              <option>
                Warehouse A
              </option>

              <option>
                Operations Site
              </option>
            </select>

          </label>


          <label>

            <span>
              Date
            </span>


            <input
              type="text"
              value={
                form.date
              }
              onChange={(
                event
              ) =>
                update(
                  "date",
                  event.target.value
                )
              }
            />

          </label>


          <label className="business-field-full">

            <span>
              Preferred time
            </span>


            <input
              type="text"
              value={
                form.time
              }
              onChange={(
                event
              ) =>
                update(
                  "time",
                  event.target.value
                )
              }
            />

          </label>

        </div>


        <div className="business-modal-actions">

          <button
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>


          <button
            type="submit"
          >
            <Truck size={17} />

            Create Request
          </button>

        </div>


        <div className="business-modal-note">

          <Leaf size={15} />

          Prototype only — no
          recycler is contacted.
        </div>

      </form>

    </div>
  );
}


/* =========================================================
   COLLECTION DETAILS
========================================================= */

function CollectionDetailsModal({
  collection,
  onClose,
}) {
  return (
    <div
      className="business-modal-backdrop"
      onMouseDown={onClose}
    >

      <div
        className="business-collection-modal"
        onMouseDown={(
          event
        ) =>
          event.stopPropagation()
        }
      >

        <button
          type="button"
          className="business-modal-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>


        <div className="business-modal-icon">

          <Truck size={27} />

        </div>


        <span className="business-modal-eyebrow">
          Collection details
        </span>


        <h2>
          {collection.material}
        </h2>


        <p>
          Review this prototype
          collection request.
        </p>


        <div className="business-modal-grid">

          <div>
            <span>
              Quantity
            </span>

            <strong>
              {collection.quantity}
            </strong>
          </div>


          <div>
            <span>
              Status
            </span>

            <strong>
              {collection.status}
            </strong>
          </div>


          <div>
            <span>
              Date
            </span>

            <strong>
              {collection.date}
            </strong>
          </div>


          <div>
            <span>
              Time
            </span>

            <strong>
              {collection.time}
            </strong>
          </div>


          <div>
            <span>
              Site
            </span>

            <strong>
              {collection.site}
            </strong>
          </div>


          <div>
            <span>
              Recycler
            </span>

            <strong>
              {collection.recycler}
            </strong>
          </div>

        </div>


        <button
          type="button"
          className="business-modal-primary"
          onClick={onClose}
        >
          <CheckCircle2
            size={17}
          />

          Done
        </button>

      </div>

    </div>
  );
}


/* =========================================================
   WASTE DETAILS
========================================================= */

function WasteDetailsModal({
  item,
  onClose,
}) {
  return (
    <div
      className="business-modal-backdrop"
      onMouseDown={onClose}
    >

      <div
        className="business-collection-modal"
        onMouseDown={(
          event
        ) =>
          event.stopPropagation()
        }
      >

        <button
          type="button"
          className="business-modal-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>


        <div className="business-modal-icon">

          <Recycle size={27} />

        </div>


        <span className="business-modal-eyebrow">
          Waste stream
        </span>


        <h2>
          {item.name}
        </h2>


        <p>
          Prototype details for this
          organisational waste stream.
        </p>


        <div className="business-modal-grid">

          <div>
            <span>
              Category
            </span>

            <strong>
              {item.category}
            </strong>
          </div>


          <div>
            <span>
              Recorded
            </span>

            <strong>
              {item.amount}
              {item.unit}
            </strong>
          </div>


          <div>
            <span>
              Recovered
            </span>

            <strong>
              {item.recovered} kg
            </strong>
          </div>


          <div>
            <span>
              Recovery rate
            </span>

            <strong>
              {
                item.recoveryRate
              }%
            </strong>
          </div>

        </div>


        <button
          type="button"
          className="business-modal-primary"
          onClick={onClose}
        >
          Done
        </button>

      </div>

    </div>
  );
}


export default BusinessDashboard;