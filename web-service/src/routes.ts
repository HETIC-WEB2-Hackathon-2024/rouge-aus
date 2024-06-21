import express, { json } from "express";
const router = express.Router()
import { getSearchSuggestions, getSecteurs, query } from "./database";
import {getFirstCandidats, getFirstOffres, getOffreDashboard, getTopMetier, searchOffres} from "./database";
type SearchType = "metier" | "commune" | "contrat" | "default";

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


router.get("/v1/offres/:page/:count", async function (req, res) {
    try {
        const page = parseInt(req.params.page);
        const count = parseInt(req.params.count);
        const offres = await getFirstOffres(page, count);
        const queryNumber = await query(`SELECT COUNT(titre_emploi) FROM offre`);
        const NumberPageTotal = Math.ceil(queryNumber[0].count / count)
        console.log(NumberPageTotal)
        res.status(200).send(
            {
                offres: offres,
                NumberPageTotal: NumberPageTotal
            }
        );
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", reason: error });
    }
});
router.get("/offres/dashboard/:count", async function (req, res) {
    try {
        console.log("getOffreDashboard")
        const count = parseInt(req.params.count);
        const offres = await getOffreDashboard(count);
        res.status(200).send(offres);
    } catch (error) {
        console.error(error);
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

router.get("/search/:string/:lieu/:contrat/:actualpage", async function (req, res) {
    try{
        const {string, lieu, contrat} = req.params
        const actualpage = parseInt(req.params.actualpage)
        const queryNumber = await query(`SELECT COUNT(*) FROM offre WHERE titre_emploi LIKE '%${string}%' OR lieu LIKE '%${actualpage}%' OR contrat LIKE '%${string}%'`);
        const NumberPageTotal = Math.ceil(queryNumber[0].count / 10)

        const offres = await searchOffres(string, actualpage, lieu, contrat)
        if(offres.length === 0){
            res.status(404).send({error:"Not found"})
            return
        }
        res.status(200).send(
            {
                offres: offres,
                NumberPageTotal: NumberPageTotal
            }
        )
    }
    catch(error){
        res.status(500).send({error:"error", reason:error})
    }
})

router.get("/search/suggest/:string/:typer", async function (req, res) {
    const { string, typer } = req.params;

    // Validate 'typer' to be one of the acceptable values
    if (!["metier", "commune", "contrat", "default"].includes(typer)) {
        return res.status(400).send({ error: "Invalid search type provided" });
    }

    try {
        const suggestions = await getSearchSuggestions(string, typer as SearchType);

        let fieldName: string;
        switch (typer) {
            case "metier":
                fieldName = "metier";
                break;
            case "commune":
                fieldName = "nom_commune";
                break;
            case "contrat":
                fieldName = "type_contrat";
                break;
            default:
                fieldName = "titre_emploi";  
        }

        res.status(200).send(suggestions.map((suggestion: any) => suggestion[fieldName]));
    } catch (error) {
        console.error('Failed to fetch search suggestions:', error);
        res.status(500).send({ error: "error", reason: error });    
    }
});
router.get("/secteurs", async function (_, res) {
    try {
        const secteurs = await getSecteurs();
        res.status(200).send(secteurs);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", reason: error });
    }
});
    

module.exports = router