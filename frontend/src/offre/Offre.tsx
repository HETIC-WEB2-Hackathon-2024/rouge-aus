import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { authenticatedGet } from "../auth/helper";
import "./offre.scss";

export function Offre() {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [favorites, setFavorites] = React.useState<number[]>([]);
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
  }, []);

  const handleFavoriteToggle = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favoriteId) => favoriteId !== id)
        : [...prevFavorites, id]
    );
  };

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
        <TextField
          label="Rechercher"
          variant="outlined"
          fullWidth
          margin="normal"
          value={search}
          onChange={handleSearchChange}
        />
        <ol>
          {filteredData.map((offre, index) => (
            <li key={index}>
              <h3>{offre.titre_emploi}</h3>
              <p>Entreprise: {offre.entreprise}</p>
              <p>Lieu: {offre.lieu}</p>
              <p>
                Contrat: {offre.contrat} ({offre.type_contrat})
              </p>
              <p>Description courte: {offre.description_courte}</p>
              <p>Description: {offre.description}</p>
              <Button
                variant="contained"
                color={favorites.includes(offre.id) ? "secondary" : "primary"}
                onClick={() => handleFavoriteToggle(offre.id)}
              >
                {favorites.includes(offre.id)
                  ? "Retirer des favoris"
                  : "Ajouter aux favoris"}
              </Button>
            </li>
          ))}
        </ol>
      </Box>
    );
  }
}
