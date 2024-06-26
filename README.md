﻿# Strategin-test-internship

## Table des Matières

- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API](#api)
- [Technologies Utilisées](#technologies-utilisées)


## Installation

Instructions pour installer le projet localement. Par exemple :

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/nom-utilisateur/nom-du-repo.git
    ```
2. Allez dans le répertoire du projet :
    ```bash
    cd nom-du-repo
    ```
3. Installez les dépendances :
    ```bash
    npm install
    ```

## Configuration

Instructions pour configurer le projet. Par exemple, si vous utilisez des variables d'environnement :

1. Créez un fichier `.env` à la racine du projet.
2. Ajoutez les configurations suivantes :
    ```plaintext
    PORT=3000
    MONGODB_URI=mongodb+srv://Nkongo+2004@cluster0.mongodb.net/dbname?retryWrites=true&w=majority
    JWT_SECRET=votre_secret_jwt
    ```

## Utilisation

Instructions sur la façon de lancer et d'utiliser le projet :

1. Pour démarrer le serveur :
    ```bash
    npm start
    ```
2. Accédez à `http://localhost:3000` dans votre navigateur.

## API

Documentation des principales routes API et de leur utilisation :

### Routes Authentification

- **POST** `/register`
    - Description : Enregistre un nouvel utilisateur
    - Body :
      ```json
      {
        "email": "example@example.com",
        "password": "password123"
      }
      ```
    - Réponse :
      ```json
      {
        "message": "User registered successfully"
      }
      ```

- **POST** `/login`
    - Description : Authentifie un utilisateur
    - Body :
      ```json
      {
        "email": "example@example.com",
        "password": "password123"
      }
      ```
    - Réponse :
      ```json
      {
        "token": "jwt_token"
      }
      ```

### Routes Utilisateurs

- **GET** `/users`
    - Description : Récupère la liste des utilisateurs (requiert authentification)
    - Réponse :
      ```json
      [
        {
          "email": "example@example.com",
          "password": "hashed_password"
        },
        ...
      ]
      ```

## Technologies Utilisées

Liste des principales technologies utilisées dans le projet :

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [EJS](https://ejs.co/)




