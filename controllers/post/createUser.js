import { pool } from "../../config/db.js"

const createUser = (req, res) => {
    try {

        const { first_name, last_name, email, password } = req.body
    
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ error: 'Il manque des paramètres à cette requête' })
        }

        let sql = "INSERT INTO User (first_name, last_name, email, password, is_admin) VALUES (?, ?, ?, ?, 0)"
        pool.query(sql, [first_name, last_name, email, password], (err, result) => {
            if (err) {
                console.error('Error executing SQL query:', err)
                return res.status(500).json({ error : 'Internal server error' })
            }

            res.json({ result })
        })

    } catch (error) {
        res.status(500).json({ error : 'Internal server error' })
    }

}

export default createUser
