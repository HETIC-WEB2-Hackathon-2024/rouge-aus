import express, { json } from "express";
const router = express.Router()
import { getFirstCandidats, getFirstOffres, updateProfile } from "./database";

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
    // console.log(candidat)
    res.send(candidat)
} catch (error) {
    res.status(500).send({ error: "Internal Server Error", reason: error });
}
});

// router.post("/v1/updateProfile", async function (req, res) {
//     try {
//         const { email, name, firstname, phoneNumber, country } = req.body
//         console.log("NAME", name, "PRENOM", firstname)

//         try {
//             const profile = await updateProfile(email, name, firstname, phoneNumber, country)
//             console.log("PROFIL ICI : ", profile)         
//         } catch (error) {
//             console.log(error)  
//         }

//     } catch (error) {
//         console.log("ERREUR PROFIL", error)
//         res.send({error : error})
//     }
// })

router.post("/v1/updateProfile", async function (req, res) {
    try {
        const { email, name, firstname, phoneNumber, country } = req.body;
        console.log("NAME", name, "PRENOM", firstname);

        try {
            const profile = await updateProfile(email, name, firstname, phoneNumber, country);
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
});

router.post("/v1/updateProfile", async function (req, res) {
    try {
        const { email, name, firstname, phoneNumber, country } = req.body;
        console.log("NAME", name, "PRENOM", firstname);

        try {
            const profile = await updateProfile(email, name, firstname, phoneNumber, country);
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
});

module.exports = router