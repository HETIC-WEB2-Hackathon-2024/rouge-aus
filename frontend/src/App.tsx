import {Box} from "@mui/material";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Dashboard} from "./dashboard/Dashboard";
import {Parametres} from "./parametres/Parametres";
import {Offre} from "./offre/Offre.tsx";
import LandingPage from "./landing-page/LandingPage.tsx";
import Navbar from "./components/Navbar.tsx";
import {Auth0Provider} from "@auth0/auth0-react";
import {Authenticated} from "./auth/Authenticated.tsx";
import {useReducer} from "react";
import {AppContext, initialState, reducer} from "./context/AppContext.ts";

export function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
        <AppContext.Provider value={{state, dispatch}}>
            <BrowserRouter>
                <Navbar/>
                <Auth0Provider
                    domain="rouge-aus.eu.auth0.com"
                    clientId="ky2NZpStWuhMYVy9WZBeBb5QQXEndo8P"
                    authorizationParams={{
                        audience: "api.rouge.aus.floless.fr",
                        redirect_uri: window.location.origin,
                    }}
                >
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/dashboard" element={<Authenticated children={<Dashboard/>}/>}/>
                        <Route path="/offres" element={<Authenticated children={<Offre/>}/>}/>
                        <Route path="/profile" element={<Authenticated children={<Parametres/>}/>}/>
                        <Route path="/selection" element={<Authenticated children={<Box>Ma sélection</Box>}/>}/>
                </Routes>
            </Auth0Provider>
        </BrowserRouter>
        </AppContext.Provider>
</>
)
}
