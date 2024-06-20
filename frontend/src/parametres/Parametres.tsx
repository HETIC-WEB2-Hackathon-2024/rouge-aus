import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { authenticatedPost } from "../auth/helper";
import { useAppContext } from "../context/AppContext";

export function Parametres() {
  // const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modificationMode, setModificationMode] = useState(false);
  const { state } = useAppContext()

  useEffect(() => {
    async function callApi() {
      try {
        // const token = await getAccessTokenSilently();
        // const candidat = await authenticatedPost(token, "/v1/candidats", { email: user?.email });
        setData(state.user);
      } catch (error) {
        setError(`Error from web service: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    callApi();
  }, );

  return loading ? (
    <p>Ça chargeeee Jean-Jacques</p>
  ) : (
    !modificationMode ? (
      <>
        <div>
          <p>Nom: {data?.nom}</p>
          <p>Prénom: {data?.prenom}</p>
          <p>Téléphone: {data?.telephone}</p>
          <p>Email: {data?.email}</p>
          <p>Pays: {data?.pays}</p>
          <p>Date de naissance: {data?.date_naissance}</p>
          <p>Secteur d'activité: {data?.secteur_activite}</p>
          <p>Biographie: {data?.biographie}</p>
          <p>LinkedIn: {data?.linkedin}</p>
          <p>Site web externe: {data?.site_web}</p>
        </div>
        <div>
          <button onClick={() => setModificationMode(true)}>Modifier</button>
        </div>
      </>
    ) : (
      <Form setModificationMode={setModificationMode} data={data} />
    )
  );
}

function Form({ setModificationMode, data }: { setModificationMode: (value: boolean) => void, data: any }) {
  const { getAccessTokenSilently } = useAuth0();
  const { state, dispatch } = useAppContext()
  
  const sendProfileData = async (profileData: object) => {
    try {
      // const token = await getAccessTokenSilently();
      const candidat = await authenticatedPost(state.token, "/v1/updateProfile", profileData);
      console.log(candidat);
      setModificationMode(false);
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  }
  
  // Champs du formulaire
  const [name, setName] = useState(data?.nom || "");
  const [firstname, setFirstname] = useState(data?.prenom || "");
  const [phoneNumber, setPhoneNumber] = useState(data?.telephone || "");
  const [country, setCountry] = useState(data?.pays || "");
  const [industry, setIndustry] = useState(data?.secteur_activite || "");
  const [bio, setBio] = useState(data?.biographie || "");
  const [linkedin, setLinkedin] = useState(data?.linkedin || "");
  const [website, setWebsite] = useState(data?.site_web || "");
  // const [birthDate, setBirthDate] = useState(data?.date_naissance || "");

  const submitForm = (e: any) => {
    e.preventDefault();
    const profileData = {
      email: data?.email,
      name,
      firstname,
      phoneNumber,
      country,
      industry,
      bio,
      linkedin,
      website
      // birthDate: birthDate,
    };
    console.log("Données profil : ", profileData);
    sendProfileData(profileData);
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="">Nom</label>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div>
          <label htmlFor="">Prénom</label>
          <input type="text" onChange={(e) => setFirstname(e.target.value)} value={firstname} />
        </div>
        <div>
          <label htmlFor="">Téléphone</label>
          <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
        </div>
        <div>
          <label htmlFor="">Pays</label>
          <input type="text" onChange={(e) => setCountry(e.target.value)} value={country} />
        </div>
        <div>
          <label htmlFor="">Secteur d'activité</label>
          <select name="" id="" onChange={(e) => setIndustry(e.target.value)}>
            <option value="">--Sélectionner un secteur d'activité--</option>
            <option value="">Informatique</option>
            <option value="">Finance</option>
            <option value="">Architecture</option>
            <option value="">Agriculture</option>
            <option value="">Restauration</option>
          </select>
          {/* <input type="text" onChange={(e) => setIndustry(e.target.value)} value={industry}/> */}
        </div>
        <div>
          <label htmlFor="">Profil LinkedIn</label>
          <input type="text" onChange={(e) => setLinkedin(e.target.value)} value={linkedin} />
        </div>
        <div>
          <label htmlFor="">Site web externe</label>
          <input type="text" onChange={(e) => setWebsite(e.target.value)} value={website} />
        </div>
        <div>
          <label htmlFor="">Biographie</label>
          <textarea name="" onChange={(e) => setBio(e.target.value)} value={bio}></textarea>
          {/* <input type="text" onChange={(e) => setBio(e.target.value)} value={bio}/> */}
        </div>
        <input type="submit" value="Enregistrer" />
        <button type="button" onClick={() => setModificationMode(false)}>Annuler</button>
      </form>
    </div>
  );
}
