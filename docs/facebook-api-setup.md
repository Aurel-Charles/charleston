# Configuration de l'API Facebook — Le Charleston

Ce guide explique comment connecter votre page Facebook au site web pour que les événements se synchronisent automatiquement.

**Durée estimée : 20–30 minutes**
**Niveau requis : aucune connaissance technique**

---

## Vue d'ensemble

Le site récupère automatiquement vos événements Facebook chaque matin à 8h. Pour que ça fonctionne, il faut lui donner une "clé d'accès" à votre page Facebook. Ce guide vous explique comment l'obtenir.

---

## Étape 1 — Créer une application Meta

1. Rendez-vous sur **[developers.facebook.com](https://developers.facebook.com)**
2. Connectez-vous avec votre compte Facebook (celui qui gère la page Le Charleston)
3. Cliquez sur **"Mes applications"** en haut à droite
4. Cliquez sur **"Créer une application"**
5. Choisissez le type **"Entreprise"** (ou "Business") → cliquez sur **Suivant**
6. Remplissez :
   - **Nom de l'application** : `Charleston Events` (peu importe)
   - **Email de contact** : votre email
7. Cliquez sur **"Créer une application"**

---

## Étape 2 — Ajouter le produit "Pages"

1. Une fois dans votre application, vous voyez un tableau de bord
2. Cherchez la section **"Ajouter des produits"**
3. Trouvez **"Pages API"** ou **"Facebook Login for Business"** et cliquez sur **Configurer**
4. Si vous ne le trouvez pas, cherchez directement **"Graph API Explorer"** dans le menu de gauche

---

## Étape 3 — Récupérer votre Page ID

1. Allez sur votre **page Facebook Le Charleston** (depuis votre navigateur habituel, pas depuis le portail développeurs)
2. Cliquez sur **"À propos"** dans le menu de votre page
3. Faites défiler jusqu'en bas — vous verrez **"Identifiant de la page"** (un grand nombre, ex: `123456789012345`)
4. **Notez ce numéro**, vous en aurez besoin plus tard

> 💡 Alternative : dans l'URL de votre page, si vous voyez un identifiant numérique, c'est votre Page ID.

---

## Étape 4 — Générer un token d'accès

1. Retournez sur [developers.facebook.com](https://developers.facebook.com)
2. Dans le menu de gauche, cliquez sur **"Outils"** puis **"Graph API Explorer"**
3. En haut à droite, dans le menu déroulant **"Meta App"**, sélectionnez votre application `Charleston Events`
4. Dans le menu déroulant **"User or Page"**, sélectionnez **votre page Le Charleston**
5. Cliquez sur **"Générer un token d'accès"**
6. Une fenêtre s'ouvre — cochez les permissions suivantes :
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_read_user_content`
7. Cliquez sur **"Générer"** puis autorisez l'accès
8. Un long texte apparaît dans le champ "Token d'accès" — **copiez-le** (bouton copier à droite)

> ⚠️ Ce token expire dans 1–2 heures. L'étape suivante le rend permanent.

---

## Étape 5 — Convertir en token longue durée

Le token généré à l'étape 4 expire rapidement. Il faut le convertir en token "longue durée" (valable ~60 jours, renouvelable).

1. Toujours dans **Graph API Explorer**, cliquez sur l'icône **ℹ️** à côté du token
2. Cliquez sur **"Ouvrir dans l'outil de débogage de token"**
3. Cliquez sur **"Prolonger le token d'accès"**
4. Connectez-vous si demandé
5. Un nouveau token apparaît — **copiez ce nouveau token**

> 💡 Ce token dure environ 60 jours. Vous recevrez un email de rappel de votre prestataire web avant qu'il n'expire.

---

## Étape 6 — Transmettre les informations à votre prestataire

Transmettez en sécurité (email chiffré ou message direct) les deux informations suivantes :

| Information | Où la trouver | Exemple |
|-------------|--------------|---------|
| **Page ID** | Étape 3 | `123456789012345` |
| **Token d'accès** | Étape 5 | `EAABsbCS...` (très long) |

> 🔒 **Important** : ne partagez jamais ces informations publiquement (pas en commentaire sur Facebook, pas dans un email en copie à plusieurs personnes). Traitez-les comme un mot de passe.

---

## Étape 7 — Vérification

Une fois les informations transmises et configurées par votre prestataire, les événements Facebook apparaîtront automatiquement sur le site chaque matin.

Pour vérifier que tout fonctionne :
- Créez un événement test sur Facebook
- Le lendemain matin, vérifiez qu'il apparaît sur le site
- En cas de problème, contactez votre prestataire

---

## Renouvellement du token (tous les ~60 jours)

Le token d'accès expire environ tous les 60 jours. Quand c'est le cas :
1. Les événements ne se mettent plus à jour automatiquement
2. Reprenez ce guide à partir de l'**étape 4**
3. Transmettez le nouveau token à votre prestataire

> 💡 Votre prestataire peut mettre en place un système de renouvellement automatique pour éviter cette manipulation.

---

## En cas de problème

| Problème | Solution |
|----------|----------|
| Je ne trouve pas "Graph API Explorer" | Menu gauche → Outils → Graph API Explorer |
| Le token ne se génère pas | Vérifiez que vous êtes bien connecté avec le compte admin de la page |
| Les événements n'apparaissent pas le lendemain | Contactez votre prestataire avec le message d'erreur |
| J'ai perdu mon token | Recommencez depuis l'étape 4 |

---

*Document rédigé par votre prestataire web. Dernière mise à jour : avril 2026.*
