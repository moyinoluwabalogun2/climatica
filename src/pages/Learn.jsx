import {
  ArrowLeft,
  ArrowRight,
  Battery,
  BookOpen,
  Check,
  Clock3,
  Cpu,
  FileText,
  GlassWater,
  GraduationCap,
  Leaf,
  Medal,
  Recycle,
  Sparkles,
  Trophy,
  Utensils,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useState } from "react";

import climaticaLogo from "../assets/climatica-logo.png";
import educationImage from "../assets/education-classroom.png";
import learnBackground from "../assets/cta-leaf-bg.png";


/* =========================================
   TOPICS
========================================= */

const topics = [
  {
    name: "Plastics",
    icon: Recycle,
  },

  {
    name: "Food Waste",
    icon: Utensils,
  },

  {
    name: "E-Waste",
    icon: Cpu,
  },

  {
    name: "Batteries",
    icon: Battery,
  },

  {
    name: "Glass",
    icon: GlassWater,
  },

  {
    name: "Paper",
    icon: FileText,
  },
];


/* =========================================
   LESSON DATA
========================================= */

const lessons = [
  {
    id: 1,
    category: "Plastics",
    title:
      "What happens to plastic after you throw it away?",
    description:
      "Follow a plastic bottle from disposal through collection, recovery and recycling.",
    time: "2 min",
    level: "Beginner",
  },

  {
    id: 2,
    category: "Food Waste",
    title:
      "Food waste doesn't simply disappear.",
    description:
      "Learn what can happen when organic waste enters dumps and landfills.",
    time: "3 min",
    level: "Beginner",
  },

  {
    id: 3,
    category: "E-Waste",
    title:
      "Why your old phone needs special handling.",
    description:
      "Understand what makes electronics different from ordinary household waste.",
    time: "3 min",
    level: "Beginner",
  },

  {
    id: 4,
    category: "Batteries",
    title:
      "Why batteries shouldn't go in ordinary bins.",
    description:
      "Learn safer ways to store and dispose of used household batteries.",
    time: "2 min",
    level: "Essential",
  },

  {
    id: 5,
    category: "Glass",
    title:
      "Can all glass be recycled?",
    description:
      "Understand the differences between common glass products and containers.",
    time: "2 min",
    level: "Beginner",
  },

  {
    id: 6,
    category: "Paper",
    title:
      "When paper stops being recyclable.",
    description:
      "Learn how contamination can affect otherwise recoverable paper.",
    time: "2 min",
    level: "Beginner",
  },
];


function Learn() {
  const [activeTopic, setActiveTopic] =
    useState("All");

  const [quizAnswer, setQuizAnswer] =
    useState(null);

  const [quizSubmitted, setQuizSubmitted] =
    useState(false);


  const filteredLessons =
    activeTopic === "All"
      ? lessons
      : lessons.filter(
          (lesson) =>
            lesson.category === activeTopic
        );


  const handleTopicSelect = (topic) => {
    setActiveTopic(topic);

    setTimeout(() => {
      document
        .getElementById("lessons")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };


  const checkAnswer = () => {
    if (!quizAnswer) return;

    setQuizSubmitted(true);
  };


  const resetQuiz = () => {
    setQuizAnswer(null);
    setQuizSubmitted(false);
  };


  return (
    <main className="learn-page">

      {/* =====================================
          HERO
      ====================================== */}

      <section
        className="learn-hero"
        style={{
          backgroundImage:
            `url(${learnBackground})`,
        }}
      >

        <div className="learn-hero-overlay" />


        {/* NAVBAR */}

        <header className="learn-navbar">

          <Link
            to="/"
            className="learn-logo"
          >
            <img
              src={climaticaLogo}
              alt="Climatica"
            />
          </Link>


          <Link
            to="/"
            className="learn-back"
          >
            <ArrowLeft size={15} />

            Back home
          </Link>

        </header>


        {/* HERO CONTENT */}

        <div className="learn-hero-content">

          {/* LEFT */}

          <div className="learn-hero-copy">

            <div className="learn-eyebrow">

              <GraduationCap size={14} />

              Education Hub

            </div>


            <h1>
              Learn.
              <br />

              Understand.
              <br />

              <span>
                Act.
              </span>
            </h1>


            <p>
              Waste management doesn't need
              complicated language. Learn practical
              things you can use at home, school,
              work and in your community.
            </p>


            <a
              href="#lessons"
              className="learn-start-button"
            >
              Start Learning

              <ArrowRight size={16} />
            </a>

          </div>


          {/* RIGHT DOCUMENTARY IMAGE */}

          <div className="learn-hero-photo">

            <img
              src={educationImage}
              alt="Students learning about recycling"
            />


            <div className="learn-photo-overlay" />


            <div className="learn-photo-caption">

              <Leaf size={15} />

              <div>

                <span>
                  Practical education
                </span>

                <strong>
                  Knowledge that leads to action.
                </strong>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          TOPICS
      ====================================== */}

      <section className="learn-topics-section">

        <div className="learn-container">

          <div className="learn-section-heading">

            <div>

              <span className="learn-section-label">
                Explore topics
              </span>


              <h2>
                Start with what
                you see every day.
              </h2>

            </div>


            <p>
              From plastic bottles to batteries,
              each material has its own environmental
              impact and better ways to manage it.
            </p>

          </div>


          <div className="learn-topic-grid">

            {topics.map((topic) => {
              const Icon = topic.icon;

              return (
                <button
                  type="button"
                  key={topic.name}
                  className="learn-topic-card"
                  onClick={() =>
                    handleTopicSelect(
                      topic.name
                    )
                  }
                >

                  <div className="learn-topic-icon">

                    <Icon
                      size={22}
                      strokeWidth={1.7}
                    />

                  </div>


                  <span>
                    {topic.name}
                  </span>


                  <ArrowRight size={15} />

                </button>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================
          FEATURED LESSON
      ====================================== */}

      <section className="featured-learning-section">

        <div className="learn-container">

          <article className="featured-learning-card">

            {/* IMAGE */}

            <div className="featured-learning-image">

              <img
                src={educationImage}
                alt="Waste education lesson"
              />


              <div className="featured-learning-overlay" />


              <span className="featured-learning-badge">
                Featured lesson
              </span>

            </div>


            {/* COPY */}

            <div className="featured-learning-copy">

              <div className="featured-learning-meta">

                <span>
                  <Recycle size={13} />

                  Plastics
                </span>


                <span>
                  <Clock3 size={13} />

                  2 min
                </span>

              </div>


              <h2>
                What happens to plastic
                after you throw it away?
              </h2>


              <p>
                A bottle doesn't disappear when
                it leaves your hand. Learn where
                plastic can end up, why recovery
                matters and what you can do differently.
              </p>


              <a
                href="#lessons"
                className="featured-lesson-button"
                onClick={() =>
                  setActiveTopic("Plastics")
                }
              >
                Start Lesson

                <ArrowRight size={16} />
              </a>

            </div>

          </article>

        </div>

      </section>


      {/* =====================================
          LESSON LIBRARY
      ====================================== */}

      <section
        className="lesson-library-section"
        id="lessons"
      >

        <div className="learn-container">

          <div className="lesson-library-header">

            <div>

              <span className="learn-section-label">
                Short lessons
              </span>


              <h2>
                Learn something useful
                in a few minutes.
              </h2>

            </div>


            {/* FILTER */}

            <div className="lesson-filter">

              <button
                type="button"
                className={
                  activeTopic === "All"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTopic("All")
                }
              >
                All
              </button>


              {topics.map((topic) => (
                <button
                  type="button"
                  key={topic.name}
                  className={
                    activeTopic ===
                    topic.name
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTopic(
                      topic.name
                    )
                  }
                >
                  {topic.name}
                </button>
              ))}

            </div>

          </div>


          {/* LESSON CARDS */}

          <div className="lesson-card-grid">

            {filteredLessons.map(
              (lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                />
              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================
          QUIZ
      ====================================== */}

      <section className="learn-quiz-section">

        <div className="learn-container">

          <div className="learn-quiz-layout">

            {/* LEFT */}

            <div className="quiz-intro">

              <div className="quiz-icon">

                <Sparkles size={23} />

              </div>


              <span className="learn-section-label">
                Quick check
              </span>


              <h2>
                Test what
                you know.
              </h2>


              <p>
                Short quizzes can help turn
                information into habits you
                actually remember.
              </p>

            </div>


            {/* QUIZ CARD */}

            <div className="quiz-card">

              <div className="quiz-card-top">

                <span>
                  Question 1 of 1
                </span>

                <span>
                  Plastics
                </span>

              </div>


              <h3>
                You have an empty PET
                plastic bottle. What is
                usually the better first option?
              </h3>


              <div className="quiz-options">

                {[
                  {
                    id: "burn",
                    label:
                      "Burn it with other waste",
                  },

                  {
                    id: "recycle",
                    label:
                      "Keep it separate and find a suitable recycling option",
                  },

                  {
                    id: "litter",
                    label:
                      "Leave it beside the road",
                  },
                ].map((answer) => (
                  <button
                    type="button"
                    key={answer.id}
                    className={`
                      quiz-answer

                      ${
                        quizAnswer ===
                        answer.id
                          ? "selected"
                          : ""
                      }

                      ${
                        quizSubmitted &&
                        answer.id ===
                        "recycle"
                          ? "correct"
                          : ""
                      }

                      ${
                        quizSubmitted &&
                        quizAnswer ===
                        answer.id &&
                        answer.id !==
                        "recycle"
                          ? "wrong"
                          : ""
                      }
                    `}
                    onClick={() => {
                      if (
                        !quizSubmitted
                      ) {
                        setQuizAnswer(
                          answer.id
                        );
                      }
                    }}
                  >

                    <span />

                    {answer.label}

                  </button>
                ))}

              </div>


              {!quizSubmitted ? (
                <button
                  type="button"
                  className="quiz-submit-button"
                  onClick={checkAnswer}
                  disabled={!quizAnswer}
                >
                  Check Answer
                </button>
              ) : (
                <>
                  <div
                    className={`
                      quiz-feedback

                      ${
                        quizAnswer ===
                        "recycle"
                          ? "correct"
                          : "incorrect"
                      }
                    `}
                  >

                    <div>

                      {quizAnswer ===
                      "recycle" ? (
                        <Check size={16} />
                      ) : (
                        <BookOpen size={16} />
                      )}

                    </div>


                    <div>

                      <strong>
                        {quizAnswer ===
                        "recycle"
                          ? "That's right."
                          : "Not quite."
                        }
                      </strong>


                      <p>
                        PET bottles can often
                        be recovered when they
                        reach an appropriate
                        recycling stream.
                      </p>

                    </div>

                  </div>


                  <button
                    type="button"
                    className="quiz-retry-button"
                    onClick={resetQuiz}
                  >
                    Try Again
                  </button>
                </>
              )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          CLIMATE CHALLENGE
      ====================================== */}

      <section className="climate-challenge-section">

        <div className="learn-container">

          <div className="climate-challenge-card">

            {/* COPY */}

            <div className="challenge-copy">

              <div className="challenge-label">

                <Trophy size={14} />

                Climate Challenge

              </div>


              <h2>
                Can you avoid
                single-use plastic
                for one day?
              </h2>


              <p>
                Start small. Pay attention to
                the disposable plastic you use
                throughout one normal day and
                look for realistic alternatives.
              </p>


              <button
                type="button"
                className="join-challenge-button"
              >
                Join Challenge

                <ArrowRight size={16} />
              </button>

            </div>


            {/* REWARD PREVIEW */}

            <div className="challenge-visual">

              <div className="challenge-medal">

                <Medal size={37} />

              </div>


              <div className="challenge-stat">

                <strong>
                  +20
                </strong>

                <span>
                  Climate Points
                </span>

              </div>


              <p>
                Demo reward for completing
                the challenge.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="learn-footer">

        <Leaf size={13} />

        Climatica turns environmental
        knowledge into practical action.

      </footer>

    </main>
  );
}



function LessonCard({
  lesson,
}) {
  return (
    <article className="lesson-card">

      <div className="lesson-card-top">

        <span>
          {lesson.category}
        </span>


        <ArrowRight size={15} />

      </div>


      <div className="lesson-book-icon">

        <BookOpen size={21} />

      </div>


      <h3>
        {lesson.title}
      </h3>


      <p>
        {lesson.description}
      </p>


      <div className="lesson-card-footer">

        <span>

          <Clock3 size={11} />

          {lesson.time}

        </span>


        <span>
          {lesson.level}
        </span>

      </div>

    </article>
  );
}


export default Learn;