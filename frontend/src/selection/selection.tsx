import React from "react";
import "./selection.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { authenticatedGet } from "../auth/helper";
import { Trash2 } from "lucide-react";

export default function Selection() {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  React.useEffect(() => {
    async function callApi() {
      try {
        const token = await getAccessTokenSilently();
        const document = await authenticatedGet(token, "/v1/offres");
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
        <div className="Section_selection">
          {data?.map((offre: any) => (
            <div className="Card" key={offre.id}>
              <div className="Card_section_company">
                <p className="company_name">{offre.entreprise}</p>
              </div>
              <div className="Card_section_details_first">
                <p>{offre.titre_emploi}</p>
                <ul className="Card_section_details_second">
                  <li>{offre.type_contrat}</li>
                  <li>{offre.contrat}</li>
                  <li>{offre.lieu}</li>
                </ul>
                <p>{offre.description_courte}</p>
              </div>
              <div className="Card_icon_container">
                <Trash2 />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
