-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: immobilier_db
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id_document` int NOT NULL AUTO_INCREMENT,
  `id_propriete` int NOT NULL,
  `nom_fichier` varchar(255) NOT NULL,
  `type_document` enum('contrat','etat_des_lieux','quittance','autre') NOT NULL,
  `chemin_fichier` varchar(255) NOT NULL,
  `date_telechargement` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_document`),
  KEY `id_propriete` (`id_propriete`),
  CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`id_propriete`) REFERENCES `proprietes` (`id_propriete`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id_location` int NOT NULL AUTO_INCREMENT,
  `id_propriete` int NOT NULL,
  `id_locataire` int NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date DEFAULT NULL,
  `montant_loyer` decimal(10,2) NOT NULL,
  `charges` decimal(10,2) DEFAULT '0.00',
  `statut` enum('en cours','libre') DEFAULT 'en cours',
  PRIMARY KEY (`id_location`),
  KEY `id_propriete` (`id_propriete`),
  KEY `id_locataire` (`id_locataire`),
  CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`id_propriete`) REFERENCES `proprietes` (`id_propriete`),
  CONSTRAINT `locations_ibfk_2` FOREIGN KEY (`id_locataire`) REFERENCES `utilisateurs` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id_message` int NOT NULL AUTO_INCREMENT,
  `id_expediteur` int NOT NULL,
  `id_destinataire` int NOT NULL,
  `contenu` text NOT NULL,
  `date_envoi` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `lu` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_message`),
  KEY `id_expediteur` (`id_expediteur`),
  KEY `id_destinataire` (`id_destinataire`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`id_expediteur`) REFERENCES `utilisateurs` (`id_utilisateur`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`id_destinataire`) REFERENCES `utilisateurs` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id_notification` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int NOT NULL,
  `message` text NOT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `lu` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_notification`),
  KEY `id_utilisateur` (`id_utilisateur`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paiements`
--

DROP TABLE IF EXISTS `paiements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paiements` (
  `id_paiement` int NOT NULL AUTO_INCREMENT,
  `id_location` int NOT NULL,
  `montant` decimal(10,2) NOT NULL,
  `date_paiement` date NOT NULL,
  `methode` varchar(50) NOT NULL,
  `statut` enum('payé','en_retard','annulé') DEFAULT 'payé',
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_paiement`),
  KEY `id_location` (`id_location`),
  CONSTRAINT `paiements_ibfk_1` FOREIGN KEY (`id_location`) REFERENCES `locations` (`id_location`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paiements`
--

LOCK TABLES `paiements` WRITE;
/*!40000 ALTER TABLE `paiements` DISABLE KEYS */;
/*!40000 ALTER TABLE `paiements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proprietes`
--

DROP TABLE IF EXISTS `proprietes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proprietes` (
  `id_propriete` int NOT NULL AUTO_INCREMENT,
  `id_proprietaire` int NOT NULL,
  `type` varchar(50) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `ville` varchar(100) NOT NULL,
  `code_postal` varchar(10) NOT NULL,
  `pays` varchar(100) NOT NULL,
  `type_de_location` enum('meuble','non_meuble') NOT NULL,
  `loyer_hors_charges` decimal(10,2) NOT NULL,
  `superficie` decimal(10,2) NOT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `frequence_de_paiment` enum('non définie','mois','trimestre','semestre','année') DEFAULT 'non définie',
  `nombre_de_pieces` int DEFAULT '0',
  `nombre_de_chambres` int DEFAULT '0',
  `salles_de_bain` int DEFAULT '0',
  `date_de_construction` date DEFAULT NULL,
  `note_privee` text,
  `adresse_2` varchar(255) DEFAULT NULL,
  `numero_batiment` varchar(50) DEFAULT NULL,
  `escalier` varchar(50) DEFAULT NULL,
  `statut` enum('à louer','occupée','vendue') DEFAULT 'à louer',
  `prix_achat` int DEFAULT '0',
  `prix_vente` int DEFAULT '0',
  PRIMARY KEY (`id_propriete`),
  KEY `id_proprietaire` (`id_proprietaire`),
  CONSTRAINT `proprietes_ibfk_1` FOREIGN KEY (`id_proprietaire`) REFERENCES `utilisateurs` (`id_utilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proprietes`
--

LOCK TABLES `proprietes` WRITE;
/*!40000 ALTER TABLE `proprietes` DISABLE KEYS */;
INSERT INTO `proprietes` VALUES (10,2,'Maison','Maison a Paris ','25 Rue de la Liberté','Paris','75001','France','non_meuble',1800.00,80.00,'2025-05-12 12:59:58','mois',4,3,3,'2015-08-05','Maison avec jardin.','Non renseigné',NULL,'Oui','à louer',0,0),(11,3,'Place_de_Parking','Parking sous-sol','10 Avenue des Champs','Paris','75008','France','non_meuble',150.00,12.00,'2025-05-12 12:59:58','trimestre',2,2,2,'2022-10-06','Emplacement réservé pour une voiture.',NULL,NULL,NULL,'à louer',0,0),(12,1,'Maison','Studio à Paris','12 Rue de la Paix','Paris','75001','France','meuble',1200.00,35.00,'2025-05-12 13:01:08','année',2,2,2,'2025-05-02','',NULL,NULL,NULL,'à louer',0,0);
/*!40000 ALTER TABLE `proprietes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reparations`
--

DROP TABLE IF EXISTS `reparations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reparations` (
  `id_reparation` int NOT NULL AUTO_INCREMENT,
  `id_propriete` int NOT NULL,
  `id_locataire` int NOT NULL,
  `description` text NOT NULL,
  `statut` enum('en_attente','en_cours','terminee') DEFAULT 'en_attente',
  `date_demande` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_resolution` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_reparation`),
  KEY `id_propriete` (`id_propriete`),
  KEY `id_locataire` (`id_locataire`),
  CONSTRAINT `reparations_ibfk_1` FOREIGN KEY (`id_propriete`) REFERENCES `proprietes` (`id_propriete`),
  CONSTRAINT `reparations_ibfk_2` FOREIGN KEY (`id_locataire`) REFERENCES `utilisateurs` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reparations`
--

LOCK TABLES `reparations` WRITE;
/*!40000 ALTER TABLE `reparations` DISABLE KEYS */;
/*!40000 ALTER TABLE `reparations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_role` int NOT NULL AUTO_INCREMENT,
  `utilisateur_roles` enum('super_admin','agent','proprietaire','locataire') DEFAULT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,NULL),(2,NULL),(3,NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur_roles`
--

DROP TABLE IF EXISTS `utilisateur_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur_roles` (
  `id_utilisateur` int NOT NULL,
  `id_role` int NOT NULL,
  PRIMARY KEY (`id_utilisateur`,`id_role`),
  KEY `id_role` (`id_role`),
  CONSTRAINT `utilisateur_roles_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`),
  CONSTRAINT `utilisateur_roles_ibfk_2` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur_roles`
--

LOCK TABLES `utilisateur_roles` WRITE;
/*!40000 ALTER TABLE `utilisateur_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `utilisateur_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateurs` (
  `id_utilisateur` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `telephone` varchar(15) DEFAULT NULL,
  `civilite` enum('M','Mme') DEFAULT NULL,
  `date_inscription` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_verified` tinyint(1) DEFAULT '0',
  `verification_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateurs`
--

LOCK TABLES `utilisateurs` WRITE;
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` VALUES (1,'Dupont','Jean','jean.dupont@example.com','motdepasse1','0601234567','M','2025-05-11 13:06:54',0,NULL),(2,'Martin','Sophie','sophie.martin@example.com','motdepasse2','0609876543','Mme','2025-05-11 13:06:54',0,NULL),(3,'Durand','Pierre','pierre.durand@example.com','motdepasse3','0612345678','M','2025-05-11 13:06:54',0,NULL);
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-12 19:52:17
