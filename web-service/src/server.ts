import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import cors from "cors";
import { getFirstOffres, getOffreDashboard, getTopMetier } from "./database";

const port = 3000;
const app = express();

// make sure we hare handling CORS properly
// See more on CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

const jwtCheck = auth({
  audience: "api.aus.floless.fr",
  issuerBaseURL: "https://adopte-un-stagiaire.eu.auth0.com/",
  tokenSigningAlg: "RS256",
});

// enforce that all incoming requests are authenticated
app.use(jwtCheck);

app.get("/v1/offres", async function (_, res) {
  try {
    const offres = await getFirstOffres();
    res.send(offres);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", reason: error });
  }
});
app.get("/v1/offres/dashboard/:count", async function (req, res) {
  try {
    console.log("getOffreDashboard called");
    const count = parseInt(req.params.count);
    const offres = await getOffreDashboard(count);
    console.log("offres returned");
    res.status(200).send(offres);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", reason: error });
  }
});
app.get("/v1/offres/top-metier", async function (_, res) {
  try {
    const offres = await getTopMetier();
    console.log("top metier returned" + JSON.stringify(offres));
    res.status(200).send(offres);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", reason: error });
  }
});
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
