import { pool } from "../../config/db.js"

const postAdvert = (req, res) => {
    try {

        const { title, description, location, id_category, id_user } = req.body
    
        if (!title || !description || !location || !id_category || !id_user) {
            return res.status(400).json({ error: 'Il manque des paramètres à cette requête' })
        }
    
        // si l'annonce est pour une colocation
        if(id_category === 1) {
            const { housing_type, location_type, has_garage, is_furnished, surface_area, pets_allowed, wifi_available, low_mobility_friendly, has_garden, rent, number, street, city, zip } = req.body
    
            if(!housing_type || !location_type || has_garage === undefined || is_furnished === undefined || !surface_area || pets_allowed === undefined || wifi_available === undefined || low_mobility_friendly === undefined || has_garden === undefined || !rent || !number || !street || !city || !zip)
            {
                return res.status(400).json({ error: 'Il manque des paramètres spécifiques à la catégorie "colocation"' })
            }

            let sql = "INSERT INTO Address (number, street, city, zip) VALUES (?, ?, ?, ?)";
            pool.query(sql, [number, street, city, zip], (err, result) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    return res.status(400).json({ error: 'Bad request' });
                }

                const id_address = result.insertId;
                res.json({ message: 'Adresse ajoutée avec succès', id_address });
            });

            let sql1 = "INSERT INTO HouseShare (housing_type, location_type, has_garage, is_furnished, surface_area, pets_allowed, wifi_available, low_mobility_firendly, has_garden, rent, id_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
            pool.query(sql1, [housing_type, location_type, has_garage, is_furnished, surface_area, pets_allowed, wifi_available, low_mobility_friendly, has_garden, rent, id_address], (err, result) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                return res.status(400).json({ error: 'Bad request' })
            }
            res.json({ result })
            });

            const id_houseshare = result.insertId;
    
            let sql2 = "INSERT INTO Advert (title, description, location, id_category, id_user, id_houseshare) VALUES (?, ?, ?, ?)";
            pool.query(sql2, [title, description, location, id_user, id_houseshare], (err, result) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                return res.status(400).json({ error: 'Bad request' });
            }
            res.json({ result })
            });
    
        } else { 
            // si l'annonce est pour un service
            const { hourly_rate } = req.body
    
            if(!hourly_rate)
            {
                return res.status(400).json({ error: 'Il manque des paramètres spécifiques à la catégorie "service"' })
            }
    
            let sql = "INSERT INTO Advert (title, description, location, hourly_rate, id_category, id_user) VALUES (?, ?, ?, ?, ?, ?)";
            pool.query(sql, [title, description, location, hourly_rate, id_category, id_user], (err, result) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                return res.status(400).json({ error: 'Bad request' });
            }
            res.json({ result })
            });
        }
    } catch (error) {
        res.status(500).json({ "msg": "Internal server error" });
    }

}

export default postAdvert
