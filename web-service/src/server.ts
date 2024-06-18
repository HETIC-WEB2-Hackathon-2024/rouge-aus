import express, { json } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import cors from "cors";
import { getFirstCandidats, getFirstOffres } from "./database";

const port = 3000;
const app = express();

// make sure we hare handling CORS properly
// See more on CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

const jwtCheck = auth({
  audience: "api.rouge.aus.floless.fr",
  issuerBaseURL: "https://rouge-aus.eu.auth0.com/",
  tokenSigningAlg: "RS256",
});

// enforce that all incoming requests are authenticated
app.use(jwtCheck);
// parse body to json
app.use(json())

app.get("/v1/offres", async function (_, res) {
  try {
    const offres = await getFirstOffres();
    res.send(offres);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", reason: error });
  }
});

app.post("/v1/candidats", async function (req, res) {
  try {
    const { email } = req.body
    // recuperer le candidat depuis ma base de donne qui correspond au mail dans le body
    const candidat = await getFirstCandidats(email)
    console.log(candidat)
    res.send(candidat)
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", reason: error });
  }
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
