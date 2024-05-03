import express from 'express'
import getAllUsers from '../controllers/get/getAllUsers.js'
import getAllAdverts from '../controllers/get/getAllAdverts.js'
import getUserChats from '../controllers/get/getUserChats.js'
import getUser from '../controllers/get/getUser.js'
import getAdvert from '../controllers/get/getAdvert.js'
import deleteUser from '../controllers/delete/deleteUser.js'
import deleteAdvert from '../controllers/delete/deleteAdvert.js'
import createUser from '../controllers/post/createUser.js'
import { isAuthenticated } from '../middleware/auth.js'

const router = express.Router()

const publicRoutes = [
    //Routes get
    { path: '/users', method: 'get', handler: getAllUsers },
    { path: '/adverts', method: 'get', handler: getAllAdverts },
    { path: '/users/:id/chats', method: 'get', handler: getUserChats },
    // test : http://localhost:3001/api/user-chats?id_emitter=1&id_receiver=2
    { path: '/users/:id', method: 'get', handler: getUser },
    { path: '/adverts/:id', method: 'get', handler: getAdvert },


    //Routes post

    { path: '/users', method: 'post', handler: createUser },


    //Routes update


    //Routes delete
    { path: '/users/:id', method: 'delete', handler: deleteUser },
    { path: '/adverts/:id', method: 'delete', handler: deleteAdvert }
]


const protectedRoutes = [

]

publicRoutes.map(route => router[route.method](route.path, route.handler))
router.use(isAuthenticated)
protectedRoutes.map(route => router[route.method](route.path, route.handler))
export default router