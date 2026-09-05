import {
  ArrowLeft,
  Check,
  LoaderCircle,
  ScanLine,
  Sparkles,
  Image as ImageIcon,
  Leaf,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import climaticaLogo from "../assets/climatica-logo.png";
import analysisBackground from "../assets/cta-leaf-bg.png";


function Analysing() {
  const [progress, setProgress] = useState(8);
  const [stage, setStage] = useState(0);

  const selectedImage =
    sessionStorage.getItem(
      "climatica-demo-image"
    );

  const selectedExample =
    sessionStorage.getItem(
      "climatica-demo-item"
    );


  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(progressTimer);

          return 100;
        }

        return Math.min(
          current +
            Math.floor(
              Math.random() * 8 + 4
            ),
          100
        );
      });
    }, 300);


    const stageOne =
      setTimeout(
        () => setStage(1),
        650
      );

    const stageTwo =
      setTimeout(
        () => setStage(2),
        1400
      );

    const stageThree =
      setTimeout(
        () => setStage(3),
        2200
      );


    return () => {
      clearInterval(progressTimer);

      clearTimeout(stageOne);
      clearTimeout(stageTwo);
      clearTimeout(stageThree);
    };
  }, []);


  const finished =
    progress >= 100;


  return (
    <main
      className="analysis-page-v2"
      style={{
        backgroundImage:
          `url(${analysisBackground})`,
      }}
    >

      {/* =====================================
          BACKGROUND
      ====================================== */}

      <div className="analysis-bg-overlay" />
      <div className="analysis-bg-soft-light" />


      {/* =====================================
          NAVBAR
      ====================================== */}

      <header className="analysis-v2-navbar">

        <Link
          to="/"
          className="analysis-v2-logo"
        >
          <img
            src={climaticaLogo}
            alt="Climatica"
          />
        </Link>


        <Link
          to="/identify"
          className="analysis-v2-back"
        >
          <ArrowLeft size={15} />

          Change item
        </Link>

      </header>


      {/* =====================================
          MAIN
      ====================================== */}

      <section className="analysis-v2-main">

        {/* HEADING */}

        <div className="analysis-v2-heading">

          <div className="analysis-v2-eyebrow">

            <Sparkles size={13} />

            AI-assisted identification

          </div>


          <h1>
            {finished
              ? "Your result is ready."
              : "Understanding your item."
            }
          </h1>


          <p>
            {finished
              ? "Climatica has prepared a sample identification and the most relevant next-step options."
              : "We’re identifying the item, estimating its material and matching it with practical waste guidance."
            }
          </p>

        </div>


        {/* =====================================
            WORKSPACE
        ====================================== */}

        <div className="analysis-v2-workspace">

          {/* =================================
              IMAGE
          ================================== */}

          <div className="analysis-v2-photo">

            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected item being analysed"
                className="analysis-v2-photo-image"
              />
            ) : (
              <div className="analysis-v2-demo-item">

                <ImageIcon size={33} />

                <strong>
                  {selectedExample ||
                    "Plastic bottle"}
                </strong>

                <span>
                  Demo item
                </span>

              </div>
            )}


            <div className="analysis-v2-photo-overlay" />


            {/* subtle scan line */}

            {!finished && (
              <div className="analysis-v2-scan-line" />
            )}


            {/* frame corners */}

            <span className="analysis-frame frame-tl" />
            <span className="analysis-frame frame-tr" />
            <span className="analysis-frame frame-bl" />
            <span className="analysis-frame frame-br" />


            <div className="analysis-v2-photo-status">

              {finished ? (
                <Check size={14} />
              ) : (
                <ScanLine size={14} />
              )}


              <span>
                {finished
                  ? "Analysis complete"
                  : "Reading item"
                }
              </span>

            </div>

          </div>


          {/* =================================
              INFORMATION
          ================================== */}

          <div className="analysis-v2-panel">

            <div className="analysis-progress-top">

              <div>

                <span>
                  Analysis progress
                </span>

                <strong>
                  {progress}%
                </strong>

              </div>


              {!finished && (
                <LoaderCircle
                  size={20}
                  className="analysis-v2-spinner"
                />
              )}

            </div>


            {/* progress */}

            <div className="analysis-v2-progress">

              <span
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>


            {/* steps */}

            <div className="analysis-v2-steps">

              <AnalysisStep
                number="01"
                title="Reading the item"
                text="Checking the visible shape, object type and key characteristics."
                active={stage >= 0}
                completed={stage >= 1}
              />

              <AnalysisStep
                number="02"
                title="Understanding the material"
                text="Matching the item with common material and waste categories."
                active={stage >= 1}
                completed={stage >= 2}
              />

              <AnalysisStep
                number="03"
                title="Checking guidance"
                text="Reviewing relevant reuse, recycling and responsible disposal options."
                active={stage >= 2}
                completed={stage >= 3}
              />

              <AnalysisStep
                number="04"
                title="Preparing your next steps"
                text="Organising the most useful actions for this particular item."
                active={stage >= 3}
                completed={finished}
              />

            </div>


            {/* COMPLETE */}

           {finished && (
  <div className="analysis-v2-ready">

    <div className="analysis-ready-icon">
      <Check size={17} />
    </div>


    <div className="analysis-ready-copy">

      <strong>
        Identification complete
      </strong>

      <p>
        Climatica has prepared your
        sample result and recommended
        next actions.
      </p>

    </div>


    <Link
      to="/result"
      className="analysis-view-result"
    >
      View Result
    </Link>

  </div>
)}
                


            


            {/* ENVIRONMENTAL NOTE */}

            <div className="analysis-v2-note">

              <Leaf size={14} />

              <span>
                Better waste decisions start
                with understanding what you have.
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="analysis-v2-footer">

        <Leaf size={12} />

        Prototype mode — no image is being sent
        to a live AI service yet.

      </footer>

    </main>
  );
}



function AnalysisStep({
  active,
  completed,
  number,
  title,
  text,
}) {
  return (
    <div
      className={`
        analysis-v2-step
        ${active ? "active" : ""}
        ${completed ? "completed" : ""}
      `}
    >

      <div className="analysis-v2-step-icon">

        {completed ? (
          <Check size={14} />
        ) : (
          number
        )}

      </div>


      <div>

        <strong>
          {title}
        </strong>

        <p>
          {text}
        </p>

      </div>

    </div>
  );
}


export default Analysing;