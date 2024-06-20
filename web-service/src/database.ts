import pg from "pg";

const pool = new pg.Pool({
  user: process.env.RDB_USER || "aus-user",
  database: process.env.RDB_DATABASE || "aus",
  password: process.env.RDB_PASSWORD || "aus2025",
  port: +(process.env.RDB_PORT || 5433),
  host: process.env.RDB_HOST || "localhost",
});

process.on("exit", function () {
  pool.end();
});

/**
 * Sends SQL statement to the database and returns the result
 * @param sqlStatement a string containing the SQL statement
 * @returns an array of rows
 */
async function query(sqlStatement: string, values?: any): Promise<any[]> {
  let rows = [];
  const client = await pool.connect();
  const response = await client.query(sqlStatement, values);
  rows = response.rows;
  client.release();
  return rows;
}

export function getFirstOffres(actualPage:number=1, count:number=10): Promise<any[]> {
 //faire un systeme de pagination pour afficher les offres par 10

  const limit = 10;
  const offset = (actualPage - 1) * limit;
  return query(`SELECT id FROM offre JOIN commune ON offre.commune_id = commune.id JOIN metier ON offre.metier_id = metier.id LIMIT $1 OFFSET $2`, [count, offset]);
}

export function getOffreDashboard(count:number=4): Promise<any[]> {

  return query(`SELECT * FROM offre JOIN commune ON offre.commune_id = commune.id JOIN metier ON offre.metier_id = metier.id LIMIT $1`, [count]);
}


export async function getTopMetier(): Promise<any[]> {
  try {
    const topSecteurs = await query(`SELECT secteur_id, COUNT(secteur_id) FROM metier GROUP BY secteur_id ORDER BY COUNT(secteur_id) DESC LIMIT 3`);
    const topMetier: any = []

    for (const secteur of topSecteurs) {
      const metiers = await query(`SELECT metier.metier
      FROM metier 
      JOIN secteur ON metier.secteur_id = secteur.id 
      WHERE secteur.id = $1 ORDER BY metier.id DESC LIMIT 3
      `, [secteur.secteur_id]);
      const secteurNameRequest = await query(`SELECT secteur FROM secteur WHERE id = $1`, [secteur.secteur_id]);
      const secteurName = secteurNameRequest[0].secteur;


      topMetier.push({secteur: secteurName, nombre_offres: secteur.count, metiers: metiers});  
    }

    return topMetier;  
  } catch (error) {
    console.error('Failed to fetch top sectors and jobs', error);
    throw error;  
  }
}

export async function updateFavoris(data: any){
  try{
    const addFavoris = await query(`INSERT INTO favoris (id_offre, id_candidat) VALUES ($1, $2)`, [data.offre_id, data.user_id]);

  }catch(errror){
    return errror
  }
}

export function searchOffres(search: string): Promise<any[]> {
  return query(`SELECT * FROM offre WHERE titre_emploi LIKE $1 OR lieu LIKE $1 OR contrat LIKE $1 limit 20`, [search]);
}
export function getFirstCandidats(email: string): Promise<any[]> {
  return query(`SELECT * FROM candidat WHERE candidat.email = $1 LIMIT 1`, [email])
  .then(results => results[0]);
}

export async function getFavoris(user_id: any){
  return query(`SELECT * FROM offre WHERE id IN (SELECT id_offre FROM favoris WHERE id_candidat = $1)`, [user_id])
}
