import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { Authenticated } from "./auth/Authenticated.tsx";
import '../src/assets/sass/main.scss'

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <Auth0Provider
      domain="rouge-aus.eu.auth0.com"
      clientId="ky2NZpStWuhMYVy9WZBeBb5QQXEndo8P"
      authorizationParams={{
        audience: "api.rouge.aus.floless.fr",
        redirect_uri: window.location.origin,
      }}
    > 
      <Authenticated>
        <App />
      </Authenticated>
    </Auth0Provider>
  // </React.StrictMode>
);
