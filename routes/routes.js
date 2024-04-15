import express from 'express'
import getAllUsers from '../controllers/get/getAllUsers.js'
import getAllAdverts from '../controllers/get/getAllAdverts.js'
import getUserChats from '../controllers/get/getUserChats.js'
import getUser from '../controllers/get/getUser.js'
import getAdvert from '../controllers/get/getAdvert.js'
import getAdvertByCategory from '../controllers/get/getAdvertByCategory.js'
import deleteUser from '../controllers/delete/deleteUser.js'
import deleteAdvert from '../controllers/delete/deleteAdvert.js'
import createAdvert from '../controllers/post/createAdvert.js'
import createUser from '../controllers/post/createUser.js'
import createCompany from '../controllers/post/createCompany.js'
import updateUser from '../controllers/put/updateUser.js'
const router = express.Router()


//Routes get
router.get('/users', getAllUsers )
router.get('/adverts', getAllAdverts )
router.get('/users/:id/chats', getUserChats) 
// test : http://localhost:3001/api/user-chats?id_emitter=1&id_receiver=2
router.get('/users/:id', getUser) 
router.get('/adverts/:id', getAdvert) 
router.get('/adverts/:category', getAdvertByCategory) 

//Routes post
router.post('/adverts', createAdvert)
router.post('/users', createUser)
router.post('/users/companies', createCompany)

//Routes update
router.put('/users/:id', updateUser)

//Routes delete
router.delete('/users/:id', deleteUser)
router.delete('/adverts/:id', deleteAdvert)

export default router