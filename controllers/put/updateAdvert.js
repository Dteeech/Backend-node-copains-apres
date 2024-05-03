import { pool } from "../../config/db.js"

const updateAdvert = (req, res) => {
    try {
        const { id } = req.params
        const { title, description, location } = req.body
    
        if (!title || !description || !location || !id) {
            return res.status(400).json({ error: 'Il manque des paramètres à cette requête' })
        }
    
        let sql = "UPDATE Advert SET title = ?, description = ?, location = ? WHERE id_advert = ?"
        pool.query(sql, [title, description, location, id], (err, result) => {
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

export default updateAdvert
