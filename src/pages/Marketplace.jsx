import {
  ArrowLeft,
  ArrowRight,
  Armchair,
  BookOpen,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Gift,
  Heart,
  Laptop,
  Leaf,
  LockKeyhole,
  LogOut,
  MapPin,
  Package,
  Plus,
  Recycle,
  Repeat2,
  Search,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  SlidersHorizontal,
  Tag,
  UserRound,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  useMemo,
  useState,
} from "react";

import climaticaLogo
  from "../assets/climatica-logo.png";

import marketplaceImage
  from "../assets/marketplace-reuse.png";

import marketplaceBackground
  from "../assets/cta-leaf-bg.png";


/* =========================================
   SAMPLE LISTINGS
========================================= */

const initialListings = [
  {
    id: 1,
    title: "HP EliteBook Laptop",
    category: "Electronics",
    type: "For Sale",
    price: "₦145,000",
    condition: "Used — Good",
    location: "Ota, Ogun",
    seller: "Daniel A.",
    time: "2 hours ago",
    description:
      "Working laptop in good condition. Suitable for school, work and everyday use.",
    badge: "Reuse first",
  },

  {
    id: 2,
    title: "University Textbook Bundle",
    category: "Books",
    type: "For Sale",
    price: "₦12,000",
    condition: "Used — Very Good",
    location: "Abeokuta, Ogun",
    seller: "Tolu M.",
    time: "Today",
    description:
      "A collection of university textbooks still in good condition and ready for another student.",
    badge: "Keep in use",
  },

  {
    id: 3,
    title: "Study Desk & Chair",
    category: "Furniture",
    type: "For Sale",
    price: "₦35,000",
    condition: "Used — Good",
    location: "Sango-Ota, Ogun",
    seller: "Kemi O.",
    time: "Yesterday",
    description:
      "Simple study desk and chair set. Still strong and suitable for a student room or home office.",
    badge: "Reusable",
  },

  {
    id: 4,
    title: "Jackets & Shirts Bundle",
    category: "Fashion",
    type: "Free",
    price: "Free",
    condition: "Used — Good",
    location: "Iju, Ogun",
    seller: "Amara E.",
    time: "Yesterday",
    description:
      "Clean clothes available for someone who can still make use of them.",
    badge: "Give away",
  },

  {
    id: 5,
    title: "Clean PET Bottles",
    category: "Materials",
    type: "Barter",
    price: "Barter",
    condition: "Sorted material",
    location: "Ota, Ogun",
    seller: "Community Collector",
    time: "Today",
    description:
      "Clean and separated PET bottles suitable for collection or material recovery.",
    badge: "Recoverable",
  },

  {
    id: 6,
    title: "Reusable Storage Containers",
    category: "Home",
    type: "For Sale",
    price: "₦4,500",
    condition: "Used — Very Good",
    location: "Ado-Odo, Ogun",
    seller: "Sarah K.",
    time: "3 days ago",
    description:
      "A small set of clean household storage containers that are still fully usable.",
    badge: "Reusable",
  },
];


const categories = [
  "All",
  "Electronics",
  "Books",
  "Furniture",
  "Fashion",
  "Materials",
  "Home",
];


const transactionTypes = [
  "All",
  "For Sale",
  "Free",
  "Barter",
];


/* =========================================
   DEMO AUTH
========================================= */

const getStoredUser = () => {
  try {
    const stored =
      localStorage.getItem(
        "climatica-demo-user"
      );

    return stored
      ? JSON.parse(stored)
      : null;
  } catch {
    return null;
  }
};


function Marketplace() {
  const [listings, setListings] =
    useState(initialListings);

  const [searchValue, setSearchValue] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [
    transactionType,
    setTransactionType,
  ] = useState("All");

  const [
    selectedListing,
    setSelectedListing,
  ] = useState(null);

  const [
    showCreateListing,
    setShowCreateListing,
  ] = useState(false);

  const [
    savedItems,
    setSavedItems,
  ] = useState([]);

  const [user, setUser] =
    useState(getStoredUser);

  const [
    authPrompt,
    setAuthPrompt,
  ] = useState(null);


  /* =========================================
     FILTERING
  ========================================= */

  const filteredListings =
    useMemo(() => {
      return listings.filter(
        (listing) => {
          const search =
            searchValue
              .trim()
              .toLowerCase();


          const matchesSearch =
            !search ||
            listing.title
              .toLowerCase()
              .includes(search) ||
            listing.category
              .toLowerCase()
              .includes(search) ||
            listing.location
              .toLowerCase()
              .includes(search);


          const matchesCategory =
            category === "All" ||
            listing.category ===
              category;


          const matchesType =
            transactionType ===
              "All" ||
            listing.type ===
              transactionType;


          return (
            matchesSearch &&
            matchesCategory &&
            matchesType
          );
        }
      );
    }, [
      listings,
      searchValue,
      category,
      transactionType,
    ]);


  /* =========================================
     AUTH GATE
  ========================================= */

  const requireAuth = (
    action,
    callback
  ) => {
    if (user) {
      callback();
      return;
    }

    setAuthPrompt({
      action,
      callback,
    });
  };


  const demoSignIn = () => {
    const demoUser = {
      id: "demo-user-1",
      name: "Demo User",
      email:
        "demo@climatica.app",
    };


    localStorage.setItem(
      "climatica-demo-user",
      JSON.stringify(demoUser)
    );


    setUser(demoUser);


    const pendingAction =
      authPrompt?.callback;


    setAuthPrompt(null);


    if (pendingAction) {
      setTimeout(() => {
        pendingAction();
      }, 100);
    }
  };


  const signOut = () => {
    localStorage.removeItem(
      "climatica-demo-user"
    );

    setUser(null);

    setSavedItems([]);
  };


  /* =========================================
     PROTECTED ACTIONS
  ========================================= */

  const handleListItem = () => {
    requireAuth(
      "list an item",
      () =>
        setShowCreateListing(
          true
        )
    );
  };


  const handleSaveItem = (
    id
  ) => {
    requireAuth(
      "save marketplace items",
      () => {
        setSavedItems(
          (current) => {
            if (
              current.includes(id)
            ) {
              return current.filter(
                (itemId) =>
                  itemId !== id
              );
            }

            return [
              ...current,
              id,
            ];
          }
        );
      }
    );
  };


  const handleContactSeller =
    (listing) => {
      requireAuth(
        "contact sellers",
        () => {
          alert(
            `Prototype: opening contact options for ${listing.seller}.`
          );
        }
      );
    };


  /* =========================================
     CREATE LISTING
  ========================================= */

  const addListing = (
    newListing
  ) => {
    setListings(
      (current) => [
        {
          ...newListing,

          id:
            Date.now(),

          seller:
            user?.name ||
            "Demo User",

          time:
            "Just now",

          badge:
            newListing.type ===
            "Free"
              ? "Give away"
              : newListing.type ===
                  "Barter"
                ? "Exchange"
                : "Reuse first",
        },

        ...current,
      ]
    );

    setShowCreateListing(
      false
    );
  };


  return (
    <main className="marketplace-page">

      {/* =====================================
          HERO
      ====================================== */}

      <section
        className="marketplace-hero"
        style={{
          backgroundImage:
            `url(${marketplaceBackground})`,
        }}
      >

        <div className="marketplace-hero-overlay" />


        {/* NAV */}

        <header className="marketplace-navbar">

          <Link
            to="/"
            className="marketplace-logo"
          >
            <img
              src={climaticaLogo}
              alt="Climatica"
            />
          </Link>


          <div className="marketplace-nav-actions">

            <Link
              to="/"
              className="marketplace-back"
            >
              <ArrowLeft
                size={17}
              />

              Back home
            </Link>


            {user && (
              <div className="marketplace-user-pill">

                <UserRound
                  size={16}
                />

                <span>
                  {user.name}
                </span>

              </div>
            )}


            {user && (
              <button
                type="button"
                className="marketplace-signout"
                onClick={signOut}
                aria-label="Sign out"
              >
                <LogOut
                  size={17}
                />
              </button>
            )}


            <button
              type="button"
              className="marketplace-list-button"
              onClick={
                handleListItem
              }
            >
              {!user && (
                <LockKeyhole
                  size={15}
                />
              )}

              <Plus size={17} />

              List an Item
            </button>

          </div>

        </header>


        {/* HERO CONTENT */}

        <div className="marketplace-hero-layout">

          <div className="marketplace-hero-copy">

            <div className="marketplace-eyebrow">

              <Repeat2
                size={16}
              />

              Circular Marketplace

            </div>


            <h1>
              Give useful things
              another life.
            </h1>


            <p>
              Buy, sell, give away
              or exchange useful
              items and recoverable
              materials before they
              become waste.
            </p>


            <div className="marketplace-hero-actions">

              <a
                href="#marketplace-listings"
                className="marketplace-explore-button"
              >
                Explore Items

                <ArrowRight
                  size={18}
                />
              </a>


              <button
                type="button"
                className="marketplace-sell-button"
                onClick={
                  handleListItem
                }
              >
                {!user && (
                  <LockKeyhole
                    size={16}
                  />
                )}

                <Plus
                  size={18}
                />

                List Something
              </button>

            </div>


            <div className="marketplace-principle">

              <Leaf size={17} />

              <p>
                If someone can still
                use it, it may not need
                to become waste yet.
              </p>

            </div>

          </div>


          {/* IMAGE */}

          <div className="marketplace-hero-image">

            <img
              src={marketplaceImage}
              alt="People exchanging reusable items"
            />


            <div className="marketplace-image-overlay" />


            <div className="marketplace-image-caption">

              <Recycle
                size={20}
              />


              <div>

                <span>
                  Circular action
                </span>

                <strong>
                  Reuse before disposal.
                </strong>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          MARKETPLACE PURPOSE
      ====================================== */}

      <section className="marketplace-intro-section">

        <div className="marketplace-container">

          <div className="marketplace-section-heading">

            <div>

              <span className="marketplace-section-label">
                Keep things moving
              </span>


              <h2>
                More than buying
                and selling.
              </h2>

            </div>


            <p>
              Climatica helps useful
              products and recoverable
              materials move to another
              person instead of moving
              directly into the waste
              stream.
            </p>

          </div>


          <div className="marketplace-action-grid">

            <MarketplaceAction
              icon={
                CircleDollarSign
              }
              title="Sell"
              text="Recover value from items you no longer need."
            />


            <MarketplaceAction
              icon={
                ShoppingBag
              }
              title="Buy"
              text="Choose a useful second-hand item instead of always buying new."
            />


            <MarketplaceAction
              icon={Gift}
              title="Give Away"
              text="Pass useful items to someone who can still make use of them."
            />


            <MarketplaceAction
              icon={Repeat2}
              title="Barter"
              text="Exchange items or materials without requiring a cash transaction."
            />

          </div>

        </div>

      </section>


      {/* =====================================
          BROWSE MARKETPLACE
      ====================================== */}

      <section
        className="marketplace-browse-section"
        id="marketplace-listings"
      >

        <div className="marketplace-container">

          <div className="marketplace-browse-heading">

            <div>

              <span className="marketplace-section-label">
                Marketplace
              </span>

              <h2>
                Discover what's
                already useful.
              </h2>

            </div>


            <button
              type="button"
              className="marketplace-heading-list-button"
              onClick={
                handleListItem
              }
            >
              {!user && (
                <LockKeyhole
                  size={15}
                />
              )}

              <Plus size={18} />

              List an Item
            </button>

          </div>


          {/* SEARCH */}

          <div className="marketplace-search-area">

            <div className="marketplace-search">

              <Search
                size={20}
              />

              <input
                type="text"
                value={
                  searchValue
                }
                onChange={(
                  event
                ) =>
                  setSearchValue(
                    event.target
                      .value
                  )
                }
                placeholder="Search laptop, books, furniture, materials..."
              />


              {searchValue && (
                <button
                  type="button"
                  className="marketplace-search-clear"
                  onClick={() =>
                    setSearchValue(
                      ""
                    )
                  }
                >
                  <X size={17} />
                </button>
              )}

            </div>


            <div className="marketplace-filter-indicator">

              <SlidersHorizontal
                size={18}
              />

              Filters

            </div>

          </div>


          {/* TYPES */}

          <div className="marketplace-type-tabs">

            {transactionTypes.map(
              (type) => (
                <button
                  type="button"
                  key={type}
                  className={
                    transactionType ===
                    type
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setTransactionType(
                      type
                    )
                  }
                >
                  {type}
                </button>
              )
            )}

          </div>


          {/* CATEGORIES */}

          <div className="marketplace-category-row">

            <span>
              Category
            </span>


            <div>

              {categories.map(
                (item) => (
                  <button
                    type="button"
                    key={item}
                    className={
                      category ===
                      item
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setCategory(
                        item
                      )
                    }
                  >
                    {item}
                  </button>
                )
              )}

            </div>

          </div>


          <div className="marketplace-results-row">

            <p>
              Showing{" "}

              <strong>
                {
                  filteredListings.length
                }
              </strong>

              {" "}demo listings
            </p>


            {(
              category !== "All" ||
              transactionType !== "All" ||
              searchValue
            ) && (
              <button
                type="button"
                onClick={() => {
                  setCategory(
                    "All"
                  );

                  setTransactionType(
                    "All"
                  );

                  setSearchValue(
                    ""
                  );
                }}
              >
                Clear filters
              </button>
            )}

          </div>


          {/* LISTING GRID */}

          {filteredListings.length >
          0 ? (

            <div className="marketplace-listing-grid">

              {filteredListings.map(
                (listing) => (
                  <MarketplaceCard
                    key={
                      listing.id
                    }
                    listing={
                      listing
                    }
                    saved={
                      savedItems.includes(
                        listing.id
                      )
                    }
                    onSave={() =>
                      handleSaveItem(
                        listing.id
                      )
                    }
                    onView={() =>
                      setSelectedListing(
                        listing
                      )
                    }
                  />
                )
              )}

            </div>

          ) : (

            <div className="marketplace-empty">

              <Search
                size={34}
              />


              <h3>
                No matching items.
              </h3>


              <p>
                Try another search,
                category or transaction
                type.
              </p>


              <button
                type="button"
                onClick={() => {
                  setSearchValue(
                    ""
                  );

                  setCategory(
                    "All"
                  );

                  setTransactionType(
                    "All"
                  );
                }}
              >
                Clear Filters
              </button>

            </div>

          )}

        </div>

      </section>


      {/* =====================================
          RECYCLING CTA
      ====================================== */}

      <section className="marketplace-recovery-section">

        <div className="marketplace-container">

          <div className="marketplace-recovery-card">

            <div className="marketplace-recovery-icon">

              <Recycle
                size={34}
              />

            </div>


            <div className="marketplace-recovery-copy">

              <span>
                Have recyclable material instead?
              </span>


              <h2>
                Find someone who
                can recover it.
              </h2>


              <p>
                If an item has reached
                the end of its useful life,
                Climatica can help you
                find an appropriate
                recycling option.
              </p>

            </div>


            <Link
              to="/recycling"
              className="marketplace-recycling-link"
            >
              Find Recycling

              <ArrowRight
                size={18}
              />
            </Link>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="marketplace-footer">

        <Leaf size={15} />

        <span>
          Prototype marketplace —
          listings and transactions
          are simulated.
        </span>

      </footer>


      {/* =====================================
          ITEM DETAILS
      ====================================== */}

      {selectedListing && (
        <ItemModal
          listing={
            selectedListing
          }
          onClose={() =>
            setSelectedListing(
              null
            )
          }
          saved={
            savedItems.includes(
              selectedListing.id
            )
          }
          onSave={() =>
            handleSaveItem(
              selectedListing.id
            )
          }
          onContact={() =>
            handleContactSeller(
              selectedListing
            )
          }
          user={user}
        />
      )}


      {/* =====================================
          CREATE LISTING
      ====================================== */}

      {showCreateListing && (
        <CreateListingModal
          onClose={() =>
            setShowCreateListing(
              false
            )
          }
          onSubmit={
            addListing
          }
        />
      )}


      {/* =====================================
          AUTH GATE
      ====================================== */}

      {authPrompt && (
        <AuthGateModal
          action={
            authPrompt.action
          }
          onClose={() =>
            setAuthPrompt(null)
          }
          onDemoSignIn={
            demoSignIn
          }
        />
      )}

    </main>
  );
}


/* =========================================
   ACTION CARD
========================================= */

function MarketplaceAction({
  icon: Icon,
  title,
  text,
}) {
  return (
    <article className="marketplace-action-card">

      <div className="marketplace-action-icon">

        <Icon
          size={25}
          strokeWidth={1.7}
        />

      </div>


      <h3>
        {title}
      </h3>


      <p>
        {text}
      </p>

    </article>
  );
}


/* =========================================
   MARKETPLACE CARD
========================================= */

function MarketplaceCard({
  listing,
  saved,
  onSave,
  onView,
}) {
  const Icon =
    getCategoryIcon(
      listing.category
    );


  return (
    <article className="marketplace-listing-card">

      <div className="listing-visual">

        <div className="listing-category-icon">

          <Icon
            size={43}
            strokeWidth={1.45}
          />

        </div>


        <span className="listing-badge">
          {listing.badge}
        </span>


        <button
          type="button"
          className={`
            listing-save-button
            ${
              saved
                ? "saved"
                : ""
            }
          `}
          onClick={onSave}
          aria-label="Save item"
        >
          <Heart
            size={19}
            fill={
              saved
                ? "currentColor"
                : "none"
            }
          />
        </button>


        <div className="listing-type-pill">

          {listing.type ===
            "Free" && (
            <Gift size={14} />
          )}

          {listing.type ===
            "Barter" && (
            <Repeat2
              size={14}
            />
          )}

          {listing.type ===
            "For Sale" && (
            <Tag size={14} />
          )}

          {listing.type}

        </div>

      </div>


      <div className="listing-content">

        <div className="listing-category">
          {listing.category}
        </div>


        <h3>
          {listing.title}
        </h3>


        <div className="listing-price">
          {listing.price}
        </div>


        <div className="listing-meta">

          <span>

            <MapPin
              size={14}
            />

            {listing.location}

          </span>


          <span>

            <Clock3
              size={14}
            />

            {listing.time}

          </span>

        </div>


        <div className="listing-condition">

          <CheckCircle2
            size={15}
          />

          {listing.condition}

        </div>


        <button
          type="button"
          className="listing-view-button"
          onClick={onView}
        >
          View Item

          <ArrowRight
            size={17}
          />
        </button>

      </div>

    </article>
  );
}


/* =========================================
   ITEM DETAIL
========================================= */

function ItemModal({
  listing,
  onClose,
  saved,
  onSave,
  onContact,
  user,
}) {
  const Icon =
    getCategoryIcon(
      listing.category
    );


  return (
    <div
      className="marketplace-modal-backdrop"
      onMouseDown={
        onClose
      }
    >

      <div
        className="marketplace-item-modal"
        onMouseDown={(
          event
        ) =>
          event.stopPropagation()
        }
      >

        <button
          type="button"
          className="marketplace-modal-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>


        <div className="item-modal-visual">

          <div className="item-modal-icon">

            <Icon
              size={68}
              strokeWidth={1.3}
            />

          </div>


          <span>
            {listing.category}
          </span>

        </div>


        <div className="item-modal-copy">

          <div className="item-modal-type">
            {listing.type}
          </div>


          <h2>
            {listing.title}
          </h2>


          <div className="item-modal-price">
            {listing.price}
          </div>


          <p className="item-modal-description">
            {listing.description}
          </p>


          <div className="item-modal-details">

            <div>

              <span>
                Condition
              </span>

              <strong>
                {listing.condition}
              </strong>

            </div>


            <div>

              <span>
                Location
              </span>

              <strong>
                {listing.location}
              </strong>

            </div>

          </div>


          <div className="item-modal-seller">

            <div className="seller-avatar">

              <UserRound
                size={21}
              />

            </div>


            <div>

              <span>
                Listed by
              </span>

              <strong>
                {listing.seller}
              </strong>

            </div>

          </div>


          <div className="item-modal-actions">

            <button
              type="button"
              className="contact-seller-button"
              onClick={
                onContact
              }
            >

              {!user && (
                <LockKeyhole
                  size={17}
                />
              )}

              Contact Seller

              <ArrowRight
                size={18}
              />

            </button>


            <button
              type="button"
              className={`
                save-modal-button

                ${
                  saved
                    ? "saved"
                    : ""
                }
              `}
              onClick={onSave}
            >

              {!user ? (
                <LockKeyhole
                  size={17}
                />
              ) : (
                <Heart
                  size={18}
                  fill={
                    saved
                      ? "currentColor"
                      : "none"
                  }
                />
              )}

              {saved
                ? "Saved"
                : "Save"
              }

            </button>

          </div>


          {!user && (
            <div className="marketplace-login-hint">

              <LockKeyhole
                size={15}
              />

              Sign in to contact
              this seller or save
              this listing.

            </div>
          )}


          <div className="item-prototype-notice">

            <Leaf size={15} />

            Contact and payment
            are simulated in this
            prototype.

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================
   CREATE LISTING
========================================= */

function CreateListingModal({
  onClose,
  onSubmit,
}) {
  const [
    form,
    setForm,
  ] = useState({
    title: "",
    category:
      "Electronics",
    type:
      "For Sale",
    price: "",
    condition:
      "Used — Good",
    location:
      "Ota, Ogun",
    description: "",
  });


  const updateField = (
    field,
    value
  ) => {
    setForm(
      (current) => ({
        ...current,
        [field]: value,
      })
    );
  };


  const handleSubmit = (
    event
  ) => {
    event.preventDefault();


    if (
      !form.title.trim()
    ) {
      return;
    }


    let displayPrice =
      form.price.trim();


    if (
      form.type === "Free"
    ) {
      displayPrice =
        "Free";
    }


    if (
      form.type === "Barter"
    ) {
      displayPrice =
        "Barter";
    }


    if (
      form.type ===
        "For Sale" &&
      !displayPrice
    ) {
      displayPrice =
        "Price on request";
    }


    onSubmit({
      ...form,

      price:
        displayPrice,
    });
  };


  return (
    <div
      className="marketplace-modal-backdrop"
      onMouseDown={onClose}
    >

      <form
        className="create-listing-modal"
        onSubmit={
          handleSubmit
        }
        onMouseDown={(
          event
        ) =>
          event.stopPropagation()
        }
      >

        <div className="create-listing-header">

          <div>

            <span>
              Circular Marketplace
            </span>

            <h2>
              List an item.
            </h2>

          </div>


          <button
            type="button"
            onClick={onClose}
          >
            <X size={21} />
          </button>

        </div>


        <p className="create-listing-intro">
          Add a useful item or
          recoverable material so
          another person can
          potentially keep it in
          circulation.
        </p>


        <div className="create-listing-fields">

          <label className="create-field create-field-full">

            <span>
              Item title
            </span>

            <input
              type="text"
              value={
                form.title
              }
              onChange={(
                event
              ) =>
                updateField(
                  "title",
                  event.target
                    .value
                )
              }
              placeholder="e.g. Used office chair"
              required
            />

          </label>


          <label className="create-field">

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
                updateField(
                  "category",
                  event.target
                    .value
                )
              }
            >
              {categories
                .filter(
                  (item) =>
                    item !==
                    "All"
                )
                .map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
            </select>

          </label>


          <label className="create-field">

            <span>
              Listing type
            </span>

            <select
              value={
                form.type
              }
              onChange={(
                event
              ) =>
                updateField(
                  "type",
                  event.target
                    .value
                )
              }
            >
              <option value="For Sale">
                For Sale
              </option>

              <option value="Free">
                Give Away
              </option>

              <option value="Barter">
                Barter
              </option>
            </select>

          </label>


          {form.type ===
            "For Sale" && (
            <label className="create-field">

              <span>
                Price
              </span>

              <input
                type="text"
                value={
                  form.price
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "price",
                    event.target
                      .value
                  )
                }
                placeholder="e.g. ₦25,000"
              />

            </label>
          )}


          <label className="create-field">

            <span>
              Condition
            </span>

            <select
              value={
                form.condition
              }
              onChange={(
                event
              ) =>
                updateField(
                  "condition",
                  event.target
                    .value
                )
              }
            >
              <option>
                New
              </option>

              <option>
                Used — Very Good
              </option>

              <option>
                Used — Good
              </option>

              <option>
                Used — Fair
              </option>

              <option>
                Sorted material
              </option>
            </select>

          </label>


          <label className="create-field create-field-full">

            <span>
              Location
            </span>

            <input
              type="text"
              value={
                form.location
              }
              onChange={(
                event
              ) =>
                updateField(
                  "location",
                  event.target
                    .value
                )
              }
            />

          </label>


          <label className="create-field create-field-full">

            <span>
              Description
            </span>

            <textarea
              value={
                form.description
              }
              onChange={(
                event
              ) =>
                updateField(
                  "description",
                  event.target
                    .value
                )
              }
              placeholder="Tell people about the item and its condition..."
            />

          </label>

        </div>


        <div className="create-listing-footer">

          <p>
            Prototype mode —
            this listing is stored
            until the page refreshes.
          </p>


          <div>

            <button
              type="button"
              className="create-cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="create-submit-button"
            >
              <Plus size={17} />

              Publish Listing
            </button>

          </div>

        </div>

      </form>

    </div>
  );
}


/* =========================================
   AUTH GATE
========================================= */

function AuthGateModal({
  action,
  onClose,
  onDemoSignIn,
}) {
  return (
    <div
      className="marketplace-modal-backdrop"
      onMouseDown={onClose}
    >

      <div
        className="marketplace-auth-modal"
        onMouseDown={(
          event
        ) =>
          event.stopPropagation()
        }
      >

        <button
          type="button"
          className="auth-modal-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>


        <div className="auth-modal-icon">

          <LockKeyhole
            size={27}
          />

        </div>


        <span className="auth-modal-eyebrow">
          Account required
        </span>


        <h2>
          Sign in to
          {` ${action}.`}
        </h2>


        <p>
          Visitors can browse
          Climatica freely, but
          account-specific actions
          require a signed-in user.
        </p>


        <div className="auth-benefits">

          <span>

            <ShieldCheck
              size={16}
            />

            Save marketplace items

          </span>


          <span>

            <ShieldCheck
              size={16}
            />

            Contact sellers

          </span>


          <span>

            <ShieldCheck
              size={16}
            />

            List, sell, give away
            or barter items

          </span>

        </div>


        <button
          type="button"
          className="auth-demo-signin"
          onClick={
            onDemoSignIn
          }
        >
          <UserRound
            size={18}
          />

          Sign In — Demo

          <ArrowRight
            size={18}
          />
        </button>


        <p className="auth-demo-note">
          Real account creation
          and authentication will
          replace this demo action
          in the authentication chunk.
        </p>

      </div>

    </div>
  );
}


/* =========================================
   ICON HELPER
========================================= */

function getCategoryIcon(
  category
) {
  switch (category) {
    case "Electronics":
      return Laptop;

    case "Books":
      return BookOpen;

    case "Furniture":
      return Armchair;

    case "Fashion":
      return Shirt;

    case "Materials":
      return Recycle;

    default:
      return Package;
  }
}


export default Marketplace;