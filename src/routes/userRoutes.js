const express = require('express');
const routerUser = express.Router();
const User = require("../models/userModel"); // Modèle utilisateur

// Route GET - Récupérer tous les utilisateurs
routerUser.get('/', async (req, res) => {
    try {
        const getAllUsers = await User.find(); // Récupérer les utilisateurs existants
        res.status(200).json(getAllUsers); // Retourner les utilisateurs ou []
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: error.message });
    }
});

// Route POST - Créer un nouvel utilisateur
routerUser.post('/', async (req, res) => {
    try {
        const { email="", name="", lastname="", password="" } = req.body;
        const newUser = new User({ email, name, lastname, password }); // Créer une nouvelle tâche
        // Validation stricte : tous les champs doivent être présents dans le body
        if (!email || !name || !lastname || !password) {
            return res.status(400).json(newUser);
        }
        const savedUser = await newUser.save(); // Sauvegarder dans la base de données
        res.status(201).json({savedUser});
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error: error.message });
    }
});

// Route PUT - Mettre à jour un utilisateur par ID
routerUser.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Mettre à jour
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé !' });
        }
        res.status(200).json({
            message: 'Utilisateur mis à jour avec succès !',
            updatedUser,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error: error.message });
    }
});

// Route DELETE - Supprimer un utilisateur par ID
routerUser.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id); // Supprimer
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé !' });
        }
        res.status(200).json({
            message: 'Utilisateur supprimé avec succès !',
            deletedUser,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error: error.message });
    }
});

module.exports = routerUser;
