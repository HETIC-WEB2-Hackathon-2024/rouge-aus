import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { authenticatedPost } from "../auth/helper";

export function Parametres() {
  const { getAccessTokenSilently , user} = useAuth0();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any | null>(null);
  const [error, setError] = React.useState<string | null>(null);

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
  console.log(data)
  return loading ? 
  <p>ca chargeeee jean-jacques</p> : (
    <>
    <div>
        <h1>{data.id}</h1>
        <p>Email: {data.email}</p>
      </div>
  </>

  );
}
