import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import DashboardApp from "./pages/DashboardApp";
import NotFound from "./pages/Page404";
import MyProfile from "./pages/pages/MyProfile";
import Settings from "./pages/pages/Settings";
import Users from "./pages/pages/Users";
import Hospitals from "./pages/pages/Hospitals";
import EditHospital from "./pages/pages/EditHospital";
import ViewUser from "./pages/pages/users/ViewUser";
import Extras from "./pages/pages/Extras";
import Admin from "./pages/pages/Admin";
// import Calendar from "./pages/pages/Calendar";
import AddNewHospital from "./pages/pages/AddNewHospital";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "/", element: <DashboardApp /> },

        { path: "/settings/", element: <Settings /> },
        { path: "/users/", element: <Users /> },
        // { path: "/calendar/", element: <Calendar /> },
        { path: "/viewUser/:id", element: <ViewUser /> },
        { path: "/addHospital", element: <AddNewHospital /> },
        { path: "/editHospital/:id", element: <EditHospital /> },
        { path: "/extras/", element: <Extras /> },
        { path: "/admin/", element: <Admin /> },
        { path: "/hospitals/", element: <Hospitals /> },
        { path: "/profile", element: <MyProfile /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
