// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <FaHome className="sidebar-icon" />
          <span className={`sidebar-text ${isOpen ? 'show' : 'hide'}`}>Propriétés</span>
        </li>
        <li className="sidebar-item">
          <FaUser className="sidebar-icon" />
          <span className={`sidebar-text ${isOpen ? 'show' : 'hide'}`}>Utilisateurs</span>
        </li>
        <li className="sidebar-item">
          <FaCog className="sidebar-icon" />
          <span className={`sidebar-text ${isOpen ? 'show' : 'hide'}`}>Paramètres</span>
        </li>
      </ul>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? '◄' : '►'}
      </button>
    </div>
  );
};

export default Sidebar;
