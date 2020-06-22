# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.29)
# Database: traveltale
# Generation Time: 2020-06-19 15:25:27 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table activiteiten
# ------------------------------------------------------------

DROP TABLE IF EXISTS `activiteiten`;

CREATE TABLE `activiteiten` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naam` varchar(255) NOT NULL,
  `stad_id` int(11) NOT NULL,
  `max_steps` int(11) NOT NULL,
  `header_img` varchar(255) NOT NULL,
  `activiteit_uitleg` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `activiteiten` WRITE;
/*!40000 ALTER TABLE `activiteiten` DISABLE KEYS */;

INSERT INTO `activiteiten` (`id`, `naam`, `stad_id`, `max_steps`, `header_img`, `activiteit_uitleg`)
VALUES
	(1,'Treinstraat',1,500,'treinstraat','Midden in Hanoi vind je een smalle straat waar de trein dwars door rijdt. Op tijd aan de kant gaan is de boodschap!'),
	(2,'Rooftop bar',1,800,'rooftop','Begeef je naar een rooftop bar in Hanoi en geniet van een drankje terwijl je over de kleurrijke daken van Hanoi kijkt.'),
	(3,'Avondmarkt',1,500,'avondmarkt','Culinaire lekkernijen, de geur specerijen en exotisch fruit... Dompel je helemaal onder in de Vietnamese keuken!'),
	(4,'Fansipan beklimmen',2,800,'fansipan','Op zo’n 3.14 km hoogte bevindt zicht de hoogste top van Indochina. Tussen de wolken vindt je een prachtig uitzicht.'),
	(5,'Rijstvelden bezoeken',2,600,'rijstvelden','Klaar voor een modderig avontuur? Geniet van de valleien die bestaat uit met rijst bezaaide groene velden.'),
	(6,'Het bergdropje',2,500,'bergdorp','De bergdorpjes in Sapa liggen wat afgelegen van de steden. Hier vindt je dus van alles, bakkers, slagers, scholen, winkeltjes..'),
	(7,'Het fort van Cat Ba',3,500,'fort','Hoog op een berg ligt het verlaten fort. Op de weg naar de top, krijg je prachtige zichten voorgeschoteld. Avontuurlijk maar de moeite waard!'),
	(8,'Verken de binnenstad',3,600,'binnenstad','Cat Ba wordt gekenmerkt door de vele stranden, hotels en visrestaurants. Ga op verkenning in de binnenstad en ontdek enkele parels in de stad.'),
	(9,'Boottocht ',3,400,'boottocht','Vaar tussen de rotsformaties van Ha Long Bay, zie de drijvende vissersdorpen van dicht bij en ga op ontdekking met de kano.'),
	(10,'Tempelbezoek',4,600,'tempelbezoek','Snuif de lokale cultuur op en ontdek een van de bekendste tempels in Ninh Binh. Hier komen duizenden mensen om een gebed te maken.'),
	(11,'Lokaal Natuurpark',4,800,'natuurpark','Maak je borst nat en trotseer de 455 trappen in het lokaal natuurpark van Ninh Binh. Probeer op adem te komen om te genieten van het uitzicht.'),
	(12,'Dragon Mountain',4,300,'drakenberg','Ontdek de berg waar de liggende draak waakt en geniet van de uitzichten. Diep verscholen in Ninh Binh, tussen de rotsen en de rijstvelden.');

/*!40000 ALTER TABLE `activiteiten` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table einde
# ------------------------------------------------------------

DROP TABLE IF EXISTS `einde`;

CREATE TABLE `einde` (
  `einde_id` int(11) NOT NULL AUTO_INCREMENT,
  `activiteit_id` int(11) NOT NULL,
  `einde_titel` varchar(255) NOT NULL DEFAULT '',
  `einde_tekst` varchar(255) NOT NULL DEFAULT '',
  `einde_button` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`einde_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `einde` WRITE;
/*!40000 ALTER TABLE `einde` DISABLE KEYS */;

INSERT INTO `einde` (`einde_id`, `activiteit_id`, `einde_titel`, `einde_tekst`, `einde_button`)
VALUES
	(1,1,'Je treinavontuur zit erop!','De trein is voorbij gereden, iedereen maakte zich op tijd uit de voeten. Op naar het volgende avontuur!','Terug naar Hanoi'),
	(2,2,'','',''),
	(3,3,'','',''),
	(4,4,'Je hebt de top bereikt!','Na een ferme klim bereik je eindelijk de top. Geniet van het prachtige uitizicht!','Terug naar Sa Pa'),
	(5,5,'','',''),
	(6,6,'','',''),
	(7,7,'','',''),
	(8,8,'','',''),
	(9,9,'Uitrusten op  een tropisch strand','Nu de boottocht erop zit, kan je even heerlijk nagenieten op een verlaten strand. ','Terug naar Cat Ba'),
	(10,10,'Uitrusten bij Buddha','Deze serene plek is perfect om even tot rust te komen. Haal een paar keer diep adem voor je terugkeert naar Ninh Binh.','Terug naar Ninh Binh'),
	(11,11,'','',''),
	(12,12,'','','');

/*!40000 ALTER TABLE `einde` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table filmpje
# ------------------------------------------------------------

DROP TABLE IF EXISTS `filmpje`;

CREATE TABLE `filmpje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table intro
# ------------------------------------------------------------

DROP TABLE IF EXISTS `intro`;

CREATE TABLE `intro` (
  `intro_id` int(11) NOT NULL AUTO_INCREMENT,
  `activiteit_id` int(11) NOT NULL,
  `intro_titel` varchar(255) NOT NULL DEFAULT '',
  `intro_tekst` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`intro_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `intro` WRITE;
/*!40000 ALTER TABLE `intro` DISABLE KEYS */;

INSERT INTO `intro` (`intro_id`, `activiteit_id`, `intro_titel`, `intro_tekst`)
VALUES
	(1,1,'Een trein dwars door de straat','In het hartje van Hanoi bevindt zich de Tran Phu straat. Op zich geen bijzondere straat, ware het niet dat er dwars door die straat een trein rijdt! Gaan we een kijkje nemen?'),
	(2,2,'',''),
	(3,3,'',''),
	(4,4,'Klaar om te vertrekken?','Op zo’n 3.14 km hoogte bevindt zich de hoogste top van Indochina. Daar heb je vast een prachtig uitzicht! Druk op ‘Volgende’ als je klaar bent om te vertrekken!'),
	(5,5,'',''),
	(6,6,'',''),
	(7,7,'',''),
	(8,8,'',''),
	(9,9,'Op de boot','We nemen plaats in de boot en al snel beginnen we met varen. Na 10 minuutjes zijn we de haven uit en wordt iedereen uitgenodigd om naar het bovendek te gaan. Hier kun je ten volste kunnen genieten van prachtige uitzichten. Kijk maar!'),
	(10,10,'De Hang Mua tempel','Welkom bij Hang Mua, een oude Boeddhistische tempel! Om deze plek te bereiken heb je maar liefst 500 trappen moeten overwinnen. Zin om binnen een kijkje te nemen?'),
	(11,11,'',''),
	(12,12,'','');

/*!40000 ALTER TABLE `intro` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table landen
# ------------------------------------------------------------

DROP TABLE IF EXISTS `landen`;

CREATE TABLE `landen` (
  `id` int(11) NOT NULL,
  `naam` varchar(255) NOT NULL,
  `stappen_niveau` int(11) NOT NULL,
  `tag` varchar(255) NOT NULL DEFAULT '',
  `uitleg` varchar(255) NOT NULL DEFAULT '',
  `intro` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `landen` WRITE;
/*!40000 ALTER TABLE `landen` DISABLE KEYS */;

INSERT INTO `landen` (`id`, `naam`, `stappen_niveau`, `tag`, `uitleg`, `intro`)
VALUES
	(1,'Vietnam',2,'Avontuurlijk','Reis te voet, met de nachtbus of per boot doorheen de adembenemende Vietnamese landschappen en ontdek de rijke en aangrijpende geschiedenis van deze ','Ontdek tijdens deze avontuurlijke reis de unieke steden van Vietnam. Hanoi, Cat Ba, Ninh Binh, Hoi An...'),
	(2,'Colombia',1,'Actief','Het is een land met veel gezichten. \nMet o.a. besneeuwde bergtoppen, woestijnlandschappen, oerwouden, mangroven, kleine bergdorpjes en een kleurrijke','Colombia is een fascinerende bestemming die sinds kort op kleine schaal door het toerisme wordt ontdekt. ');

/*!40000 ALTER TABLE `landen` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table optie_1
# ------------------------------------------------------------

DROP TABLE IF EXISTS `optie_1`;

CREATE TABLE `optie_1` (
  `optie1_id` int(11) NOT NULL,
  `activiteit_id` int(11) NOT NULL,
  `optie1_titel` varchar(255) NOT NULL DEFAULT '',
  `optie1_tekst` varchar(255) NOT NULL DEFAULT '',
  `optie1_button` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `optie_1` WRITE;
/*!40000 ALTER TABLE `optie_1` DISABLE KEYS */;

INSERT INTO `optie_1` (`optie1_id`, `activiteit_id`, `optie1_titel`, `optie1_tekst`, `optie1_button`)
VALUES
	(4,4,'Je hebt voldoende stappen!','Je hebt al voldoende stappen gezet. Je kan te voet naar de top van Fansipan. ','Verder gaan'),
	(1,1,'Je hebt voldoende stappen!','Je hebt al voldoende stappen gezet. Je kan op tijd vluchten wanneer de trein eraan komt. ','Verder gaan'),
	(9,9,'Je hebt voldoende stappen!','Je hebt al voldoende stappen gezet. Nu kan je zwemmen in het heerlijk warme water!','Verder gaan'),
	(10,10,'Je hebt voldoende stappen!','Je hebt al voldoende stappen gezet. Nu kan je een offer brengen aan de wijze Buddha!','Verder gaan'),
	(5,5,'','',''),
	(7,7,'','',''),
	(2,2,'','',''),
	(3,3,'','',''),
	(6,6,'','',''),
	(8,8,'','',''),
	(12,12,'','',''),
	(11,11,'','','');

/*!40000 ALTER TABLE `optie_1` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table optie_2
# ------------------------------------------------------------

DROP TABLE IF EXISTS `optie_2`;

CREATE TABLE `optie_2` (
  `optie1_id` int(11) NOT NULL,
  `activiteit_id` int(11) NOT NULL,
  `optie2_titel` varchar(255) NOT NULL DEFAULT '',
  `optie2_tekst` varchar(255) NOT NULL DEFAULT '',
  `optie2_button` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `optie_2` WRITE;
/*!40000 ALTER TABLE `optie_2` DISABLE KEYS */;

INSERT INTO `optie_2` (`optie1_id`, `activiteit_id`, `optie2_titel`, `optie2_tekst`, `optie2_button`)
VALUES
	(4,4,'Je hebt voldoende stappen!','Je hebt al voldoende stappen gezet. Je kan met de lift naar de top van Fansipan. ','Verder gaan'),
	(1,1,'Je hebt voldoende stappen!','Je hebt al voldoende stappen gezet en haalt je trein tijdig in het station. Geniet van een ritje door de smalle straten van Hanoi! ','Verder gaan'),
	(9,9,'Je hebt voldoende stappen!','Je hebt al voldoende stappen gezet. Nu kan je verder varen en genieten van de tropische zon!','Verder gaan'),
	(10,10,'Je hebt voldoende stappen!','Je hebt al voldoende stappen gezet. Nu kan je een kaarsje branden!','Verder gaan'),
	(2,2,'','',''),
	(3,3,'','',''),
	(5,5,'','',''),
	(6,6,'','',''),
	(7,7,'','',''),
	(8,8,'','',''),
	(11,11,'','',''),
	(12,12,'','','');

/*!40000 ALTER TABLE `optie_2` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table split
# ------------------------------------------------------------

DROP TABLE IF EXISTS `split`;

CREATE TABLE `split` (
  `split_id` int(11) NOT NULL AUTO_INCREMENT,
  `activiteit_id` int(11) NOT NULL,
  `split_titel` varchar(255) NOT NULL DEFAULT '',
  `split_tekst1` varchar(255) NOT NULL DEFAULT '',
  `split_span1` varchar(255) NOT NULL DEFAULT '',
  `split_tekst2` varchar(255) NOT NULL DEFAULT '',
  `split_span2` varchar(255) NOT NULL DEFAULT '',
  `split_button1_tekst` varchar(255) NOT NULL DEFAULT '',
  `split_button1_kost` varchar(255) NOT NULL DEFAULT '',
  `split_button2_tekst` varchar(255) NOT NULL DEFAULT '',
  `split_button2_kost` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`split_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `split` WRITE;
/*!40000 ALTER TABLE `split` DISABLE KEYS */;

INSERT INTO `split` (`split_id`, `activiteit_id`, `split_titel`, `split_tekst1`, `split_span1`, `split_tekst2`, `split_span2`, `split_button1_tekst`, `split_button1_kost`, `split_button2_tekst`, `split_button2_kost`)
VALUES
	(1,1,'Te voet of met de trein?','Stap je door de treinstraat','800','of maak je liefst een ritje met de trein zelf','200','Stappen','800','Met de trein gaan','200'),
	(2,2,'','','','','','','','',''),
	(3,3,'','','','','','','','',''),
	(4,4,'Te voet of met de lift?','De top is nog een eindje stappen. Stap je verder','800','of neem je de kabellift ','200','Verder stappen','800','De lift nemen','200'),
	(5,5,'','','','','','','','',''),
	(6,6,'','','','','','','','',''),
	(7,7,'','','','','','','','',''),
	(8,8,'','','','','','','','',''),
	(9,9,'Plonsje wagen of lekker zonnen?','Heerlijk toch, zo’n boottochtje? Maar het wordt zeker nog plezanter als we een frisse duik nemen in de oceaan! Wat denk je? Plonsje wagen','800',' of op de boot blijven','200','Plonsje wagen','800','Op de boot blijven','200'),
	(10,10,'Offer of kaars?','Op deze heilige plek is het de gewoonte om Buddha te eren. Wil je een offer brengen aan het Buddha beeld ','800',' of gewoon een kaarsje kopen','200','Offer brengen','800','Kaarsje kopen','200'),
	(11,11,'','','','','','','','',''),
	(12,12,'','','','','','','','','');

/*!40000 ALTER TABLE `split` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table steden
# ------------------------------------------------------------

DROP TABLE IF EXISTS `steden`;

CREATE TABLE `steden` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naam` varchar(255) NOT NULL,
  `land_id` int(11) NOT NULL,
  `stappen` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `steden` WRITE;
/*!40000 ALTER TABLE `steden` DISABLE KEYS */;

INSERT INTO `steden` (`id`, `naam`, `land_id`, `stappen`)
VALUES
	(1,'Hanoi',1,3000),
	(2,'Sa Pa',1,10000),
	(3,'Cat Ba',1,10000),
	(4,'Ninh Binh',1,10000);

/*!40000 ALTER TABLE `steden` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` varchar(11) NOT NULL DEFAULT '',
  `firstName` varchar(255) NOT NULL DEFAULT '',
  `fullName` varchar(255) NOT NULL DEFAULT '',
  `stappen` int(11) DEFAULT '0',
  `leeftijd` int(11) NOT NULL,
  `fontsize` varchar(255) DEFAULT 'medium',
  `reisbegeleider` varchar(255) DEFAULT 'oma',
  `currentReis_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `firstName`, `fullName`, `stappen`, `leeftijd`, `fontsize`, `reisbegeleider`, `currentReis_id`)
VALUES
	('8KCGRF','Gwen','Gwen Bogaert',5680,22,'medium','oma',1);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users_activiteiten
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users_activiteiten`;

CREATE TABLE `users_activiteiten` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `activiteit_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table users_landen
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users_landen`;

CREATE TABLE `users_landen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `land_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table users_steden
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users_steden`;

CREATE TABLE `users_steden` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `stad_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
