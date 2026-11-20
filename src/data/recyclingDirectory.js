

/**
 * CLIMATICA — Combined Recycling Research Directory
 *
 * Keeps existing source datasets untouched.
 * Adds further team research without repeating
 * organisations already in the previous dataset.
 *
 * Research relevance is not verified service coverage.
 */

import {
  recyclingLocations as originalLocations,
  additionalResearchLeads,
  materialFilters as originalMaterialFilters,
  mapsSearchUrl,
  suggestedMaterialFromAi,
} from "./recyclingLocations";

import {
  additionalOgunLocations,
} from "./ogunExpansionLocations";

import {
  remainingOgunLocations,
} from "./remainingOgunLocations";

/**
 * Cross-references between existing records and
 * research documents covering other LGAs.
 *
 * These do not mean the business is physically
 * in that LGA or provides a pickup there.
 */
const researchMentions = {
  "og-006": ["Yewa North", "Yewa South"],
  "og-007": ["Yewa North", "Yewa South"],

  "og-an-001": [
    "Ifo",
    "Abeokuta South",
    "Sagamu",
    "Ogun Waterside",
  ],

  "og-an-002": [
    "Ifo",
    "Abeokuta South",
    "Sagamu",
  ],

  "og-an-004": ["Abeokuta South"],

  "og-an-006": [
    "Ifo",
    "Abeokuta South",
    "Sagamu",
  ],

  "og-ow-001": ["Ifo"],

  "og-od-001": ["Yewa North"],
  "og-od-002": ["Yewa North"],
};

/**
 * Preserve original dataset.
 */
const existingLocations = originalLocations.map((item) => ({
  ...item,

  region: "Ota / Sango-Ota",

  listingKind:
    item.audience === "commercial"
      ? "industrial"
      : "recycler",

  // Text search only; GPS coordinates not verified.
  mapSearchable: true,

  researchAreas: researchMentions[item.id] ?? [],
}));

/**
 * Preserve previous expansion.
 */
const previousExpansion = additionalOgunLocations.map(
  (item) => ({
    ...item,
    researchAreas:
      researchMentions[item.id] ??
      item.researchAreas ??
      [],
  })
);

/**
 * Complete combined directory.
 */
export const recyclingLocations = [
  ...existingLocations,
  ...previousExpansion,
  ...remainingOgunLocations,
];

/**
 * Ensure IDs stay unique.
 */
const uniqueIds = new Set(
  recyclingLocations.map((item) => item.id)
);

if (uniqueIds.size !== recyclingLocations.length) {
  throw new Error(
    "Climatica recycling directory contains duplicate IDs."
  );
}

/**
 * Areas represented in the research.
 */
export const regionFilters = [
  "All areas",
  "Ota / Sango-Ota",
  "Abeokuta North",
  "Obafemi Owode",
  "Odeda / Abeokuta",
  "Ifo",
  "Ewekoro",
  "Abeokuta South",
  "Sagamu",
  "Odogbolu",
  "Remo North",
  "Yewa North",
  "Yewa South",
  "Ogun Waterside",
  "Ijebu-Ode",
];

/**
 * Preserve service categories.
 */
export const serviceFilters = [
  "All services",
  "Recycling / buying",
  "Industrial / bulk",
  "Pickup / PSP",
  "Government / partners",
  "Informal markets",
];

/**
 * Original materials, plus new researched streams.
 */
export const materialFilters = [
  ...new Set([
    ...originalMaterialFilters,
    "Plastic containers",
    "Organic waste",
    "Used tyres",
    "Used engine oil",
  ]),
];

/**
 * Service-group classification.
 */
export function getServiceGroup(item) {
  switch (item.listingKind) {
    case "industrial":
      return "Industrial / bulk";

    case "psp":
    case "psp_referral":
    case "agent_network":
    case "collection_service":
      return "Pickup / PSP";

    case "authority":
    case "research_partner":
      return "Government / partners";

    case "informal_market":
      return "Informal markets";

    default:
      return "Recycling / buying";
  }
}

/**
 * Region filter also matches research references.
 *
 * A match is NOT proof of geographic proximity,
 * delivery eligibility, pickup or public access.
 */
export function matchesResearchArea(item, selectedArea) {
  return (
    selectedArea === "All areas" ||
    item.region === selectedArea ||
    (item.researchAreas ?? []).includes(selectedArea)
  );
}

/**
 * Map-search availability.
 */
export function canSearchMaps(item) {
  return item.mapSearchable === true;
}

/**
 * Preserve existing helpers.
 */
export {
  additionalResearchLeads,
  mapsSearchUrl,
  suggestedMaterialFromAi,
};
