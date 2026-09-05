import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
} from "react";


import Home
  from "./pages/Home";

import Identify
  from "./pages/Identify";

import Analysing
  from "./pages/Analysing";

import Result
  from "./pages/Result";

import Options
  from "./pages/Options";

import Recycling
  from "./pages/Recycling";

import Learn
  from "./pages/Learn";

import Marketplace
  from "./pages/Marketplace";

import Login
  from "./pages/Login";

import Register
  from "./pages/Register";

import Dashboard
  from "./pages/Dashboard";

import RecyclerDashboard
  from "./pages/RecyclerDashboard";

import SchoolDashboard
  from "./pages/SchoolDashboard";

import BusinessDashboard
  from "./pages/BusinessDashboard";

import AdminDashboard
  from "./pages/AdminDashboard";

import ProtectedRoute
  from "./components/ProtectedRoute";


function App() {
  const location =
    useLocation();


  const isWorkspaceRoute =
    location.pathname.includes(
      "dashboard"
    );


  const isAuthRoute =
    location.pathname ===
      "/login" ||
    location.pathname ===
      "/register";


  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname]);


  return (
    <div
      key={location.pathname}
      className={
        !isWorkspaceRoute &&
        !isAuthRoute
          ? "public-route-transition"
          : undefined
      }
    >

      <Routes location={location}>

        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/identify"
          element={<Identify />}
        />


        <Route
          path="/analysing"
          element={<Analysing />}
        />


        <Route
          path="/result"
          element={<Result />}
        />


        <Route
          path="/options"
          element={<Options />}
        />


        <Route
          path="/recycling"
          element={<Recycling />}
        />


        <Route
          path="/learn"
          element={<Learn />}
        />


        <Route
          path="/marketplace"
          element={<Marketplace />}
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />


        {/* ===============================================
            INDIVIDUAL
        ================================================ */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={[
                "individual",
              ]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* ===============================================
            RECYCLER / PSP
        ================================================ */}

        <Route
          path="/recycler-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={[
                "recycler",
              ]}
            >
              <RecyclerDashboard />
            </ProtectedRoute>
          }
        />


        {/* ===============================================
            SCHOOL
        ================================================ */}

        <Route
          path="/school-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={[
                "school",
              ]}
            >
              <SchoolDashboard />
            </ProtectedRoute>
          }
        />


        {/* ===============================================
            BUSINESS
        ================================================ */}

        <Route
          path="/business-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={[
                "business",
              ]}
            >
              <BusinessDashboard />
            </ProtectedRoute>
          }
        />


        {/* ===============================================
            ADMIN
        ================================================ */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
              ]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </div>
  );
}


export default App;