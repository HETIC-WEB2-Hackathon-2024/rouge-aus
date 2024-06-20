import {useAuth0} from "@auth0/auth0-react";
import {authenticatedGet, authenticatedPost} from "../../auth/helper.ts";

export function DashboardBox({ offre, key }: { offre: any; key: number }) {
    const { getAccessTokenSilently, user } = useAuth0();


    const description_courting = (text: string) => {
    if (text.length > 100) {
      return text.slice(0, 100) + "...";
    }
    return text;
  };

  const handleFavoris = async (offre) => {
      const token = await getAccessTokenSilently();
      const userInfos = await authenticatedPost(token, "/v1/candidats", {email: user?.email});
      const data = {
          user_id: userInfos?.id,
          offre_id: offre.id
      }
      const addFavoris = await authenticatedPost(token, "v1/favoris", data)
      console.log('userInfos', userInfos)
      console.log(offre)
  }

  return (
    <div key={key} className="box_offre" onClick={() => handleFavoris(offre)}>
      <h2 className="titre_offre">{offre.titre_emploi}</h2>
      <p className="description_offre">
        {description_courting(offre.description_courte)}
      </p>
      <div className="tags_offre">
        <p className="metier_offre">{offre.metier}</p>
        <p className="commune_offre">{offre.nom_commune}</p>
        <p className="contrat_offre">{offre.type_contrat}</p>
      </div>
      <div className="button_group_offre">
        <button className="button_offre voir">Voir l'offre</button>
        <button className="button_offre postuler">Postuler</button>
      </div>
    </div>
  );
}
