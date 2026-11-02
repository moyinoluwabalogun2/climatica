import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  Leaf,
  LocateFixed,
  MapPin,
  Navigation,
  Phone,
  Recycle,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  X,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  useMemo,
  useState,
} from "react";

import climaticaLogo
  from "../assets/climatica-logo.png";

import recyclingBackground
  from "../assets/cta-leaf-bg.png";

import {
  additionalResearchLeads,
  mapsSearchUrl,
  materialFilters,
  recyclingLocations,
  suggestedMaterialFromAi,
} from "../data/recyclingLocations";

import "./Recycling.live.css";


/* =========================================================
   SEARCH NORMALIZATION
========================================================= */

const normalize = (text) =>
  String(text || "")
    .trim()
    .toLowerCase();


/* =========================================================
   RECYCLING PAGE
========================================================= */

function Recycling() {
  const initialMaterial =
    suggestedMaterialFromAi();

  const [
    filter,
    setFilter,
  ] = useState(
    initialMaterial || "All"
  );

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    audience,
    setAudience,
  ] = useState("All types");

  const [
    selectedId,
    setSelectedId,
  ] = useState(
    recyclingLocations[0]?.id ??
      null
  );

  const [
    locationMessage,
    setLocationMessage,
  ] = useState("");


  /* =======================================================
     FILTER LOCATIONS
  ======================================================= */

  const filteredLocations =
    useMemo(() => {
      return recyclingLocations.filter(
        (item) => {
          const term =
            normalize(search);

          const matchesSearch =
            !term ||
            [
              item.name,
              item.area,
              item.address,
              item.type,
              ...item.materials,
            ].some((value) =>
              normalize(value).includes(
                term
              )
            );

          const matchesMaterial =
            filter === "All" ||
            item.materials.includes(
              filter
            );

          const matchesAudience =
            audience === "All types" ||
            (
              audience ===
                "Household / unknown" &&
              item.audience !==
                "commercial"
            ) ||
            (
              audience ===
                "Commercial" &&
              item.audience ===
                "commercial"
            );

          return (
            matchesSearch &&
            matchesMaterial &&
            matchesAudience
          );
        }
      );
    }, [
      search,
      filter,
      audience,
    ]);


  /* =======================================================
     SELECTED LOCATION
  ======================================================= */

  const selected =
    filteredLocations.find(
      (item) =>
        item.id === selectedId
    ) ??
    filteredLocations[0] ??
    null;


  /* =======================================================
     RESET FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSearch("");

    setFilter("All");

    setAudience("All types");
  };


  /* =======================================================
     LOCATION PERMISSION

     Actual distance calculations are disabled
     until verified GPS coordinates are available.
  ======================================================= */

  const useMyLocation = () => {
    if (
      !(
        "geolocation" in navigator
      )
    ) {
      setLocationMessage(
        "Geolocation is unavailable. You can browse the Ogun State research directory manually."
      );

      return;
    }

    setLocationMessage(
      "Requesting location permission…"
    );

    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationMessage(
          "Location permission granted. Accurate distance sorting will be enabled after collection-point coordinates are verified."
        );
      },

      () => {
        setLocationMessage(
          "Location not shared. You can still search the Ogun State directory."
        );
      },

      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };


  /* =======================================================
     PAGE RENDER
  ======================================================= */

  return (
    <main className="recycling-page recycling-live">

      {/* =====================================
          HERO
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


        {/* HERO CONTENT */}

        <div className="recycling-hero-content">

          <div className="recycling-eyebrow">

            <MapPin size={14} />

            Ogun State · Pilot directory

          </div>


          <h1>
            Find a recycling
            <br />
            option for your waste.
          </h1>


          <p>
            Explore researched recycling and
            collection leads across Ota,
            Sango-Ota, Adalemo and Ijoko.
            Contact each organisation before
            visiting.
          </p>


          {/* SEARCH */}

          <div className="recycling-search-shell">

            <div className="recycling-search-field">

              <Search size={18} />


              <input
                aria-label="Search recycling places, areas or materials"
                placeholder="Search PET, Ota, cardboard, e-waste…"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
              />


              {search && (
                <button
                  type="button"
                  className="clear-recycling-search"
                  onClick={() =>
                    setSearch("")
                  }
                  aria-label="Clear search"
                >
                  <X size={16} />
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

              <LocateFixed size={15} />

              {locationMessage}

            </div>
          )}

        </div>

      </section>


      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <section className="recycling-content">

        <div className="recycling-container">

          {/* =================================
              SUMMARY
          ================================== */}

          <div
            className="recycling-live-summary"
            role="status"
          >

            <div>

              <Building2 size={21} />

              <strong>
                {recyclingLocations.length}
              </strong>

              <span>
                Research leads imported
              </span>

            </div>


            <div>

              <FileCheck2 size={21} />

              <strong>
                0
              </strong>

              <span>
                Field-verified so far
              </span>

            </div>


            <div>

              <Leaf size={21} />

              <strong>
                Ogun
              </strong>

              <span>
                Initial coverage area
              </span>

            </div>

          </div>


          {/* =================================
              AI MATCH
          ================================== */}

          {initialMaterial && (
            <div className="recycling-ai-match">

              <Recycle size={19} />


              <div>

                <strong>
                  Matched from your latest
                  AI scan: {initialMaterial}
                </strong>


                <p>
                  Climatica is filtering by
                  the material Gemini
                  identified. These businesses
                  are unverified research leads,
                  not confirmed drop-off points.
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setFilter("All")
                }
              >
                Show all
              </button>

            </div>
          )}


          {/* =================================
              MATERIAL FILTERS
          ================================== */}

          <div className="recycling-filter-row recycling-live-filters">

            <div className="recycling-filter-label">

              <SlidersHorizontal size={16} />

              Material

            </div>


            <div className="material-filter-list">

              {materialFilters.map(
                (value) => (
                  <button
                    key={value}
                    type="button"
                    className={
                      filter === value
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setFilter(value)
                    }
                  >
                    {value}
                  </button>
                )
              )}

            </div>

          </div>


          {/* =================================
              AUDIENCE FILTER
          ================================== */}

          <div className="recycling-live-audience">

            <label htmlFor="recycling-audience">
              Organisation type
            </label>


            <select
              id="recycling-audience"
              value={audience}
              onChange={(event) =>
                setAudience(
                  event.target.value
                )
              }
            >

              <option>
                All types
              </option>

              <option>
                Household / unknown
              </option>

              <option>
                Commercial
              </option>

            </select>


            <button
              type="button"
              onClick={clearFilters}
            >
              Reset filters
            </button>

          </div>


          {/* =================================
              DIRECTORY + DETAILS
          ================================== */}

          <div className="recycling-locator">

            {/* LOCATION LIST */}

            <div className="recycling-location-panel">

              <div className="location-panel-heading">

                <div>

                  <span>
                    Ogun State research directory
                  </span>


                  <h2>
                    Collection leads
                  </h2>

                </div>


                <div className="location-count">
                  {filteredLocations.length}
                </div>

              </div>


              <div className="recycling-location-list">

                {filteredLocations.length ? (
                  filteredLocations.map(
                    (item) => (
                      <LocationCard
                        key={item.id}
                        item={item}
                        active={
                          item.id ===
                          selected?.id
                        }
                        onSelect={() =>
                          setSelectedId(
                            item.id
                          )
                        }
                      />
                    )
                  )
                ) : (

                  <div className="no-locations">

                    <Search size={27} />


                    <h3>
                      No matching entries
                    </h3>


                    <p>
                      Try a different material
                      or search term.
                    </p>


                    <button
                      type="button"
                      onClick={clearFilters}
                    >
                      Clear filters
                    </button>

                  </div>
                )}

              </div>

            </div>


            {/* =================================
                LOCATION DETAILS
            ================================== */}

            <div className="recycling-map-panel recycling-live-detail-panel">

              {selected ? (
                <>

                  {/* MAP SEARCH AREA */}

                  <div className="recycling-live-map-placeholder">

                    <div
                      className="recycling-live-map-lines"
                      aria-hidden="true"
                    />


                    <div className="recycling-live-map-message">

                      <MapPin size={30} />


                      <strong>
                        {selected.area}
                      </strong>


                      <span>
                        Exact map pin pending
                        verification
                      </span>


                      <a
                        href={
                          mapsSearchUrl(
                            selected
                          )
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Search this location on
                        Google Maps

                        <ArrowUpRight
                          size={15}
                        />
                      </a>

                    </div>

                  </div>


                  {/* LOCATION INFORMATION */}

                  <div className="selected-location-detail">

                    <div className="selected-location-top">

                      <div>

                        <span className="selected-location-label">

                          Selected research entry ·{" "}
                          {selected.id}

                        </span>


                        <h3>
                          {selected.name}
                        </h3>

                      </div>


                      <span className="recycling-live-status">

                        <ShieldAlert
                          size={14}
                        />

                        Not yet field-verified

                      </span>

                    </div>


                    {/* ADDRESS AND HOURS */}

                    <div className="selected-location-meta">

                      <span>

                        <MapPin size={15} />

                        {selected.address}

                      </span>


                      <span>

                        <Clock3 size={15} />

                        {selected.hours ??
                          "Opening hours not supplied"}

                      </span>

                    </div>


                    {/* NOTES */}

                    <p>
                      {selected.notes}
                    </p>


                    {/* ACCEPTED MATERIALS */}

                    <div className="accepted-materials">

                      <span>
                        Materials listed in research
                        — please confirm
                      </span>


                      <div>

                        {selected.materials.map(
                          (material) => (
                            <span key={material}>
                              {material}
                            </span>
                          )
                        )}

                      </div>

                    </div>


                    {/* =================================
                        RESEARCH INFORMATION
                    ================================== */}

                    <div className="recycling-live-context">

                      <strong>
                        {selected.type}
                      </strong>


                      <span>

                        {selected.audience ===
                        "commercial"
                          ? "Research indicates commercial / industrial focus; individual drop-off not confirmed."
                          : "Public and school drop-off eligibility not yet confirmed."}

                      </span>


                      <small>

                        Source: Climatica team
                        collection-point research,
                        page {selected.sourcePage}.
                        Verification date:
                        not provided.

                      </small>

                    </div>


                    {/* =================================
                        ACTION BUTTONS
                    ================================== */}

                    <div className="selected-location-actions">

                      <a
                        className="directions-button"
                        href={
                          mapsSearchUrl(
                            selected
                          )
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >

                        <Navigation
                          size={16}
                        />

                        Find on Maps

                        <ArrowUpRight
                          size={15}
                        />

                      </a>


                      {selected.phones.length ? (
                        <a
                          className="location-details-button"
                          href={
                            `tel:${selected.phones[0]}`
                          }
                        >

                          <Phone
                            size={16}
                          />

                          Call to verify

                        </a>
                      ) : (
                        <span className="recycling-live-no-phone">

                          Phone not available
                          in research

                        </span>
                      )}

                    </div>


                    {/* WARNING */}

                    <div className="recycling-live-warning">

                      <ShieldAlert
                        size={16}
                      />


                      <span>
                        Climatica has not confirmed
                        that this site is operating,
                        accepts the listed materials,
                        or welcomes walk-in users.
                        Please contact the
                        organisation first.
                      </span>

                    </div>

                  </div>

                </>
              ) : (

                <div className="recycling-live-empty-panel">

                  <Recycle size={28} />


                  <h3>
                    No selected location
                  </h3>


                  <p>
                    Change the filters to see
                    available research entries.
                  </p>

                </div>
              )}

            </div>

          </div>


          {/* =================================
              RESEARCH NOTICE
          ================================== */}

          <div className="recycling-prototype-note">

            <ShieldAlert
              size={18}
            />


            <div>

              <strong>
                Research preview — not a
                verified public recycling
                directory yet
              </strong>


              <p>
                We replaced four fictional
                demonstration locations with{" "}
                {recyclingLocations.length}{" "}
                team-researched entries.
                No coordinates or distances
                have been invented. Call
                and confirm materials,
                public access, fees/weights
                and opening hours before
                visiting. A separate follow-up
                list includes{" "}
                {additionalResearchLeads.length}{" "}
                additional initiatives with
                insufficient address details.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   LOCATION CARD
========================================================= */

function LocationCard({
  item,
  active,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={
        `recycling-location-card ${
          active ? "active" : ""
        }`
      }
      aria-pressed={active}
    >

      <div className="location-card-icon">

        <Recycle size={20} />

      </div>


      <div className="location-card-copy">

        <div className="location-title-row">

          <h3>
            {item.name}
          </h3>


          <ChevronRight
            size={14}
          />

        </div>


        <div className="location-card-area">

          <MapPin
            size={14}
          />

          {item.area}

        </div>


        <div className="location-card-meta">

          <span>
            {item.type}
          </span>


          <span className="recycling-live-research-tag">
            Research lead
          </span>

        </div>


        <div className="location-material-preview">

          {item.materials
            .slice(0, 4)
            .map((material) => (
              <span key={material}>
                {material}
              </span>
            ))}

        </div>

      </div>


      {active && (
        <CheckCircle2
          className="recycling-live-selected"
          size={16}
        />
      )}

    </button>
  );
}


export default Recycling;