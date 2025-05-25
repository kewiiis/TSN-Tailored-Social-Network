## 🌟 Fonctionnalités

- 🔐 Authentification JWT (inscription, connexion, déconnexion)
- 📝 Création, modification, suppression de publications (avec vérification d’auteur)
- 📰 Fil d’actualité
- 👥 Gestion d’amis (ajout, suppression, affichage)
- 🤝 Suggestions d’amis via amis communs
- 👤 Page de profil
- 💬 **Messagerie privée avec notifications visuelles**
- 🔔 Badge rouge en cas de messages non lus
- 🎨 Design moderne et épuré avec fond personnalisable (`index.css`)
- ✅ Mots de passe **hashés** en base avec `bcrypt`

---

## ⚙️ Prérequis

- Node.js (v18+ recommandé)
- PostgreSQL (v13+)

---

## 🧰 Installation et Configuration

### 1. Cloner le dépôt

```bash
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
            ----cd ../frontend
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

🧪 Données de test
        Utilisateurs créés dans seed_db.js :

            Alice : alice@example.com

            Bob : bob@example.com

            Charlie : charlie@example.com

            Mot de passe : tsn1234

        Tous les mots de passe sont hachés

        Des relations d’amitié sont prédéfinies

📄 Licence

Projet réalisé dans un but éducatif. Aucune licence commerciale attribuée.

🙌 Auteurs

Projet réalisé par TAVERNY Kélyan dans le cadre du projet annuel AG 2024/2025.

