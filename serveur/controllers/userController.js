const userModel = require('../models/userModel');
const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
  .is().min(8)                 // Longueur minimale : 8 caractères
  .has().uppercase()          // Au moins une lettre majuscule
  .has().digits()             // Au moins un chiffre
  .has().symbols()            // Au moins un caractère spécial
  .not().spaces();            // Pas d'espaces

// Ajouter un utilisateur
async function addUser(req, res) {
  try {
    const { nom, prenom, username, password, profil, phone_number, civilite} = req.body;
    // Vérifier si le nom d'utilisateur a au moins 4 caractères et contient au moins une lettre
    if (username.length < 4 || !/[a-zA-Z]/.test(username)) {
      return res.json({ success: false, message: 'Le nom d\'utilisateur doit avoir au moins 4 caractères et contenir au moins une lettre.' });
    }
    const user = await userModel.getUserByUsername(username);
    if (user) {
      res.json({ success: false, message: 'Nom d\'utilisateur déjà utilisé!' });
    } else {
      // On verfie la robustesse du mot de passe
      if (!passwordSchema.validate(password)) {
        return res.json({ success: false, message: 'Essayez un mot de passe plus fort. Votre mot de passe doit être composé d\'au moins 8 caractères, avec des lettres et des chiffres, sans espaces.' });
      }
      await userModel.addUser(nom, prenom, username, password, profil, phone_number, civilite );
      res.json({ success: true, message: 'Utilisateur ajouté avec success!' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un utilisateur:', error);
    res.json({ success: false, message: 'Erreur lors de l\'ajout de l\'utilisateur!' });
  }
}

// Supprimer un utilisateur
async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    await userModel.deleteUserById(id);
    res.json({ success: true, message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    res.json({ success: false, message: 'Erreur lors de la suppression de l\'utilisateur' });
  }
}

// Récupération de tous les utilisateurs
async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();

    res.json({ success: true, users });
  } catch (error) {
    res.json({ success: false, message: 'Erreur lors de la récupération des utilisateurs.', error: error.message });
  }
}

// Mise à jour des informations d'un utilisateur
async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const newUserData = req.body;
    // on verifie si le nouveau nom d'utilisateur existe déjà pour d'autres utilisateurs
    const usernameExists = await userModel.checkUsername(newUserData.username, userId);
    if (usernameExists) {
      return res.json({ success: false, message: 'Le nouveau nom d\'utilisateur existe déjà!' });
    }
    // Mettre à jour les informations de l'utilisateur
    const result = await userModel.updateUser(userId, newUserData);
    res.json({ success: true, message: 'Informations utilisateur mises à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des informations utilisateur:', error);
    res.json({ success: false, message: 'Erreur lors de la mise à jour des informations utilisateur!' });
  }
}

// Mise à jour du mot de passe d'un utilisateur
async function updateUserPassword(req, res) {
  try {
    const userId = req.params.id;
    const { password } = req.body;
    // On verifie la robustesse du mot de passe
    if (!passwordSchema.validate(password)) {
      return res.json({ success: false, message: 'Essayez un mot de passe plus fort. Votre mot de passe doit être composé d\'au moins 8 caractères, avec des lettres et des chiffres, sans espaces.' });
    }
    // Mettre à jour le mot de passe de l'utilisateur
    const result = await userModel.updateUserPassword(userId, password);
    res.json({ success: true, message: 'Mot de passe utilisateur mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe utilisateur:', error);
    res.json({ success: false, message: 'Erreur lors de la mise à jour du mot de passe utilisateur!' });
  }
}


module.exports = {
  addUser,
  deleteUser,
  getAllUsers,
  updateUser,
  updateUserPassword
}