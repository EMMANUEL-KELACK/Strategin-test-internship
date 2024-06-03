// Importe la bibliothèque Mongoose pour interagir avec MongoDB.
const mongoose = require('mongoose');
// Importe la bibliothèque bcrypt pour le hachage de mots de passe.
const bcrypt = require('bcrypt');

// Crée un nouveau schéma Mongoose pour les utilisateurs.
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Définit un champ email qui est de type chaîne, requis et unique.
  password: { type: String, required: true } // Définit un champ mot de passe qui est de type chaîne et requis.
});

// Middleware qui s'exécute avant l'enregistrement d'un document ('save').
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) { // Vérifie si le mot de passe a été modifié.
    this.password = await bcrypt.hash(this.password, 8); // Hache le mot de passe en utilisant bcrypt avec un facteur de salage de 8.
  }
  next(); // Passe au middleware suivant ou complète le cycle si c'est le dernier.
});

// Crée un modèle Mongoose 'User' basé sur le schéma UserSchema.
const User = mongoose.model('User', UserSchema);
// Exporte le modèle User pour qu'il puisse être utilisé dans d'autres parties de l'application.
module.exports = User;
