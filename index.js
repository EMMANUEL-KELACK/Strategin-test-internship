// Importe le framework Express pour créer l'API
const express = require('express');
// Importe Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');
// Importe la bibliothèque jsonwebtoken pour gérer les tokens JWT
const jwt = require('jsonwebtoken');
// Importation du modèle User pour interagir avec les données des utilisateurs
const User = require('./models/Users');
// Importe bcrypt pour hasher et vérifier les mots de passe
const bcrypt = require('bcrypt');
// Importe body-parser pour analyser les corps des requêtes entrantes en JSON
const bodyParser = require('body-parser');
// Importe cookie-parser pour analyser les données des cookies dans les requêtes
var cookieParser = require('cookie-parser');

// Crée une instance d'Express
const app = express();
// Définir EJS comme moteur de rendu pour servir les fichiers HTML dynamiques
app.set('view engine', 'ejs');
// Spécifie le dossier où les fichiers EJS (templates) seront stockés
app.set('views', 'views');
// Middleware pour analyser le JSON dans les corps des requêtes
app.use(express.json());
// Ajoute le middleware body-parser pour analyser les corps des requêtes en JSON
app.use(bodyParser.json());
// Ajoute le middleware body-parser pour gérer le contenu encodé en URL
app.use(bodyParser.urlencoded({extended: false}));
// Ajoute le middleware cookie-parser pour analyser les cookies des requêtes entrantes
app.use(cookieParser());

// Connexion à MongoDB avec la chaîne de connexion (remplacer avec votre propre URI)
mongoose.connect("mongodb+srv://KEMAN:Nkongo+2004@cluster0.6xoki9g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected')) // Log succès de connexion
  .catch(err => console.log(err)); // Log en cas d'erreur de connexion

// Route racine qui rend la page d'inscription
app.get("/", (req, res) => {
    res.render("register")
});

// Route pour la page de connexion qui rend la page de login
app.get("/login", (req, res) => {
    res.render("login")
});

// Route POST pour enregistrer un nouvel utilisateur
app.post('/register', async (req, res) => {
    try {
        // Recherche si un utilisateur existe déjà avec cet email
        User.findOne({ email: req.body.email }).then(async (user) => {
            if (user) {
                // Si l'utilisateur existe, envoie une erreur 400
                return res.status(400).json({ email: "A user has already registered with this email"});
            } else {
                // Sinon, crée un nouvel utilisateur
                const { email, password } = req.body;
                const newUser = new User({ email, password });
                await newUser.save();
                res.status(201).send('User registered');
            }
        });
    } catch (error) {
        // Gère les erreurs lors de l'inscription
        res.status(500).send(error.message);
    }
});

// Route POST pour connecter un utilisateur
app.post('/login', async (req, res) => {
    try {
        // Vérifie les identifiants de l'utilisateur
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            // Si l'utilisateur n'existe pas ou le mot de passe est incorrect, renvoie une erreur
            return res.status(400).send('Authentication failed');
        }
        // Si l'authentification réussit, génère un token et l'envoie dans un cookie
        const token = jwt.sign({ userId: user._id }, "shhhhh", { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
    } catch (error) {
        // Gère les erreurs lors de la connexion
        res.status(500).send(error.message);
    }
});

// Middleware pour authentifier le token de l'utilisateur
const authenticateToken = (req, res, next) => {
    // Récupère le token des cookies
    const token = req.cookies.token;
    // Si aucun token n'est fourni, renvoie un statut 401
    if (token == null) return res.sendStatus(401);
    // Vérifie le token et extrait les données utilisateur
    jwt.verify(token, 'shhhhh', (err, user) => {
        if (err) return res.sendStatus(403); // Si le token est invalide, renvoie un statut 403
        req.user = user; // Stocke les informations de l'utilisateur dans l'objet requête
        next(); // Passe à la prochaine fonction middleware
    });
};

// Route pour le tableau de bord qui nécessite une authentification
app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// Route pour récupérer et afficher tous les utilisateurs, nécessite une authentification
app.get('/users', authenticateToken, async (req, res) => {
    try {
        // Récupère tous les utilisateurs de la base de données
        const users = await User.find({});
        // Rend la page des utilisateurs avec les données récupérées
        res.render('users', { users: users });
    } catch (error) {
        // Gère les erreurs lors de la récupération des utilisateurs
        res.status(500).send(error.message);
    }
});

// Démarrage du serveur sur un port spécifié
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
