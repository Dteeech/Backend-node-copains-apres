import {pool} from "../../config/db.js"

 const getCompanies = (req, res) => {
    try {
        let sql = "SELECT * FROM User NATURAL JOIN Company"
        pool.query(sql,(err, result) =>{
            if(err) throw err
            res.json({result})
        })
    } catch (error) {
        res.status(500).json({ error : 'Internal server error' })
    }
}
export default getCompanies