
/**
 * CLIMATICA — Combined Ogun State Directory
 *
 * Keeps the original 17-location data module untouched.
 * Imports 27 additional research records.
 *
 * The resulting directory contains 44 research records.
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

/**
 * Add presentation metadata to the original locations,
 * without changing their underlying source records.
 */
const existingLocations = originalLocations.map((item) => ({
  ...item,

  region: "Ota / Sango-Ota",

  listingKind:
    item.audience === "commercial"
      ? "industrial"
      : "recycler",

  // The old catalogue contains researched addresses.
  // These links launch a Google Maps SEARCH,
  // not verified map coordinates.
  mapSearchable: true,
}));

export const recyclingLocations = [
  ...existingLocations,
  ...additionalOgunLocations,
];

export const regionFilters = [
  "All areas",
  "Ota / Sango-Ota",
  "Abeokuta North",
  "Obafemi Owode",
  "Odeda / Abeokuta",
];

export const serviceFilters = [
  "All services",
  "Recycling / buying",
  "Industrial / bulk",
  "Pickup / PSP",
  "Government / partners",
  "Informal markets",
];

export const materialFilters = [
  ...new Set([
    ...originalMaterialFilters,
    "Plastic containers",
  ]),
];

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

export function canSearchMaps(item) {
  return item.mapSearchable !== false;
}

export {
  additionalResearchLeads,
  mapsSearchUrl,
  suggestedMaterialFromAi,
};
