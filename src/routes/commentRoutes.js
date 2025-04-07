const express = require('express');
const routeComm = express.Router();
const Comment = require("../models/commentModel"); // Modèle des commentaires

// Récupérer tous les commentaires
routeComm.get('/', async (req, res) => {
    try {
        const comments = await Comment.find(); // Récupère tous les commentaires
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des commentaires", error: error.message });
    }
});

// Récupérer un commentaire spécifique par son ID
routeComm.get('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            res.status(404).json({ message: "Commentaire introuvable" });
        } else {
            res.status(200).json(comment);
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du commentaire", error: error.message });
    }
});

// Ajouter un nouveau commentaire
routeComm.post('/', async (req, res) => {
    try {
        const { Author, content } = req.body; // Extraction des données
        const newComment = new Comment({ Author, content, createdAt: new Date() });
        await newComment.save(); // Sauvegarde dans la base de données
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création du commentaire", error: error.message });
    }
});

// Modifier un commentaire existant
routeComm.put('/comments/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body, // Les champs à mettre à jour
            { new: true, runValidators: true } // Retourne le commentaire mis à jour
        );
        if (!updatedComment) {
            res.status(404).json({ message: "Commentaire introuvable" });
        } else {
            res.status(200).json(updatedComment);
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du commentaire", error: error.message });
    }
});

// Supprimer un commentaire
routeComm.delete('/comments/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            res.status(404).json({ message: "Commentaire introuvable" });
        } else {
            res.status(200).json({ message: "Commentaire supprimé", deletedComment });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du commentaire", error: error.message });
    }
});

module.exports = routeComm;
