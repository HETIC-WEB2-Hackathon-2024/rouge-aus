import { Box } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import { Parametres } from "./parametres/Parametres";
import { Offre } from "./offre/Offre.tsx";
import LandingPage from "./landing-page/LandingPage.tsx";
import Navbar from "./components/Navbar.tsx";
import Entreprises from "./entreprises/Entreprises.tsx";
import {Outlet} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "landing",
        element: <LandingPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "entreprises",
        element: <Entreprises />,
      },
      {
        path: "offres",
        element: <Offre />,
      },
      {
        path: "profile",
        element: <Parametres />,
      },
      {
        path: "selection",
        element: <Box>Ma sélection</Box>,
      },
    ],
  },
]);
// const MainBox = styled(Box)`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
// `;

function Layout() {
  return (
      <>
        <Navbar/>
        <Outlet/>
      </>
    // <AppTheme>
    //   <MainBox>
    //     <CssBaseline />
    //     <TopMenu />
    //     <Box component="main">
    //       <Toolbar />
    //       <Outlet />
    //     </Box>
    //   </MainBox>
    // </AppTheme>
  );
}

export function App() {
  return <RouterProvider router={router} />;
}
