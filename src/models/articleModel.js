const mongoose = require('mongoose');
const articleSchema = mongoose.Schema({
    title: { 
      type: String, 
      default: "", 
      trim: true, 
      required: [true, "Le titre est obligatoire"]
    },
    content: { 
      type: String, 
      default: "",
      trim: true,  
      required: [true, "Le contenu est obligatoire"]
    },
    category: { 
      type: String, 
      required: [true, "La catégorie est obligatoire"], 
      enum: { 
        values: ["Technologie", "Santé", "Voyage", "Éducation", "Divertissement"], 
        message: "La catégorie doit être une des suivantes : Technologie, Santé, Voyage, Éducation, Divertissement"
      }
    },
    image: { 
        type: String, // URL ou chemin de l'image
        default: "", 
        required: [false, "L'image est optionnelle"]
    },
    publishedAt: { 
      type: Date, // date de publication de l'article
      default: Date.now 
    },
});
  
  // Hook pré-enregistrement pour gérer la publication automatique
articleSchema.pre('save', function (next) {
    if (this.published && !this.publishedAt) {
      // Si l'article est marqué comme publié, on définit automatiquement la date actuelle
      this.publishedAt = new Date();
    }
    next();
});
  
  // Création du modèle
const Article = mongoose.model('Article', articleSchema);
module.exports = Article;