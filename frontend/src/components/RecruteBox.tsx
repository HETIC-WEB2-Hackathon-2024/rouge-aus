

export default function RecruteBox({offre,key}: {offre: any, key: any}) {
    return (
        <div className="recrute_box" key={key}>
            <h2 className="titre_recrute">Les secteurs qui recrutent</h2>
            {offre.map((offre: any) => (
                <div key={offre.id} className="box_recrute">
                    <h2 className="titre_recrute">{offre.secteur}</h2>
                    <p className="description_recrute">{offre.nombre_offres}</p>
                    <div className="tags_recrute">
                        {offre.metiers.map((metier: any) => (
                            <p className="metier_recrute">{metier.metier}</p>
                        ))}
                    </div>
                </div>
            ))}
            
        </div>
    );
}