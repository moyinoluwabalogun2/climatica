import {
  Camera,
  Lightbulb,
  MapPin,
  Repeat2,
  GraduationCap,
  Recycle,
  ShoppingBag,
  Users,
  School,
  BriefcaseBusiness,
  ArrowUpRight,
  ArrowRight,
  BadgeDollarSign,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";

import educationImage from "../assets/education-classroom.png";
import marketplaceImage from "../assets/marketplace-reuse.png";
import ctaLeafBackground from "../assets/cta-leaf-bg.png";


function LandingBody() {
  return (
    <>

      {/* ================================
          CORE FEATURES
      ================================= */}

      <section className="landing-features-section">

        <div className="landing-section-container">

          <div className="landing-section-heading">

            <span className="section-eyebrow">
              One platform. Practical action.
            </span>


            <div className="section-heading-row">

              <h2>
                Everything you need to make
                a better waste decision.
              </h2>


              <p>
                Climatica connects knowledge with action.
                Instead of simply telling you that waste
                is harmful, it helps you understand what
                you have and what you can actually do next.
              </p>

            </div>

          </div>


          {/* =================================
              FEATURE CARDS
          ================================== */}

          <div className="landing-feature-grid">


            {/* IDENTIFY */}

            <Link
              to="/identify"
              className="
                landing-feature-card
                feature-card-large
                landing-feature-link
              "
            >

              <span className="feature-card-number">
                01
              </span>


              <div className="feature-large-icon">

                <Camera
                  size={38}
                  strokeWidth={1.7}
                />

              </div>


              <div className="feature-card-content">

                <span className="feature-card-label">
                  Identify
                </span>


                <h3>
                  Start with the item
                  in front of you.
                </h3>


                <p>
                  Take a photo or search manually to
                  identify the material and understand
                  what kind of waste you are dealing with.
                </p>


                <span className="feature-text-button">

                  Identify waste

                  <ArrowRight size={15} />

                </span>

              </div>

            </Link>



            {/* UNDERSTAND */}

            <Link
              to="/learn"
              className="
                landing-feature-card
                landing-feature-link
              "
            >

              <span className="feature-card-number">
                02
              </span>


              <div className="feature-small-icon">

                <Lightbulb
                  size={23}
                  strokeWidth={1.7}
                />

              </div>


              <h3>
                Understand
              </h3>


              <p>
                Get simple guidance instead of
                complicated environmental terminology.
              </p>

            </Link>



            {/* FIND RECYCLING */}

            <Link
              to="/recycling"
              className="
                landing-feature-card
                landing-feature-link
              "
            >

              <span className="feature-card-number">
                03
              </span>


              <div className="feature-small-icon">

                <MapPin
                  size={23}
                  strokeWidth={1.7}
                />

              </div>


              <h3>
                Find recycling
              </h3>


              <p>
                Discover relevant recycling or
                collection options for the material
                you have.
              </p>

            </Link>



            {/* REUSE / SELL */}

            <Link
              to="/marketplace"
              className="
                landing-feature-card
                landing-feature-link
              "
            >

              <span className="feature-card-number">
                04
              </span>


              <div className="feature-small-icon">

                <Repeat2
                  size={23}
                  strokeWidth={1.7}
                />

              </div>


              <h3>
                Reuse or sell
              </h3>


              <p>
                Keep useful materials and items
                in circulation through the
                Climatica marketplace.
              </p>

            </Link>



            {/* LEARN */}

            <Link
              to="/learn"
              className="
                landing-feature-card
                landing-feature-link
              "
            >

              <span className="feature-card-number">
                05
              </span>


              <div className="feature-small-icon">

                <GraduationCap
                  size={23}
                  strokeWidth={1.7}
                />

              </div>


              <h3>
                Learn
              </h3>


              <p>
                Build better habits through short
                lessons, quizzes and practical
                environmental guidance.
              </p>

            </Link>

          </div>

        </div>

      </section>



      {/* ================================
          WASTE OPTIONS
      ================================= */}

      <section className="waste-options-section">

        <div className="landing-section-container">

          <div className="waste-options-layout">

            <div className="waste-options-copy">

              <span className="section-eyebrow section-eyebrow-dark">
                What should I do with this?
              </span>


              <h2>
                Throwing it away
                shouldn't always be
                the first answer.
              </h2>


              <p>
                Once Climatica understands the item,
                it can guide the user toward the most
                appropriate next step.
              </p>


              <div className="waste-priority-note">

                <div className="priority-note-icon">

                  <Recycle
                    size={20}
                    strokeWidth={1.8}
                  />

                </div>


                <div>

                  <strong>
                    The best option depends on the item.
                  </strong>


                  <p>
                    Some things can be reused.
                    Others can be sold, donated,
                    recycled or require responsible disposal.
                  </p>

                </div>

              </div>

            </div>



            <div className="waste-option-list">


              {/* REUSE */}

              <Link
                to="/marketplace"
                className="
                  waste-option-card
                  waste-option-link
                "
              >

                <span className="waste-option-index">
                  01
                </span>


                <div className="waste-option-icon">

                  <Repeat2 size={21} />

                </div>


                <div>

                  <h3>
                    Reuse
                  </h3>


                  <p>
                    Keep an item useful for longer
                    before it becomes waste.
                  </p>

                </div>

              </Link>



              {/* SELL */}

              <Link
                to="/marketplace"
                className="
                  waste-option-card
                  waste-option-link
                "
              >

                <span className="waste-option-index">
                  02
                </span>


                <div className="waste-option-icon">

                  <BadgeDollarSign size={21} />

                </div>


                <div>

                  <h3>
                    Sell or barter
                  </h3>


                  <p>
                    Find another person or recycler
                    who can make use of it.
                  </p>

                </div>

              </Link>



              {/* RECYCLE */}

              <Link
                to="/recycling"
                className="
                  waste-option-card
                  waste-option-highlight
                  waste-option-link
                "
              >

                <span className="waste-option-index">
                  03
                </span>


                <div className="waste-option-icon">

                  <Recycle size={21} />

                </div>


                <div>

                  <h3>
                    Recycle
                  </h3>


                  <p>
                    Find an appropriate recycling
                    stream or verified collection point.
                  </p>

                </div>


                <span className="recommended-tag">
                  Recommended when suitable
                </span>

              </Link>



              {/* DISPOSE */}

              <Link
                to="/options"
                className="
                  waste-option-card
                  waste-option-link
                "
              >

                <span className="waste-option-index">
                  04
                </span>


                <div className="waste-option-icon">

                  <Trash2 size={20} />

                </div>


                <div>

                  <h3>
                    Dispose responsibly
                  </h3>


                  <p>
                    When reuse or recycling isn't
                    appropriate, follow safe guidance.
                  </p>

                </div>

              </Link>

            </div>

          </div>

        </div>

      </section>



      {/* ================================
          EDUCATION + MARKETPLACE
      ================================= */}

      <section
        className="discover-section"
        id="discover"
      >

        <div className="landing-section-container">

          <div className="discover-heading">

            <span className="section-eyebrow">
              Beyond identification
            </span>


            <h2>
              Learn more. Waste less.
              Keep useful things moving.
            </h2>

          </div>



          <div className="discover-grid">


            {/* =================================
                EDUCATION
            ================================== */}

            <article className="discover-card">

              <div className="discover-copy">

                <div className="discover-label">

                  <GraduationCap
                    size={18}
                    strokeWidth={1.8}
                  />

                  <span>
                    Education
                  </span>

                </div>


                <h3>
                  Learn without
                  the lecture.
                </h3>


                <p>
                  Short lessons that explain waste,
                  recycling and climate action in
                  language people can actually use.
                </p>


                <div className="topic-tags">

                  <span>
                    Plastics
                  </span>

                  <span>
                    E-Waste
                  </span>

                  <span>
                    Food Waste
                  </span>

                  <span>
                    Batteries
                  </span>

                </div>


                <Link
                  to="/learn"
                  className="discover-text-link"
                >

                  Explore Education

                  <ArrowRight size={15} />

                </Link>

              </div>



              {/* CLICKABLE IMAGE */}

              <Link
                to="/learn"
                className="
                  discover-image
                  discover-image-link
                "
                aria-label="Explore Climatica education"
              >

                <img
                  src={educationImage}
                  alt="Students taking part in a classroom recycling lesson"
                  className="discover-image-photo"
                />


                <div className="discover-image-overlay" />


                <span className="discover-image-button">

                  <ArrowUpRight size={18} />

                </span>


                <div className="discover-hover-label">

                  <span>
                    Explore Education
                  </span>

                  <ArrowRight size={14} />

                </div>

              </Link>

            </article>



            {/* =================================
                MARKETPLACE
            ================================== */}

            <article className="discover-card">

              <div className="discover-copy">

                <div className="discover-label">

                  <ShoppingBag
                    size={18}
                    strokeWidth={1.8}
                  />

                  <span>
                    Circular Marketplace
                  </span>

                </div>


                <h3>
                  Give useful things
                  another life.
                </h3>


                <p>
                  Buy, sell, give away or barter
                  reusable items and recyclable
                  materials instead of throwing them away.
                </p>


                <div className="topic-tags">

                  <span>
                    Reuse
                  </span>

                  <span>
                    Electronics
                  </span>

                  <span>
                    Books
                  </span>

                  <span>
                    Barter
                  </span>

                </div>


                <Link
                  to="/marketplace"
                  className="discover-text-link"
                >

                  Explore Marketplace

                  <ArrowRight size={15} />

                </Link>

              </div>



              {/* CLICKABLE IMAGE */}

              <Link
                to="/marketplace"
                className="
                  discover-image
                  discover-image-link
                "
                aria-label="Explore Climatica marketplace"
              >

                <img
                  src={marketplaceImage}
                  alt="Two people exchanging reusable books and electronics outdoors"
                  className="discover-image-photo"
                />


                <div className="discover-image-overlay" />


                <span className="discover-image-button">

                  <ArrowUpRight size={18} />

                </span>


                <div className="discover-hover-label">

                  <span>
                    Explore Marketplace
                  </span>

                  <ArrowRight size={14} />

                </div>

              </Link>

            </article>

          </div>

        </div>

      </section>



      {/* ================================
          ECOSYSTEM
      ================================= */}

      <section className="ecosystem-section">

        <div className="landing-section-container">

          <div className="ecosystem-layout">

            <div className="ecosystem-intro">

              <span className="section-eyebrow">
                One connected ecosystem
              </span>


              <h2>
                Built for people who
                create, manage and
                recover waste.
              </h2>

            </div>



            <div className="ecosystem-grid">


              {/* INDIVIDUALS */}

              <article>

                <div className="ecosystem-icon">

                  <Users size={22} />

                </div>


                <div>

                  <h3>
                    Individuals
                  </h3>


                  <p>
                    Identify, learn, recycle,
                    reuse, buy and sell.
                  </p>

                </div>

              </article>



              {/* RECYCLERS */}

              <article>

                <div className="ecosystem-icon">

                  <Recycle size={22} />

                </div>


                <div>

                  <h3>
                    Recyclers & PSPs
                  </h3>


                  <p>
                    Receive collection requests
                    and discover materials.
                  </p>

                </div>

              </article>



              {/* SCHOOLS */}

              <article>

                <div className="ecosystem-icon">

                  <School size={22} />

                </div>


                <div>

                  <h3>
                    Schools
                  </h3>


                  <p>
                    Teach, organise challenges
                    and encourage sustainable habits.
                  </p>

                </div>

              </article>



              {/* BUSINESSES */}

              <article>

                <div className="ecosystem-icon">

                  <BriefcaseBusiness size={22} />

                </div>


                <div>

                  <h3>
                    Businesses
                  </h3>


                  <p>
                    Manage waste activities,
                    collections and reporting.
                  </p>

                </div>

              </article>

            </div>

          </div>

        </div>

      </section>



      {/* ================================
          FINAL CTA
      ================================= */}

      <section
        className="landing-final-cta"
        style={{
          backgroundImage:
            `url(${ctaLeafBackground})`,
        }}
      >

        <div className="final-cta-overlay" />


        <div className="final-cta-content">

          <span className="section-eyebrow final-eyebrow">
            Everyday waste. Everyday climate action.
          </span>


          <h2>
            Start with one item.
          </h2>


          <p>
            The first step doesn't need to be complicated.
            Show Climatica what you have and discover
            what you can do next.
          </p>


          <div className="final-cta-actions">


            {/* IDENTIFY */}

            <Link
              to="/identify"
              className="final-primary-button"
            >

              Identify My Waste

              <ArrowRight size={16} />

            </Link>


            {/* EXPLORE */}

            <a
              href="#discover"
              className="final-secondary-button"
            >

              Explore Climatica

            </a>

          </div>

        </div>

      </section>

    </>
  );
}


export default LandingBody;