const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, default: "" }, // Nom de l'utilisateur
  lastname: { type: String, default: "" }, // Prénom de l'utilisateur
  email: { type: String, default: "", unique: true }, // Email unique pour chaque utilisateur
  password: { type: String, default: "" }, // Mot de passe pour l'authentification
  Date: { type: Date, default: Date.now }, // Date de création de l'utilisateur
});
const User = mongoose.model('User', userSchema);
module.exports = User;