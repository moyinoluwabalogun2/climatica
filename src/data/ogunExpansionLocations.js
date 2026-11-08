

/**
 * CLIMATICA — OGUN STATE EXPANSION
 *
 * 27 additional RESEARCH records.
 *
 * 7  Abeokuta North
 * 16 Obafemi Owode
 * 4  Odeda / Abeokuta
 *
 * These records have NOT been independently verified
 * by Climatica.
 *
 * No fictional GPS coordinates or verified distances.
 */

const SOURCES = {
  abeokuta: "Abeokuta North team research",
  owode: "Obafemi Owode Recycling Locations",
  odeda: "Odeda Recycling Locations",
};

/**
 * Consistent record structure for the directory.
 */
function createRecord(entry, region, source) {
  return {
    ...entry,

    region,
    source,
    state: "Ogun",
    country: "Nigeria",

    phones: entry.phones ?? [],
    materials: entry.materials ?? [],
    hours: entry.hours ?? null,
    audience: entry.audience ?? "unknown",

    mapSearchable: entry.mapSearchable === true,

    // Research is not independent verification.
    status: "research",
    lastVerifiedAt: null,
    verificationMethod: null,

    latitude: null,
    longitude: null,

    pickup: entry.pickup ?? null,
    publicDropoff: entry.publicDropoff ?? null,
    schoolDropoff: entry.schoolDropoff ?? null,
  };
}

/* =====================================================
   ABEOKUTA NORTH — 7 RESEARCH LEADS
===================================================== */

const abeokutaNorth = [
  {
    id: "og-an-001",
    name: "OGWAMA — Ogun State Waste Management Authority",
    type: "Government waste management authority",
    listingKind: "authority",
    area: "Ibara, Abeokuta",
    address:
      "3 Presidential Boulevard, Ibara, Abeokuta, Ogun State",
    phones: [
      "+2348023726062",
      "+2348037278932",
      "+2349010480056",
    ],
    mapSearchable: true,
    notes:
      "Government waste-management and PSP referral contact. Not a confirmed recyclable-material drop-off centre. Confirm current contact details and service coverage.",
  },
  {
    id: "og-an-002",
    name: "Ogun State Ministry of Environment",
    type: "Government environmental authority",
    listingKind: "authority",
    area: "Oke-Mosan, Abeokuta",
    address:
      "Oke-Mosan, Obas Complex, Abeokuta, Ogun State",
    phones: ["+2349010480056"],
    mapSearchable: true,
    notes:
      "Government environmental office and potential research contact. Not a public buyback or recycling depot.",
  },
  {
    id: "og-an-003",
    name: "FUNAAB Recycling Hub — Alabata",
    type: "University recycling research lead",
    listingKind: "research_partner",
    area: "Alabata, Abeokuta North",
    address: "Alabata, Abeokuta North, Ogun State",
    phones: [
      "+2348055249564",
      "+2349013750112",
    ],
    notes:
      "Potential university recycling initiative. Exact accepted materials, operating location and public/student access still need confirmation.",
  },
  {
    id: "og-an-004",
    name: "FABE International Foundation",
    type: "Environmental education / potential partner",
    listingKind: "research_partner",
    area: "Abeokuta North",
    address: "No collection-point address supplied",
    notes:
      "Potential environmental education and partnership lead. Not a confirmed collection or recycling point.",
  },
  {
    id: "og-an-005",
    name: "Obalende Scrapyard — Idi-Aba",
    type: "Informal scrap-dealer research lead",
    listingKind: "informal_market",
    area: "Obalende / Idi-Aba, Abeokuta North",
    address:
      "Obalende, Idi-Aba, Abeokuta, Ogun State",
    notes:
      "Informal scrap-market research lead. Individual dealers, accepted materials and access must be checked before recommending it.",
  },
  {
    id: "og-an-006",
    name: "RecyclePoints — Ogun Agent Coverage",
    type: "Recycling agent / pickup network",
    listingKind: "agent_network",
    area: "Reported Ogun State coverage",
    address:
      "Reported service coverage in Ogun State; no specific local collection point supplied",
    phones: [
      "+2348098009003",
      "+2348053242182",
      "+2348098002400",
      "+2347035779185",
    ],
    notes:
      "Reported agent-network service. Confirm current coverage, pricing, material eligibility and pickup availability.",
  },
  {
    id: "og-an-007",
    name: "Lafenwa / Kemta PSP Operator Referral",
    type: "Government collection referral",
    listingKind: "psp_referral",
    area: "Lafenwa, Kemta, Ita-Oshin and Saje",
    address:
      "Reported collection coverage in Abeokuta, Ogun State",
    phones: ["+2348023726062"],
    notes:
      "Referral lead for finding the assigned waste collection operator. This is not a named public recycling centre.",
  },
];

/* =====================================================
   OBAFEMI OWODE — 16 RESEARCH RECORDS
===================================================== */

const obafemiOwode = [
  {
    id: "og-ow-001",
    name: "Polysmart Packaging Limited",
    type: "Industrial PET recycling / bulk buyback",
    listingKind: "industrial",
    area: "Mowe, Obafemi Owode",
    address: "Mowe axis, Obafemi Owode, Ogun State",
    materials: ["PET"],
    audience: "commercial",
    notes:
      "Research describes industrial PET processing and aggregation. Public walk-in collection has not been confirmed.",
    sourcePage: 1,
  },
  {
    id: "og-ow-002",
    name: "Lexsz Plastics Ltd",
    type: "Industrial PET processor",
    listingKind: "industrial",
    area: "Mowe, Obafemi Owode",
    address:
      "Gate B, Km 40, Lagos-Ibadan Expressway, Mowe, Ogun State",
    materials: ["PET"],
    audience: "commercial",
    mapSearchable: true,
    notes:
      "Research indicates commercial-scale PET processing and deliveries. Household walk-ins are not confirmed.",
    sourcePage: 1,
  },
  {
    id: "og-ow-003",
    name: "Nilloc Recycling and Plastic Products Ltd",
    type: "Industrial plastics recycler",
    listingKind: "industrial",
    area: "Ajura, Obafemi Owode",
    address:
      "Jokuto Village, Shiun-Oghere Road, Ajura, Obafemi Owode, Ogun State",
    materials: ["HDPE", "PET", "PP"],
    audience: "commercial",
    mapSearchable: true,
    notes:
      "Research also lists an office near Shimawa Road, Mowe. Factory access, accepted materials and delivery requirements need confirmation.",
    sourcePage: 1,
  },
  {
    id: "og-ow-004",
    name: "Baknov Recycling International Co Ltd",
    type: "Industrial materials recycling",
    listingKind: "industrial",
    area: "Mowe, Obafemi Owode",
    address:
      "Km 36, Lagos-Ibadan Expressway, Mowe, Ogun State",
    materials: [
      "Plastic containers",
      "Other metal",
      "Cardboard",
    ],
    audience: "commercial",
    mapSearchable: true,
    notes:
      "Research mentions plastic containers, metal scrap and cardboard. Confirm grades, minimum quantities and whether members of the public can deliver.",
    sourcePage: 1,
  },
  {
    id: "og-ow-005",
    name: "Polysmart Group Processing Plant",
    type: "Industrial plastics processing",
    listingKind: "industrial",
    area: "Ileke Town, Obafemi Owode",
    address:
      "Km 53, Lagos-Ibadan Expressway, Ileke Town, Ogun State",
    phones: ["+2348180740954"],
    materials: ["PET", "PP", "HDPE"],
    audience: "commercial",
    publicDropoff: false,
    mapSearchable: true,
    notes:
      "Research indicates processing through independent dealers rather than general public drop-off. Check whether this is part of the same organisation as Polysmart Packaging Limited.",
    sourcePage: 1,
  },
  {
    id: "og-ow-006",
    name: "Ablettmax Recycling Facility",
    type: "Industrial recycling / education",
    listingKind: "industrial",
    area: "Oke, Obafemi Owode",
    address:
      "Oke, Obafemi Owode LGA, Ogun State",
    materials: [
      "HDPE",
      "PP",
      "PET",
      "E-Waste",
    ],
    audience: "commercial",
    notes:
      "Research mentions industrial plastics recycling, e-waste and educational activities. Specialist e-waste handling and public access are unconfirmed.",
    sourcePage: 1,
  },
  {
    id: "og-ow-007",
    name: "Greenbase Recycling",
    type: "Packaging waste recycler",
    listingKind: "industrial",
    area: "Obafemi Owode Expressway corridor",
    address:
      "Lagos-Ibadan Expressway corridor, Obafemi Owode, Ogun State",
    phones: ["+2348182820844"],
    materials: [
      "Cardboard",
      "Mixed plastic",
      "Sachet plastic",
    ],
    notes:
      "Research mentions carton, rigid-plastic and nylon recovery. Exact operating location and public drop-off terms need confirmation.",
    sourcePage: 2,
  },
  {
    id: "og-ow-008",
    name: "Scrapays Agent Network — Mowe / Ibafo",
    type: "Mobile recycling pickup network",
    listingKind: "agent_network",
    area: "Mowe / Ibafo, Obafemi Owode",
    address:
      "Mobile agent coverage reported around Mowe and Ibafo, Ogun State",
    materials: [
      "Mixed plastic",
      "Aluminium",
      "Other metal",
      "E-Waste",
      "Cardboard",
    ],
    notes:
      "Research describes neighbourhood agents and possible minimum pickup quantities. Current availability, pricing and thresholds require confirmation.",
    sourcePage: 2,
  },
  {
    id: "og-ow-009",
    name: "Switch Recycling — Obafemi Owode",
    type: "Plastic buyback / field-agent network",
    listingKind: "agent_network",
    area: "Obafemi Owode",
    address:
      "Reported field-service coverage in Obafemi Owode",
    materials: ["Mixed plastic"],
    notes:
      "Reported residential plastics collection. No confirmed fixed local drop-off point or current service terms.",
    sourcePage: 2,
  },
  {
    id: "og-ow-010",
    name: "Ibafo Express Scrap & Metal Aggregators",
    type: "Informal scrap market",
    listingKind: "informal_market",
    area: "Ibafo, Obafemi Owode",
    address:
      "Near Ibafo Police Station, off Lagos-Ibadan Expressway, Ogun State",
    materials: [
      "Other metal",
      "Aluminium",
      "Mixed plastic",
    ],
    notes:
      "Research describes local scrap traders rather than one verified organisation. Avoid recommending battery disposal without specialist confirmation.",
    sourcePage: 2,
  },
  {
    id: "og-ow-011",
    name: "Mowe Junction Scrap and Carton Merchants",
    type: "Informal recycling market",
    listingKind: "informal_market",
    area: "Mowe Junction, Obafemi Owode",
    address:
      "Informal markets around Mowe Junction, Ogun State",
    materials: [
      "Cardboard",
      "Paper",
      "Aluminium",
      "Mixed plastic",
    ],
    notes:
      "Reported carton, newspaper and scrap buyers. Individual traders, prices and operating hours must be verified.",
    sourcePage: 2,
  },
  {
    id: "og-ow-012",
    name: "Tobby Global Ventures",
    type: "OGWAMA PSP waste collection",
    listingKind: "psp",
    area: "Mowe / Ogunrun, Obafemi Owode",
    address:
      "Collection zone: Mowe Junction toward Ogunrun Community",
    phones: ["+2348033452553"],
    notes:
      "Reported municipal waste collection operator. Not a recycling buyback or drop-off site. Confirm its current assigned zone.",
    sourcePage: 2,
  },
  {
    id: "og-ow-013",
    name: "Strathmore Global Ventures",
    type: "OGWAMA PSP waste collection",
    listingKind: "psp",
    area: "Mowe / Daima Road, Obafemi Owode",
    address:
      "Collection zone: Daima Road, Gbegira, Imedunla and Imedu Oke Ipa",
    phones: ["+2348023123672"],
    notes:
      "Reported zoned municipal collection operator, not a public recycling drop-off. Current service details are unconfirmed.",
    sourcePage: 2,
  },
  {
    id: "og-ow-014",
    name: "Shola Afomeed Venture",
    type: "OGWAMA PSP waste collection",
    listingKind: "psp",
    area: "Ibafo Ward 2, Obafemi Owode",
    address:
      "Collection zone: Ibafo Ward 2 near Ibafo Police Station",
    phones: ["+2348036828661"],
    notes:
      "Reported municipal collection operator for Ibafo Ward 2. Verify its current service area and contact number.",
    sourcePage: 3,
  },
  {
    id: "og-ow-015",
    name: "Makogi ACDC Cooperative Multipurpose Society",
    type: "OGWAMA PSP waste collection",
    listingKind: "psp",
    area: "Makogi / Sote / Sefu, Obafemi Owode",
    address:
      "Collection zone: Makogi Extension, Sefu 1 and 2, Sote and neighbouring estates",
    phones: ["+2348023013217"],
    notes:
      "Municipal waste collection service. Not a public recycling drop-off. Current operator assignment needs confirmation.",
    sourcePage: 3,
  },
  {
    id: "og-ow-016",
    name: "Rakelli K. M International Enterprises",
    type: "OGWAMA PSP waste collection",
    listingKind: "psp",
    area: "Owode / Siun / Ajura, Obafemi Owode",
    address:
      "Collection zone: Owode, Areke Estate, Kajola, Bara, Orile Imo, Siun to Kobape",
    phones: ["+2348055445454"],
    notes:
      "Reported zoned waste-collection operator. Not a confirmed recycling drop-off or material buyer.",
    sourcePage: 3,
  },
];

/* =====================================================
   ODEDA / ABEOKUTA — 4 RESEARCH RECORDS
===================================================== */

const odeda = [
  {
    id: "og-od-001",
    name: "Verdiq Recycling Saje Hub",
    type: "Recycling buyback / reported drop-off",
    listingKind: "dropoff",
    area: "Saje, Abeokuta",
    address:
      "53 Abule Olobi, Goshen Store, opposite Iya Oniyan Shop, along Mechanic Village, Saje, Abeokuta",
    phones: ["+2348032522489"],
    hours: "Listed: Monday–Saturday, 9:00 AM–5:00 PM",
    materials: ["PET", "Paper"],
    mapSearchable: true,
    notes:
      "Research describes paper and PET collection and cash buyback. Climatica has not independently confirmed current operations, payment or public access.",
    sourcePage: 1,
  },
  {
    id: "og-od-002",
    name: "Scrapays Tioluwani Drop-off Outlet",
    type: "Recycling buyback / reported drop-off",
    listingKind: "dropoff",
    area: "Tioluwani CDA, Abeokuta",
    address:
      "Tioluwani CDA, beside Bislat Pure Water, Abeokuta, Ogun State",
    phones: ["+2348093333477"],
    hours: "Listed: Monday–Saturday, 8:30 AM–6:00 PM",
    materials: [
      "PET",
      "Aluminium",
      "Cardboard",
      "E-Waste",
      "Other metal",
    ],
    mapSearchable: true,
    notes:
      "Research describes material buyback and wallet payments. Confirm current terms and specialist e-waste acceptance before referral.",
    sourcePage: 1,
  },
  {
    id: "og-od-003",
    name: "Verdiq Recycling Limited — Odeda collection",
    type: "Collection / school recycling service",
    listingKind: "collection_service",
    area: "Odeda / Abeokuta",
    address:
      "Mobile collection routes reportedly serving Odeda and Abeokuta",
    hours: "Listed: Monday–Saturday, 9:00 AM–5:00 PM",
    materials: ["PET", "Paper"],
    notes:
      "Reported mobile collection and school recycling programme. Confirm booking, coverage, collection minimums and any fees.",
    sourcePage: 1,
  },
  {
    id: "og-od-004",
    name: "OGWAMA — Odeda Waste Operation",
    type: "Government waste collection / PSP referral",
    listingKind: "psp_referral",
    area: "Odeda, Ogun State",
    address:
      "Odeda service coverage; headquarters at 3 Presidential Boulevard, Ibara, Abeokuta",
    phones: [
      "+2349010480056",
      "+2347068580233",
      "+2348077128635",
    ],
    hours: "Listed: Monday–Friday, 8:00 AM–5:00 PM",
    notes:
      "Government waste-collection and PSP-referral service, not a recycling buyer. Research mentions ordinary sanitation fees.",
    sourcePage: 2,
  },
];

/* =====================================================
   EXPORTED EXPANSION DATA
===================================================== */

export const additionalOgunLocations = [
  ...abeokutaNorth.map((item) =>
    createRecord(item, "Abeokuta North", SOURCES.abeokuta)
  ),

  ...obafemiOwode.map((item) =>
    createRecord(item, "Obafemi Owode", SOURCES.owode)
  ),

  ...odeda.map((item) =>
    createRecord(item, "Odeda / Abeokuta", SOURCES.odeda)
  ),
];
