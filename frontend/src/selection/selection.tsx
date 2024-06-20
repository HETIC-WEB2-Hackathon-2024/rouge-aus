import React from "react";
import "./selection.scss";
import { useAuth0 } from "@auth0/auth0-react";
import {authenticatedGet, authenticatedPost} from "../auth/helper";
import { Trash2 } from "lucide-react";
import { DashboardBox } from "../components/cards/DashboardBox";

export default function Selection() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  React.useEffect(() => {
    async function callApi() {
      try {
        const token = await getAccessTokenSilently();
        console.log('token in sleection', token)
        console.log(user.email)
        const userInfos = await authenticatedPost(token, "/v1/candidats", {email: user?.email})
        console.log('userInfos in sleection', userInfos)

        const document = await authenticatedPost(token, "/v1/getfavoris", {user_id: userInfos?.id});
        console.log('document in sleection', document)

        setData(document);
        console.log(document);
      } catch (error) {
        setError(`Error from web service: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    callApi();
  }, []);

  return loading ? (
    <div>chargement...</div>
  ) : (
    <div>
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
    </div>
  );
}
