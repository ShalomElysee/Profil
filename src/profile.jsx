import React, { useState } from 'react';
import './profile.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function PasswordUpdateForm() {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    alert('Mot de passe modifié (démo)');
  };

  return (
    <section className="card password-card">
      <h3>Modifier le mot de passe</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Mot de passe actuel</label>
          <input
            type={visible ? 'text' : 'password'}
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="password-input-field"
          />
        </div>

        <div className="form-group">
          <label>Nouveau mot de passe</label>
          <input
            type={visible ? 'text' : 'password'}
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="password-input-field"
          />
        </div>

        <div className="form-group">
          <label>Confirmation du nouveau mot de passe</label>
          <input
            type={visible ? 'text' : 'password'}
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="password-input-field"
          />
        </div>

        <button type="submit" className="blue-btn">Valider</button>
      </form>
    </section>
  );
}


const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const locataire = {
    nom: 'Rahman',
    prenom: 'Sami',
    email: 'samirahman002@gmail.com',
    telephone: '+41 856 569 909',
    inscription: '2023-11-12',
    photo: 'https://via.placeholder.com/100',
    compteActif: '8040 5630 8802 4525',
    factures: [
      { type: 'Téléphone', status: 'payée' },
      { type: 'Loyer', status: 'impayée' },
      { type: 'Taxe', status: 'payée' }
    ]
  };

  return (
    <div className="dashboard">
      <Navbar />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="content">
        <header className="topbar">
          {/* Tu peux ajouter un bouton menu ici si besoin */}
        </header>

        <div className="profil-container">
          <section className="profile-card styled">
            <img src={locataire.photo} alt="Photo de profil" className="profile-avatar" />
            <div className="profile-label">My profile</div>

            
            <div className="profile-line"><strong>Nom :</strong><span>{locataire.nom.toUpperCase()}</span></div>
            <div className="profile-line"><strong>Prénom :</strong><span>{locataire.prenom}</span></div>
            <div className="profile-line"><strong>Téléphone :</strong><span>{locataire.telephone}</span></div>
            <div className="profile-line"><strong>Email :</strong><span>{locataire.email}</span></div>
            <div className="profile-line"><strong>Inscrit le :</strong><span>{new Date(locataire.inscription).toLocaleDateString('fr-FR')}</span></div>

            <button className="save-btn">Modifier</button>
          </section>

          <div className="column-right">
            <PasswordUpdateForm />
            <section className="card facture-card">
              <h3>Mes factures</h3>
              <button className="small-button">Dernière facture</button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
