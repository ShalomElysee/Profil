const userModel = require('../models/userModel');

// Connexion d'un utilisateur
async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await userModel.getUserByUsername(username);
    if (user) {
      const isPasswordValid = await userModel.comparePassword(password, user.password);
      if (isPasswordValid) {
        res.json({ success: true, message: 'Connexion réussie', nom: user.nom, prenom: user.prenom, photo: user.photo, profil: user.profil, phone_number: user.phone_number, civilite: user.civilite ,id: user.id_admin });
      } else {
        res.json({ success: false, message: 'Mot de passe incorrect', role: '' });
      }
    } else {
      res.json({ success: false, message: 'Nom d\'utilisateur incorrect', role: '' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'authentification :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'authentification', role: '' });
  }
}


module.exports = { loginUser };