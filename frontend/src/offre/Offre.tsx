import { useAuth0 } from "@auth0/auth0-react";
import { Box, TextField } from "@mui/material";
import React from "react";
import { authenticatedGet } from "../auth/helper";
import "./offre.scss";
import { DashboardBox } from "../components/DashboardBox";

export function Offre() {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState<string>("");

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
  }, [getAccessTokenSilently]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredData = data?.filter(
    (offre) =>
      offre.titre_emploi.toLowerCase().includes(search.toLowerCase()) ||
      offre.entreprise.toLowerCase().includes(search.toLowerCase()) ||
      offre.lieu.toLowerCase().includes(search.toLowerCase()) ||
      offre.contrat.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <Box>Chargement...</Box>;
  }

  if (error) {
    console.log("erreur lors de la requête");
    return <Box>{error}</Box>;
  } else {
    console.log("la requête a abouti");
    return (
      <Box>
        <div className="search_container">
          <TextField
            label="Rechercher"
            value={search}
            onChange={handleSearchChange}
            className="search_input"
          />
        </div>
        <ul className="dashboard_box_container">
          {filteredData?.map((offre: any) => (
            <DashboardBox offre={offre} key={offre.id} />
          ))}
        </ul>
      </Box>
    );
  }
}