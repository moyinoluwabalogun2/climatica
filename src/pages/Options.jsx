import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CircleDollarSign,
  Leaf,
  Lightbulb,
  MapPin,
  Recycle,
  Repeat2,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import climaticaLogo from "../assets/climatica-logo.png";
import optionsBackground from "../assets/cta-leaf-bg.png";
import demoBottle from "../assets/identify-bottle-demo.jpg";

import demoWasteResults from "../data/demoWasteResults";


function Options() {
  const selectedImage =
    sessionStorage.getItem(
      "climatica-demo-image"
    );

  const selectedExample =
    sessionStorage.getItem(
      "climatica-demo-item"
    );


  const demoKey =
    selectedExample &&
    demoWasteResults[selectedExample]
      ? selectedExample
      : "Plastic bottle";


  const result =
    demoWasteResults[demoKey];


  const displayImage =
    selectedImage || demoBottle;


  const options =
    getRecommendedOptions(demoKey);


  return (
    <main
      className="options-page"
      style={{
        backgroundImage:
          `url(${optionsBackground})`,
      }}
    >

      <div className="options-bg-overlay" />


      {/* =====================================
          NAVBAR
      ====================================== */}

      <header className="options-navbar">

        <Link
          to="/"
          className="options-logo"
        >
          <img
            src={climaticaLogo}
            alt="Climatica"
          />
        </Link>


        <Link
          to="/result"
          className="options-back"
        >
          <ArrowLeft size={15} />

          Back to result
        </Link>

      </header>


      {/* =====================================
          MAIN
      ====================================== */}

      <section className="options-main">

        {/* INTRO */}

        <div className="options-heading">

          <div className="options-eyebrow">

            <Lightbulb size={14} />

            Your next step

          </div>


          <h1>
            What should you
            do with this?
          </h1>


          <p>
            Climatica ranks the most useful actions
            for your item so you don't have to
            understand complicated waste-management
            terminology.
          </p>

        </div>


        {/* =====================================
            ITEM SUMMARY
        ====================================== */}

        <div className="options-item-summary">

          <div className="options-item-image">

            <img
              src={displayImage}
              alt={result.name}
            />

            <div className="options-image-overlay" />

          </div>


          <div className="options-item-copy">

            <span className="options-small-label">
              Your item
            </span>

            <h2>
              {result.name}
            </h2>


            <div className="options-item-meta">

              <span>
                {result.material}
              </span>

              <i />

              <span>
                {result.category}
              </span>

              <i />

              <span className="options-confidence">
                {result.confidence} confidence
              </span>

            </div>

          </div>


          <div className="options-item-status">

            <BadgeCheck size={17} />

            Identified

          </div>

        </div>


        {/* =====================================
            RANKING HEADER
        ====================================== */}

        <div className="options-ranking-heading">

          <div>

            <span className="options-section-label">
              Ranked for this item
            </span>

            <h2>
              Your best options.
            </h2>

          </div>


          <p>
            We prioritise keeping useful materials
            in circulation before general disposal
            whenever it is practical and safe.
          </p>

        </div>


        {/* =====================================
            RANKED OPTIONS
        ====================================== */}

        <div className="options-ranking-list">

          {options.map(
            (option, index) => (
              <OptionCard
                key={option.title}
                option={option}
                index={index}
              />
            )
          )}

        </div>


        {/* =====================================
            EXPLANATION
        ====================================== */}

        <div className="options-explanation">

          <div className="options-explanation-icon">
            <Leaf size={20} />
          </div>


          <div>

            <span>
              Why Climatica ranks actions
            </span>

            <h3>
              Waste isn't always
              the end of an item's life.
            </h3>

            <p>
              Reuse, repair, resale and recycling can
              keep products and materials useful for
              longer. Responsible disposal becomes
              important when those options are not
              suitable or safe.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="options-footer">

        <Leaf size={12} />

        Prototype recommendations are
        simulated for demonstration.

      </footer>

    </main>
  );
}



function OptionCard({
  option,
  index,
}) {
  const Icon = option.icon;


  return (
    <article
      className={`
        option-card
        ${option.recommended
          ? "option-card-recommended"
          : ""
        }
      `}
    >

      {/* NUMBER */}

      <div className="option-rank">

        {String(index + 1).padStart(
          2,
          "0"
        )}

      </div>


      {/* ICON */}

      <div className="option-main-icon">

        <Icon
          size={23}
          strokeWidth={1.8}
        />

      </div>


      {/* COPY */}

      <div className="option-card-copy">

        <div className="option-title-row">

          <h3>
            {option.title}
          </h3>


          {option.recommended && (
            <span className="option-recommended-tag">

              <ShieldCheck size={11} />

              Recommended

            </span>
          )}

        </div>


        <p>
          {option.description}
        </p>


        <div className="option-reason">

          <strong>
            Why?
          </strong>

          <span>
            {option.reason}
          </span>

        </div>

      </div>


      {/* ACTION */}

      {option.link ? (
        <Link
          to={option.link}
          className={`
            option-action-button
            ${option.recommended
              ? "option-primary-action"
              : ""
            }
          `}
        >
          {option.action}

          <ArrowRight size={15} />
        </Link>
      ) : (
        <button
          type="button"
          className="option-action-button"
        >
          {option.action}

          <ArrowRight size={15} />
        </button>
      )}

    </article>
  );
}



/* =========================================
   DEMO RECOMMENDATION LOGIC
========================================= */

function getRecommendedOptions(item) {
  if (item === "Old laptop") {
    return [
      {
        title: "Reuse, repair or sell",
        description:
          "If the laptop still works, extending its useful life is usually better than treating it as waste.",
        reason:
          "Working electronics may still be valuable to another person.",
        action:
          "Explore Marketplace",
        link:
          "/marketplace",
        icon:
          ShoppingBag,
        recommended:
          true,
      },

      {
        title: "Recycle as e-waste",
        description:
          "If it no longer works, use an appropriate electronics recycling service.",
        reason:
          "Electronics contain metals, components and materials that may be recovered.",
        action:
          "Find E-Waste Recycling",
        link:
          "/recycling",
        icon:
          Recycle,
      },

      {
        title: "Donate or give away",
        description:
          "A usable device could support another student, household or organisation.",
        reason:
          "Keeping a product in use prevents premature waste.",
        action:
          "View Reuse Options",
        icon:
          Repeat2,
      },

      {
        title: "Do not dump with general waste",
        description:
          "Damaged electronics should be handled through an appropriate e-waste route.",
        reason:
          "Some electronic components require specialised handling.",
        action:
          "View Safe Guidance",
        icon:
          Trash2,
      },
    ];
  }


  if (item === "Battery") {
    return [
      {
        title: "Use a battery collection point",
        description:
          "Take the battery to an appropriate collection or recycling location.",
        reason:
          "Batteries can contain materials that should not enter ordinary household waste.",
        action:
          "Find Battery Recycling",
        link:
          "/recycling",
        icon:
          Recycle,
        recommended:
          true,
      },

      {
        title: "Store safely until collection",
        description:
          "Keep used batteries dry and separate until you can reach an appropriate collection point.",
        reason:
          "Safe temporary storage reduces the risk of leakage or damage.",
        action:
          "View Storage Guidance",
        icon:
          ShieldCheck,
      },

      {
        title: "Consider rechargeable alternatives",
        description:
          "For future purchases, rechargeable batteries may reduce repeated single-use waste.",
        reason:
          "Using products for longer can reduce material demand.",
        action:
          "Learn More",
        icon:
          Repeat2,
      },

      {
        title: "Avoid general disposal",
        description:
          "Do not intentionally mix batteries with ordinary household waste where specialised collection exists.",
        reason:
          "Battery chemicals and materials may require controlled handling.",
        action:
          "Safe Disposal Guide",
        icon:
          Trash2,
      },
    ];
  }


  if (item === "Aluminium can") {
    return [
      {
        title: "Recycle",
        description:
          "Keep the can separate and take it to a suitable recycler or collection point.",
        reason:
          "Aluminium is a valuable material that can be recovered and recycled.",
        action:
          "Find Recycling",
        link:
          "/recycling",
        icon:
          Recycle,
        recommended:
          true,
      },

      {
        title: "Sell with recyclables",
        description:
          "Some recyclers or collectors may accept aluminium as a recoverable material.",
        reason:
          "Recoverable materials can have value instead of becoming litter.",
        action:
          "Find Buyers",
        icon:
          CircleDollarSign,
      },

      {
        title: "Reuse creatively",
        description:
          "Clean cans may sometimes be reused for suitable non-food purposes or projects.",
        reason:
          "Reuse can delay an item's transition into waste.",
        action:
          "See Ideas",
        icon:
          Repeat2,
      },

      {
        title: "Dispose responsibly",
        description:
          "If recovery is unavailable, place it in the correct waste stream rather than littering.",
        reason:
          "Responsible containment helps prevent environmental pollution.",
        action:
          "View Guidance",
        icon:
          Trash2,
      },
    ];
  }


  /* DEFAULT — PLASTIC BOTTLE */

  return [
    {
      title: "Recycle",
      description:
        "Keep the bottle separate and take it to an appropriate PET recycling or collection point.",
      reason:
        "PET plastic can potentially be recovered and processed into new materials.",
      action:
        "Find Recycling",
      link:
        "/recycling",
      icon:
        Recycle,
      recommended:
        true,
    },

    {
      title: "Reuse",
      description:
        "Consider whether the bottle can serve another appropriate purpose before becoming waste.",
      reason:
        "Extending an item's useful life can reduce immediate waste generation.",
      action:
        "See Reuse Ideas",
      icon:
        Repeat2,
    },

    {
      title: "Sell or give to a collector",
      description:
        "A recycler, collector or waste recovery partner may accept PET bottles.",
      reason:
        "Recoverable plastic can have value within the recycling chain.",
      action:
        "Explore Options",
      icon:
        CircleDollarSign,
    },

    {
      title: "Dispose responsibly",
      description:
        "If recycling or reuse isn't available, keep the bottle contained and use an appropriate waste bin.",
      reason:
        "Correct disposal prevents litter from reaching drains, waterways and open spaces.",
      action:
        "View Guidance",
      icon:
        Trash2,
    },
  ];
}


export default Options;