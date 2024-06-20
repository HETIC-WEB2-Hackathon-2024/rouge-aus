import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import React from "react";
import { authenticatedGet, authenticatedPost } from "../auth/helper";
import { DashboardBox } from "../components/cards/DashboardBox";
import RecruteBox from "../components/cards/RecruteBox";
import { useAuth } from "../context/AuthContext";
import CompleteBox from "../components/cards/profilCompleteBox.tsx";

export function Dashboard() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any[] | null>(null);
  const [topMetier, setTopMetier] = React.useState<any[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const { state } = useAuth();
  const { getAccessTokenSilently } = useAuth0();


  React.useEffect(() => {
    console.log('ici')
    async function callApi() {
      const token = await getAccessTokenSilently();
      console.log('ici')
      try {
        const document = await authenticatedGet(
          token,
          "/v1/offres/dashboard/6"
        );
        console.log('document', document)
        const topOffres = await authenticatedGet(
          token,
          "/v1/offres/top-metier"
        );
        setData(document);
        setTopMetier(topOffres);
        console.log(data)
      } catch (error) {
        setTimeout(() => {
          setError(`Error from web service: ${error}`);
        }, 1000);
      } finally {
        setLoading(false);
      }
    }

    callApi();
  }, [getAccessTokenSilently]);

  return loading && !state.user ? (
    <Box>chargement...</Box>
  ) : (
    <>
      <div className="titre_dashboard">
        <h1>Hello {state.user?.name}</h1>
        <h2>Bienvenue dans votre espace stagiaire</h2>
      </div>

      <Box
        className="dashboard_container"
        onClick={() => console.log("state", state.user)}>
        {error ? (
          `Dashboard: response from API (with auth) ${error}`
        ) : (
          <ul className="dashboard_box_container">
            {data &&
              data.length > 0 &&
              data.map((offre, index) => (
                <DashboardBox offre={offre} key={index} />
              ))}
          </ul>
        )}
        {topMetier && (
          <div className="dasboard_section2">
            <CompleteBox />
            <RecruteBox offre={topMetier} key={topMetier[0].metiers} />
          </div>
        )}
      </Box>
    </>
  );
}
