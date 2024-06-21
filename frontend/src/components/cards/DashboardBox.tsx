import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {authenticatedPost} from "../../auth/helper.ts";
import {useAuth0} from "@auth0/auth0-react";

export function DashboardBox({offre,key, favorite, handleChange}: {offre: any, key: number, favorite?: boolean, handleChange: any}) {
    const description_courting = (text: string) => {
        if (text.length > 100) {
            return text.slice(0, 100) + "...";
        }
        return text;
    }

    const {getAccessTokenSilently, user } = useAuth0()

    const handleFavoris = async (offre) => {
        handleChange
        const token = await getAccessTokenSilently()
        const userInfos = await authenticatedPost(token, "v1/candidats", {email : user?.email})
        console.log('userInfos', userInfos)
        const favoris = authenticatedPost(token, "/v1/favoris", {user_id : userInfos.id, offre_id : offre.id})
    }


  return (
    <div key={key} className="box_offre" style={{animationDelay: `${key * 0.1}s`}} id={offre.id}>
        <div className="favorite">
            {!favorite && <FavoriteBorderIcon className="icon_favorite" onClick={() => handleFavoris(offre)}/>}
            {favorite && <FavoriteIcon onClick={() => handleFavoris(offre)}/>}
        </div>
        <h2 className="titre_offre">{offre.titre_emploi}</h2>
        <p className="description_offre">{description_courting(
            offre.description_courte
        )}</p>
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
