TSN - Tailored Social Network

TSN est un réseau social développé dans le cadre d'un projet universitaire. Il permet à des utilisateurs de créer des publications, de voir le fil d'actualité, de gérer leurs amis, de recevoir des suggestions d'amitiés basées sur des connaissances communes et de gérer leur profil.

🌟 Fonctionnalités

        - Authentification JWT (inscription, connexion, déconnexion)

        - Création, modification, suppression de publications (avec vérification de propriétaire)

        - Visualisation du fil d'actualité

        - Système d'amis (ajout, suppression, visualisation)

        - Suggestions d'amis basées sur les amis en commun

        - Affichage profil

        - Interface adaptée, claire et moderne

⚙️ Prérequis

        - Node.js (v18+ recommandé)

        - PostgreSQL (v13+)

🧰 Installation et Configuration
        1. Cloner le dépôt
    
            git clone https://github.com/ton-utilisateur/TSN-Tailored-Social-Network.git

            cd TSN-Tailored-Social-Network


        2. Installer les dépendances

            Backend
            |
            ----cd backend
            | 
            ----npm install

            Frontend
            |
            ----cd frontend
            | 
            ----npm install


        3. Créer les fichiers .env

            Dans le dossier backend, crée un fichier .env avec :

                DATABASE_URL=postgresql://postgres:tsn1234@localhost:5433/tsn
                JWT_SECRET=tsn_super_secret


        4. Créer la base de données PostgreSQL
        Lancer pgAdmin ou un terminal SQL et créer la base :

            CREATE DATABASE tsn;


        5. Créer les tables et les données de test
        Depuis le dossier backend, exécuter :

            node scripts/init_db.js
            node scripts/seed_db.js

        Ces scripts créent les tables et insèrent Alice, Bob, Charlie avec des mots de passe simples (tsn1234) non hachés uniquement pour test.

        6. Lancer le projet
        Depuis la racine du projet :

            npm run dev

        Cela démarre à la fois :

            Le backend sur http://localhost:5000

            Le frontend sur http://localhost:3000

🎓 Utilisation

        Démarrage de l'application

            npm run dev

        Cela démarre le backend sur http://localhost:5000 et le frontend sur http://localhost:3000.



🎨 Structure du projet

        TSN-Tailored-Social-Network/
        ├── backend/
        │   ├── src/
        │   │   ├── controllers/
        │   │   ├── middlewares/
        │   │   ├── routes/
        │   │   └── config/db.js
        │   ├── scripts/
        │   │   ├── init_db.js
        │   │   └── seed_db.js
        │   └── .env
        ├── frontend/
        │   ├── src/
        │   │   ├── components/
        │   │   ├── App.jsx
        │   │   └── index.css
        └── README.md

🚀 Améliorations futures

Ajout de likes/commentaires sur les posts

Messagerie privée

Upload d'images pour les posts et les profils

📄 Licence

Projet réalisé dans un but éducatif. Aucune licence commerciale attribuée.

🙌 Auteurs

Projet réalisé par TAVERNY Kélyan dans le cadre du projet annuel AG 2024/2025.

