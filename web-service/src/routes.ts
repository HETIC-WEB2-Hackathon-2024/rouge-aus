import express, { json } from "express";
const router = express.Router()
import { getFirstCandidats, getFirstOffres } from "./database";

router.get("/v1/offres", async function (_, res) {
    try {
      const offres = await getFirstOffres();
      res.send(offres);
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error", reason: error });
    }
  });

router.post("/v1/candidats", async function (req, res) {
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

router.post("/v1/updateProfile", async function (req, res) {
    try {
        const { name, firstname, email, phoneNumber, country, birthDate } = req.body
        
    } catch (error) {
        res.send({error : error})
    }
})

module.exports = router