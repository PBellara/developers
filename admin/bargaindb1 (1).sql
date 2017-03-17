-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2017 at 06:53 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bargaindb1`
--

-- --------------------------------------------------------

--
-- Table structure for table `city_tbl`
--

CREATE TABLE IF NOT EXISTS `city_tbl` (
  `id` int(11) NOT NULL,
  `cityname` varchar(100) NOT NULL,
  `statename` varchar(100) NOT NULL,
  `stateid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `marketingpost_tbl`
--

CREATE TABLE IF NOT EXISTS `marketingpost_tbl` (
  `markertpostid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `marketingimg` varchar(100) NOT NULL,
  `creationdate` datetime NOT NULL,
  PRIMARY KEY (`markertpostid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `postexplore_tbl`
--

CREATE TABLE IF NOT EXISTS `postexplore_tbl` (
  `postexploreid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `subproductid` int(11) NOT NULL,
  `posttitle` varchar(200) NOT NULL,
  `postdescr` varchar(500) NOT NULL,
  `postdtlsdescr` varchar(500) NOT NULL,
  `postauthenticated` tinyint(1) NOT NULL,
  `postdeleted` tinyint(1) NOT NULL,
  `creationdate` datetime NOT NULL,
  `filename` varchar(100) NOT NULL,
  PRIMARY KEY (`postexploreid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=40 ;

-- --------------------------------------------------------

--
-- Table structure for table `product_tbl`
--

CREATE TABLE IF NOT EXISTS `product_tbl` (
  `productid` int(11) NOT NULL AUTO_INCREMENT,
  `productname` varchar(100) NOT NULL,
  `productdescr` varchar(200) NOT NULL,
  `productImg` varchar(200) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  `creationdate` datetime NOT NULL,
  PRIMARY KEY (`productid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=46 ;

-- --------------------------------------------------------

--
-- Table structure for table `professionmaster_tbl`
--

CREATE TABLE IF NOT EXISTS `professionmaster_tbl` (
  `professionid` int(11) NOT NULL AUTO_INCREMENT,
  `professionname` varchar(200) NOT NULL,
  PRIMARY KEY (`professionid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

-- --------------------------------------------------------

--
-- Table structure for table `registeruser`
--

CREATE TABLE IF NOT EXISTS `registeruser` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `notiUserid` varchar(200) NOT NULL,
  `notipushToken` varchar(200) NOT NULL,
  `emailid` varchar(100) NOT NULL,
  `sysuserid` varchar(100) NOT NULL,
  `mobileno` varchar(100) NOT NULL,
  `userpass` varchar(100) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `usertype` varchar(1) NOT NULL,
  `professionid` int(11) NOT NULL,
  `usercatid` int(11) NOT NULL,
  `creditpoints` int(11) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=66 ;

-- --------------------------------------------------------

--
-- Table structure for table `setting_tbl`
--

CREATE TABLE IF NOT EXISTS `setting_tbl` (
  `settingid` int(11) DEFAULT NULL,
  `enablechatlimit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `statemaster_tbl`
--

CREATE TABLE IF NOT EXISTS `statemaster_tbl` (
  `stateid` int(11) NOT NULL AUTO_INCREMENT,
  `statename` varchar(100) NOT NULL,
  PRIMARY KEY (`stateid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=37 ;

-- --------------------------------------------------------

--
-- Table structure for table `subproduct_tbl`
--

CREATE TABLE IF NOT EXISTS `subproduct_tbl` (
  `subproductid` int(11) NOT NULL AUTO_INCREMENT,
  `productid` int(11) NOT NULL,
  `subproductname` varchar(100) NOT NULL,
  `subproductdescr` varchar(100) NOT NULL,
  `subproductimg` varchar(100) NOT NULL,
  `isactive` int(11) NOT NULL,
  `creationdate` datetime NOT NULL,
  PRIMARY KEY (`subproductid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

-- --------------------------------------------------------

--
-- Table structure for table `usercategory`
--

CREATE TABLE IF NOT EXISTS `usercategory` (
  `usercatid` int(11) NOT NULL AUTO_INCREMENT,
  `usercategoryname` varchar(100) NOT NULL,
  `defaultcategory` tinyint(1) NOT NULL,
  `creditpoints` int(11) NOT NULL,
  `noofnotification` int(11) NOT NULL,
  `unlimited` tinyint(1) NOT NULL,
  PRIMARY KEY (`usercatid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- Table structure for table `userproduct`
--

CREATE TABLE IF NOT EXISTS `userproduct` (
  `userproductid` int(11) DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `productid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
