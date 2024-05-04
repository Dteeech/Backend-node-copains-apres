import express from 'express'
import getAllUsers from '../controllers/get/getAllUsers.js'
import getAllAdverts from '../controllers/get/getAllAdverts.js'
import getUserChats from '../controllers/get/getUserChats.js'
import getUser from '../controllers/get/getUser.js'
import getCompanies from '../controllers/get/getCompanies.js'
import getAdvert from '../controllers/get/getAdvert.js'
import deleteUser from '../controllers/delete/deleteUser.js'
import deleteAdvert from '../controllers/delete/deleteAdvert.js'
import createUser from '../controllers/post/createUser.js'
import createCompany from '../controllers/post/createCompany.js'
import updateUser from '../controllers/put/updateUser.js'
import updateAdvert from '../controllers/put/updateAdvert.js'
import deleteCompany from '../controllers/delete/deleteCompany.js'
import getPrivateIndividuals from '../controllers/get/getPrivateIndividuals.js'
import getAdvertByCategory from '../controllers/get/getAdvertByCategory.js'
import * as authController from '../controllers/auth/authController.js'
import { isAuthenticated } from '../middleware/auth.js'
import createAdvert from '../controllers/post/createAdvert.js'
const router = express.Router()

const publicRoutes = [
    //Routes get
    { path: '/adverts', method: 'get', handler: getAllAdverts }, // fonctionne
    { path: '/users/:id/chats', method: 'get', handler: getUserChats }, // fontionne
    // test : http://localhost:3001/api/user-chats?id_emitter=1&id_receiver=2
    { path: '/adverts/:id', method: 'get', handler: getAdvert }, // fonctionne
    { path: '/users/private-individuals', method: 'get', handler: getPrivateIndividuals }, // ne fonctionne pas (pb route car affiche résultat même quand mis en commentaires)
    { path: '/users/companies', method: 'get', handler: getCompanies }, // ne fonctionne pas (pb route)
    { path: '/adverts/category/:category', method: 'get', handler: getAdvertByCategory }, // fonctionne
    { path: '/users', method: 'get', handler: getAllUsers }, // fonctionne
    { path: '/users/:id', method: 'get', handler: getUser }, // fonctionne
   
//Routes post
{ path: '/adverts', method: 'post', handler: createAdvert },
{ path: '/users', method: 'post', handler: createUser }, // fonctionne
{ path: '/users/companies', method: 'post', handler: createCompany }, // fonctionne
{path: '/create-user', method: 'post', handler: authController.register},

    //Routes update
    { path: '/users/:id', method: 'put', handler: updateUser }, // fonctionne
    { path: '/adverts/id', method: 'put', handler: updateAdvert }, // fonctionne

    //Routes delete
    { path: '/users/:id', method: 'delete', handler: deleteUser }, // fonctionne
    { path: '/adverts/:id', method: 'delete', handler: deleteAdvert }, // fonctionne
    { path: '/users/companies/:siret', method: 'delete', handler: deleteCompany }, // fonctionne
]

const protectedRoutes = [
]

publicRoutes.map(route => router[route.method](route.path, route.handler))
router.use(isAuthenticated)
protectedRoutes.map(route => router[route.method](route.path, route.handler))

export default router

// problème parce que la ligne 55 est appellée partout et dc erreur unauthorized quand on essaie de créer un compte