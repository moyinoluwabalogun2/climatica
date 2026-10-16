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
  Navigate,
} from "react-router-dom";

import climaticaLogo from "../assets/climatica-logo.png";
import optionsBackground from "../assets/cta-leaf-bg.png";
import demoBottle from "../assets/identify-bottle-demo.jpg";

import demoWasteResults from "../data/demoWasteResults";


/* =========================================================
   READ LIVE AI RESULT
========================================================= */

function getStoredAiResult() {
  const stored =
    sessionStorage.getItem(
      "climatica-ai-result"
    );


  if (!stored) {
    return null;
  }


  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error(
      "Could not read Climatica AI result:",
      error
    );

    return null;
  }
}



/* =========================================================
   CONFIDENCE
========================================================= */

function formatConfidence(value) {
  const confidence =
    Number(value);


  if (
    !Number.isFinite(
      confidence
    )
  ) {
    return "Unknown";
  }


  return `${Math.round(
    confidence * 100
  )}%`;
}



/* =========================================================
   LIVE AI → CLIMATICA RECOMMENDATIONS
========================================================= */

function getAiRecommendedOptions(
  wasteType
) {
  switch (wasteType) {

    /* =====================================================
       PET BOTTLE
    ===================================================== */

    case "PET plastic bottle":
      return [
        {
          title:
            "Recycle the bottle",

          description:
            "Keep the bottle separate and take it to a recycling or collection point that accepts PET plastic.",

          reason:
            "PET is a recoverable plastic material and is accepted by a number of plastic recycling operations.",

          action:
            "Find PET Recycling",

          link:
            "/recycling",

          icon:
            Recycle,

          recommended:
            true,
        },

        {
          title:
            "Reuse where appropriate",

          description:
            "If the bottle is still clean and suitable, consider whether it can serve another safe purpose before becoming waste.",

          reason:
            "Extending an item's useful life can reduce immediate waste generation.",

          action:
            "Explore Reuse Ideas",

          link:
            "/learn",

          icon:
            Repeat2,
        },

        {
          title:
            "Give to a collector",

          description:
            "Some waste collectors and recycling businesses accept PET bottles, particularly when several bottles are collected together.",

          reason:
            "Recoverable plastic can have value within the recycling chain.",

          action:
            "Find Collection Points",

          link:
            "/recycling",

          icon:
            CircleDollarSign,
        },

        {
          title:
            "Dispose responsibly",

          description:
            "If recycling or reuse is unavailable, keep the bottle contained and use an appropriate waste stream.",

          reason:
            "Responsible disposal helps prevent plastic from becoming litter or entering waterways.",

          action:
            "Learn More",

          link:
            "/learn",

          icon:
            Trash2,
        },
      ];



    /* =====================================================
       HDPE
    ===================================================== */

    case "HDPE plastic container":
      return [
        {
          title:
            "Recycle as rigid plastic",

          description:
            "Empty and clean the container before taking it to a recycler that accepts rigid HDPE plastic.",

          reason:
            "HDPE is commonly recovered by plastic recycling operations.",

          action:
            "Find Plastic Recycling",

          link:
            "/recycling",

          icon:
            Recycle,

          recommended:
            true,
        },

        {
          title:
            "Reuse the container",

          description:
            "If it is still in good condition, consider a safe and suitable reuse before discarding it.",

          reason:
            "Reuse keeps the product in circulation for longer.",

          action:
            "See Reuse Ideas",

          link:
            "/learn",

          icon:
            Repeat2,
        },

        {
          title:
            "Find a plastic collector",

          description:
            "Some plastic recovery businesses accept rigid containers, particularly in larger quantities.",

          reason:
            "Separated materials are easier to recover than mixed waste.",

          action:
            "Find Collection Points",

          link:
            "/recycling",

          icon:
            MapPin,
        },

        {
          title:
            "Dispose responsibly",

          description:
            "Where recovery is unavailable, use an appropriate contained waste stream.",

          reason:
            "Keeping plastic out of open dumping and burning reduces environmental harm.",

          action:
            "View Guidance",

          link:
            "/learn",

          icon:
            Trash2,
        },
      ];



    /* =====================================================
       PLASTIC FILM / BAG
    ===================================================== */

    case "plastic bag or film":
      return [
        {
          title:
            "Find flexible-plastic recycling",

          description:
            "Look for a recycling service that specifically accepts LDPE, plastic film or flexible plastics.",

          reason:
            "Flexible plastics may require a different recycling stream from rigid plastic.",

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
          title:
            "Reuse clean bags",

          description:
            "Continue using suitable clean bags where practical before treating them as waste.",

          reason:
            "Reuse can delay the material entering the waste stream.",

          action:
            "Reuse Ideas",

          link:
            "/learn",

          icon:
            Repeat2,
        },

        {
          title:
            "Collect before recycling",

          description:
            "Keeping similar flexible plastics together can make them easier to deliver to an appropriate collector.",

          reason:
            "Some recyclers work more effectively with separated material.",

          action:
            "Find Collection Points",

          link:
            "/recycling",

          icon:
            MapPin,
        },

        {
          title:
            "Avoid littering or burning",

          description:
            "If no recovery route is available, keep the material contained until it can enter an appropriate waste stream.",

          reason:
            "Lightweight plastic can easily escape into streets, drains and waterways.",

          action:
            "View Guidance",

          link:
            "/learn",

          icon:
            Trash2,
        },
      ];



    /* =====================================================
       PAPER
    ===================================================== */

    case "paper":
      return [
        {
          title:
            "Recycle clean paper",

          description:
            "Keep the paper clean and dry and take it to an appropriate paper recovery or collection point.",

          reason:
            "Clean paper can often be recovered rather than entering mixed waste.",

          action:
            "Find Paper Recycling",

          link:
            "/recycling",

          icon:
            Recycle,

          recommended:
            true,
        },

        {
          title:
            "Reuse first",

          description:
            "Use blank sides for notes, drafts or other suitable purposes before recycling.",

          reason:
            "Getting more use from paper can reduce unnecessary consumption.",

          action:
            "Reuse Ideas",

          link:
            "/learn",

          icon:
            Repeat2,
        },

        {
          title:
            "Collect in bulk",

          description:
            "Schools, offices and households can keep clean paper together for easier collection.",

          reason:
            "Separated paper is easier to direct into a recovery stream.",

          action:
            "Find Collection Points",

          link:
            "/recycling",

          icon:
            MapPin,
        },

        {
          title:
            "Separate contaminated paper",

          description:
            "Paper contaminated with food, oil or other substances may not belong in the same recycling stream.",

          reason:
            "Contamination can reduce the recyclability of paper.",

          action:
            "Learn More",

          link:
            "/learn",

          icon:
            Trash2,
        },
      ];



    /* =====================================================
       CARDBOARD
    ===================================================== */

    case "cardboard":
      return [
        {
          title:
            "Recycle the cardboard",

          description:
            "Flatten the cardboard and keep it dry before taking it to an appropriate paper or cardboard collection point.",

          reason:
            "Clean cardboard is widely useful as a recoverable paper-based material.",

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
          title:
            "Reuse the box",

          description:
            "Use suitable boxes again for storage, packaging or moving items.",

          reason:
            "A box can remain useful several times before becoming waste.",

          action:
            "Reuse Ideas",

          link:
            "/learn",

          icon:
            Repeat2,
        },

        {
          title:
            "Give usable boxes away",

          description:
            "Clean boxes may still be useful to another individual or organisation.",

          reason:
            "Keeping usable materials in circulation delays disposal.",

          action:
            "Explore Marketplace",

          link:
            "/marketplace",

          icon:
            ShoppingBag,
        },

        {
          title:
            "Separate contaminated pieces",

          description:
            "Cardboard heavily contaminated by oil, food or other substances may require another disposal route.",

          reason:
            "Contamination can make normal cardboard recycling unsuitable.",

          action:
            "View Guidance",

          link:
            "/learn",

          icon:
            Trash2,
        },
      ];



    /* =====================================================
       GLASS
    ===================================================== */

    case "glass bottle or jar":
      return [
        {
          title:
            "Recycle the glass",

          description:
            "Empty the container and find a collection point that accepts glass.",

          reason:
            "Glass can be recovered where suitable local processing options are available.",

          action:
            "Find Glass Recycling",

          link:
            "/recycling",

          icon:
            Recycle,

          recommended:
            true,
        },

        {
          title:
            "Reuse intact containers",

          description:
            "Clean jars or bottles can sometimes be safely reused for suitable storage purposes.",

          reason:
            "Reuse keeps an intact container useful for longer.",

          action:
            "See Reuse Ideas",

          link:
            "/learn",

          icon:
            Repeat2,
        },

        {
          title:
            "Give reusable containers away",

          description:
            "Someone else may have a practical use for clean, intact containers.",

          reason:
            "Reuse can be preferable to treating a useful product as waste.",

          action:
            "Explore Marketplace",

          link:
            "/marketplace",

          icon:
            ShoppingBag,
        },

        {
          title:
            "Handle broken glass carefully",

          description:
            "If the glass is broken, keep the pieces securely contained before disposal or collection.",

          reason:
            "Broken glass can create an injury risk during handling.",

          action:
            "Safety Guidance",

          link:
            "/learn",

          icon:
            ShieldCheck,
        },
      ];



    /* =====================================================
       ALUMINIUM
    ===================================================== */

    case "aluminium can":
      return [
        {
          title:
            "Recycle",

          description:
            "Keep the can separate and take it to a suitable metal recycler or collection point.",

          reason:
            "Aluminium is a valuable recoverable material.",

          action:
            "Find Metal Recycling",

          link:
            "/recycling",

          icon:
            Recycle,

          recommended:
            true,
        },

        {
          title:
            "Sell with recyclables",

          description:
            "Some scrap buyers and recycling collectors accept aluminium as a recoverable material.",

          reason:
            "Aluminium can have value within the recycling chain.",

          action:
            "Find Collection Points",

          link:
            "/recycling",

          icon:
            CircleDollarSign,
        },

        {
          title:
            "Reuse creatively",

          description:
            "Clean cans may be suitable for selected craft, educational or non-food reuse projects.",

          reason:
            "Reuse can delay an item becoming waste.",

          action:
            "See Ideas",

          link:
            "/learn",

          icon:
            Repeat2,
        },

        {
          title:
            "Dispose responsibly",

          description:
            "If recycling is unavailable, keep the can in an appropriate waste stream instead of littering.",

          reason:
            "Responsible containment prevents environmental pollution.",

          action:
            "View Guidance",

          link:
            "/learn",

          icon:
            Trash2,
        },
      ];



    /* =====================================================
       OTHER METAL
    ===================================================== */

    case "other metal can":
      return [
        {
          title:
            "Recycle as metal",

          description:
            "Find a recycler or scrap collector that accepts the specific metal item.",

          reason:
            "Many metals can enter recovery streams instead of general waste.",

          action:
            "Find Metal Recycling",

          link:
            "/recycling",

          icon:
            Recycle,

          recommended:
            true,
        },

        {
          title:
            "Sell as scrap",

          description:
            "Some metal collectors buy or accept separated scrap material.",

          reason:
            "Recoverable metal can retain material value.",

          action:
            "Find Collectors",

          link:
            "/recycling",

          icon:
            CircleDollarSign,
        },

        {
          title:
            "Reuse where suitable",

          description:
            "Consider whether the item is still useful or can be safely repurposed.",

          reason:
            "Reuse can extend the life of a product before recycling.",

          action:
            "Reuse Ideas",

          link:
            "/learn",

          icon:
            Repeat2,
        },

        {
          title:
            "Handle sharp metal safely",

          description:
            "Damaged or sharp metal should be contained carefully before collection or disposal.",

          reason:
            "Exposed metal edges can cause injury during handling.",

          action:
            "Safety Guidance",

          link:
            "/learn",

          icon:
            ShieldCheck,
        },
      ];



    /* =====================================================
       ORGANIC
    ===================================================== */

    case "food or organic waste":
      return [
        {
          title:
            "Compost where possible",

          description:
            "Suitable food and organic waste may be directed into a composting or organics recovery process.",

          reason:
            "Organic material can sometimes be recovered instead of being mixed with general waste.",

          action:
            "Learn About Composting",

          link:
            "/learn",

          icon:
            Leaf,

          recommended:
            true,
        },

        {
          title:
            "Reduce avoidable food waste",

          description:
            "Plan, store and use food carefully where possible before it becomes waste.",

          reason:
            "Preventing waste is often more useful than managing it after disposal.",

          action:
            "Learn More",

          link:
            "/learn",

          icon:
            Repeat2,
        },

        {
          title:
            "Keep organics separate",

          description:
            "Where a separate organic-waste system exists, avoid mixing food waste with dry recyclables.",

          reason:
            "Food contamination can reduce the quality of other recyclable materials.",

          action:
            "View Guidance",

          link:
            "/learn",

          icon:
            ShieldCheck,
        },

        {
          title:
            "Use responsible disposal",

          description:
            "If composting or organic collection is unavailable, use the appropriate general waste stream.",

          reason:
            "Proper containment helps maintain cleaner surroundings.",

          action:
            "Disposal Guidance",

          link:
            "/learn",

          icon:
            Trash2,
        },
      ];



    /* =====================================================
       BATTERY
    ===================================================== */

    case "household battery":
      return [
        {
          title:
            "Use a battery collection point",

          description:
            "Take the battery to an appropriate specialised collection or recycling location.",

          reason:
            "Batteries should be separated from ordinary household waste where specialist collection is available.",

          action:
            "Find Battery Collection",

          link:
            "/recycling",

          icon:
            Recycle,

          recommended:
            true,
        },

        {
          title:
            "Keep it separate",

          description:
            "Store the used battery separately until you can reach an appropriate collection point.",

          reason:
            "Separating batteries prevents them becoming mixed with ordinary recyclables.",

          action:
            "Safety Guidance",

          link:
            "/learn",

          icon:
            ShieldCheck,
        },

        {
          title:
            "Consider rechargeable alternatives",

          description:
            "Where suitable, rechargeable products may reduce repeated single-use battery waste.",

          reason:
            "Longer-use products can reduce material consumption.",

          action:
            "Learn More",

          link:
            "/learn",

          icon:
            Repeat2,
        },

        {
          title:
            "Avoid ordinary disposal",

          description:
            "Do not intentionally place the battery in a general recycling stream where specialised collection exists.",

          reason:
            "Battery materials may require specialised handling.",

          action:
            "Find Proper Disposal",

          link:
            "/recycling",

          icon:
            Trash2,
        },
      ];



    /* =====================================================
       E-WASTE
    ===================================================== */

    case "electronic waste":
      return [
        {
          title:
            "Reuse, repair or sell",

          description:
            "If the electronic item still works, keeping it in use may be preferable to treating it as waste.",

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
          title:
            "Recycle as e-waste",

          description:
            "If the item no longer works, find an appropriate electronic-waste collection or recycling service.",

          reason:
            "Electronic products contain mixed materials and components that may be recoverable.",

          action:
            "Find E-Waste Recycling",

          link:
            "/recycling",

          icon:
            Recycle,
        },

        {
          title:
            "Donate a working device",

          description:
            "A functional device may still be useful to another student, household or organisation.",

          reason:
            "Keeping electronics in use prevents premature waste.",

          action:
            "Explore Reuse",

          link:
            "/marketplace",

          icon:
            Repeat2,
        },

        {
          title:
            "Avoid general dumping",

          description:
            "Damaged electronics should use an appropriate e-waste route rather than uncontrolled disposal.",

          reason:
            "Some electronic components require specialised handling.",

          action:
            "Find Collection",

          link:
            "/recycling",

          icon:
            Trash2,
        },
      ];



    /* =====================================================
       TEXTILE
    ===================================================== */

    case "textile or clothing":
      return [
        {
          title:
            "Reuse, donate or sell",

          description:
            "If the clothing is still wearable, keep it in circulation through reuse, donation or resale.",

          reason:
            "A usable textile has more value in use than in the waste stream.",

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
          title:
            "Repair it",

          description:
            "Minor damage may be repairable instead of requiring replacement.",

          reason:
            "Repair extends the useful life of the item.",

          action:
            "Learn More",

          link:
            "/learn",

          icon:
            Repeat2,
        },

        {
          title:
            "Find textile recovery",

          description:
            "Where available, use a textile collection or recycling programme for material that cannot be reused.",

          reason:
            "Some textile fibres can enter recovery streams.",

          action:
            "Find Recycling",

          link:
            "/recycling",

          icon:
            Recycle,
        },

        {
          title:
            "Dispose responsibly",

          description:
            "Use an appropriate contained waste stream where reuse and recovery are unavailable.",

          reason:
            "Responsible handling prevents unnecessary litter and dumping.",

          action:
            "View Guidance",

          link:
            "/learn",

          icon:
            Trash2,
        },
      ];



    /* =====================================================
       USED COOKING OIL
    ===================================================== */

    case "used cooking oil":
      return [
        {
          title:
            "Find specialist collection",

          description:
            "Store the used oil in a sealed container and locate a service that specifically accepts used cooking oil.",

          reason:
            "Used oil requires a different recovery route from normal dry recyclables.",

          action:
            "Find Collection",

          link:
            "/recycling",

          icon:
            MapPin,

          recommended:
            true,
        },

        {
          title:
            "Keep it contained",

          description:
            "Keep the oil securely sealed while waiting for collection or an appropriate disposal option.",

          reason:
            "Containment prevents leaks and uncontrolled disposal.",

          action:
            "View Guidance",

          link:
            "/learn",

          icon:
            ShieldCheck,
        },

        {
          title:
            "Learn about recovery",

          description:
            "Some specialist programmes can recover used cooking oil for other applications.",

          reason:
            "Specialised recovery may keep the material out of drains and general waste.",

          action:
            "Learn More",

          link:
            "/learn",

          icon:
            Recycle,
        },

        {
          title:
            "Do not pour into drains",

          description:
            "Use an appropriate collection or disposal route rather than pouring the oil into drainage systems.",

          reason:
            "Improper disposal can cause sanitation and drainage problems.",

          action:
            "Safe Disposal Guide",

          link:
            "/learn",

          icon:
            Trash2,
        },
      ];



    /* =====================================================
       HAZARDOUS / MEDICAL
    ===================================================== */

    case "medical or hazardous waste":
      return [
        {
          title:
            "Use specialised collection",

          description:
            "Use an authorised service or facility that specifically handles this type of waste.",

          reason:
            "Potentially hazardous or medical waste requires controlled handling.",

          action:
            "Find Appropriate Collection",

          link:
            "/recycling",

          icon:
            ShieldCheck,

          recommended:
            true,
        },

        {
          title:
            "Keep it separated",

          description:
            "Do not mix potentially hazardous material with ordinary dry recyclables.",

          reason:
            "Separation reduces the risk of inappropriate handling.",

          action:
            "Safety Guidance",

          link:
            "/learn",

          icon:
            Trash2,
        },

        {
          title:
            "Do not list for reuse",

          description:
            "Potentially contaminated or hazardous material should not enter the ordinary marketplace.",

          reason:
            "Safety takes priority over reuse for hazardous materials.",

          action:
            "Learn Why",

          link:
            "/learn",

          icon:
            ShoppingBag,
        },

        {
          title:
            "Follow specialist guidance",

          description:
            "Confirm the appropriate handling method before transporting or disposing of the item.",

          reason:
            "Different hazardous materials can require different treatment.",

          action:
            "View Guidance",

          link:
            "/learn",

          icon:
            Lightbulb,
        },
      ];



    /* =====================================================
       UNKNOWN
    ===================================================== */

    default:
      return [
        {
          title:
            "Identify the item again",

          description:
            "Take another clear photo with one main item visible and good lighting.",

          reason:
            "Climatica needs a reliable identification before ranking waste actions.",

          action:
            "Try Another Photo",

          link:
            "/identify",

          icon:
            Lightbulb,

          recommended:
            true,
        },

        {
          title:
            "Search manually",

          description:
            "If you already know what the item is, return to Identify and search for it manually.",

          reason:
            "Manual identification can help when an image is unclear.",

          action:
            "Search Item",

          link:
            "/identify",

          icon:
            ShieldCheck,
        },
      ];
  }
}



/* =========================================================
   EXISTING MANUAL-DEMO OPTIONS
========================================================= */

function getDemoRecommendedOptions(
  item
) {
  if (item === "Old laptop") {
    return getAiRecommendedOptions(
      "electronic waste"
    );
  }


  if (item === "Battery") {
    return getAiRecommendedOptions(
      "household battery"
    );
  }


  if (
    item === "Aluminium can"
  ) {
    return getAiRecommendedOptions(
      "aluminium can"
    );
  }


  return getAiRecommendedOptions(
    "PET plastic bottle"
  );
}



/* =========================================================
   PAGE
========================================================= */

function Options() {
  const selectedImage =
    sessionStorage.getItem(
      "climatica-demo-image"
    );


  const selectedExample =
    sessionStorage.getItem(
      "climatica-demo-item"
    );


  const aiResult =
    getStoredAiResult();


  const liveMode =
    Boolean(
      selectedImage
    );


  /*
   * A real uploaded image must
   * have a real AI result.
   */

  if (
    liveMode &&
    !aiResult
  ) {
    return (
      <Navigate
        to="/analysing"
        replace
      />
    );
  }


  /*
   * Don't show recommendations
   * for an uncertain AI result.
   */

  if (
    liveMode &&
    aiResult &&
    !aiResult.identified
  ) {
    return (
      <Navigate
        to="/result"
        replace
      />
    );
  }


  const demoKey =
    selectedExample &&
    demoWasteResults[
      selectedExample
    ]
      ? selectedExample
      : "Plastic bottle";


  const demoResult =
    demoWasteResults[
      demoKey
    ];


  const result =
    liveMode
      ? {
          name:
            aiResult.itemName ||
            "Unknown item",

          material:
            aiResult.material ||
            "Unknown",

          category:
            aiResult.category ||
            "Unknown",

          confidence:
            formatConfidence(
              aiResult.confidence
            ),
        }
      : demoResult;


  const displayImage =
    selectedImage ||
    demoBottle;


  const options =
    liveMode
      ? getAiRecommendedOptions(
          aiResult.matchedWasteType
        )
      : getDemoRecommendedOptions(
          demoKey
        );


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
          <ArrowLeft
            size={15}
          />

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

            <Lightbulb
              size={14}
            />

            Your next step

          </div>


          <h1>
            What should you
            do with this?
          </h1>


          <p>
            Climatica uses the identified material
            to rank practical next actions for
            your item.
          </p>

        </div>


        {/* =====================================
            ITEM SUMMARY
        ====================================== */}

        <div className="options-item-summary">

          <div className="options-item-image">

            <img
              src={
                displayImage
              }
              alt={
                result.name
              }
            />

            <div className="options-image-overlay" />

          </div>


          <div className="options-item-copy">

            <span className="options-small-label">

              {liveMode
                ? "AI identified item"
                : "Your item"
              }

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

            <BadgeCheck
              size={17}
            />

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
            We prioritise keeping useful products
            and materials in circulation before
            general disposal whenever practical
            and safe.
          </p>

        </div>


        {/* =====================================
            OPTIONS
        ====================================== */}

        <div className="options-ranking-list">

          {options.map(
            (
              option,
              index
            ) => (
              <OptionCard
                key={`${option.title}-${index}`}
                option={
                  option
                }
                index={
                  index
                }
              />
            )
          )}

        </div>


        {/* =====================================
            EXPLANATION
        ====================================== */}

        <div className="options-explanation">

          <div className="options-explanation-icon">

            <Leaf
              size={20}
            />

          </div>


          <div>

            <span>
              How this recommendation works
            </span>


            <h3>
              Identification first.
              Action second.
            </h3>


            <p>
              Climatica uses AI to identify the
              likely item and material. The platform
              then matches that classification with
              controlled waste guidance to rank
              reuse, recycling, recovery and
              responsible disposal options.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="options-footer">

        <Leaf
          size={12}
        />


        {liveMode
          ? "Live AI identification — recommendations currently use Climatica's controlled V1 demo guidance."
          : "Prototype recommendations are using prepared demonstration data."
        }

      </footer>

    </main>
  );
}



/* =========================================================
   CARD
========================================================= */

function OptionCard({
  option,
  index,
}) {
  const Icon =
    option.icon;


  return (
    <article
      className={`
        option-card
        ${
          option.recommended
            ? "option-card-recommended"
            : ""
        }
      `}
    >

      <div className="option-rank">

        {String(
          index + 1
        ).padStart(
          2,
          "0"
        )}

      </div>


      <div className="option-main-icon">

        <Icon
          size={23}
          strokeWidth={1.8}
        />

      </div>


      <div className="option-card-copy">

        <div className="option-title-row">

          <h3>
            {option.title}
          </h3>


          {option.recommended && (
            <span className="option-recommended-tag">

              <ShieldCheck
                size={11}
              />

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


      {option.link ? (
        <Link
          to={
            option.link
          }
          className={`
            option-action-button
            ${
              option.recommended
                ? "option-primary-action"
                : ""
            }
          `}
        >
          {option.action}

          <ArrowRight
            size={15}
          />
        </Link>
      ) : (
        <button
          type="button"
          className="option-action-button"
        >
          {option.action}

          <ArrowRight
            size={15}
          />
        </button>
      )}

    </article>
  );
}


export default Options;