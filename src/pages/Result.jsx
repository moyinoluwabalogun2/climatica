import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Leaf,
  Recycle,
  Repeat2,
  ShoppingBag,
  Trash2,
  CheckCircle2,
  Info,
} from "lucide-react";

import {
  Link,
  Navigate,
} from "react-router-dom";

import climaticaLogo
  from "../assets/climatica-logo.png";

import resultBackground
  from "../assets/cta-leaf-bg.png";

import demoBottle
  from "../assets/identify-bottle-demo.jpg";

import demoWasteResults
  from "../data/demoWasteResults";


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
    return JSON.parse(
      stored
    );
  } catch (error) {
    console.error(
      "Invalid Climatica AI result:",
      error
    );

    return null;
  }
}



/* =========================================================
   CONFIDENCE
========================================================= */

function formatConfidence(
  value
) {
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
   CONTROLLED CLIMATICA GUIDANCE

   Gemini identifies the item.
   Climatica controls the recommendation.

   Samuel's verified dataset will later
   replace this temporary demo mapping.
========================================================= */

function getGuidance(
  wasteType
) {
  const guidance = {
    "PET plastic bottle": {
      recyclable: true,

      status:
        "Recyclable",

      impact:
        "PET plastic can often be recovered when it is kept separate and taken to a suitable recycling stream.",

      recycle:
        "Empty the bottle and find a recycling point that accepts PET plastic.",

      reuse:
        "Consider safe reuse where appropriate before treating the bottle as waste.",

      marketplace:
        "Reusable containers may sometimes be given away or repurposed instead of discarded.",

      dispose:
        "If no recovery option is available, keep it out of open dumping and burning.",

      recommended:
        "Recycle",
    },


    "HDPE plastic container": {
      recyclable: true,

      status:
        "Recyclable",

      impact:
        "HDPE is a commonly recovered rigid plastic, although local recycler acceptance can vary.",

      recycle:
        "Empty and clean the container before finding a recycler that accepts rigid plastic.",

      reuse:
        "Reuse the container where it is safe and appropriate.",

      marketplace:
        "Useful containers may sometimes be repurposed or given away.",

      dispose:
        "Use responsible disposal where no suitable recovery option exists.",

      recommended:
        "Recycle",
    },


    "plastic bag or film": {
      recyclable: true,

      status:
        "Check locally",

      impact:
        "Flexible plastics often require a more specific collection route than rigid plastic.",

      recycle:
        "Look for a collection point that specifically accepts plastic film or flexible plastic.",

      reuse:
        "Reuse clean bags where practical before treating them as waste.",

      marketplace:
        "Large quantities of clean material may be useful to specialist collectors.",

      dispose:
        "Keep the material contained and avoid littering or open burning.",

      recommended:
        "Recycle",
    },


    paper: {
      recyclable: true,

      status:
        "Recyclable",

      impact:
        "Clean, dry paper can often remain in circulation through paper recovery streams.",

      recycle:
        "Keep the paper dry and separate from food, oil and other contamination.",

      reuse:
        "Reuse suitable paper before recycling it where practical.",

      marketplace:
        "Bulk paper may be useful to waste-paper collectors.",

      dispose:
        "Heavily contaminated paper may require general disposal.",

      recommended:
        "Recycle",
    },


    cardboard: {
      recyclable: true,

      status:
        "Recyclable",

      impact:
        "Clean cardboard can often be recovered instead of entering mixed waste.",

      recycle:
        "Flatten it and keep it clean and dry before taking it to a suitable collection point.",

      reuse:
        "Boxes can often be reused for storage, transport or packaging.",

      marketplace:
        "Usable boxes may be useful to another person or business.",

      dispose:
        "Contaminated cardboard may not be suitable for normal paper recycling.",

      recommended:
        "Recycle",
    },


    "glass bottle or jar": {
      recyclable: true,

      status:
        "Recyclable",

      impact:
        "Glass can be recovered where an appropriate local collection and processing option exists.",

      recycle:
        "Empty the container and find a collection point that accepts glass.",

      reuse:
        "Intact bottles or jars can sometimes be safely reused.",

      marketplace:
        "Useful containers may be given away or repurposed.",

      dispose:
        "Keep broken glass contained and handle it carefully.",

      recommended:
        "Recycle",
    },


    "aluminium can": {
      recyclable: true,

      status:
        "Recyclable",

      impact:
        "Aluminium is a valuable recoverable material and is commonly collected by recycling and scrap systems.",

      recycle:
        "Empty the can and take it to a collection point that accepts aluminium or metal.",

      reuse:
        "Reuse may be possible for suitable craft or practical purposes.",

      marketplace:
        "Collected aluminium may have value to scrap or recycling buyers.",

      dispose:
        "Use responsible disposal only where recycling is unavailable.",

      recommended:
        "Recycle",
    },


    "other metal can": {
      recyclable: true,

      status:
        "Recyclable",

      impact:
        "Metal waste can often be recovered through scrap or recycling streams.",

      recycle:
        "Find a metal recycler or scrap collection point that accepts this material.",

      reuse:
        "Clean containers may sometimes be repurposed.",

      marketplace:
        "Bulk metal waste may be useful to scrap collectors.",

      dispose:
        "Avoid leaving damaged or sharp metal exposed during disposal.",

      recommended:
        "Recycle",
    },


    "food or organic waste": {
      recyclable: false,

      status:
        "Compost option",

      impact:
        "Organic material may be suitable for composting rather than mixed disposal.",

      recycle:
        "Look for composting or another organic-waste recovery option.",

      reuse:
        "Where safe, reduce avoidable food waste before disposal.",

      marketplace:
        "This type of waste is generally not suitable for the Climatica marketplace.",

      dispose:
        "Use an appropriate organic or general waste stream if composting is unavailable.",

      recommended:
        "Reuse",
    },


    "household battery": {
      recyclable: false,

      status:
        "Special handling",

      impact:
        "Household batteries should be separated from ordinary waste where specialist collection is available.",

      recycle:
        "Find a battery or specialised collection point rather than using ordinary recycling.",

      reuse:
        "Do not attempt to open or repurpose a damaged or spent battery.",

      marketplace:
        "Spent or damaged batteries should not be listed as normal reusable items.",

      dispose:
        "Keep it separate and use an appropriate specialised disposal route.",

      recommended:
        "Dispose",
    },


    "electronic waste": {
      recyclable: true,

      status:
        "E-waste",

      impact:
        "Electronic items may contain reusable components and recoverable materials.",

      recycle:
        "Use an e-waste collector or recycling service that accepts electronics.",

      reuse:
        "If the device still works, repair or continued use may be preferable.",

      marketplace:
        "Working electronics may be suitable for resale, donation or giveaway.",

      dispose:
        "Avoid uncontrolled dumping or burning of electronic waste.",

      recommended:
        "Reuse",
    },


    "textile or clothing": {
      recyclable: false,

      status:
        "Reuse first",

      impact:
        "Usable textiles can often stay in circulation through reuse, repair, donation or resale.",

      recycle:
        "Look for a textile recovery programme where one is available.",

      reuse:
        "Repair or continue using wearable clothing where practical.",

      marketplace:
        "Usable clothing may be suitable for resale, donation or giveaway.",

      dispose:
        "Use responsible disposal for material that cannot be recovered.",

      recommended:
        "Reuse",
    },


    "used cooking oil": {
      recyclable: false,

      status:
        "Special collection",

      impact:
        "Used cooking oil may require a specialist collection route rather than normal household disposal.",

      recycle:
        "Look for a service specifically accepting used cooking oil.",

      reuse:
        "Do not continue using cooking oil once it is no longer suitable.",

      marketplace:
        "Bulk quantities are better handled by specialist collection programmes.",

      dispose:
        "Keep the oil in a sealed container and use an appropriate collection or disposal route.",

      recommended:
        "Dispose",
    },


    "medical or hazardous waste": {
      recyclable: false,

      status:
        "Special disposal",

      impact:
        "Potentially hazardous waste should not be treated as normal household recycling.",

      recycle:
        "Use only an authorised collection service that specifically accepts this material.",

      reuse:
        "Do not reuse potentially contaminated or hazardous material.",

      marketplace:
        "Hazardous or medical waste should not be listed on the marketplace.",

      dispose:
        "Use an appropriate specialised waste collection or disposal service.",

      recommended:
        "Dispose",
    },


    "unknown or unsupported": {
      recyclable: false,

      status:
        "Needs review",

      impact:
        "Climatica needs a clearer identification before recommending an action.",

      recycle:
        "Take another clear photo before choosing a recycling route.",

      reuse:
        "If you already know the item, use manual search instead.",

      marketplace:
        "Only list an item after confirming what it is and whether it is suitable for reuse.",

      dispose:
        "Avoid making a disposal decision from an uncertain identification.",

      recommended:
        null,
    },
  };


  return (
    guidance[wasteType] ||
    guidance[
      "unknown or unsupported"
    ]
  );
}



/* =========================================================
   RESULT PAGE
========================================================= */

function Result() {
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


  /*
   * Uploaded photo should have
   * a real AI result.
   */

  const liveMode =
    Boolean(
      selectedImage
    );


  /*
   * If someone manually opens /result
   * while a live image exists but the
   * AI hasn't finished, return them
   * to analysis.
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


  /* =======================================================
     LIVE AI RESULT
  ======================================================= */

  const guidance =
    aiResult
      ? getGuidance(
          aiResult.matchedWasteType
        )
      : null;


  /*
   * Gemini itself can mark the image
   * uncertain.
   */

  const uncertain =
    liveMode &&
    aiResult &&
    !aiResult.identified;


  /* =======================================================
     OLD DEMO / MANUAL RESULT
  ======================================================= */

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


  /*
   * Build one shape for the page.
   */

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

          recyclable:
            guidance.recyclable,

          status:
            guidance.status,

          summary:
            aiResult.description ||
            "Climatica identified this item from the uploaded image.",

          impact:
            guidance.impact,

          recycleText:
            guidance.recycle,

          reuseText:
            guidance.reuse,

          marketplaceText:
            guidance.marketplace,

          disposeText:
            guidance.dispose,

          recommended:
            guidance.recommended,
        }
      : {
          ...demoResult,

          status:
            demoResult.recyclable
              ? "Recyclable"
              : "Review options",

          recycleText:
            "Find an appropriate recycling stream or collection point.",

          reuseText:
            "See whether the item can remain useful before becoming waste.",

          marketplaceText:
            "Someone else may still be able to make use of the item.",

          disposeText:
            "Follow suitable guidance if recovery isn't practical.",

          recommended:
            "Recycle",
        };


  const displayImage =
    selectedImage ||
    demoBottle;



  return (
    <main
      className="result-page"
      style={{
        backgroundImage:
          `url(${resultBackground})`,
      }}
    >

      <div className="result-bg-overlay" />


      {/* =====================================
          NAVBAR
      ====================================== */}

      <header className="result-navbar">

        <Link
          to="/"
          className="result-logo"
        >
          <img
            src={climaticaLogo}
            alt="Climatica"
          />
        </Link>


        <Link
          to="/identify"
          className="result-back"
        >
          <ArrowLeft
            size={15}
          />

          Identify another item
        </Link>

      </header>


      {/* =====================================
          MAIN
      ====================================== */}

      <section className="result-main">

        {/* INTRO */}

        <div className="result-heading">

          <div className="result-eyebrow">

            <BadgeCheck
              size={14}
            />


            {uncertain
              ? "Identification uncertain"
              : "Identification complete"
            }

          </div>


          <h1>

            {uncertain
              ? "Let's get a clearer look."
              : "Here's what we found."
            }

          </h1>


          <p>

            {uncertain
              ? "Climatica could not confidently identify the item from this image. Try another photo with one main item clearly visible."
              : liveMode
                ? "Climatica analysed your photo and identified the likely item and material."
                : "Climatica has identified the likely item and prepared practical next steps based on the material."
            }

          </p>

        </div>


        {/* =====================================
            RESULT HERO
        ====================================== */}

        <div className="result-hero">

          {/* PHOTO */}

          <div className="result-photo-panel">

            <img
              src={
                displayImage
              }
              alt={
                result.name
              }
              className="result-photo"
            />


            <div className="result-photo-overlay" />


            <div className="result-photo-badge">

              <CheckCircle2
                size={15}
              />


              {uncertain
                ? "Needs another photo"
                : "Item recognised"
              }

            </div>

          </div>


          {/* INFORMATION */}

          <div className="result-information">

            <div className="result-information-top">

              <div className="result-recycle-icon">

                <Recycle
                  size={25}
                />

              </div>


              {!uncertain && (
                <span className="result-recyclable-label">

                  <span />

                  {result.status}

                </span>
              )}

            </div>


            <span className="result-small-label">

              {liveMode
                ? "AI identified item"
                : "Identified item"
              }

            </span>


            <h2>
              {result.name}
            </h2>


            <p className="result-summary">

              {uncertain
                ? (
                  aiResult
                    ?.uncertaintyReason ||
                  "The image did not contain enough information for a reliable result."
                )
                : result.summary
              }

            </p>


            {/* DETAILS */}

            <div className="result-detail-grid">

              <ResultDetail
                label="Material"
                value={
                  result.material
                }
              />


              <ResultDetail
                label="Category"
                value={
                  result.category
                }
              />


              <ResultDetail
                label="Confidence"
                value={
                  result.confidence
                }
                highlight
              />

            </div>


            {/* INFO */}

            <div className="result-impact-note">

              <Info
                size={17}
              />


              <div>

                <strong>

                  {uncertain
                    ? "Why Climatica stopped"
                    : "Why this matters"
                  }

                </strong>


                <p>

                  {uncertain
                    ? "We would rather ask for another image than confidently give waste guidance for the wrong object."
                    : result.impact
                  }

                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            LOW CONFIDENCE
        ====================================== */}

        {uncertain ? (
          <div className="result-next-section">

            <div className="result-next-heading">

              <div>

                <span className="result-section-label">
                  Try again
                </span>


                <h2>
                  Take a clearer photo.
                </h2>

              </div>


              <p>
                Put one main item in the frame,
                use good lighting and avoid too
                much background clutter.
              </p>

            </div>


            <div className="result-actions-footer">

              <div className="result-climate-note">

                <Info
                  size={15}
                />

                <span>
                  A clearer image helps Climatica
                  produce a more reliable result.
                </span>

              </div>


              <Link
                to="/identify"
                className="result-options-button"
              >
                Try Another Photo

                <ArrowRight
                  size={17}
                />
              </Link>

            </div>

          </div>
        ) : (
          /* =================================
             NORMAL NEXT ACTIONS
          ================================== */

          <div className="result-next-section">

            <div className="result-next-heading">

              <div>

                <span className="result-section-label">
                  What's next?
                </span>


                <h2>
                  What should you
                  do with it?
                </h2>

              </div>


              <p>
                Climatica considers more than
                simply throwing an item away.
                Depending on its condition and
                material, there may be better options.
              </p>

            </div>


            <div className="result-action-grid">

              <ActionPreview
                icon={
                  <Recycle
                    size={20}
                  />
                }
                title="Recycle"
                text={
                  result.recycleText
                }
                recommended={
                  result.recommended ===
                  "Recycle"
                }
              />


              <ActionPreview
                icon={
                  <Repeat2
                    size={20}
                  />
                }
                title="Reuse"
                text={
                  result.reuseText
                }
                recommended={
                  result.recommended ===
                  "Reuse"
                }
              />


              <ActionPreview
                icon={
                  <ShoppingBag
                    size={20}
                  />
                }
                title="Sell or give away"
                text={
                  result.marketplaceText
                }
              />


              <ActionPreview
                icon={
                  <Trash2
                    size={20}
                  />
                }
                title="Dispose responsibly"
                text={
                  result.disposeText
                }
                recommended={
                  result.recommended ===
                  "Dispose"
                }
              />

            </div>


            {/* CTA */}

            <div className="result-actions-footer">

              <div className="result-climate-note">

                <Leaf
                  size={15}
                />

                <span>
                  One better waste decision
                  is one small climate action.
                </span>

              </div>


              <Link
                to="/options"
                className="result-options-button"
              >
                See My Options

                <ArrowRight
                  size={17}
                />
              </Link>

            </div>

          </div>
        )}

      </section>


      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="result-footer">

        <Leaf
          size={12}
        />


        {liveMode
          ? "Live AI identification — waste guidance is currently using Climatica's controlled demo dataset."
          : "Prototype result — using a prepared demonstration item."
        }

      </footer>

    </main>
  );
}



/* =========================================================
   RESULT DETAIL
========================================================= */

function ResultDetail({
  label,
  value,
  highlight = false,
}) {
  return (
    <div className="result-detail">

      <span>
        {label}
      </span>


      <strong
        className={
          highlight
            ? "detail-highlight"
            : ""
        }
      >
        {value}
      </strong>

    </div>
  );
}



/* =========================================================
   ACTION PREVIEW
========================================================= */

function ActionPreview({
  icon,
  title,
  text,
  recommended = false,
}) {
  return (
    <article
      className={`
        result-action-card
        ${
          recommended
            ? "recommended"
            : ""
        }
      `}
    >

      {recommended && (
        <span className="result-recommended">
          Recommended
        </span>
      )}


      <div className="result-action-icon">
        {icon}
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


export default Result;