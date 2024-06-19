import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { authenticatedPost } from "../auth/helper";

export function Parametres() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modificationMode, setModificationMode] = useState(false);

  useEffect(() => {
    async function callApi() {
      try {
        const token = await getAccessTokenSilently();
        const candidat = await authenticatedPost(token, "/v1/candidats", { email: user?.email });
        setData(candidat);
      } catch (error) {
        setError(`Error from web service: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    callApi();
  }, [getAccessTokenSilently, user?.email]);

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
        </div>
        <div>
          <button onClick={() => setModificationMode(!modificationMode)}>Modifier</button>
        </div>
      </>
    ) : (
      <Form setModificationMode={setModificationMode}/>
    )
  );
}

function Form({ setModificationMode }: { setModificationMode: (value: boolean) => void }) {
  const { getAccessTokenSilently} = useAuth0();
  
  const sendProfileData = async (profileData: object) => {
    
    try {
      const token = await getAccessTokenSilently();
      const candidat = await authenticatedPost(token, "/v1/updateProfile", profileData);


      // if (!res.ok) {
      //   throw new Error(`HTTP error! status: ${res.status}`);
      // }

      // const data = await res.json();
      console.log(candidat);
      // Optionnel : mettre à jour l'état en fonction de la réponse du serveur
      setModificationMode(false);
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  }
  
  
  // Champs du formulaire
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  // const [birthDate, setBirthDate] = useState("");

  const submitForm = (e: any) => {
    e.preventDefault();
    const profileData = {
      name: name,
      firstname: firstname,
      phoneNumber: phoneNumber,
      country: country
      // birthDate: birthDate,
    };
    console.log("Données profil : ", profileData);
    sendProfileData(profileData)
  };

  return (
    <>
      <div>
        <form action="" onSubmit={submitForm}>
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
          {/* <div>
            <label htmlFor="">Date de naissance</label>
            <input type="text" onChange={(e) => setBirthDate(e.target.value)} value={birthDate} />
          </div> */}
          <input type="submit" value="Enregistrer" />
          <button type="button" onClick={() => setModificationMode(false)}>Annuler</button>
        </form>
      </div>
    </>
  );
}
