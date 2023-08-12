# Host: localhost  (Version: 5.7.26)
# Date: 2023-08-12 11:33:16
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "books"
#

DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `author` varchar(255) NOT NULL DEFAULT '',
  `isBorrow` varchar(255) NOT NULL DEFAULT '',
  `borrowName` varchar(255) DEFAULT '',
  `borrowTime` varchar(255) DEFAULT '',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

#
# Data for table "books"
#

/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'wuhu','wu','false','',''),(3,'1','1','true','wuhu','2023-08-08 17:21:07'),(5,'1','12','true','admin','2023-08-08 17:29:11'),(6,'1','1212','false','',''),(10,'1111','1212123','false','',''),(11,'122','1','false','',''),(13,'132','1','false','',''),(15,'123','123','false','',''),(16,'1231','123','false','',''),(17,'12','123','false','',''),(18,'12321','21','false','',''),(21,'1234','1324','false','',''),(23,'13241','2314','false','','');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;

#
# Structure for table "user"
#

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `passwd` varchar(255) NOT NULL DEFAULT '',
  `creatTime` datetime DEFAULT NULL,
  `updataTime` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

#
# Data for table "user"
#

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,'admin','admin','2023-08-07 20:44:48','2023-08-07 20:44:48'),(4,'12','1','2023-08-08 09:36:00','2023-08-08 09:36:00'),(5,'1234412','3124234','2023-08-12 10:17:22',''),(6,'1','1','2023-08-12 10:34:15',''),(7,'123','213','2023-08-12 11:32:33','');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
