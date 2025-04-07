const express = require('express');
const routerArticle = express.Router();
const Article = require("../models/articleModel"); // Modèle de l'article

// Récupérer tous les articles
routerArticle.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles); // Succès : Liste des articles
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des articles', error: error.message });
    }
});

// Créer un nouvel article
routerArticle.post('/', async (req, res) => {
    try {
        const { title = "", content = "", category = "", image = "", publishedAt = new Date() } = req.body;
        const newArticle = new Article({ title, content, category, image, publishedAt });
        await Article.create()
        res.status(201).json(newArticle); // Succès : Article créé
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création de l\'article', error: error.message });
    }
});

// Modifier un article existant
routerArticle.put('/:id', async (req, res) => {
    try {
        const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedArticle) {
            res.status(404).json({ message: "Article introuvable pour la mise à jour" });
        } else {
            res.status(200).json(updatedArticle); // Succès : Article mis à jour
        }
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour de l\'article', error: error.message });
    }
});

// Supprimer un article
routerArticle.delete('/:id', async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            res.status(404).json({ message: "Article introuvable pour la suppression" });
        } else {
            res.status(200).json({ message: "Article supprimé avec succès", deletedArticle }); // Succès : Article supprimé
        }
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la suppression de l\'article', error: error.message });
    }
});

module.exports = routerArticle;
