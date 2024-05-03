import { pool } from "../../config/db.js"

const updateUser = (req, res) => {
    try {
        const { id } = req.params
        const { first_name, last_name, email, password, age, description, picture } = req.body
    
        if (!first_name || !last_name || !email || !password || !id || !age || !description || !picture ) {
            return res.status(400).json({ error: 'Il manque des paramètres à cette requête' })
        }

        let sql = "UPDATE User SET first_name = ?, last_name = ?, email = ?, password = ?, age = ?, description = ?, picture = ? WHERE id_user = ?"
        pool.query(sql, [first_name, last_name, email, password, age, description, picture, id], (err, result) => {
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

export default updateUser
