import { pool } from "../../config/db.js"

const createCompany = (req, res) => {
    try {
        const { siret, name, email, password } = req.body
    
        if (!siret || !name || !email || !password) {
            return res.status(400).json({ error: 'Il manque des paramètres à cette requête' })
        }

        let sql = "INSERT INTO Company (siret, name) VALUES (?, ?)"
        pool.query(sql, [siret, name], (err, result) => {
            if (err) {
                console.error('Error executing SQL query:', err)
                return res.status(500).json({ error : 'Internal server error' })
            }

            let sql1 = "INSERT INTO User (email, password, id_company, is_admin) VALUES (?, ?, ?, 0)"
            pool.query(sql1, [email, password, siret], (err, result) => {
            if (err) {
                console.error('Error executing SQL query:', err)
                return res.status(500).json({ error : 'Internal server error' })
            }

            res.json({ result })
            })
        })
    } catch (error) {
        res.status(500).json({ error : 'Internal server error' })
    }

}

export default createCompany
