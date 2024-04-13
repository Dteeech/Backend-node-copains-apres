import { pool } from "../../config/db.js"

const getOneUser = (req, res) => {
    try {
        const { id } = req.params
    
        if (!id) {
            return res.status(400).json({ error: 'Il manque des paramètres à cette requête' })
        }
    
        let sql = "SELECT * FROM User WHERE id_user = ?"
        pool.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error executing SQL query:', err)
                return res.status(400).json({ error: 'Bad request' })
            }
            res.json({ result })
        })
    } catch (error) {
        res.status(500).json({ "msg": "Internal server error" });
    }
}

export default getOneUser
