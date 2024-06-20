import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { authenticatedPost } from "../auth/helper";

export function Parametres() {
  const { getAccessTokenSilently , user} = useAuth0();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [modificationMode, setModificationMode] = useState(false)
  
  React.useEffect(() => {
    async function callApi() {
      try {
        const token = await getAccessTokenSilently();
        const candidat = await authenticatedPost(token, "/v1/candidats", { email: user?.email });
        setData(candidat)
      } catch (error) {
        setError(`Error from web service: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    callApi();
  }, []);
  
  // Champs du formulaire
  // const [name, setName] = React.useState(data.nom)
  // const [firstName, setFirstname] = React.useState(data.prenom)
  // const [phoneNumber, setPhoneNumber] = React.useState(data.telephone)
  // const [country, setCountry] = React.useState(data.pays)
  // const [birthDate, setBirthDate] = React.useState(data.date_naissance)
  const img1 = "1955LGnt_8pX873ib0KA3ktA5m1GaZInt";
  const link = `https://drive.google.com/file/d/${img1}/view`;

  return loading ? (
    <p>Ça chargeeee Jean-Jacques</p>
  ) : (
    !modificationMode ? (
      <>
        <div>
          <img src={link} alt="" />
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
      <Form/>
    )
  );
  
}

function Form() {
  return (
    <p>test</p>
  )
}