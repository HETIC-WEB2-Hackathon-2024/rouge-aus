import express, { json } from "express";
const router = express.Router()
import {
    getFavoris,
    getFirstCandidats,
    getFirstOffres,
    getOffreDashboard,
    getTopMetier,
    searchOffres,
    updateFavoris
} from "./database";

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

router.post("/v1/favoris", async function (req, res){
    try{
        const {user_id, offre_id} = req.body
        const favoris = await updateFavoris({user_id, offre_id})
    }catch(error){

    }
})


router.get("/v1/offres/:page/:count", async function (req, res) {
    try {
        const page = parseInt(req.params.page);
        const count = parseInt(req.params.count);
        const offres = await getFirstOffres(page, count);
        console.log('offres recived', offres)

        res.status(200).send(offres);
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

router.get("/offres/search/:string" , async function (req, res){
    try{
        console.log(req.params.string)
        const string = req.params.string
        const offres = await searchOffres(string);
        if(offres.length === 0){
            res.status(404).send({error:"Not found"})
            return
        }
        res.status(200).send(offres)
    }
    catch(error){
        res.status(500).send({error:"error", reason:error})
    }
})

router.post("/v1/getfavoris", async function (req, res ){
    const { user_id } =  req.body

    const favoris = await getFavoris(user_id)
    res.status(200).send(favoris)
})
    

module.exports = router