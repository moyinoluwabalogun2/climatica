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


/* =========================================================
   IMAGE COMPRESSION

   Phone camera images can easily be 5–15MB.
   We shrink them before:
   - sessionStorage
   - Netlify Function
   - Gemini
========================================================= */

function compressImage(file) {
  return new Promise(
    (resolve, reject) => {
      const objectUrl =
        URL.createObjectURL(file);

      const image =
        new Image();


      image.onload = () => {
        try {
          const MAX_SIZE =
            1280;

          const QUALITY =
            0.82;


          const originalWidth =
            image.naturalWidth;

          const originalHeight =
            image.naturalHeight;


          if (
            !originalWidth ||
            !originalHeight
          ) {
            throw new Error(
              "The image could not be read."
            );
          }


          const scale =
            Math.min(
              1,
              MAX_SIZE /
                Math.max(
                  originalWidth,
                  originalHeight
                )
            );


          const width =
            Math.max(
              1,
              Math.round(
                originalWidth *
                  scale
              )
            );


          const height =
            Math.max(
              1,
              Math.round(
                originalHeight *
                  scale
              )
            );


          const canvas =
            document.createElement(
              "canvas"
            );


          canvas.width =
            width;

          canvas.height =
            height;


          const context =
            canvas.getContext(
              "2d"
            );


          if (!context) {
            throw new Error(
              "Image processing is unavailable."
            );
          }


          /*
           * White background also handles
           * transparent PNGs cleanly.
           */

          context.fillStyle =
            "#ffffff";

          context.fillRect(
            0,
            0,
            width,
            height
          );


          context.drawImage(
            image,
            0,
            0,
            width,
            height
          );


          const compressed =
            canvas.toDataURL(
              "image/jpeg",
              QUALITY
            );


          resolve(
            compressed
          );
        } catch (error) {
          reject(error);
        } finally {
          URL.revokeObjectURL(
            objectUrl
          );
        }
      };


      image.onerror = () => {
        URL.revokeObjectURL(
          objectUrl
        );


        reject(
          new Error(
            "Climatica could not read this image. Please choose another photo."
          )
        );
      };


      image.src =
        objectUrl;
    }
  );
}



/* =========================================================
   PAGE
========================================================= */

function Identify() {
  const navigate =
    useNavigate();


  const uploadInputRef =
    useRef(null);

  const cameraInputRef =
    useRef(null);


  const [
    preview,
    setPreview,
  ] = useState(
    () =>
      sessionStorage.getItem(
        "climatica-demo-image"
      )
  );


  const [
    fileName,
    setFileName,
  ] = useState("");


  const [
    searchValue,
    setSearchValue,
  ] = useState("");


  const [
    processingImage,
    setProcessingImage,
  ] = useState(false);



  /* =========================================================
     IMAGE SELECT
  ========================================================= */

  const handleImageSelect =
    async (event) => {

      const file =
        event.target.files?.[0];


      if (!file) {
        return;
      }


      if (
        !file.type.startsWith(
          "image/"
        )
      ) {
        alert(
          "Please select an image file."
        );

        event.target.value =
          "";

        return;
      }


      /*
       * Protect against extremely
       * large source images.
       */

      const maxOriginalSize =
        20 *
        1024 *
        1024;


      if (
        file.size >
        maxOriginalSize
      ) {
        alert(
          "That image is too large. Please choose an image under 20 MB."
        );

        event.target.value =
          "";

        return;
      }


      setProcessingImage(
        true
      );


      try {
        const imageData =
          await compressImage(
            file
          );


        setPreview(
          imageData
        );


        setFileName(
          file.name
        );


        /*
         * Store the compressed image
         * for the Analysing page.
         */

        sessionStorage.setItem(
          "climatica-demo-image",
          imageData
        );


        /*
         * Uploaded image now takes
         * priority over demo examples.
         */

        sessionStorage.removeItem(
          "climatica-demo-item"
        );


        /*
         * Remove stale previous results.
         */

        sessionStorage.removeItem(
          "climatica-ai-result"
        );


        sessionStorage.removeItem(
          "climatica-ai-error"
        );

      } catch (error) {
        console.error(
          "Image preparation failed:",
          error
        );


        alert(
          error?.message ||
            "Climatica could not prepare this image."
        );


        event.target.value =
          "";
      } finally {
        setProcessingImage(
          false
        );
      }
    };



  /* =========================================================
     REMOVE IMAGE
  ========================================================= */

  const removeImage = () => {
    setPreview(null);

    setFileName("");


    sessionStorage.removeItem(
      "climatica-demo-image"
    );


    sessionStorage.removeItem(
      "climatica-ai-result"
    );


    sessionStorage.removeItem(
      "climatica-ai-error"
    );


    if (
      uploadInputRef.current
    ) {
      uploadInputRef.current.value =
        "";
    }


    if (
      cameraInputRef.current
    ) {
      cameraInputRef.current.value =
        "";
    }
  };



  /* =========================================================
     REAL IMAGE ANALYSIS
  ========================================================= */

  const analyseImage = () => {
    if (
      !preview ||
      processingImage
    ) {
      return;
    }


    sessionStorage.removeItem(
      "climatica-ai-result"
    );


    sessionStorage.removeItem(
      "climatica-ai-error"
    );


    navigate(
      "/analysing"
    );
  };



  /* =========================================================
     DEMO BOTTLE
  ========================================================= */

  const useDemoBottle = () => {
    sessionStorage.removeItem(
      "climatica-demo-image"
    );


    sessionStorage.removeItem(
      "climatica-ai-result"
    );


    sessionStorage.removeItem(
      "climatica-ai-error"
    );


    sessionStorage.setItem(
      "climatica-demo-item",
      "Plastic bottle"
    );


    navigate(
      "/analysing"
    );
  };



  /* =========================================================
     MANUAL DEMO ITEMS
  ========================================================= */

  const analyseExample =
    (item) => {

      sessionStorage.removeItem(
        "climatica-demo-image"
      );


      sessionStorage.removeItem(
        "climatica-ai-result"
      );


      sessionStorage.removeItem(
        "climatica-ai-error"
      );


      sessionStorage.setItem(
        "climatica-demo-item",
        item
      );


      navigate(
        "/analysing"
      );
    };



  const handleManualSearch =
    () => {

      const item =
        searchValue.trim();


      if (!item) {
        return;
      }


      analyseExample(
        item
      );
    };



  return (
    <main
      className="identify-page-v2"
      style={{
        backgroundImage:
          `url(${identifyBackground})`,
      }}
    >

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
          <ArrowLeft
            size={15}
          />

          <span>
            Back home
          </span>
        </Link>

      </header>


      {/* =====================================
          MAIN
      ====================================== */}

      <section className="identify-v2-main">

        <div className="identify-v2-heading">

          <div className="identify-v2-eyebrow">

            <Sparkles
              size={13}
            />

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
            PHOTO
        ====================================== */}

        <div className="identify-photo-card">

          <img
            src={
              preview ||
              demoBottle
            }
            alt={
              preview
                ? "Selected waste item"
                : "Plastic bottle ready to be identified"
            }
            className="identify-photo"
          />


          <div className="identify-photo-overlay" />


          <span className="photo-corner photo-corner-tl" />

          <span className="photo-corner photo-corner-tr" />

          <span className="photo-corner photo-corner-bl" />

          <span className="photo-corner photo-corner-br" />


          {!preview && (
            <button
              type="button"
              className="demo-camera-button"
              onClick={
                useDemoBottle
              }
              aria-label="Try demo plastic bottle"
            >
              <Camera
                size={21}
              />
            </button>
          )}


          {preview && (
            <>
              <button
                type="button"
                className="remove-photo-button"
                onClick={
                  removeImage
                }
                aria-label="Remove selected image"
              >
                <X
                  size={17}
                />
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
                  <ImageIcon
                    size={18}
                  />
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
                  disabled={
                    processingImage
                  }
                  onClick={() =>
                    cameraInputRef
                      .current
                      ?.click()
                  }
                >
                  <Camera
                    size={17}
                  />

                  {processingImage
                    ? "Preparing..."
                    : "Take a Photo"
                  }
                </button>


                <input
                  ref={
                    cameraInputRef
                  }
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={
                    handleImageSelect
                  }
                  hidden
                />


                <button
                  type="button"
                  className="identify-upload-action"
                  disabled={
                    processingImage
                  }
                  onClick={() =>
                    uploadInputRef
                      .current
                      ?.click()
                  }
                >
                  <Upload
                    size={17}
                  />

                  Upload Image
                </button>


                <input
                  ref={
                    uploadInputRef
                  }
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImageSelect
                  }
                  hidden
                />

              </div>
            </>
          ) : (
            <>
              <div className="identify-action-heading">

                <span>
                  <ScanLine
                    size={18}
                  />
                </span>


                <div>

                  <small>
                    Selected item
                  </small>


                  <h2>
                    Ready to identify it?
                  </h2>


                  <p>
                    Climatica will analyse the photo,
                    identify the likely material and
                    prepare appropriate next steps.
                  </p>

                </div>

              </div>


              {fileName && (
                <div className="identify-file-name">

                  <ImageIcon
                    size={14}
                  />

                  <span>
                    {fileName}
                  </span>

                </div>
              )}


              <button
                type="button"
                className="identify-analyse-action"
                disabled={
                  processingImage
                }
                onClick={
                  analyseImage
                }
              >
                <ScanLine
                  size={17}
                />

                Analyse Item

                <span>
                  →
                </span>
              </button>
            </>
          )}


          {!preview && (
            <>
              <div className="identify-v2-divider">

                <span />

                <div>
                  <Leaf
                    size={12}
                  />

                  or
                </div>

                <span />

              </div>


              {/* MANUAL SEARCH */}

              <div className="identify-manual-area">

                <div className="identify-manual-heading">

                  <div className="manual-v2-icon">

                    <Search
                      size={18}
                    />

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

                  <Search
                    size={16}
                  />


                  <input
                    type="text"
                    value={
                      searchValue
                    }
                    onChange={
                      (event) =>
                        setSearchValue(
                          event.target.value
                        )
                    }
                    onKeyDown={
                      (event) => {
                        if (
                          event.key ===
                          "Enter"
                        ) {
                          handleManualSearch();
                        }
                      }
                    }
                    placeholder="Search bottle, battery, laptop..."
                  />


                  <button
                    type="button"
                    onClick={
                      handleManualSearch
                    }
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
                    type="button"
                    onClick={() =>
                      analyseExample(
                        "Plastic bottle"
                      )
                    }
                  >
                    Plastic bottle
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      analyseExample(
                        "Battery"
                      )
                    }
                  >
                    Battery
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      analyseExample(
                        "Aluminium can"
                      )
                    }
                  >
                    Aluminium can
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      analyseExample(
                        "Old laptop"
                      )
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

        <Leaf
          size={13}
        />

        <span>
          Demo mode — uploaded photos can now
          be analysed using Climatica AI.
        </span>

      </footer>

    </main>
  );
}


export default Identify;