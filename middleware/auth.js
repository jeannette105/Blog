const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Récupérer le token après "Bearer"

    if (!token) {
        return res.status(401).json({ message: 'Authentification requise.' });
    }

    try {
        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Utilisez votre clé secrète définie dans .env

        // Ajouter l'utilisateur décodé au req
        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role, // Ajout du rôle si applicable (par ex., admin, user)
        };

        // Ajouter un commentaire fictif au req
        req.comment = {
            id: decoded.commentId || 'commentIdExemple',
            content: 'Ceci est un commentaire protégé.',
            author: decoded.name || 'Auteur par défaut',
            createdAt: '2025-04-03T10:00:00Z',
        };

        // Ajouter un article fictif au req
        req.article = {
            id: decoded.articleId || 'articleIdExemple',
            title: 'Exemple d\'article',
            content: 'Ceci est un article protégé.',
            category: 'Technologie',
            image: 'https://exemple.com/image.jpg',
            publishedAt: '2025-03-10T10:00:00Z',
        };

        // Passer à la prochaine étape du middleware
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token invalide.', error: error.message });
    }
};
