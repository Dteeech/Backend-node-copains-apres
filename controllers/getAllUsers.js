import {pool} from "../config/db.js"

 const getAllUsers = (req, res) => {
    let sql = "SELECT * FROM User"
    pool.query(sql,(err, result) =>{
        if(err) throw err
        res.json({result})
    })
}

export default getAllUsers