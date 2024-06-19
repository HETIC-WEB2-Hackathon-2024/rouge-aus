import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import React from "react";
import { authenticatedGet } from "../auth/helper";
import { DashboardBox } from "../components/DashboardBox";
import RecruteBox from "../components/RecruteBox";

export function Dashboard() {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any[] | null>(null);
  const [topMetier, setTopMetier] = React.useState<any[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  React.useEffect(() => {
    async function callApi() {
      try {
        const token = await getAccessTokenSilently();
        const document = await authenticatedGet(token, "/v1/offres/dashboard/6");
        const topOffres = await authenticatedGet(token, "/v1/offres/top-metier");
        console.log(topOffres)
        setData(document);
        setTopMetier(topOffres);
        console.log(document)
      } catch (error) {
        setError(`Error from web service: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    callApi();
  }, []);

  return loading ? (
    <Box>chargement...</Box>
  ) : (
    <Box>
      {error ? (
        `Dashboard: response from API (with auth) ${error}`
      ) : (
        <ul className="dashboard_box_container">
          {data?.map((offre: any) => (
            <DashboardBox offre={offre} key={offre.id} />
            
          ))}
          {/* {
            topMetier && <RecruteBox offre={topMetier} key={topMetier[0].metiers} />
          } */}
        </ul>
      )}
    </Box>
  );
}
