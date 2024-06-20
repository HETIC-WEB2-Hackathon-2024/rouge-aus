import express, { json } from "express";
const router = express.Router()
import {getFirstCandidats, getFirstOffres, updateProfile, getOffreDashboard, getTopMetier} from "./database";

router.post("/v1/candidats", async function (req, res) {
try {
    const { email } = req.body
    // recuperer le candidat depuis la bdd qui correspond au mail connecté
    const candidat = await getFirstCandidats(email)
    console.log('candidats', candidat)
    res.send(candidat)
} catch (error) {
    res.status(500).send({ error: "Internal Server Error", reason: error });
}
});

router.post("/v1/updateProfile", async function (req, res) {
    try {
        const { email, name, firstname, phoneNumber, country, industry, bio, linkedin, website } = req.body;
        console.log("NAME", name, "PRENOM", firstname);

        try {
            const profile = await updateProfile({nom : name, prenom : firstname, telephone: phoneNumber, pays: country, secteur_activite: industry, biographie: bio, linkedin: linkedin, site_web: website, email});
            console.log("PROFIL ICI : ", profile);
            res.status(200).send(profile);
        } catch (error) {
            console.log("ERREUR LORS DE LA MISE À JOUR", error);
            res.status(500).send({ error: "Erreur lors de la mise à jour du profil" });
        }
    } catch (error) {
        console.log("ERREUR PROFIL", error);
        res.status(400).send({ error: "Données de requête invalides" });
    }
})

router.get("/v1/offres", async function (_, res) {
    try {
        const offres = await getFirstOffres();
        res.send(offres);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", reason: error });
    }
});

router.get("/v1/offres/dashboard/:count", async function (req, res) {
    try {
        const count = parseInt(req.params.count);
        const offres = await getOffreDashboard(count);
        res.status(200).send(offres);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", reason: error });
    }
});

router.get("/v1/offres/top-metier", async function (_, res) {
    try {
        const offres = await getTopMetier();
        res.status(200).send(offres);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", reason: error });
    }
});

module.exports = router