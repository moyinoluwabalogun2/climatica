import {
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  GraduationCap,
  Home,
  Leaf,
  LogOut,
  MapPin,
  Menu,
  Plus,
  Recycle,
  School,
  Search,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  Users,
  Weight,
  X,
} from "lucide-react";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import {
  useAuth,
} from "../context/AuthContext";

import climaticaLogo
  from "../assets/climatica-logo.png";

import educationImage
  from "../assets/education-classroom.png";


/* =========================================
   DEMO METRICS
========================================= */

const schoolStats = [
  {
    label: "Students engaged",
    value: "184",
    note: "Prototype activity",
    icon: Users,
  },

  {
    label: "Lessons completed",
    value: "76",
    note: "Across participating classes",
    icon: BookOpen,
  },

  {
    label: "Materials recovered",
    value: "96 kg",
    note: "Demo school total",
    icon: Weight,
  },

  {
    label: "School climate points",
    value: "1,280",
    note: "Prototype rewards",
    icon: Sparkles,
  },
];


const classData = [
  {
    id: 1,
    name: "JSS 1A",
    students: 34,
    participation: 82,
    lessons: 12,
    points: 245,
  },

  {
    id: 2,
    name: "JSS 2B",
    students: 31,
    participation: 74,
    lessons: 10,
    points: 198,
  },

  {
    id: 3,
    name: "SS 1A",
    students: 38,
    participation: 91,
    lessons: 17,
    points: 302,
  },

  {
    id: 4,
    name: "SS 2C",
    students: 29,
    participation: 68,
    lessons: 8,
    points: 160,
  },
];


const learningTopics = [
  {
    id: 1,
    title: "Understanding Plastics",
    completed: 74,
    icon: Recycle,
  },

  {
    id: 2,
    title: "Food Waste & Composting",
    completed: 58,
    icon: Leaf,
  },

  {
    id: 3,
    title: "Responsible E-Waste",
    completed: 41,
    icon: GraduationCap,
  },

  {
    id: 4,
    title: "Waste Sorting Basics",
    completed: 86,
    icon: ClipboardCheck,
  },
];


const schoolChallenges = [
  {
    id: 1,
    title: "Plastic-Free Lunch Day",
    description:
      "Encourage students to avoid disposable plastic packaging during one school lunch period.",
    reward: "+200 points",
    progress: 72,
    status: "Active",
  },

  {
    id: 2,
    title: "Classroom Paper Recovery",
    description:
      "Separate clean paper from classroom waste and keep it ready for recovery.",
    reward: "+150 points",
    progress: 48,
    status: "Active",
  },
];


const recentActivity = [
  {
    id: 1,
    title: "SS 1A completed a plastics lesson",
    detail:
      "17 students completed the featured learning activity.",
    time: "Today · 10:15 AM",
    icon: BookOpen,
  },

  {
    id: 2,
    title: "Paper added to recycling drive",
    detail:
      "The school recovery total increased by 8 kg.",
    time: "Today · 9:20 AM",
    icon: Recycle,
  },

  {
    id: 3,
    title: "Climate challenge progress updated",
    detail:
      "Plastic-Free Lunch Day reached 72% completion.",
    time: "Yesterday",
    icon: Trophy,
  },
];


function SchoolDashboard() {
  const {
    user,
    signOut,
  } = useAuth();


  const navigate =
    useNavigate();


  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);


  const [
    driveActive,
    setDriveActive,
  ] = useState(true);


  const [
    selectedClass,
    setSelectedClass,
  ] = useState(null);


  const handleSignOut = () => {
    signOut();

    navigate("/");
  };


  return (
    <main className="school-dashboard">

      {/* =====================================
          SIDEBAR
      ====================================== */}

      <aside
        className={`
          school-sidebar

          ${
            mobileMenuOpen
              ? "mobile-open"
              : ""
          }
        `}
      >

        <div className="school-sidebar-top">

          <Link
            to="/"
            className="school-dashboard-logo"
          >
            <img
              src={climaticaLogo}
              alt="Climatica"
            />
          </Link>


          <button
            type="button"
            className="school-mobile-close"
            onClick={() =>
              setMobileMenuOpen(false)
            }
          >
            <X size={21} />
          </button>

        </div>


        {/* SCHOOL PROFILE */}

        <div className="school-profile-card">

          <div className="school-profile-icon">

            <School size={23} />

          </div>


          <div>

            <span>
              School account
            </span>

            <strong>
              {user?.name ||
                "Demo School"}
            </strong>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="school-nav">

          <NavLink
            to="/school-dashboard"
            end
            className={({
              isActive,
            }) =>
              isActive
                ? "active"
                : ""
            }
          >
            <Home size={19} />

            Overview
          </NavLink>


          <button
            type="button"
          >
            <Users size={19} />

            Students & Classes
          </button>


          <button
            type="button"
          >
            <BookOpen size={19} />

            Learning Activity
          </button>


          <button
            type="button"
          >
            <Recycle size={19} />

            Recycling Drive
          </button>


          <button
            type="button"
          >
            <Trophy size={19} />

            Challenges
          </button>

        </nav>


        <div className="school-sidebar-divider" />


        <nav className="school-secondary-nav">

          <Link to="/learn">

            <GraduationCap
              size={19}
            />

            Education Hub
          </Link>


          <Link to="/recycling">

            <MapPin size={19} />

            Find Recycling
          </Link>


          <button
            type="button"
          >
            <Award size={19} />

            School Rewards
          </button>


          <button
            type="button"
          >
            <UserRound size={19} />

            School Profile
          </button>

        </nav>


        {/* BOTTOM */}

        <div className="school-sidebar-bottom">

          <div className="school-impact-card">

            <Leaf size={20} />


            <div>

              <strong>
                Build better habits.
              </strong>


              <p>
                Education becomes stronger
                when students can connect
                knowledge with action.
              </p>

            </div>

          </div>


          <button
            type="button"
            className="school-signout"
            onClick={
              handleSignOut
            }
          >
            <LogOut size={18} />

            Sign out
          </button>

        </div>

      </aside>


      {/* MOBILE OVERLAY */}

      {mobileMenuOpen && (
        <button
          type="button"
          className="school-mobile-overlay"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          aria-label="Close navigation"
        />
      )}


      {/* =====================================
          MAIN
      ====================================== */}

      <section className="school-main">

        {/* TOPBAR */}

        <header className="school-topbar">

          <div className="school-mobile-brand">

            <button
              type="button"
              className="school-menu-button"
              onClick={() =>
                setMobileMenuOpen(true)
              }
            >
              <Menu size={22} />
            </button>


            <img
              src={climaticaLogo}
              alt="Climatica"
            />

          </div>


          <div className="school-topbar-copy">

            <span>
              School workspace
            </span>

            <strong>
              Education & climate action
            </strong>

          </div>


          <div className="school-topbar-actions">

            <button
              type="button"
              className="school-topbar-icon"
            >
              <Search size={19} />
            </button>


            <button
              type="button"
              className="school-topbar-icon school-notification"
            >
              <Bell size={19} />

              <span />
            </button>


            <div className="school-topbar-user">

              <div>

                <span>
                  School account
                </span>

                <strong>
                  {user?.name}
                </strong>

              </div>


              <div className="school-small-avatar">

                <School size={19} />

              </div>

            </div>

          </div>

        </header>


        {/* =====================================
            CONTENT
        ====================================== */}

        <div className="school-content">

          {/* =================================
              WELCOME
          ================================== */}

          <section className="school-welcome">

            <div className="school-welcome-copy">

              <div className="school-eyebrow">

                <GraduationCap
                  size={16}
                />

                School climate action

              </div>


              <h1>
                Learn together.
                <br />

                <span>
                  Act together.
                </span>
              </h1>


              <p>
                Help students understand waste,
                participate in practical climate
                activities and build habits that
                extend beyond the classroom.
              </p>

            </div>


            <div className="school-welcome-image">

              <img
                src={educationImage}
                alt="Students learning about recycling"
              />


              <div className="school-welcome-image-overlay" />


              <div className="school-image-caption">

                <Leaf size={18} />

                <div>

                  <span>
                    Environmental learning
                  </span>

                  <strong>
                    Knowledge into action.
                  </strong>

                </div>

              </div>

            </div>

          </section>


          {/* =================================
              STATS
          ================================== */}

          <section className="school-section">

            <div className="school-section-heading">

              <div>

                <span>
                  School snapshot
                </span>


                <h2>
                  Participation at
                  a glance.
                </h2>

              </div>


              <p>
                These figures are prototype
                data showing how a school
                could monitor participation,
                learning and waste recovery.
              </p>

            </div>


            <div className="school-stat-grid">

              {schoolStats.map(
                (stat) => {
                  const Icon =
                    stat.icon;


                  return (
                    <article
                      className="school-stat-card"
                      key={
                        stat.label
                      }
                    >

                      <div className="school-stat-icon">

                        <Icon size={23} />

                      </div>


                      <div>

                        <strong>
                          {stat.value}
                        </strong>

                        <span>
                          {stat.label}
                        </span>

                        <small>
                          {stat.note}
                        </small>

                      </div>

                    </article>
                  );
                }
              )}

            </div>

          </section>


          {/* =================================
              DRIVE + SCHOOL GOAL
          ================================== */}

          <section className="school-two-column">

            {/* RECYCLING DRIVE */}

            <article className="school-panel school-drive-panel">

              <div className="school-panel-heading">

                <div>

                  <span>
                    School recycling drive
                  </span>


                  <h2>
                    Current recovery
                    campaign.
                  </h2>

                </div>


                <Recycle size={25} />

              </div>


              <div className="school-drive-status">

                <div>

                  <span>
                    Campaign status
                  </span>


                  <strong>
                    {driveActive
                      ? "Active"
                      : "Paused"}
                  </strong>

                </div>


                <button
                  type="button"
                  className={
                    driveActive
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setDriveActive(
                      (current) =>
                        !current
                    )
                  }
                >

                  <span />

                </button>

              </div>


              <h3>
                Clean School
                Recovery Drive
              </h3>


              <p className="school-drive-description">
                Students and staff separate
                recoverable plastics, cans
                and paper from general waste
                during the school week.
              </p>


              <div className="school-drive-total">

                <div>

                  <Weight size={22} />

                </div>


                <div>

                  <span>
                    Recovered so far
                  </span>

                  <strong>
                    96 kg
                  </strong>

                </div>


                <small>
                  Demo total
                </small>

              </div>


              <div className="school-material-breakdown">

                <MaterialRow
                  name="Plastic"
                  amount="44 kg"
                  percentage="46%"
                />


                <MaterialRow
                  name="Paper"
                  amount="31 kg"
                  percentage="32%"
                />


                <MaterialRow
                  name="Metal"
                  amount="21 kg"
                  percentage="22%"
                />

              </div>


              <Link
                to="/recycling"
                className="school-primary-link"
              >
                Find Recovery Partner

                <ArrowRight
                  size={17}
                />
              </Link>

            </article>


            {/* SCHOOL GOAL */}

            <article className="school-panel school-goal-panel">

              <div className="school-panel-heading">

                <div>

                  <span>
                    Monthly goal
                  </span>


                  <h2>
                    Recover
                    150 kg.
                  </h2>

                </div>


                <Target size={25} />

              </div>


              <div className="school-goal-visual">

                <div className="school-goal-ring">

                  <div>

                    <strong>
                      64%
                    </strong>

                    <span>
                      complete
                    </span>

                  </div>

                </div>

              </div>


              <div className="school-goal-numbers">

                <div>

                  <span>
                    Current
                  </span>

                  <strong>
                    96 kg
                  </strong>

                </div>


                <div>

                  <span>
                    Target
                  </span>

                  <strong>
                    150 kg
                  </strong>

                </div>


                <div>

                  <span>
                    Remaining
                  </span>

                  <strong>
                    54 kg
                  </strong>

                </div>

              </div>


              <div className="school-goal-message">

                <Sparkles
                  size={17}
                />

                <p>
                  Keep the school community
                  involved to reach the
                  prototype monthly target.
                </p>

              </div>

            </article>

          </section>


          {/* =================================
              CLASS ENGAGEMENT
          ================================== */}

          <section className="school-section">

            <div className="school-section-heading school-heading-action">

              <div>

                <span>
                  Classroom engagement
                </span>


                <h2>
                  Participation by class.
                </h2>

              </div>


              <button
                type="button"
                className="school-add-class"
              >
                <Plus size={17} />

                Add Class
              </button>

            </div>


            <div className="school-class-table-wrap">

              <table className="school-class-table">

                <thead>

                  <tr>

                    <th>
                      Class
                    </th>

                    <th>
                      Students
                    </th>

                    <th>
                      Participation
                    </th>

                    <th>
                      Lessons
                    </th>

                    <th>
                      Points
                    </th>

                    <th />

                  </tr>

                </thead>


                <tbody>

                  {classData.map(
                    (item) => (
                      <tr
                        key={item.id}
                      >

                        <td>

                          <div className="school-class-name">

                            <div>

                              <Users
                                size={18}
                              />

                            </div>


                            <strong>
                              {item.name}
                            </strong>

                          </div>

                        </td>


                        <td>
                          {item.students}
                        </td>


                        <td>

                          <div className="class-participation">

                            <div>

                              <span
                                style={{
                                  width:
                                    `${item.participation}%`,
                                }}
                              />

                            </div>


                            <strong>
                              {
                                item.participation
                              }%
                            </strong>

                          </div>

                        </td>


                        <td>
                          {item.lessons}
                        </td>


                        <td>

                          <span className="school-points-pill">

                            <Sparkles
                              size={14}
                            />

                            {item.points}

                          </span>

                        </td>


                        <td>

                          <button
                            type="button"
                            className="school-class-view"
                            onClick={() =>
                              setSelectedClass(
                                item
                              )
                            }
                          >
                            <ChevronRight
                              size={19}
                            />
                          </button>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </section>


          {/* =================================
              LEARNING + CHALLENGES
          ================================== */}

          <section className="school-two-column">

            {/* LEARNING */}

            <article className="school-panel">

              <div className="school-panel-heading">

                <div>

                  <span>
                    Learning progress
                  </span>


                  <h2>
                    What students
                    are learning.
                  </h2>

                </div>


                <BookOpen size={25} />

              </div>


              <div className="school-learning-list">

                {learningTopics.map(
                  (topic) => {
                    const Icon =
                      topic.icon;


                    return (
                      <div
                        className="school-learning-item"
                        key={
                          topic.id
                        }
                      >

                        <div className="school-learning-icon">

                          <Icon
                            size={20}
                          />

                        </div>


                        <div className="school-learning-copy">

                          <div>

                            <strong>
                              {topic.title}
                            </strong>


                            <span>
                              {
                                topic.completed
                              }%
                            </span>

                          </div>


                          <div className="school-learning-bar">

                            <span
                              style={{
                                width:
                                  `${topic.completed}%`,
                              }}
                            />

                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>


              <Link
                to="/learn"
                className="school-outline-link"
              >
                Open Education Hub

                <ArrowRight
                  size={17}
                />
              </Link>

            </article>


            {/* CHALLENGES */}

            <article className="school-panel">

              <div className="school-panel-heading">

                <div>

                  <span>
                    School challenges
                  </span>


                  <h2>
                    Build habits
                    through action.
                  </h2>

                </div>


                <Trophy size={25} />

              </div>


              <div className="school-challenge-list">

                {schoolChallenges.map(
                  (challenge) => (
                    <article
                      className="school-challenge-card"
                      key={
                        challenge.id
                      }
                    >

                      <div className="school-challenge-top">

                        <span>
                          {challenge.status}
                        </span>


                        <strong>
                          {challenge.reward}
                        </strong>

                      </div>


                      <h3>
                        {challenge.title}
                      </h3>


                      <p>
                        {
                          challenge.description
                        }
                      </p>


                      <div className="school-challenge-progress-copy">

                        <span>
                          Progress
                        </span>


                        <strong>
                          {
                            challenge.progress
                          }%
                        </strong>

                      </div>


                      <div className="school-challenge-progress">

                        <span
                          style={{
                            width:
                              `${challenge.progress}%`,
                          }}
                        />

                      </div>

                    </article>
                  )
                )}

              </div>

            </article>

          </section>


          {/* =================================
              ACTIVITY + CALENDAR
          ================================== */}

          <section className="school-two-column school-bottom-grid">

            {/* ACTIVITY */}

            <article className="school-panel">

              <div className="school-panel-heading">

                <div>

                  <span>
                    Recent activity
                  </span>


                  <h2>
                    What's happening.
                  </h2>

                </div>


                <Clock3 size={25} />

              </div>


              <div className="school-activity-list">

                {recentActivity.map(
                  (item) => {
                    const Icon =
                      item.icon;


                    return (
                      <div
                        className="school-activity-item"
                        key={
                          item.id
                        }
                      >

                        <div className="school-activity-icon">

                          <Icon
                            size={19}
                          />

                        </div>


                        <div>

                          <strong>
                            {item.title}
                          </strong>


                          <p>
                            {item.detail}
                          </p>


                          <span>
                            {item.time}
                          </span>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </article>


            {/* UPCOMING */}

            <article className="school-panel school-calendar-panel">

              <div className="school-panel-heading">

                <div>

                  <span>
                    Upcoming
                  </span>


                  <h2>
                    School climate
                    calendar.
                  </h2>

                </div>


                <CalendarDays
                  size={25}
                />

              </div>


              <SchoolEvent
                day="12"
                month="SEP"
                title="Plastic-Free Lunch Day"
                detail="Whole-school challenge"
              />


              <SchoolEvent
                day="18"
                month="SEP"
                title="Recycling Collection"
                detail="Prototype recovery pickup"
              />


              <SchoolEvent
                day="25"
                month="SEP"
                title="Climate Learning Session"
                detail="JSS environmental lesson"
              />

            </article>

          </section>


          {/* =================================
              PROTOTYPE NOTE
          ================================== */}

          <div className="school-prototype-note">

            <Leaf size={17} />


            <p>
              Student numbers, participation,
              school points, class activity,
              recovery totals and challenge
              progress are sample prototype
              data. Real school accounts will
              later use stored activity and
              verified recovery records.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          CLASS MODAL
      ====================================== */}

      {selectedClass && (
        <ClassDetailsModal
          classData={
            selectedClass
          }
          onClose={() =>
            setSelectedClass(null)
          }
        />
      )}

    </main>
  );
}


/* =========================================
   MATERIAL ROW
========================================= */

function MaterialRow({
  name,
  amount,
  percentage,
}) {
  return (
    <div className="school-material-row">

      <div>

        <strong>
          {name}
        </strong>

        <span>
          {amount}
        </span>

      </div>


      <div>

        <span
          style={{
            width: percentage,
          }}
        />

      </div>


      <strong>
        {percentage}
      </strong>

    </div>
  );
}


/* =========================================
   SCHOOL EVENT
========================================= */

function SchoolEvent({
  day,
  month,
  title,
  detail,
}) {
  return (
    <div className="school-event">

      <div className="school-event-date">

        <strong>
          {day}
        </strong>

        <span>
          {month}
        </span>

      </div>


      <div>

        <strong>
          {title}
        </strong>

        <span>
          {detail}
        </span>

      </div>


      <ChevronRight
        size={19}
      />

    </div>
  );
}


/* =========================================
   CLASS DETAIL MODAL
========================================= */

function ClassDetailsModal({
  classData,
  onClose,
}) {
  return (
    <div
      className="school-modal-backdrop"
      onMouseDown={
        onClose
      }
    >

      <div
        className="school-class-modal"
        onMouseDown={(
          event
        ) =>
          event.stopPropagation()
        }
      >

        <button
          type="button"
          className="school-modal-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>


        <div className="school-modal-icon">

          <Users size={27} />

        </div>


        <span className="school-modal-eyebrow">
          Class overview
        </span>


        <h2>
          {classData.name}
        </h2>


        <p>
          Prototype classroom summary
          showing how a school could
          review environmental learning
          and participation.
        </p>


        <div className="school-modal-stat-grid">

          <div>

            <span>
              Students
            </span>

            <strong>
              {classData.students}
            </strong>

          </div>


          <div>

            <span>
              Participation
            </span>

            <strong>
              {
                classData.participation
              }%
            </strong>

          </div>


          <div>

            <span>
              Lessons completed
            </span>

            <strong>
              {classData.lessons}
            </strong>

          </div>


          <div>

            <span>
              Climate points
            </span>

            <strong>
              {classData.points}
            </strong>

          </div>

        </div>


        <div className="school-modal-progress">

          <div>

            <span>
              Class participation
            </span>


            <strong>
              {
                classData.participation
              }%
            </strong>

          </div>


          <div>

            <span
              style={{
                width:
                  `${classData.participation}%`,
              }}
            />

          </div>

        </div>


        <button
          type="button"
          className="school-modal-action"
          onClick={onClose}
        >
          <CheckCircle2
            size={17}
          />

          Done
        </button>


        <div className="school-modal-note">

          <Leaf size={15} />

          Prototype classroom
          information.

        </div>

      </div>

    </div>
  );
}


export default SchoolDashboard;