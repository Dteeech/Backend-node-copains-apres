# Backend Copains d'Après

Une API permettant de réserver de faire des opérations CRUD sur les ressources de l'application Copains d'Après.

[Frontend de l'application ici](https://github.com/Dteeech/copains-dapres-V2)

## Table des matières

- [Lancer le projet](##lancer-le-projet)
- [Conception](##conception)
  - [Tableau récapitulatif des ressources](###tableau-recapitulatif-des-ressources)
- [Mise en ligne du code](###mise-en-ligne-du-code)


## Lancer le projet

Cloner le projet
~~~
git clone https://github.com/Dteeech/Backend-node-copains-apres.git
~~~

L'installation de Node est nécessaire au fonctionnelemnt de l'API
Lancer le projet en local (commande à exécuter depuis la racine du projet)
~~~
node server.js
~~~

## Conception 

On désire mettre en ligne un service mise en relation de seniors. Un utilisateur est identifié par un prénom, un nom, un mot de pass et une adresse email.

Les cas d'utilisation utilisateur définis sont les suivants : 
1. L'utilisateur créer une annonce.
2. L'utilisateur modifie une annonce.
3. L'utilisateur supprime une annonce.
4. L'utilisateur consulte toutes les annonces.
5. L'utilisateur consulte une annonce.
6. L'utilisateur consulte une catégorie d'annonces.
7. L'utilisateur consulte le profil d'un autre utilisateur.
8. L'utilisateur consulte sa messagerie.
9. L'utilisateur envoie un message.
10. L'utilisateur créer un compte.
11. L'utilisateur met à jour ses données.
12. L'utilisateur supprime son compte.
13. Une entreprise se créer un compte.
14. Une entreprise supprime son compte.
15. L'utilisateur se connecte.

La connexion utilise un JSONWebToken.

### Tableau récapitulatif des ressources

| Ressource | URL | Méthode HTTP | Paramètres d'URL/Variations | Commentaires |
|-----------|-----------|-----------|
| Création d'une annonce | /adverts | POST |  | |
| Modification d'une annonce | /adverts/{id} | PUT | N'est accessible qu'à l'auteur de la réservation (ou un admin) |
| Suppression d'une annonce | /adverts/{id} | DELETE | N'est accessible qu'à l'auteur de la réservation (ou un admin) |
| Liste des annonces | /adverts | GET | | |
| Consulter une annonce | /adverts/{id} | GET | | |
| Consulter le profil d'un utilisateur | /users/{id} | GET | | |
| Accéder à tous les messages envoyés ou reçus par une personne | /users/{id}/chats | GET | | |
| Envoyer un message |  | POST | | Cette route n'existe pas encore |
| Créer un compte | /register | POST |  |  |
| Mettre à jour ses données | /users/{id} | PUT |  |  |
| Supprimer son compte | /users/{id} | DELETE |  |  |
| Créer un compte entreprise | /register/companies | POST |  |  |
| Supprimer son compte entreprise | /users/company/{siret} | DELETE |  |  |
| Identification | /login | POST |  |  |

## Mise en ligne du code (à l'attention des développeurs)
- Push le code sur github
- Se connecter à N0C et ouvrir le terminal
- Aller dans le répertoire copains d'après si c'est pas déjà fait
- Exécuter la commande git pull
- Exécuter la commande node serveur.js pour redémarer le serveur
