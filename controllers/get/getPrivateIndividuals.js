import {pool} from "../../config/db.js"

 const getPrivateIndividuals = (req, res) => {
    console.log("toto")
    try {

        let sql = "SELECT * FROM User LEFT JOIN company ON User.id_company = Company.siret WHERE Company.siret is NULL"
        console.log(sql)

    
        pool.query(sql,(err, result) =>{
            if(err) throw err
            res.json({result})
        })
    } catch (error) {
        res.status(500).json({ error : 'Internal server error' })
    }
}
export default getPrivateIndividuals