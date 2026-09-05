import {
  ArrowLeft,
  Camera,
  Upload,
  Search,
  Sparkles,
  X,
  Image as ImageIcon,
  ScanLine,
  Leaf,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useRef,
  useState,
} from "react";

import climaticaLogo from "../assets/climatica-logo.png";
import identifyBackground from "../assets/cta-leaf-bg.png";
import demoBottle from "../assets/identify-bottle-demo.jpg";


function Identify() {
  const navigate = useNavigate();

  const uploadInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [searchValue, setSearchValue] = useState("");


  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;

      setPreview(imageData);
      setFileName(file.name);

      sessionStorage.setItem(
        "climatica-demo-image",
        imageData
      );

      sessionStorage.removeItem(
        "climatica-demo-item"
      );
    };

    reader.readAsDataURL(file);
  };


  const removeImage = () => {
    setPreview(null);
    setFileName("");

    sessionStorage.removeItem(
      "climatica-demo-image"
    );

    if (uploadInputRef.current) {
      uploadInputRef.current.value = "";
    }

    if (cameraInputRef.current) {
      cameraInputRef.current.value = "";
    }
  };


  const analyseImage = () => {
    if (!preview) return;

    navigate("/analysing");
  };


  const useDemoBottle = () => {
    sessionStorage.removeItem(
      "climatica-demo-image"
    );

    sessionStorage.setItem(
      "climatica-demo-item",
      "Plastic bottle"
    );

    navigate("/analysing");
  };


  const analyseExample = (item) => {
    sessionStorage.removeItem(
      "climatica-demo-image"
    );

    sessionStorage.setItem(
      "climatica-demo-item",
      item
    );

    navigate("/analysing");
  };


  const handleManualSearch = () => {
    const item = searchValue.trim();

    if (!item) return;

    analyseExample(item);
  };


  return (
    <main
      className="identify-page-v2"
      style={{
        backgroundImage: `url(${identifyBackground})`,
      }}
    >

      {/* BACKGROUND TREATMENT */}

      <div className="identify-bg-overlay" />
      <div className="identify-bg-softness" />


      {/* =====================================
          NAVBAR
      ====================================== */}

      <header className="identify-v2-navbar">

        <Link
          to="/"
          className="identify-v2-logo"
        >
          <img
            src={climaticaLogo}
            alt="Climatica"
          />
        </Link>


        <Link
          to="/"
          className="identify-v2-back"
        >
          <ArrowLeft size={15} />

          <span>
            Back home
          </span>
        </Link>

      </header>


      {/* =====================================
          MAIN
      ====================================== */}

      <section className="identify-v2-main">

        {/* INTRO */}

        <div className="identify-v2-heading">

          <div className="identify-v2-eyebrow">

            <Sparkles size={13} />

            Identify Waste

          </div>


          <h1>
            What do you have?
          </h1>


          <p>
            Take a photo, upload an image or search
            manually. Climatica will help you understand
            what it is and what you can do next.
          </p>

        </div>


        {/* =====================================
            DEMO / SELECTED IMAGE
        ====================================== */}

        <div className="identify-photo-card">

          <img
            src={preview || demoBottle}
            alt={
              preview
                ? "Selected waste item"
                : "Plastic bottle ready to be identified"
            }
            className="identify-photo"
          />


          <div className="identify-photo-overlay" />


          {/* CAMERA CORNERS */}

          <span className="photo-corner photo-corner-tl" />
          <span className="photo-corner photo-corner-tr" />
          <span className="photo-corner photo-corner-bl" />
          <span className="photo-corner photo-corner-br" />


          {!preview && (
            <button
              type="button"
              className="demo-camera-button"
              onClick={useDemoBottle}
              aria-label="Try demo plastic bottle"
            >
              <Camera size={21} />
            </button>
          )}


          {preview && (
            <>
              <button
                type="button"
                className="remove-photo-button"
                onClick={removeImage}
                aria-label="Remove selected image"
              >
                <X size={17} />
              </button>


              <div className="photo-ready-badge">

                <span />

                Ready to analyse

              </div>
            </>
          )}

        </div>


        {/* =====================================
            ACTION PANEL
        ====================================== */}

        <div className="identify-action-panel">

          {!preview ? (
            <>
              <div className="identify-action-heading">

                <span>
                  <ImageIcon size={18} />
                </span>

                <div>
                  <h2>
                    Show Climatica your item.
                  </h2>

                  <p>
                    Photograph one item clearly
                    with enough natural or indoor light.
                  </p>
                </div>

              </div>


              <div className="identify-primary-actions">

                <button
                  type="button"
                  className="identify-camera-action"
                  onClick={() =>
                    cameraInputRef.current?.click()
                  }
                >
                  <Camera size={17} />

                  Take a Photo
                </button>


                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageSelect}
                  hidden
                />


                <button
                  type="button"
                  className="identify-upload-action"
                  onClick={() =>
                    uploadInputRef.current?.click()
                  }
                >
                  <Upload size={17} />

                  Upload Image
                </button>


                <input
                  ref={uploadInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  hidden
                />

              </div>
            </>
          ) : (
            <>
              <div className="identify-action-heading">

                <span>
                  <ScanLine size={18} />
                </span>

                <div>

                  <small>
                    Selected item
                  </small>

                  <h2>
                    Ready to identify it?
                  </h2>

                  <p>
                    Climatica will prepare a sample
                    identification and recommend
                    appropriate next steps.
                  </p>

                </div>

              </div>


              {fileName && (
                <div className="identify-file-name">

                  <ImageIcon size={14} />

                  <span>
                    {fileName}
                  </span>

                </div>
              )}


              <button
                type="button"
                className="identify-analyse-action"
                onClick={analyseImage}
              >
                <ScanLine size={17} />

                Analyse Item

                <span>
                  →
                </span>
              </button>
            </>
          )}


          {/* DIVIDER */}

          {!preview && (
            <>
              <div className="identify-v2-divider">

                <span />

                <div>
                  <Leaf size={12} />
                  or
                </div>

                <span />

              </div>


              {/* MANUAL SEARCH */}

              <div className="identify-manual-area">

                <div className="identify-manual-heading">

                  <div className="manual-v2-icon">
                    <Search size={18} />
                  </div>

                  <div>

                    <h3>
                      Search manually
                    </h3>

                    <p>
                      Already know what the item is?
                    </p>

                  </div>

                </div>


                <div className="identify-v2-search">

                  <Search size={16} />

                  <input
                    type="text"
                    value={searchValue}
                    onChange={(event) =>
                      setSearchValue(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleManualSearch();
                      }
                    }}
                    placeholder="Search bottle, battery, laptop..."
                  />

                  <button
                    type="button"
                    onClick={handleManualSearch}
                  >
                    Search
                  </button>

                </div>

              </div>


              {/* EXAMPLES */}

              <div className="identify-v2-examples">

                <span>
                  Try an example:
                </span>


                <div>

                  <button
                    onClick={() =>
                      analyseExample("Plastic bottle")
                    }
                  >
                    Plastic bottle
                  </button>

                  <button
                    onClick={() =>
                      analyseExample("Battery")
                    }
                  >
                    Battery
                  </button>

                  <button
                    onClick={() =>
                      analyseExample("Aluminium can")
                    }
                  >
                    Aluminium can
                  </button>

                  <button
                    onClick={() =>
                      analyseExample("Old laptop")
                    }
                  >
                    Old laptop
                  </button>

                </div>

              </div>
            </>
          )}

        </div>

      </section>


      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="identify-v2-footer">

        <Leaf size={13} />

        <span>
          Prototype mode — AI recognition
          is simulated for this demo.
        </span>

      </footer>

    </main>
  );
}


export default Identify;