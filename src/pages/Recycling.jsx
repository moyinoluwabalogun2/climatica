
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

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

import climaticaLogo from "../assets/climatica-logo.png";
import recyclingBackground from "../assets/cta-leaf-bg.png";

import {
  additionalResearchLeads,
  canSearchMaps,
  getServiceGroup,
  mapsSearchUrl,
  materialFilters,
  recyclingLocations,
  regionFilters,
  serviceFilters,
  suggestedMaterialFromAi,
} from "../data/recyclingDirectory";

import "./Recycling.live.css";

/* =========================================================
   HELPERS
========================================================= */

const normalize = (value) =>
  String(value ?? "").trim().toLowerCase();

/* =========================================================
   RECYCLING PAGE
========================================================= */

function Recycling() {
  const [initialMaterial] = useState(
    () => suggestedMaterialFromAi()
  );

  const [filter, setFilter] = useState(
    initialMaterial || "All"
  );

  const [search, setSearch] = useState("");

  // Existing organisation-type filter.
  const [audience, setAudience] = useState("All types");

  // New filters.
  const [region, setRegion] = useState("All areas");
  const [service, setService] = useState("All services");

  // Existing selection behaviour.
  const [selectedId, setSelectedId] = useState(
    recyclingLocations[0]?.id ?? null
  );

  // Existing location-permission feedback.
  const [locationMessage, setLocationMessage] = useState("");

  /* =======================================================
     FILTER LOCATIONS
  ======================================================= */

  const filteredLocations = useMemo(() => {
    return recyclingLocations.filter((item) => {
      const term = normalize(search);

      const searchableFields = [
        item.name,
        item.area,
        item.address,
        item.region,
        item.type,
        item.notes,
        item.source,
        ...(item.materials ?? []),
      ];

      const matchesSearch =
        !term ||
        searchableFields.some((value) =>
          normalize(value).includes(term)
        );

      const matchesMaterial =
        filter === "All" ||
        (item.materials ?? []).includes(filter);

      // Preserve existing audience filtering.
      // "Household / unknown" does not mean access is verified.
      const matchesAudience =
        audience === "All types" ||
        (audience === "Household / unknown" &&
          item.audience !== "commercial") ||
        (audience === "Commercial" &&
          item.audience === "commercial");

      // New region filtering.
      const matchesRegion =
        region === "All areas" ||
        item.region === region;

      // New service-type filtering.
      const matchesService =
        service === "All services" ||
        getServiceGroup(item) === service;

      return (
        matchesSearch &&
        matchesMaterial &&
        matchesAudience &&
        matchesRegion &&
        matchesService
      );
    });
  }, [
    search,
    filter,
    audience,
    region,
    service,
  ]);

  /* =======================================================
     SELECTED LOCATION

     Preserve existing fallback when filters change.
  ======================================================= */

  const selected =
    filteredLocations.find(
      (item) => item.id === selectedId
    ) ??
    filteredLocations[0] ??
    null;

  const verifiedCount = recyclingLocations.filter(
    (item) => item.status === "verified"
  ).length;

  /* =======================================================
     RESET FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSearch("");
    setFilter("All");
    setAudience("All types");
    setRegion("All areas");
    setService("All services");
  };

  /* =======================================================
     USE MY LOCATION

     Preserved from the existing page.

     This only requests browser location permission.
     It does NOT calculate distance or verify map pins.
  ======================================================= */

  const useMyLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationMessage(
        "Geolocation is unavailable. You can browse the Ogun State research directory manually."
      );
      return;
    }

    setLocationMessage("Requesting location permission…");

    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationMessage(
          "Location permission granted. Accurate distance sorting is not available yet because the collection-point coordinates still require verification."
        );
      },
      () => {
        setLocationMessage(
          "Location not shared. You can still browse and search the directory."
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
     RENDER
  ======================================================= */

  return (
    <main className="recycling-page recycling-live">

      {/* ===================================================
          HERO — ORIGINAL DESIGN
      =================================================== */}

      <section
        className="recycling-hero"
        style={{
          backgroundImage: `url(${recyclingBackground})`,
        }}
      >
        <div className="recycling-hero-overlay" />

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
            Explore recycling and collection research across
            Ota, Sango-Ota, Abeokuta North, Obafemi Owode
            and Odeda. Check the verification status and
            contact organisations before visiting.
          </p>

          {/* ORIGINAL SEARCH FIELD */}

          <div className="recycling-search-shell">
            <div className="recycling-search-field">
              <Search size={18} />

              <input
                aria-label="Search recycling places, areas or materials"
                placeholder="Search PET, Mowe, Saje, paper, e-waste..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

              {search && (
                <button
                  type="button"
                  className="clear-recycling-search"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* ORIGINAL LOCATION BUTTON */}

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
            <div
              className="location-message"
              role="status"
            >
              <LocateFixed size={15} />
              {locationMessage}
            </div>
          )}
        </div>
      </section>

      {/* ===================================================
          DIRECTORY CONTENT
      =================================================== */}

      <section className="recycling-content">
        <div className="recycling-container">

          {/* ORIGINAL SUMMARY DESIGN */}

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
                Research records imported
              </span>
            </div>

            <div>
              <FileCheck2 size={21} />

              <strong>
                {verifiedCount}
              </strong>

              <span>
                Independently verified
              </span>
            </div>

            <div>
              <Leaf size={21} />

              <strong>Ogun</strong>

              <span>
                Initial coverage area
              </span>
            </div>
          </div>

          {/* ORIGINAL GEMINI AI MATCH */}

          {initialMaterial && (
            <div className="recycling-ai-match">
              <Recycle size={19} />

              <div>
                <strong>
                  Matched from your latest AI scan:{" "}
                  {initialMaterial}
                </strong>

                <p>
                  Climatica has selected the material
                  Gemini identified. The directory displays
                  matching research entries, not independently
                  verified public recycling centres.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setFilter("All")}
              >
                Show all
              </button>
            </div>
          )}

          {/* ORIGINAL MATERIAL FILTERS */}

          <div className="recycling-filter-row recycling-live-filters">
            <div className="recycling-filter-label">
              <SlidersHorizontal size={16} />
              Material
            </div>

            <div className="material-filter-list">
              {materialFilters.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={
                    filter === value ? "active" : ""
                  }
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* ORIGINAL AUDIENCE FILTER
              + NEW AREA AND SERVICE FILTERS */}

          <div className="recycling-live-audience">
            <label htmlFor="recycling-audience">
              Organisation type
            </label>

            <select
              id="recycling-audience"
              value={audience}
              onChange={(event) =>
                setAudience(event.target.value)
              }
            >
              <option value="All types">
                All types
              </option>

              <option value="Household / unknown">
                Household / unknown
              </option>

              <option value="Commercial">
                Commercial
              </option>
            </select>

            <label htmlFor="recycling-region">
              Area
            </label>

            <select
              id="recycling-region"
              value={region}
              onChange={(event) =>
                setRegion(event.target.value)
              }
            >
              {regionFilters.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <label htmlFor="recycling-service">
              Service
            </label>

            <select
              id="recycling-service"
              value={service}
              onChange={(event) =>
                setService(event.target.value)
              }
            >
              {serviceFilters.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={clearFilters}
            >
              Reset filters
            </button>
          </div>

          {/* =================================================
              LOCATION LIST + DETAILS
          ================================================= */}

          <div className="recycling-locator">

            {/* ORIGINAL LIST PANEL */}

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
                  filteredLocations.map((item) => (
                    <LocationCard
                      key={item.id}
                      item={item}
                      active={
                        item.id === selected?.id
                      }
                      onSelect={() =>
                        setSelectedId(item.id)
                      }
                    />
                  ))
                ) : (
                  <div className="no-locations">
                    <Search size={27} />

                    <h3>
                      No matching entries
                    </h3>

                    <p>
                      Try another material, organisation,
                      service or area.
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

            {/* ORIGINAL DETAILS PANEL */}

            <div className="recycling-map-panel recycling-live-detail-panel">
              {selected ? (
                <LocationDetails location={selected} />
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

          {/* ORIGINAL RESEARCH WARNING */}

          <div className="recycling-prototype-note">
            <ShieldAlert size={18} />

            <div>
              <strong>
                Research preview — not a verified
                public recycling directory yet
              </strong>

              <p>
                The directory currently contains{" "}
                {recyclingLocations.length} research records.
                Some are processing plants, government
                authorities, pickup networks, partner leads
                or informal markets rather than public
                drop-off centres. Verify operating status,
                materials, access, minimum quantities
                and hours before visiting.
              </p>

              <p>
                No GPS distances have been invented.
                A separate research list also contains{" "}
                {additionalResearchLeads.length} initiatives
                requiring more specific location information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   ORIGINAL LOCATION CARD
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
      className={`recycling-location-card ${
        active ? "active" : ""
      }`}
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

          <ChevronRight size={14} />
        </div>

        <div className="location-card-area">
          <MapPin size={14} />
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
          {(item.materials ?? [])
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

/* =========================================================
   LOCATION DETAILS

   Preserves the old visual structure and actions.
========================================================= */

function LocationDetails({ location }) {
  const hasMapSearch = canSearchMaps(location);
  const hasPhone = (location.phones ?? []).length > 0;

  return (
    <>
      {/* ORIGINAL MAP PLACEHOLDER */}

      <div className="recycling-live-map-placeholder">
        <div
          className="recycling-live-map-lines"
          aria-hidden="true"
        />

        <div className="recycling-live-map-message">
          <MapPin size={30} />

          <strong>
            {location.area}
          </strong>

          <span>
            {hasMapSearch
              ? "Exact map pin pending verification"
              : "No fixed public drop-off location supplied"}
          </span>

          {hasMapSearch && (
            <a
              href={mapsSearchUrl(location)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Search this location on Google Maps

              <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>

      {/* ORIGINAL LOCATION INFORMATION */}

      <div className="selected-location-detail">
        <div className="selected-location-top">
          <div>
            <span className="selected-location-label">
              Selected research entry · {location.id}
            </span>

            <h3>
              {location.name}
            </h3>
          </div>

          <span className="recycling-live-status">
            <ShieldAlert size={14} />

            {location.status === "verified"
              ? "Verified"
              : "Not yet field-verified"}
          </span>
        </div>

        {/* ADDRESS AND HOURS */}

        <div className="selected-location-meta">
          <span>
            <MapPin size={15} />
            {location.address}
          </span>

          <span>
            <Clock3 size={15} />

            {location.hours ??
              "Opening hours not supplied"}
          </span>
        </div>

        {/* ORIGINAL NOTES */}

        <p>
          {location.notes}
        </p>

        {/* ACCEPTED MATERIALS */}

        <div className="accepted-materials">
          <span>
            Materials listed in research —
            please confirm
          </span>

          <div>
            {(location.materials ?? []).length > 0 ? (
              location.materials.map((material) => (
                <span key={material}>
                  {material}
                </span>
              ))
            ) : (
              <span>
                Materials not confirmed
              </span>
            )}
          </div>
        </div>

        {/* RESEARCH INFORMATION */}

        <div className="recycling-live-context">
          <strong>
            {location.type}
          </strong>

          <span>
            {location.audience === "commercial"
              ? "Research indicates commercial / industrial focus; individual drop-off is not confirmed."
              : "Public and school drop-off eligibility has not been independently confirmed."}
          </span>

          <span>
            Research area: {location.region}
          </span>

          <span>
            Service category: {getServiceGroup(location)}
          </span>

          <small>
            Source: {location.source ?? "Team research"}
            {location.sourcePage
              ? `, page ${location.sourcePage}`
              : ""}
            . Verification date:{" "}
            {location.lastVerifiedAt ?? "not provided"}.
          </small>
        </div>

        {/* ORIGINAL ACTION BUTTONS */}

        <div className="selected-location-actions">
          {hasMapSearch ? (
            <a
              className="directions-button"
              href={mapsSearchUrl(location)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation size={16} />

              Find on Maps

              <ArrowUpRight size={15} />
            </a>
          ) : (
            <span className="recycling-live-no-phone">
              Physical drop-off address unavailable
            </span>
          )}

          {hasPhone ? (
            <a
              className="location-details-button"
              href={`tel:${location.phones[0]}`}
            >
              <Phone size={16} />

              Call to verify
            </a>
          ) : (
            <span className="recycling-live-no-phone">
              Phone not available in research
            </span>
          )}
        </div>

        {/* ORIGINAL WARNING */}

        <div className="recycling-live-warning">
          <ShieldAlert size={16} />

          <span>
            Climatica has not independently confirmed that
            this organisation currently operates, accepts
            the reported materials or welcomes public
            drop-offs. Some entries are pickup services,
            partner leads or industrial facilities.
            Contact the organisation before taking action.
          </span>
        </div>
      </div>
    </>
  );
}

export default Recycling;
