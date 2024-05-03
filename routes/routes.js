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
import updateAdvert from '../controllers/put/updateAdvert.js'
import deleteCompany from '../controllers/delete/deleteCompany.js'
import getPrivateIndividuals from '../controllers/get/getPrivateIndividuals.js'
import getCompanies from '../controllers/get/getCompanies.js'
const router = express.Router()


//Routes get
router.get('/users', getAllUsers ) // fonctionne
router.get('users/private-individuals', getPrivateIndividuals)
router.get('users/companies', getCompanies)
router.get('/adverts', getAllAdverts ) // fonctionne
router.get('/users/:id/chats', getUserChats) 
// test : http://localhost:3001/api/user-chats?id_emitter=1&id_receiver=2
router.get('/users/:id', getUser) //fonctionne
router.get('/adverts/:id', getAdvert) // fonctionne
router.get('/adverts/category/:category', getAdvertByCategory) //fonctionne

//Routes post
router.post('/adverts', createAdvert)
router.post('/users', createUser) // fonctionne
router.post('/users/companies', createCompany) // il faut check l'ajout du siret sur user

//Routes update
router.put('/users/:id', updateUser) // fonctionne
router.put('/adverts/:id', updateAdvert) // fonctionne

//Routes delete
router.delete('/users/:id', deleteUser) // fonctionne
router.delete('/adverts/:id', deleteAdvert) // fonctionne
router.delete('/users/companies/:siret', deleteCompany) // fonctionne

export default router