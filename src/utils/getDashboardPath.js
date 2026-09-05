export default function getDashboardPath(role) {
  switch (role) {
    case "recycler":
      return "/recycler-dashboard";

    case "school":
      return "/school-dashboard";

    case "business":
      return "/business-dashboard";

    case "admin":
      return "/admin-dashboard";

    default:
      return "/dashboard";
  }
}