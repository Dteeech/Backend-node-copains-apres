import express from 'express'
import getAllUsers from '../controllers/getAllUsers.js'
const router = express.Router()


//Routes get
router.get('/users', getAllUsers )
//Routes post

//Routes update

export default router