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
async function query(sqlStatement: string): Promise<any[]> {
  let rows = [];
  const client = await pool.connect();
  const response = await client.query(sqlStatement);
  rows = response.rows;
  client.release();
  return rows;
}

export function getFirstOffres(actualPage:number=1, count:number=10): Promise<any[]> {
 //faire un systeme de pagination pour afficher les offres par 10

  const limit = 10;
  const offset = (actualPage - 1) * limit;
  return query(`SELECT * FROM offre JOIN commune ON offre.commune_id = commune.id JOIN metier ON offre.metier_id = metier.id LIMIT ${count} OFFSET ${offset}`);
}

export function getOffreDashboard(count:number=4): Promise<any[]> {

  return query(`SELECT * FROM offre JOIN commune ON offre.commune_id = commune.id JOIN metier ON offre.metier_id = metier.id LIMIT ${count}`);
}


export async function getTopMetier(): Promise<any[]> {
  try {
    const topSecteurs = await query(`SELECT secteur_id, COUNT(secteur_id) FROM metier GROUP BY secteur_id ORDER BY COUNT(secteur_id) DESC LIMIT 3`);
    const topMetier: any = []

    for (const secteur of topSecteurs) {
      const metiers = await query(`SELECT metier.metier
      FROM metier 
      JOIN secteur ON metier.secteur_id = secteur.id 
      WHERE secteur.id = ${secteur.secteur_id} ORDER BY metier.id DESC LIMIT 3
      `);
      const secteurNameRequest = await query(`SELECT secteur FROM secteur WHERE id = ${secteur.secteur_id}`);
      const secteurName = secteurNameRequest[0].secteur;


      topMetier.push({secteur: secteurName, nombre_offres: secteur.count, metiers: metiers});  
    }

    return topMetier;  
  } catch (error) {
    console.error('Failed to fetch top sectors and jobs', error);
    throw error;  
  }
}
export function searchOffres(search: string): Promise<any[]> {
  return query(`SELECT * FROM offre WHERE titre_emploi LIKE '%${search}%' OR lieu LIKE '%${search}%' OR contrat LIKE '%${search}%' limit 20`);
}
export function getFirstCandidats(email: string): Promise<any[]> {
  return query(`SELECT * FROM candidat WHERE candidat.email = '${email}' LIMIT 1`)
  .then(results => results[0]);
}
