import {
  ArrowLeft,
  ChevronRight,
  Clock3,
  LocateFixed,
  MapPin,
  Navigation,
  Recycle,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  useState,
} from "react";

import climaticaLogo from "../assets/climatica-logo.png";
import recyclingBackground from "../assets/cta-leaf-bg.png";


const locations = [
  {
    id: 1,
    name: "GreenCycle Collection Centre",
    area: "Sango-Ota, Ogun",
    distance: "2.1 km",
    time: "8 min",
    open: true,
    verified: true,

    accepts: [
      "PET Plastic",
      "Aluminium",
      "Paper",
    ],

    description:
      "A local collection point accepting common household recyclables and sorted materials.",

    position: {
      x: 38,
      y: 36,
    },
  },

  {
    id: 2,
    name: "EcoPoint Recycling Hub",
    area: "Ota, Ogun",
    distance: "3.4 km",
    time: "12 min",
    open: true,
    verified: true,

    accepts: [
      "Plastic",
      "Paper",
      "Metal",
      "Glass",
    ],

    description:
      "Community recycling hub supporting household and small-business material recovery.",

    position: {
      x: 66,
      y: 48,
    },
  },

  {
    id: 3,
    name: "Community PSP Drop-off",
    area: "Iju, Ogun",
    distance: "5.2 km",
    time: "18 min",
    open: false,
    verified: true,

    accepts: [
      "General Recyclables",
      "Plastic",
      "Cans",
    ],

    description:
      "A PSP-supported drop-off location for sorted recyclable and recoverable waste.",

    position: {
      x: 53,
      y: 72,
    },
  },

  {
    id: 4,
    name: "CleanEarth Recovery Point",
    area: "Ado-Odo/Ota",
    distance: "6.8 km",
    time: "22 min",
    open: true,
    verified: true,

    accepts: [
      "E-Waste",
      "Batteries",
      "Electronics",
    ],

    description:
      "Specialised recovery point for electronics, batteries and selected e-waste materials.",

    position: {
      x: 78,
      y: 25,
    },
  },
];


const materialFilters = [
  "All",
  "Plastic",
  "Metal",
  "Paper",
  "Glass",
  "E-Waste",
];


function Recycling() {
  const [selectedLocation, setSelectedLocation] =
    useState(locations[0]);

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [searchValue, setSearchValue] =
    useState("");

  const [locationMessage, setLocationMessage] =
    useState("");


  const filteredLocations =
    locations.filter((location) => {
      const matchesSearch =
        location.name
          .toLowerCase()
          .includes(
            searchValue.toLowerCase()
          ) ||
        location.area
          .toLowerCase()
          .includes(
            searchValue.toLowerCase()
          );


      const matchesFilter =
        activeFilter === "All" ||
        location.accepts.some(
          (item) =>
            item
              .toLowerCase()
              .includes(
                activeFilter.toLowerCase()
              )
        );


      return (
        matchesSearch &&
        matchesFilter
      );
    });


  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage(
        "Location is not supported on this device."
      );

      return;
    }


    setLocationMessage(
      "Getting your location..."
    );


    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationMessage(
          "Location detected — showing nearby demo recycling points."
        );
      },

      () => {
        setLocationMessage(
          "We couldn't access your location. You can still search manually."
        );
      }
    );
  };


  return (
    <main className="recycling-page">

      {/* =====================================
          INTRO / LEAF HERO
      ====================================== */}

      <section
        className="recycling-hero"
        style={{
          backgroundImage:
            `url(${recyclingBackground})`,
        }}
      >

        <div className="recycling-hero-overlay" />


        {/* NAVBAR */}

        <header className="recycling-navbar">

          <Link
            to="/"
            className="recycling-logo"
          >
            <img
              src={climaticaLogo}
              alt="Climatica"
            />
          </Link>


          <Link
            to="/options"
            className="recycling-back"
          >
            <ArrowLeft size={15} />

            Back to options
          </Link>

        </header>


        {/* HERO COPY */}

        <div className="recycling-hero-content">

          <div className="recycling-eyebrow">

            <MapPin size={14} />

            Find Recycling

          </div>


          <h1>
            Find a place
            near you.
          </h1>


          <p>
            Discover verified recycling,
            recovery and responsible disposal
            options that accept the material
            you have.
          </p>


          {/* SEARCH */}

          <div className="recycling-search-shell">

            <div className="recycling-search-field">

              <Search size={18} />

              <input
                type="text"
                value={searchValue}
                onChange={(event) =>
                  setSearchValue(
                    event.target.value
                  )
                }
                placeholder="Search area or recycling point..."
              />


              {searchValue && (
                <button
                  type="button"
                  className="clear-recycling-search"
                  onClick={() =>
                    setSearchValue("")
                  }
                >
                  <X size={15} />
                </button>
              )}

            </div>


            <button
              type="button"
              className="use-location-button"
              onClick={useMyLocation}
            >
              <LocateFixed size={17} />

              Use my location
            </button>

          </div>


          {locationMessage && (
            <div className="location-message">

              <LocateFixed size={13} />

              {locationMessage}

            </div>
          )}

        </div>

      </section>


      {/* =====================================
          MAIN LOCATOR
      ====================================== */}

      <section className="recycling-content">

        <div className="recycling-container">

          {/* =================================
              FILTERS
          ================================== */}

          <div className="recycling-filter-row">

            <div className="recycling-filter-label">

              <SlidersHorizontal size={15} />

              Material

            </div>


            <div className="material-filter-list">

              {materialFilters.map(
                (filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={
                      activeFilter === filter
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveFilter(filter)
                    }
                  >
                    {filter}
                  </button>
                )
              )}

            </div>

          </div>


          {/* =================================
              LOCATOR GRID
          ================================== */}

          <div className="recycling-locator">

            {/* ===============================
                LEFT — LOCATIONS
            ================================ */}

            <div className="recycling-location-panel">

              <div className="location-panel-heading">

                <div>

                  <span>
                    Nearby options
                  </span>

                  <h2>
                    Recycling points
                  </h2>

                </div>


                <div className="location-count">

                  {filteredLocations.length}

                </div>

              </div>


              <div className="recycling-location-list">

                {filteredLocations.length >
                0 ? (

                  filteredLocations.map(
                    (location) => (
                      <LocationCard
                        key={location.id}
                        location={location}
                        active={
                          selectedLocation.id ===
                          location.id
                        }
                        onClick={() =>
                          setSelectedLocation(
                            location
                          )
                        }
                      />
                    )
                  )

                ) : (

                  <div className="no-locations">

                    <Recycle size={25} />

                    <h3>
                      No matching locations
                    </h3>

                    <p>
                      Try another material
                      or search area.
                    </p>

                  </div>

                )}

              </div>

            </div>


            {/* ===============================
                RIGHT — MAP
            ================================ */}

            <div className="recycling-map-panel">

              <div className="demo-map">

                {/* MAP DECORATION */}

                <div className="map-road road-one" />
                <div className="map-road road-two" />
                <div className="map-road road-three" />

                <div className="map-green-space green-space-one" />
                <div className="map-green-space green-space-two" />


                {/* USER */}

                <div className="user-map-location">

                  <span />

                </div>


                {/* LOCATION PINS */}

                {locations.map(
                  (location) => (
                    <button
                      key={location.id}
                      type="button"
                      className={`
                        demo-map-pin

                        ${
                          selectedLocation.id ===
                          location.id
                            ? "active"
                            : ""
                        }
                      `}
                      style={{
                        left:
                          `${location.position.x}%`,

                        top:
                          `${location.position.y}%`,
                      }}
                      onClick={() =>
                        setSelectedLocation(
                          location
                        )
                      }
                      aria-label={
                        location.name
                      }
                    >

                      <MapPin size={17} />

                    </button>
                  )
                )}


                <div className="demo-map-badge">

                  Demo map

                </div>

              </div>


              {/* ===============================
                  SELECTED DETAILS
              ================================ */}

              <div className="selected-location-detail">

                <div className="selected-location-top">

                  <div>

                    <span className="selected-location-label">
                      Selected location
                    </span>

                    <h3>
                      {selectedLocation.name}
                    </h3>

                  </div>


                  {selectedLocation.verified && (
                    <div className="verified-location">

                      <ShieldCheck size={14} />

                      Verified

                    </div>
                  )}

                </div>


                <div className="selected-location-meta">

                  <span>

                    <MapPin size={13} />

                    {selectedLocation.area}

                  </span>


                  <span>

                    <Navigation size={13} />

                    {selectedLocation.distance}

                  </span>


                  <span>

                    <Clock3 size={13} />

                    {selectedLocation.open
                      ? "Open today"
                      : "Closed"
                    }

                  </span>

                </div>


                <p>
                  {selectedLocation.description}
                </p>


                <div className="accepted-materials">

                  <span>
                    Accepts
                  </span>


                  <div>

                    {selectedLocation.accepts.map(
                      (item) => (
                        <span key={item}>
                          {item}
                        </span>
                      )
                    )}

                  </div>

                </div>


                <div className="selected-location-actions">

                  <button
                    type="button"
                    className="directions-button"
                  >
                    <Navigation size={16} />

                    Get Directions

                    <ArrowLeft
                      size={15}
                      className="direction-arrow"
                    />
                  </button>


                  <button
                    type="button"
                    className="location-details-button"
                  >
                    View Details

                    <ChevronRight size={15} />
                  </button>

                </div>

              </div>

            </div>

          </div>


          {/* =================================
              PROTOTYPE NOTICE
          ================================== */}

          <div className="recycling-prototype-note">

            <Recycle size={14} />

            <div>

              <strong>
                Prototype location data
              </strong>

              <p>
                These recycling points are sample
                entries demonstrating how Climatica's
                locator experience will work.
                Live locations can later be connected
                through verified PSP and recycling
                partners.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}



function LocationCard({
  location,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        recycling-location-card

        ${active
          ? "active"
          : ""
        }
      `}
    >

      <div className="location-card-icon">

        <Recycle size={19} />

      </div>


      <div className="location-card-copy">

        <div className="location-title-row">

          <h3>
            {location.name}
          </h3>


          {location.verified && (
            <ShieldCheck size={14} />
          )}

        </div>


        <div className="location-card-area">

          <MapPin size={11} />

          {location.area}

        </div>


        <div className="location-card-meta">

          <span>
            {location.distance}
          </span>

          <i />

          <span>
            {location.time}
          </span>

          <i />

          <span
            className={
              location.open
                ? "location-open"
                : "location-closed"
            }
          >
            {location.open
              ? "Open"
              : "Closed"
            }
          </span>

        </div>


        <div className="location-material-preview">

          {location.accepts
            .slice(0, 3)
            .map(
              (material) => (
                <span key={material}>
                  {material}
                </span>
              )
            )}

        </div>

      </div>


      <ChevronRight
        size={16}
        className="location-chevron"
      />

    </button>
  );
}


export default Recycling;