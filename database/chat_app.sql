-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.42 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for chatapp
CREATE DATABASE IF NOT EXISTS `chatapp` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `chatapp`;

-- Dumping structure for table chatapp.chat
CREATE TABLE IF NOT EXISTS `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `files` longtext NOT NULL,
  `message` longtext NOT NULL,
  `status` varchar(30) DEFAULT NULL,
  `from_user` int DEFAULT NULL,
  `to_user` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_qydhn8kg94hqya41okkq4h5ng` (`from_user`) USING BTREE,
  KEY `FK_e6od82vcl84c3j9hawauu8xwn` (`to_user`) USING BTREE,
  CONSTRAINT `FK_e6od82vcl84c3j9hawauu8xwn` FOREIGN KEY (`to_user`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_qydhn8kg94hqya41okkq4h5ng` FOREIGN KEY (`from_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table chatapp.chat: ~4 rows (approximately)
INSERT INTO `chat` (`id`, `created_at`, `updated_at`, `files`, `message`, `status`, `from_user`, `to_user`) VALUES
	(20, '2025-10-14 14:16:22', '2025-10-14 14:16:22', 'FILE:', 'Hi', 'READ', 18, 17),
	(21, '2025-10-14 14:19:34', '2025-10-14 14:19:34', 'FILE:', 'Hey', 'READ', 17, 18),
	(22, '2025-10-14 14:50:12', '2025-10-14 14:50:12', 'FILE:', 'Hi', 'READ', 20, 19),
	(23, '2025-10-14 14:55:44', '2025-10-14 14:55:44', 'FILE:', 'Hey', 'READ', 19, 20),
	(24, '2026-04-09 18:34:43', '2026-04-09 18:34:43', 'FILE:', 'Hey', 'READ', 16, 18),
	(25, '2026-04-09 18:34:52', '2026-04-09 18:34:52', 'FILE:', 'What\'s up', 'READ', 16, 18),
	(26, '2026-04-09 18:36:45', '2026-04-09 18:36:45', 'FILE:', 'Hi', 'READ', 18, 16);

-- Dumping structure for table chatapp.friend_list
CREATE TABLE IF NOT EXISTS `friend_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_status` varchar(30) DEFAULT NULL,
  `friend_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `display_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_t35f03kjx6389385fthfry288` (`friend_id`),
  KEY `FK_rmlr6b76l6606kgyo9uim7maf` (`user_id`),
  CONSTRAINT `FK_rmlr6b76l6606kgyo9uim7maf` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_t35f03kjx6389385fthfry288` FOREIGN KEY (`friend_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table chatapp.friend_list: ~4 rows (approximately)
INSERT INTO `friend_list` (`id`, `user_status`, `friend_id`, `user_id`, `display_name`) VALUES
	(20, 'ACTIVE', 17, 18, 'My 1st Account '),
	(21, 'ACTIVE', 18, 17, NULL),
	(22, 'ACTIVE', 19, 20, 'My new Account '),
	(23, 'ACTIVE', 20, 19, NULL),
	(24, 'ACTIVE', 18, 16, 'My 2nd Account '),
	(25, 'ACTIVE', 16, 18, NULL);

-- Dumping structure for table chatapp.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `contact_no` varchar(45) NOT NULL,
  `country_code` varchar(5) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_lo565olv8by15v9qgmqq8ajh8` (`contact_no`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table chatapp.user: ~5 rows (approximately)
INSERT INTO `user` (`id`, `created_at`, `updated_at`, `contact_no`, `country_code`, `first_name`, `last_name`, `status`) VALUES
	(16, '2025-10-14 13:38:37', '2025-10-14 13:38:37', '716373489', '+94', 'First', 'Account ', 'OFFLINE'),
	(17, '2025-10-14 14:08:31', '2025-10-14 14:08:31', '715788820', '+94', 'My 1st', 'Account ', 'OFFLINE'),
	(18, '2025-10-14 14:13:31', '2025-10-14 14:13:31', '719947292', '+94', 'My 2nd', 'Account ', 'OFFLINE'),
	(19, '2025-10-14 14:41:44', '2025-10-14 14:41:44', '77715458860', '+94', 'My new', 'Account ', 'OFFLINE'),
	(20, '2025-10-14 14:47:28', '2025-10-14 14:47:28', '77415698530', '+94', 'My 2nd', 'New Account ', 'OFFLINE');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
