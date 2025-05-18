import React, { useState } from 'react';
import './profile.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [isEditingInfo, setIsEditingInfo] = useState(false);

  const [userData, setUserData] = useState({
    nom: 'Rahman',
    prenom: 'Sami',
    email: 'samirahman002@gmail.com',
    telephone: '+41 856 569 909',
    inscription: '2023-11-12',
    photo: 'https://via.placeholder.com/100',
  });

  const [formData, setFormData] = useState(userData);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveInfo = () => {
    setUserData(formData);
    setIsEditingInfo(false);
    alert("Informations personnelles mises à jour !");
  };

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedEmail, setEditedEmail] = useState(userData.email);

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSaveEmail = () => {
    if (!validateEmail(editedEmail)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }
    setUserData(prev => ({ ...prev, email: editedEmail }));
    setIsEditingEmail(false);
    alert(`Email mis à jour : ${editedEmail}`);
  };

  const handlePasswordModification = () => {
    if (!newPassword) return;
    setShowConfirmPassword(true);
  };

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    alert("Mot de passe mis à jour.");
    setIsEditingPassword(false);
    setNewPassword('');
    setConfirmPassword('');
    setShowConfirmPassword(false);
  };

  return (
    <div className="dashboard">
      <Navbar />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="content">
        <div className="profil-container">
          <section className="profile-card styled">
            <img src={userData.photo} alt="Photo de profil" className="profile-avatar" />
            <div className="profile-label">Informations personnelles</div>

            <div className="profile-line">
              <strong>Nom :</strong>
              {isEditingInfo ? (
                <input type="text" name="nom" value={formData.nom} onChange={handleInfoChange} />
              ) : (
                <span>{userData.nom.toUpperCase()}</span>
              )}
            </div>

            <div className="profile-line">
              <strong>Prénom :</strong>
              {isEditingInfo ? (
                <input type="text" name="prenom" value={formData.prenom} onChange={handleInfoChange} />
              ) : (
                <span>{userData.prenom}</span>
              )}
            </div>

            <div className="profile-line">
              <strong>Téléphone :</strong>
              {isEditingInfo ? (
                <input type="text" name="telephone" value={formData.telephone} onChange={handleInfoChange} />
              ) : (
                <span>{userData.telephone}</span>
              )}
            </div>

            <div className="profile-line">
              <strong>Email :</strong>
              <span>{userData.email}</span>
            </div>

            <div className="profile-line">
              <strong>Inscrit le :</strong>
              <span>{new Date(userData.inscription).toLocaleDateString('fr-FR')}</span>
            </div>

            {isEditingInfo ? (
              <button className="save-btn" onClick={saveInfo}>Valider</button>
            ) : (
              <button className="save-btn" onClick={() => setIsEditingInfo(true)}>Modifier</button>
            )}
          </section>

          <section className="card security-card">
            <h3>Connexion et sécurité</h3>

            <div className="security-item">
              <div className="security-label">Email</div>
              {isEditingEmail ? (
                <>
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="input-edit"
                  />
                  <button className="edit-btn" onClick={handleSaveEmail}>Valider</button>
                </>
              ) : (
                <>
                  <div className="security-value">{editedEmail}</div>
                  <button className="edit-btn" onClick={() => setIsEditingEmail(true)}>Modifier</button>
                </>
              )}
            </div>

            <div className="security-item">
              <div className="security-label">Mot de passe</div>
              {isEditingPassword ? (
                <>
                  <input
                    type="password"
                    placeholder="Nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input-edit"
                  />
                  {!showConfirmPassword ? (
                    <button className="edit-btn password-btn" onClick={handlePasswordModification}>Suivant</button>
                  ) : (
                    <>
                      <input
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-edit"
                      />
                      <button className="edit-btn password-btn" onClick={handleSavePassword}>Valider</button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="security-value">****************</div>
                  <button className="edit-btn password-btn" onClick={() => setIsEditingPassword(true)}>Modifier</button>
                </>
              )}
            </div>

            <div className="delete-account">
              <p>Besoin de supprimer votre compte ?</p>
              <a href="#" className="delete-link">Supprimer mon compte</a>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-section">
          <h2>GSI Immobilier</h2>
          <p>Votre partenaire de confiance pour l’immobilier moderne.</p>
        </div>
        <div className="footer-section">
          <h3>Navigation</h3>
          <ul>
            <li><a href="#">Accueil</a></li>
            <li><a href="#">Nos biens</a></li>
            <li><a href="#">Fonctionnalités</a></li>
            <li><a href="#">À propos</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Suivez-nous</h3>
          <div className="socials">
            <a href="#">Facebook</a>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2025 GSI. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};

export default App;
