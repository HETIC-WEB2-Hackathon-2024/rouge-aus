
export function DashboardBox({offre,key}: {offre: any, key: number}) {
    const description_courting = (text: string) => {
        if (text.length > 100) {
            return text.slice(0, 100) + "...";
        }
        return text;
    }
  return (
    <div key={key} className="box_offre">
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

