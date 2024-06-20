import {useAuth0} from "@auth0/auth0-react";
import {Box} from "@mui/material";
import React from "react";
import {authenticatedGet, authenticatedPost} from "../auth/helper";
import { DashboardBox } from "../components/cards/DashboardBox";
import RecruteBox from "../components/cards/RecruteBox";
import {useAuth} from "../context/AuthContext";
import CompleteBox from "../components/cards/profilCompleteBox.tsx";

export function Dashboard() {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState<any[] | null>(null);
    const [topMetier, setTopMetier] = React.useState<any[] | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const {state} = useAuth();

    React.useEffect(() => {
        console.log('state in dashboard', state)
        async function callApi() {
            try {
                const document = await authenticatedGet(state.token, "/v1/offres/dashboard/6");
                const topOffres = await authenticatedGet(state.token, "/v1/offres/top-metier");
                setData(document);
                setTopMetier(topOffres);
            } catch (error) {
                setTimeout(() => {
                    setError(`Error from web service: ${error}`);
                }, 1000)
            } finally {
                setLoading(false);
            }
        }

        callApi();
    }, [state]);

  return loading ? (
    <Box>chargement...</Box>
  ) : (
    <Box className="dashboard_container" onClick={() => console.log('state', state.user)}>
      {error ? (
        `Dashboard: response from API (with auth) ${error}`
      ) : (
        <ul className="dashboard_box_container">
          {data?.map((offre: any) => (
            <DashboardBox offre={offre} key={offre.id} />
            
          ))}
       
        </ul>
      )}
      {
        topMetier && <div
          className="dasboard_section2"
        >
        <CompleteBox />
        <RecruteBox offre={topMetier} key={topMetier[0].metiers} />
        </div>
      }
    </Box>
  );
}
