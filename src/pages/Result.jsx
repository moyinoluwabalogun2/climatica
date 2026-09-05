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
} from "react-router-dom";

import climaticaLogo from "../assets/climatica-logo.png";
import resultBackground from "../assets/cta-leaf-bg.png";
import demoBottle from "../assets/identify-bottle-demo.jpg";

import demoWasteResults
  from "../data/demoWasteResults";


function Result() {
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
          <ArrowLeft size={15} />

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

            <BadgeCheck size={14} />

            Identification complete

          </div>


          <h1>
            Here's what
            we found.
          </h1>


          <p>
            Climatica has identified the
            likely item and prepared practical
            next steps based on the material.
          </p>

        </div>


        {/* =====================================
            RESULT HERO
        ====================================== */}

        <div className="result-hero">

          {/* PHOTO */}

          <div className="result-photo-panel">

            <img
              src={displayImage}
              alt={result.name}
              className="result-photo"
            />

            <div className="result-photo-overlay" />


            <div className="result-photo-badge">

              <CheckCircle2 size={15} />

              Item recognised

            </div>

          </div>


          {/* INFORMATION */}

          <div className="result-information">

            <div className="result-information-top">

              <div className="result-recycle-icon">
                <Recycle size={25} />
              </div>


              {result.recyclable && (
                <span className="result-recyclable-label">

                  <span />

                  Recyclable

                </span>
              )}

            </div>


            <span className="result-small-label">
              Identified item
            </span>


            <h2>
              {result.name}
            </h2>


            <p className="result-summary">
              {result.summary}
            </p>


            {/* DETAILS */}

            <div className="result-detail-grid">

              <ResultDetail
                label="Material"
                value={result.material}
              />

              <ResultDetail
                label="Category"
                value={result.category}
              />

              <ResultDetail
                label="Confidence"
                value={result.confidence}
                highlight
              />

            </div>


            {/* INFO */}

            <div className="result-impact-note">

              <Info size={17} />

              <div>

                <strong>
                  Why this matters
                </strong>

                <p>
                  {result.impact}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            NEXT ACTIONS PREVIEW
        ====================================== */}

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
              icon={<Recycle size={20} />}
              title="Recycle"
              text="Find an appropriate recycling stream or collection point."
              recommended
            />


            <ActionPreview
              icon={<Repeat2 size={20} />}
              title="Reuse"
              text="See whether the item can remain useful before becoming waste."
            />


            <ActionPreview
              icon={<ShoppingBag size={20} />}
              title="Sell or give away"
              text="Someone else may still be able to make use of the item."
            />


            <ActionPreview
              icon={<Trash2 size={20} />}
              title="Dispose responsibly"
              text="Follow suitable guidance if recovery isn't practical."
            />

          </div>


          {/* CTA */}

          <div className="result-actions-footer">

            <div className="result-climate-note">

              <Leaf size={15} />

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

              <ArrowRight size={17} />
            </Link>

          </div>

        </div>

      </section>


      <footer className="result-footer">

        <Leaf size={12} />

        Prototype result — classification
        is simulated for demonstration.

      </footer>

    </main>
  );
}



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
        ${recommended
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