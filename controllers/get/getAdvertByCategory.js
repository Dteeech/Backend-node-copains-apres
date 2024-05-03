import { pool } from "../../config/db.js"

const getAdvertByCategory = (req, res) => {
    try {
        const { category } = req.params
    
        let sql = "SELECT a.id_advert, a.title, a.description, a.location, a.hourly_rate, a.id_category, a.created_at, a.last_updated, a.id_user, a.id_houseshare FROM Advert a JOIN Category c ON a.id_category = c.id_category WHERE c.name = ?"
        pool.query(sql, [category], (err, result) => {
            if (err) {
                console.error('Error executing SQL query:', err)
                return res.status(500).json({ error: 'Internal server error' })
            }
            res.json({ result })
        })
    } catch (error) {
        res.status(500).json({ error : 'Internal server error' })
    }
}

export default getAdvertByCategory
