import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button } from "@mui/material";
import React from "react";
import './offre.scss';

export function Offre() {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [favorites, setFavorites] = React.useState<number[]>([]);

  React.useEffect(() => {
    // Simulation de données
    const mockData = [
      {
        id: 1,
        secteur_id: 101,
        metier_id: 201,
        titre_emploi: "Stage Développeur Front-End",
        entreprise: "TechCorp",
        lieu: "Paris",
        description_courte: "Développement d'interfaces utilisateur.",
        contrat: "Stage",
        type_contrat: "Temps plein",
        description: "Vous travaillerez sur des projets innovants en utilisant React.",
        commune_id: 301
      },
      {
        id: 2,
        secteur_id: 102,
        metier_id: 202,
        titre_emploi: "Stage Développeur Back-End",
        entreprise: "Innovatech",
        lieu: "Lyon",
        description_courte: "Développement de services backend.",
        contrat: "Stage",
        type_contrat: "Temps partiel",
        description: "Vous serez impliqué dans la création d'APIs robustes avec Node.js.",
        commune_id: 302
      },
      {
        id: 3,
        secteur_id: 103,
        metier_id: 203,
        titre_emploi: "Stage Data Scientist",
        entreprise: "DataSolutions",
        lieu: "Marseille",
        description_courte: "Analyse de données et création de modèles prédictifs.",
        contrat: "Stage",
        type_contrat: "Temps plein",
        description: "Vous exploiterez des grandes quantités de données pour en extraire des insights.",
        commune_id: 303
      }
    ];

    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFavoriteToggle = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favoriteId) => favoriteId !== id)
        : [...prevFavorites, id]
    );
  };

  if (loading) {
    return <Box>chargement...</Box>;
  }

  if (error) {
    console.log("erreur lors de la requête");
    return <Box>{error}</Box>;
  } else {
    console.log("la requête a abouti");
    return (
      <Box>
        <ol>
          {data?.map((offre: any) => (
            <li key={offre.id}>
              <h3>{offre.titre_emploi}</h3>
              <p>Entreprise: {offre.entreprise}</p>
              <p>Lieu: {offre.lieu}</p>
              <p>Contrat: {offre.contrat} ({offre.type_contrat})</p>
              <p>Description courte: {offre.description_courte}</p>
              <p>Description: {offre.description}</p>
              <Button
                variant="contained"
                color={favorites.includes(offre.id) ? "secondary" : "primary"}
                onClick={() => handleFavoriteToggle(offre.id)}
              >
                {favorites.includes(offre.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
              </Button>
            </li>
          ))}
        </ol>
      </Box>
    );
  }
}