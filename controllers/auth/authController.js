// controllers/authController.js

import jwt from 'jsonwebtoken';
import User from '../models/user.js'

// Fonction pour générer un token JWT lors de l'authentification
const login = async (req, res) => {
    try {
        // Vérifiez les identifiants de l'utilisateur (par exemple, email et password)

        const { email, password  } = req.body;
        console.log('req.body : ',req.body)
        const user = await User.findOne({ where: { email } });
        console.log(user)
        if (!user || !user.isValidPassword(password)) {
            // Identifiants invalides, renvoyez une erreur
            console.log(`user dans authController: ${user}`)
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const userData = user.dataValues
        // Générez un token JWT avec les informations de l'utilisateur
        const jwtToken = jwt.sign({ userId: userData.id, email: userData.email, role: userData.role }, `${process.env.JWT_SECRET}`, { expiresIn: '7d' });
        
        // Envoyez le token JWT au client
        res.json({ jwtToken, userData });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export { login }