-- =========================================================
-- CLIMATICA
-- RECYCLING LOCATIONS DATABASE
--
-- FUTURE SUPABASE / POSTGRESQL MIGRATION
--
-- IMPORTANT:
-- This schema is not automatically connected.
-- Do not run it until the backend is configured.
-- =========================================================


-- =========================================================
-- RECYCLING LOCATIONS
-- =========================================================

CREATE TABLE IF NOT EXISTS public.recycling_locations (
    id TEXT PRIMARY KEY,

    name TEXT NOT NULL,

    type TEXT,

    area TEXT,

    address TEXT,

    state TEXT NOT NULL DEFAULT 'Ogun',

    country TEXT NOT NULL DEFAULT 'Nigeria',

    hours TEXT,

    description TEXT,

    audience TEXT NOT NULL DEFAULT 'unknown'
        CHECK (
            audience IN (
                'unknown',
                'commercial',
                'household',
                'both'
            )
        ),

    verification_status TEXT NOT NULL DEFAULT 'research'
        CHECK (
            verification_status IN (
                'research',
                'contacted',
                'verified',
                'rejected',
                'inactive'
            )
        ),

    verification_method TEXT,

    last_verified_at TIMESTAMPTZ,

    latitude DOUBLE PRECISION,

    longitude DOUBLE PRECISION,

    public_dropoff BOOLEAN,

    school_dropoff BOOLEAN,

    pickup_available BOOLEAN,

    minimum_quantity_kg NUMERIC(12, 2),

    source_name TEXT,

    source_url TEXT,

    source_page INTEGER,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- MATERIALS ACCEPTED BY EACH LOCATION
-- =========================================================

CREATE TABLE IF NOT EXISTS public.recycling_location_materials (
    location_id TEXT NOT NULL
        REFERENCES public.recycling_locations(id)
        ON DELETE CASCADE,

    material TEXT NOT NULL,

    PRIMARY KEY (
        location_id,
        material
    )
);


-- =========================================================
-- CONTACT PHONE NUMBERS
-- =========================================================

CREATE TABLE IF NOT EXISTS public.recycling_location_phones (
    location_id TEXT NOT NULL
        REFERENCES public.recycling_locations(id)
        ON DELETE CASCADE,

    phone TEXT NOT NULL,

    PRIMARY KEY (
        location_id,
        phone
    )
);


-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX IF NOT EXISTS recycling_locations_verification_idx
ON public.recycling_locations (
    verification_status,
    area
);


CREATE INDEX IF NOT EXISTS recycling_location_materials_material_idx
ON public.recycling_location_materials (
    material
);


-- =========================================================
-- SECURITY
--
-- Row Level Security is enabled.
-- No public access policy is created yet.
--
-- Future:
-- Authenticated admins can manage research records.
-- Public users should only see approved locations.
-- =========================================================

ALTER TABLE public.recycling_locations
ENABLE ROW LEVEL SECURITY;


ALTER TABLE public.recycling_location_materials
ENABLE ROW LEVEL SECURITY;


ALTER TABLE public.recycling_location_phones
ENABLE ROW LEVEL SECURITY;