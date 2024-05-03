import { pool } from "../../config/db.js"

const deleteUser = (req, res) => {
    try {
        const { id } = req.params
    
        if (!id) {
            return res.status(400).json({ error: 'Il manque des paramètres à cette requête' })
        }
    
        let sql = "DELETE FROM User WHERE id_user = ?"
        pool.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error executing SQL query:', err)
                return res.status(500).json({ error: 'Internal server error' })
            }
            res.json({ result })
        })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

export default deleteUser
