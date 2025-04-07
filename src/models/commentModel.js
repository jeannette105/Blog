const mongoose = require('mongoose');

// // Schéma pour les commentaires
const commentSchema = mongoose.Schema({
  Author: { 
    type: mongoose.Schema.Types.ObjectId, 
    default: "", // Valeur par défaut vide
  }, 
  content: { 
    type: String, 
    trim: true, // Supprime les espaces en début et fin
    maxlength: [500, "Le commentaire ne peut pas dépasser 500 caractères"], // Limite de longueur
    default: "", // Valeur par défaut vide
  },
  createdAt: { 
    type: Date, 
    default: Date.now // Date de création par défaut
  }
});

// Ajout d'index pour prioriser les recherches par auteur et contenu
commentSchema.index({ Author: 1 });
commentSchema.index({ content: "text" }); // Index textuel pour des recherches en texte intégral

// Modèle pour les commentaires
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
