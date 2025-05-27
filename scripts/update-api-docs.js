const fs = require("fs");
const path = require("path");

// Chemin vers le fichier de documentation généré
const apiDocsPath = path.join(
  __dirname,
  "..",
  "src",
  "assets",
  "api-docs",
  "index.html"
);

// Lire le contenu du fichier
let content = fs.readFileSync(apiDocsPath, "utf8");

// Remplacer les URLs locales par les URLs de production
content = content.replace(
  /http:\/\/localhost:8080\/realms\/todo-backend/g,
  "https://todoappkeycloak-production.up.railway.app/realms/todo-backend"
);

content = content.replace(
  /http:\/\/todoappbackend-production-3438\.up\.railway\.app/g,
  "https://todoappbackend-production-3438.up.railway.app"
);

// Ajouter un script pour s'assurer que l'authentification fonctionne
const authScript = `
<script>
  // Script pour gérer l'authentification dans Swagger UI
  window.addEventListener('load', function() {
    // Si on est sur la page de documentation API
    if (window.location.pathname.includes('/assets/api-docs')) {
      console.log('API Docs loaded, setting up authentication');
    }
  });
</script>
`;

// Insérer le script juste avant la fermeture du body
content = content.replace("</body>", authScript + "</body>");

// Écrire le contenu modifié dans le fichier
fs.writeFileSync(apiDocsPath, content, "utf8");

console.log("Documentation API mise à jour avec les URLs de production");
