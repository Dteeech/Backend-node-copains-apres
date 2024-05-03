// middleware/auth.js

import jwt from 'jsonwebtoken';
// Middleware d'authentification avec JWT
export const isAuthenticated = (req, res, next) => {
  // Récupérez le token JWT du header Authorization
  const token = req.headers.authorization?.split(' ')[1];
  
  console.log(`jwt token dans le isAuthenticated: ${token}`)
  if (!token) {
    // Aucun token trouvé, renvoyez une erreur
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    // Vérifiez et décodez le token JWT
    const decoded = jwt.verify(token, "" + process.env.JWT_SECRET );
    console.log(decoded)
    // Vérifiez si l'utilisateur a le rôle d'admin  istrateur
    if (decoded.role !== 'admin') {
      // L'utilisateur n'est pas autorisé, renvoyez une erreur 403 (Interdit)
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Ajoutez les informations de l'utilisateur décodées à la requête
    req.user = decoded;

    // Passez au middleware suivant
    next();
  } catch (error) {
    // Token JWT invalide, renvoyez une erreur
    console.error('Erreur lors de la vérification du token JWT :', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
