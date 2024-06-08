import { pool } from "../../config/db.js"

const getAdvertByCategory = (req, res) => {
    const { category } = req.params

    if (category === "colocation") {
        try {
    
            let sql = "SELECT hs.housing_type, hs.location_type, hs.has_garage, hs.is_furnished, hs.surface_area, hs.pets_allowed, hs.wifi_available, hs.low_mobility_friendly, hs.has_garden, hs.rent, a.title, a.description, a.location, a.id_user FROM HouseShare hs JOIN Advert a ON hs.id_houseshare = a.id_houseshare JOIN Category c ON a.id_category = c.id_category WHERE c.name = 'colocation';"
            pool.query(sql, (err, result) => {
                if (err) {
                    console.error('Error executing SQL query:', err)
                    return res.status(500).json({ error: 'Internal server error' })
                }
                res.json({ result })
            })
        } catch (error) {
            res.status(500).json({ error : 'Internal server error' })
        }
    } else {
        try {
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
}

export default getAdvertByCategory
