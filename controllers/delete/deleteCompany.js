import { pool } from "../../config/db.js"

const deleteCompany = (req, res) => {
    try {
        const { siret } = req.params
        const { id_user } = req.body
    
        if (!id_user || !siret) {
            return res.status(400).json({ error: 'Il manque des paramètres à cette requête' })
        }
    
        let sql1 = "DELETE FROM User WHERE id_user = ?"
        pool.query(sql1, [id_user], (err, result) => {
            if (err) {
                console.error('Error executing SQL query:', err)
                return res.status(500).json({ error: 'Internal server error' })
            }
            let sql2 = "DELETE FROM Company WHERE siret = ?"
            pool.query(sql2, [siret], (err, result) => {
                if (err) {
                    console.error('Error executing SQL query:', err)
                    return res.status(500).json({ error: 'Internal server error' })
                }
                res.json({ result })
            })
        })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

export default deleteCompany
