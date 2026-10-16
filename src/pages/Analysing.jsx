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
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import climaticaLogo from "../assets/climatica-logo.png";
import analysisBackground from "../assets/cta-leaf-bg.png";


/* =========================================================
   DATA URL → GEMINI FORMAT
========================================================= */

function parseImageDataUrl(
  dataUrl
) {
  const match =
    dataUrl?.match(
      /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/
    );


  if (!match) {
    throw new Error(
      "The selected image could not be prepared for analysis."
    );
  }


  return {
    mimeType:
      match[1],

    imageData:
      match[2],
  };
}



/* =========================================================
   PAGE
========================================================= */

function Analysing() {
  const navigate =
    useNavigate();


  const requestStartedRef =
    useRef(false);


  const [
    progress,
    setProgress,
  ] = useState(8);


  const [
    stage,
    setStage,
  ] = useState(0);


  const [
    error,
    setError,
  ] = useState("");


  const [
    analysisComplete,
    setAnalysisComplete,
  ] = useState(false);


  const selectedImage =
    sessionStorage.getItem(
      "climatica-demo-image"
    );


  const selectedExample =
    sessionStorage.getItem(
      "climatica-demo-item"
    );



  /* =========================================================
     ANALYSIS
  ========================================================= */

  useEffect(() => {
    /*
     * Nothing selected.
     */

    if (
      !selectedImage &&
      !selectedExample
    ) {
      navigate(
        "/identify",
        {
          replace: true,
        }
      );

      return undefined;
    }


    if (
      requestStartedRef.current
    ) {
      return undefined;
    }


    requestStartedRef.current =
      true;


    const controller =
      new AbortController();


    /*
     * Cosmetic progress.
     *
     * It stops at 92 until the
     * actual AI response arrives.
     */

    const progressTimer =
      setInterval(() => {

        setProgress(
          (current) => {

            if (
              current >= 92
            ) {
              return 92;
            }


            const next =
              Math.min(
                current +
                  Math.floor(
                    Math.random() *
                      6 +
                      2
                  ),
                92
              );


            if (
              next >= 25
            ) {
              setStage(1);
            }


            if (
              next >= 50
            ) {
              setStage(2);
            }


            if (
              next >= 75
            ) {
              setStage(3);
            }


            return next;
          }
        );

      }, 320);



    /* =======================================================
       OLD MANUAL / DEMO EXAMPLES
    ======================================================= */

    let demoTimer =
      null;


    const finishDemoExample =
      () => {

        demoTimer =
          setTimeout(
            () => {

              clearInterval(
                progressTimer
              );


              setStage(3);

              setProgress(
                100
              );

              setAnalysisComplete(
                true
              );

            },
            2300
          );
      };



    /* =======================================================
       REAL GEMINI ANALYSIS
    ======================================================= */

    const identifyRealImage =
      async () => {

        try {
          setError("");


          const {
            imageData,
            mimeType,
          } =
            parseImageDataUrl(
              selectedImage
            );


          const response =
            await fetch(
              "/api/identify-waste",
              {
                method:
                  "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body:
                  JSON.stringify({
                    imageData,
                    mimeType,
                  }),

                signal:
                  controller.signal,
              }
            );


          let payload;


          try {
            payload =
              await response.json();
          } catch {
            throw new Error(
              "Climatica received an invalid response from the AI service."
            );
          }


          if (
            !response.ok
          ) {
            throw new Error(
              payload?.error ||
                "Climatica could not analyse this image."
            );
          }


          if (
            !payload?.success ||
            !payload?.result
          ) {
            throw new Error(
              "The AI service returned an incomplete result."
            );
          }


          /*
           * Save Gemini result for
           * Result.jsx.
           */

          sessionStorage.setItem(
            "climatica-ai-result",
            JSON.stringify(
              payload.result
            )
          );


          sessionStorage.removeItem(
            "climatica-ai-error"
          );


          clearInterval(
            progressTimer
          );


          setStage(3);

          setProgress(
            100
          );

          setAnalysisComplete(
            true
          );

        } catch (
          requestError
        ) {

          if (
            requestError?.name ===
            "AbortError"
          ) {
            return;
          }


          clearInterval(
            progressTimer
          );


          console.error(
            "Climatica AI identification failed:",
            requestError
          );


          const message =
            requestError?.message ||
            "Climatica could not analyse this image. Please try again.";


          sessionStorage.removeItem(
            "climatica-ai-result"
          );


          sessionStorage.setItem(
            "climatica-ai-error",
            message
          );


          setError(
            message
          );


          setProgress(
            100
          );
        }
      };



    /*
     * Real uploaded image = Gemini.
     *
     * Manual examples remain
     * prototype/demo mode.
     */

    if (
      selectedImage
    ) {
      identifyRealImage();
    } else {
      finishDemoExample();
    }



    return () => {
      controller.abort();


      clearInterval(
        progressTimer
      );


      if (
        demoTimer
      ) {
        clearTimeout(
          demoTimer
        );
      }


      requestStartedRef.current =
        false;
    };

  }, [
    navigate,
    selectedImage,
    selectedExample,
  ]);



  const finished =
    analysisComplete &&
    !error;



  return (
    <main
      className="analysis-page-v2"
      style={{
        backgroundImage:
          `url(${analysisBackground})`,
      }}
    >

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
          <ArrowLeft
            size={15}
          />

          Change item
        </Link>

      </header>


      {/* =====================================
          MAIN
      ====================================== */}

      <section className="analysis-v2-main">

        <div className="analysis-v2-heading">

          <div className="analysis-v2-eyebrow">

            <Sparkles
              size={13}
            />

            AI-assisted identification

          </div>


          <h1>

            {error
              ? "We couldn't identify that item."
              : finished
                ? "Your result is ready."
                : "Understanding your item."
            }

          </h1>


          <p>

            {error
              ? "Something interrupted the analysis. You can retry the same image or choose another photo."
              : finished
                ? "Climatica has identified the likely item and prepared the result."
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
                src={
                  selectedImage
                }
                alt="Selected item being analysed"
                className="analysis-v2-photo-image"
              />
            ) : (
              <div className="analysis-v2-demo-item">

                <ImageIcon
                  size={33}
                />


                <strong>

                  {selectedExample ||
                    "Plastic bottle"
                  }

                </strong>


                <span>
                  Demo item
                </span>

              </div>
            )}


            <div className="analysis-v2-photo-overlay" />


            {!finished &&
              !error && (
                <div className="analysis-v2-scan-line" />
              )}


            <span className="analysis-frame frame-tl" />

            <span className="analysis-frame frame-tr" />

            <span className="analysis-frame frame-bl" />

            <span className="analysis-frame frame-br" />


            <div className="analysis-v2-photo-status">

              {finished ? (
                <Check
                  size={14}
                />
              ) : (
                <ScanLine
                  size={14}
                />
              )}


              <span>

                {error
                  ? "Analysis interrupted"
                  : finished
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


              {!finished &&
                !error && (
                  <LoaderCircle
                    size={20}
                    className="analysis-v2-spinner"
                  />
                )}

            </div>


            {/* PROGRESS BAR */}

            <div className="analysis-v2-progress">

              <span
                style={{
                  width:
                    `${progress}%`,
                }}
              />

            </div>


            {/* STEPS */}

            <div className="analysis-v2-steps">

              <AnalysisStep
                number="01"
                title="Reading the item"
                text="Checking the visible shape, object type and key characteristics."
                active={
                  stage >= 0
                }
                completed={
                  stage >= 1
                }
              />


              <AnalysisStep
                number="02"
                title="Understanding the material"
                text="Matching the item with common material and waste categories."
                active={
                  stage >= 1
                }
                completed={
                  stage >= 2
                }
              />


              <AnalysisStep
                number="03"
                title="Checking guidance"
                text="Reviewing relevant reuse, recycling and responsible disposal options."
                active={
                  stage >= 2
                }
                completed={
                  stage >= 3
                }
              />


              <AnalysisStep
                number="04"
                title="Preparing your next steps"
                text="Organising the most useful actions for this particular item."
                active={
                  stage >= 3
                }
                completed={
                  finished
                }
              />

            </div>


            {/* =================================
                ERROR
            ================================== */}

            {error && (
              <div className="analysis-v2-ready">

                <div className="analysis-ready-icon">

                  <ScanLine
                    size={17}
                  />

                </div>


                <div className="analysis-ready-copy">

                  <strong>
                    Analysis could not finish
                  </strong>


                  <p>
                    {error}
                  </p>

                </div>


                <a
                  href="/analysing"
                  className="analysis-view-result"
                >
                  Try Again
                </a>

              </div>
            )}


            {/* =================================
                COMPLETE
            ================================== */}

            {finished && (
              <div className="analysis-v2-ready">

                <div className="analysis-ready-icon">

                  <Check
                    size={17}
                  />

                </div>


                <div className="analysis-ready-copy">

                  <strong>
                    Identification complete
                  </strong>


                  <p>
                    Climatica has identified
                    the item and prepared
                    your result.
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


            <div className="analysis-v2-note">

              <Leaf
                size={14}
              />


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

        <Leaf
          size={12}
        />

        {selectedImage
          ? "Live AI demo — this photo is being analysed by Climatica's connected vision service."
          : "Prototype example — using a prepared demonstration item."
        }

      </footer>

    </main>
  );
}



/* =========================================================
   STEP
========================================================= */

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
        ${active
          ? "active"
          : ""
        }
        ${completed
          ? "completed"
          : ""
        }
      `}
    >

      <div className="analysis-v2-step-icon">

        {completed ? (
          <Check
            size={14}
          />
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