import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import LandingBody from "../components/LandingBody";

import heroImage from "../assets/climatica-hero.jpg";


function Home() {
  return (
    <>
      <Navbar />

      <main>

        <section
          className="hero"
          id="home"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >

          {/* Main colour treatment */}
          <div className="hero-overlay" />

          {/* Very subtle environmental contour lines */}
          <div className="hero-contours" />


          <div className="hero-container">

            {/* =============================
                LEFT CONTENT
            ============================== */}

            <div className="hero-content">

              <div className="hero-kicker">

                <span className="hero-kicker-icon">
                  ♻
                </span>

                <span>
                  Smart waste management,
                  made practical.
                </span>

              </div>


              <h1 className="hero-title">

                What should I do
                <br />

                with{" "}

                <span>
                  this?
                </span>

              </h1>


              <p className="hero-description">

                Identify everyday waste,
                understand your best options
                and discover the next responsible
                action — without needing to be
                a waste-management expert.

              </p>


              {/* =============================
                  MAIN HERO ACTIONS
              ============================== */}

              <div className="hero-actions">

                {/* IDENTIFY */}

                <Link
                  to="/identify"
                  className="hero-primary-button"
                >

                  <span className="cta-icon">
                    ▣
                  </span>

                  Identify My Waste

                  <span className="cta-arrow">
                    →
                  </span>

                </Link>


                {/* FIND RECYCLING */}

                <Link
                  to="/recycling"
                  className="hero-secondary-button"
                >

                  <span className="cta-icon">
                    ⌖
                  </span>

                  Find Recycling

                  <span className="cta-arrow">
                    →
                  </span>

                </Link>

              </div>


              {/* =============================
                  SUPPORTING STATEMENT
              ============================== */}

              <div className="hero-support">

                <span className="support-dot" />

                <p>
                  Reduce. Reuse. Recycle.
                  Dispose responsibly.
                </p>

              </div>


              {/* =============================
                  FEATURE MINI ROW
              ============================== */}

              <div className="hero-features">

                {/* IDENTIFY */}

                <Link
                  to="/identify"
                  className="hero-feature"
                >

                  <span className="feature-icon">
                    ▣
                  </span>

                  <div>

                    <strong>
                      Identify
                    </strong>

                    <p>
                      Know what you have.
                    </p>

                  </div>

                </Link>


                {/* UNDERSTAND */}

                <Link
                  to="/learn"
                  className="hero-feature"
                >

                  <span className="feature-icon">
                    ◇
                  </span>

                  <div>

                    <strong>
                      Understand
                    </strong>

                    <p>
                      Learn your options.
                    </p>

                  </div>

                </Link>


                {/* LOCATE */}

                <Link
                  to="/recycling"
                  className="hero-feature"
                >

                  <span className="feature-icon">
                    ⌖
                  </span>

                  <div>

                    <strong>
                      Locate
                    </strong>

                    <p>
                      Find relevant recyclers.
                    </p>

                  </div>

                </Link>


                {/* ACT */}

                <Link
                  to="/marketplace"
                  className="hero-feature"
                >

                  <span className="feature-icon">
                    ↺
                  </span>

                  <div>

                    <strong>
                      Act
                    </strong>

                    <p>
                      Reuse, sell or recycle.
                    </p>

                  </div>

                </Link>

              </div>

            </div>


            {/* =============================
                RIGHT VISUAL AREA
            ============================== */}

            <div className="hero-visual">

              <div className="recognition-frame">

                <span className="frame corner-tl" />

                <span className="frame corner-tr" />

                <span className="frame corner-bl" />

                <span className="frame corner-br" />

              </div>


              <div className="identification-card">

                <div className="identification-icon">
                  ♻
                </div>


                <div className="identification-content">

                  <span className="identification-eyebrow">
                    Identified item
                  </span>


                  <strong>
                    PET Plastic Bottle
                  </strong>


                  <div className="identification-status">

                    <span className="status-dot" />

                    Recyclable

                  </div>

                </div>


                <span className="confidence-pill">
                  High confidence
                </span>

              </div>

            </div>

          </div>


          {/* =============================
              BOTTOM JOURNEY
          ============================== */}

          <div className="hero-journey">

            <span>
              See
            </span>

            <div className="journey-line" />

            <span>
              Identify
            </span>

            <div className="journey-line" />

            <span>
              Understand
            </span>

            <div className="journey-line" />

            <span>
              Choose
            </span>

            <div className="journey-line" />

            <span className="journey-active">
              Act
            </span>

          </div>


          {/* =============================
              SCROLL INDICATOR
          ============================== */}

          <div className="scroll-indicator">

            <span>
              Scroll to explore
            </span>

            <div className="scroll-mouse">
              <span />
            </div>

          </div>

        </section>


        {/* =============================
            REST OF LANDING PAGE
        ============================== */}

        <LandingBody />

      </main>
    </>
  );
}


export default Home;