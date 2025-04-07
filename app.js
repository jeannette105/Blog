const express = require("express")
const dotenv = require ("dotenv")
const cors = require ("cors")
const mongoose = require ("mongoose")
const app = express()
const PORT = process.env.PORT || 5000;
const userRoutes = require('./src/routes/userRoutes.js');
const commentRoutes = require('./src/routes/commentRoutes.js');
const articleRoutes = require('./src/routes/articleRoutes.js');


// Charger les variables d'environnement
dotenv.config();


app.use(cors());
app.use(express.json());

// Routes personnalisées
app.use('/api/user', userRoutes); // Routes pour les tâches
app.use('/api/comments', commentRoutes); // Routes pour les utilisateurs
app.use('/api/articles', articleRoutes); // Routes pour les utilisateurs

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à la base de données :', err));


    // Lancer le serveur
app.listen(PORT, () => {
    console.log(`Mon serveur est actif sur l'adresse http://localhost:${PORT}`);
});

