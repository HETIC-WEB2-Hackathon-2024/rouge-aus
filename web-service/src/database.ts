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
async function query(sqlStatement: string, values?: (string | Date)[]): Promise<any[]> {
  let rows = [];
  const client = await pool.connect();
  const response = await client.query(sqlStatement, values);
  rows = response.rows;
  client.release();
  return rows;
}

export function getFirstOffres(count: number = 3): Promise<any[]> {
  return query(`SELECT * FROM offre LIMIT ${count}`);
}

export function getFirstCandidats(email: string): Promise<any[]> {
  return query(`SELECT * FROM candidat WHERE candidat.email = '${email}' LIMIT 1`)
  .then(results => results[0]);
}

type updateProfileProps = {nom: string, prenom: string, telephone: string, pays: string, secteur_activite: string, biographie: string, linkedin: string, site_web: string, email: string}
export function updateProfile({nom, prenom, telephone, pays, secteur_activite, biographie, linkedin, site_web, email} : updateProfileProps): Promise<any[]> {

  const sql = 
    `UPDATE candidat 
    SET nom = $1, prenom = $2, telephone = $3, pays = $4, secteur_activite = $5, biographie = $6, linkedin = $7, site_web = $8
    WHERE email = $9;`

  const values = [nom, prenom, telephone, pays, secteur_activite, biographie, linkedin, site_web, email];
  return query(sql, values);
}

// REQUETE POUR AJOUTER COLONNES DANS LA TABLE CANDIDAT
// ALTER TABLE candidat
// ADD secteur_activite VARCHAR(255),
// ADD biographie TEXT,
// ADD linkedin VARCHAR(255),
// ADD site_web VARCHAR(255),
// ADD cv VARCHAR(255),
// ADD photo_profil VARCHAR(255);