import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";


const AuthContext =
  createContext(null);


const USER_KEY =
  "climatica-demo-user";

const ACCOUNTS_KEY =
  "climatica-demo-accounts";


/* =========================================================
   DEMO ACCOUNTS

   These accounts are automatically added to every browser
   that opens the deployed prototype.

   IMPORTANT:
   Passwords are deliberately stored in localStorage because
   this is only a frontend prototype.

   Replace this entire auth layer with Supabase/Auth before
   production.
========================================================= */

const DEMO_ACCOUNTS = [
  {
    id: "climatica-demo-individual",

    name: "Demo Individual",

    email:
      "individual@climatica.app",

    password:
      "Individual123!",

    role:
      "individual",

    isDemo:
      true,

    joinedAt:
      "2026-09-01T09:00:00.000Z",
  },

  {
    id: "climatica-demo-recycler",

    name: "Demo Recycler",

    email:
      "recycler@climatica.app",

    password:
      "Recycler123!",

    role:
      "recycler",

    isDemo:
      true,

    joinedAt:
      "2026-09-01T09:00:00.000Z",
  },

  {
    id: "climatica-demo-school",

    name: "Demo School",

    email:
      "school@climatica.app",

    password:
      "School123!",

    role:
      "school",

    isDemo:
      true,

    joinedAt:
      "2026-09-01T09:00:00.000Z",
  },

  {
    id: "climatica-demo-business",

    name:
      "Demo Business",

    email:
      "business@climatica.app",

    password:
      "Business123!",

    role:
      "business",

    isDemo:
      true,

    joinedAt:
      "2026-09-01T09:00:00.000Z",
  },

  {
    id: "climatica-demo-admin",

    name:
      "Climatica Admin",

    email:
      "admin@climatica.app",

    password:
      "Admin123!",

    role:
      "admin",

    isDemo:
      true,

    joinedAt:
      "2026-09-01T09:00:00.000Z",
  },
];


/* =========================================================
   ALLOWED PUBLIC REGISTRATION ROLES

   Admin is intentionally excluded.
========================================================= */

const PUBLIC_ROLES = [
  "individual",
  "recycler",
  "school",
  "business",
];


/* =========================================================
   SAFE JSON READER
========================================================= */

function safelyReadJSON(
  key,
  fallback
) {
  try {
    const value =
      localStorage.getItem(key);

    return value
      ? JSON.parse(value)
      : fallback;
  } catch {
    return fallback;
  }
}


/* =========================================================
   REMOVE PASSWORD BEFORE MAKING USER SESSION

   We don't need the password inside climatica-demo-user.
========================================================= */

function createSafeUser(
  account
) {
  if (!account) {
    return null;
  }


  const {
    password,
    ...safeAccount
  } = account;


  return safeAccount;
}


/* =========================================================
   SEED DEMO ACCOUNTS

   Existing user-created accounts are preserved.

   If a demo account already exists, it is refreshed with the
   current demo configuration so old localStorage versions do
   not keep outdated passwords/roles.
========================================================= */

function ensureDemoAccounts() {
  const existingAccounts =
    safelyReadJSON(
      ACCOUNTS_KEY,
      []
    );


  const nonDemoAccounts =
    existingAccounts.filter(
      (account) =>
        !DEMO_ACCOUNTS.some(
          (demo) =>
            demo.email ===
            account.email
        )
    );


  const updatedAccounts = [
    ...DEMO_ACCOUNTS,
    ...nonDemoAccounts,
  ];


  localStorage.setItem(
    ACCOUNTS_KEY,
    JSON.stringify(
      updatedAccounts
    )
  );


  return updatedAccounts;
}


/* =========================================================
   AUTH PROVIDER
========================================================= */

export function AuthProvider({
  children,
}) {
  const [
    user,
    setUser,
  ] = useState(() =>
    safelyReadJSON(
      USER_KEY,
      null
    )
  );


  /* =======================================================
     SEED DEMO ACCOUNTS ON APP START
  ======================================================= */

  useEffect(() => {
    ensureDemoAccounts();
  }, []);


  /* =======================================================
     KEEP AUTH STATE IN SYNC
  ======================================================= */

  useEffect(() => {
    const syncUser = () => {
      setUser(
        safelyReadJSON(
          USER_KEY,
          null
        )
      );
    };


    window.addEventListener(
      "storage",
      syncUser
    );


    window.addEventListener(
      "climatica-auth-changed",
      syncUser
    );


    return () => {
      window.removeEventListener(
        "storage",
        syncUser
      );


      window.removeEventListener(
        "climatica-auth-changed",
        syncUser
      );
    };
  }, []);


  /* =======================================================
     SET AUTHENTICATED USER
  ======================================================= */

  const authenticateAccount = (
    account
  ) => {
    const safeUser =
      createSafeUser(
        account
      );


    localStorage.setItem(
      USER_KEY,
      JSON.stringify(
        safeUser
      )
    );


    setUser(
      safeUser
    );


    window.dispatchEvent(
      new Event(
        "climatica-auth-changed"
      )
    );


    return safeUser;
  };


  /* =======================================================
     REGISTER

     Public users can create:
     - Individual
     - Recycler / PSP
     - School
     - Business

     Admin cannot be registered publicly.
  ======================================================= */

  const register = ({
    name,
    email,
    password,
    role,
  }) => {
    const cleanName =
      name?.trim();

    const cleanEmail =
      email
        ?.trim()
        .toLowerCase();

    const cleanRole =
      role || "individual";


    if (!cleanName) {
      throw new Error(
        "Please enter your name or organisation name."
      );
    }


    if (!cleanEmail) {
      throw new Error(
        "Please enter your email address."
      );
    }


    if (
      !password ||
      password.length < 6
    ) {
      throw new Error(
        "Password must be at least 6 characters."
      );
    }


    if (
      !PUBLIC_ROLES.includes(
        cleanRole
      )
    ) {
      throw new Error(
        "This account type cannot be created through public registration."
      );
    }


    const accounts =
      ensureDemoAccounts();


    const alreadyExists =
      accounts.some(
        (account) =>
          account.email ===
          cleanEmail
      );


    if (alreadyExists) {
      throw new Error(
        "An account with this email already exists."
      );
    }


    const account = {
      id:
        `user-${Date.now()}`,

      name:
        cleanName,

      email:
        cleanEmail,

      password,

      role:
        cleanRole,

      isDemo:
        false,

      joinedAt:
        new Date().toISOString(),
    };


    const updatedAccounts = [
      ...accounts,
      account,
    ];


    localStorage.setItem(
      ACCOUNTS_KEY,
      JSON.stringify(
        updatedAccounts
      )
    );


    return authenticateAccount(
      account
    );
  };


  /* =======================================================
     SIGN IN

     Email + password are now both checked.
  ======================================================= */

  const signIn = ({
    email,
    password,
  }) => {
    const cleanEmail =
      email
        ?.trim()
        .toLowerCase();


    if (!cleanEmail) {
      throw new Error(
        "Please enter your email address."
      );
    }


    if (!password) {
      throw new Error(
        "Please enter your password."
      );
    }


    const accounts =
      ensureDemoAccounts();


    const account =
      accounts.find(
        (item) =>
          item.email ===
          cleanEmail
      );


    if (!account) {
      throw new Error(
        "No account was found with that email."
      );
    }


    if (
      account.password !==
      password
    ) {
      throw new Error(
        "Incorrect password."
      );
    }


    return authenticateAccount(
      account
    );
  };


  /* =======================================================
     SIGN IN TO A SPECIFIC DEMO ROLE

     Useful for clickable demo cards on Login page.
  ======================================================= */

  const signInDemoRole = (
    role
  ) => {
    const accounts =
      ensureDemoAccounts();


    const account =
      accounts.find(
        (item) =>
          item.isDemo &&
          item.role === role
      );


    if (!account) {
      throw new Error(
        "That demo account could not be found."
      );
    }


    return authenticateAccount(
      account
    );
  };


  /* =======================================================
     DEFAULT DEMO USER

     Keeps compatibility with any old component that already
     calls signInDemo().
  ======================================================= */

  const signInDemo = () => {
    return signInDemoRole(
      "individual"
    );
  };


  /* =======================================================
     SIGN OUT
  ======================================================= */

  const signOut = () => {
    localStorage.removeItem(
      USER_KEY
    );


    setUser(null);


    window.dispatchEvent(
      new Event(
        "climatica-auth-changed"
      )
    );
  };


  /* =======================================================
     CONTEXT VALUE
  ======================================================= */

  const value =
    useMemo(
      () => ({
        user,

        isAuthenticated:
          Boolean(user),

        register,

        signIn,

        signInDemo,

        signInDemoRole,

        signOut,

        demoAccounts:
          DEMO_ACCOUNTS.map(
            createSafeUser
          ),
      }),

      [user]
    );


  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}


/* =========================================================
   AUTH HOOK
========================================================= */

export function useAuth() {
  const context =
    useContext(
      AuthContext
    );


  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }


  return context;
}