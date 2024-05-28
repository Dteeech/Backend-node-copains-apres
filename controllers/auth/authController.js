// controllers/authController.js

import jwt from 'jsonwebtoken'
import { asyncQuery } from '../../config/db.js'

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ error: 'Il manque des paramètres à cette requête' })
        }

        // Vérifie si l'utilisateur existe déjà dans la base de données
        const existingUser = await asyncQuery('SELECT * FROM User WHERE email = ?', [email])

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const sql = "INSERT INTO User (first_name, last_name, email, password, is_admin) VALUES (?, ?, ?, ?, 0)"
        await asyncQuery(sql, [first_name, last_name, email, password])

        // Récupère le nouvel utilisateur
        const newUser = await asyncQuery('SELECT * FROM User WHERE email = ?', [email])

        // Générez un token JWT avec les informations de l'utilisateur
        const jwtToken = jwt.sign({ userId: newUser[0].id, email, role: 'user' }, `${process.env.JWT_SECRET}`, { expiresIn: '7d' })

        // Envoyez le token JWT et les données de l'utilisateur au client
        res.status(201).json({ jwtToken, userData: { id: newUser[0].id, first_name, last_name, email } })
    } catch (error) {
        console.error('Error registering user:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await asyncQuery('SELECT * FROM User WHERE email = ? AND password = ?', [email, password])
        if (user.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        // Génère un token JWT avec les informations de l'utilisateur
        const jwtToken = jwt.sign({ userId: user[0].id, email, role: user[0].is_admin ? 'admin' : 'user' }, `${process.env.JWT_SECRET}`, { expiresIn: '7d' })

        // Envoyez le token JWT et les données de l'utilisateur au client
        res.json({ jwtToken, userData: user[0] })
    } catch (error) {
        console.error('Error logging in:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export { login, register }
