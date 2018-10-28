/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : bank

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-10-27 21:05:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `account`
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `AccountNo` bigint(11) NOT NULL AUTO_INCREMENT,
  `CustID` varchar(20) NOT NULL,
  `CreatingDate` date NOT NULL,
  `Password` varchar(32) NOT NULL,
  `Amount` double(11,2) NOT NULL,
  `Status` enum('1','0') NOT NULL DEFAULT '1' COMMENT '1：正常 0：冻结',
  PRIMARY KEY (`AccountNo`),
  KEY `CustID` (`CustID`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`CustID`) REFERENCES `customer` (`custID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('2', '1234', '1996-11-23', 'sdfasdf', '4666.00', '1');
INSERT INTO `account` VALUES ('3', '9999', '2018-10-11', '123456', '500.00', '1');
INSERT INTO `account` VALUES ('4', '1234', '2018-10-17', '12345', '799.00', '1');

-- ----------------------------
-- Table structure for `bankdraft`
-- ----------------------------
DROP TABLE IF EXISTS `bankdraft`;
CREATE TABLE `bankdraft` (
  `BankDraftID` bigint(11) NOT NULL AUTO_INCREMENT,
  `AccountNoFrom` bigint(11) NOT NULL,
  `AccountNoTo` bigint(11) NOT NULL,
  `Date` date NOT NULL,
  `Deadline` date NOT NULL COMMENT '汇票最迟兑现时间',
  `Amount` double(11,2) NOT NULL,
  `Status` enum('3','2','1') NOT NULL COMMENT '1:已承兑，2：已兑现，3：已还清',
  `Description` tinytext,
  PRIMARY KEY (`BankDraftID`),
  KEY `AccountNoFrom` (`AccountNoFrom`),
  KEY `AccountNoTo` (`AccountNoTo`),
  CONSTRAINT `bankdraft_ibfk_1` FOREIGN KEY (`AccountNoFrom`) REFERENCES `account` (`AccountNo`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `bankdraft_ibfk_2` FOREIGN KEY (`AccountNoTo`) REFERENCES `account` (`AccountNo`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bankdraft
-- ----------------------------

-- ----------------------------
-- Table structure for `customer`
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `custID` varchar(20) NOT NULL COMMENT '身份证号',
  `userID` bigint(11) NOT NULL,
  `name` varchar(8) NOT NULL,
  `gender` enum('F','M') NOT NULL DEFAULT 'F',
  `address` tinytext NOT NULL,
  `phoneNumber` varchar(11) NOT NULL,
  PRIMARY KEY (`custID`),
  KEY `c_u` (`userID`),
  CONSTRAINT `c_u` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of customer
-- ----------------------------


-- ----------------------------
-- Table structure for `employee`
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `employeeID` varchar(20) NOT NULL DEFAULT '身份证号',
  `userID` bigint(11) NOT NULL,
  `name` varchar(8) NOT NULL,
  `gender` enum('F','M') NOT NULL,
  `job` tinytext NOT NULL,
  PRIMARY KEY (`employeeID`),
  KEY `e_t` (`userID`),
  CONSTRAINT `e_t` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of employee
-- ----------------------------


-- ----------------------------
-- Table structure for `loan`
-- ----------------------------
DROP TABLE IF EXISTS `loan`;
CREATE TABLE `loan` (
  `LoanID` bigint(11) NOT NULL AUTO_INCREMENT,
  `AccountNo` bigint(11) NOT NULL,
  `Name` varchar(8) NOT NULL,
  `Job` tinytext NOT NULL,
  `Company` tinytext NOT NULL,
  `MonthSalary` int(11) NOT NULL,
  `Amount` int(11) NOT NULL,
  `LoanRate` double NOT NULL,
  `PunishmentRate` double NOT NULL,
  `Status` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0代表审批中 1代表审批完成',
  `LoanTerm` enum('12','6','3') NOT NULL COMMENT '单位：月',
  `PassDate` date DEFAULT NULL,
  `FinishedAmount` double DEFAULT NULL COMMENT '已还金额',
  PRIMARY KEY (`LoanID`),
  KEY `AccountNo` (`AccountNo`),
  CONSTRAINT `loan_ibfk_1` FOREIGN KEY (`AccountNo`) REFERENCES `account` (`AccountNo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of loan
-- ----------------------------

-- ----------------------------
-- Table structure for `transaction_save`
-- ----------------------------
DROP TABLE IF EXISTS `transaction_save`;
CREATE TABLE `transaction_save` (
  `Transaction_Save_ID` bigint(11) NOT NULL AUTO_INCREMENT,
  `AccountNo` bigint(11) NOT NULL,
  `Date` date NOT NULL,
  `Amount` double(13,3) DEFAULT NULL,
  `Description` tinytext COMMENT '备注',
  PRIMARY KEY (`Transaction_Save_ID`),
  KEY `AccountNo` (`AccountNo`),
  CONSTRAINT `transaction_save_ibfk_1` FOREIGN KEY (`AccountNo`) REFERENCES `account` (`AccountNo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of transaction_save
-- ----------------------------


-- ----------------------------
-- Table structure for `transaction_transfer`
-- ----------------------------
DROP TABLE IF EXISTS `transaction_transfer`;
CREATE TABLE `transaction_transfer` (
  `Transaction_Transfer_ID` bigint(11) NOT NULL AUTO_INCREMENT,
  `AccountNoFrom` bigint(11) NOT NULL,
  `AccountNoTo` bigint(11) NOT NULL,
  `Date` date NOT NULL,
  `Amount` int(11) NOT NULL,
  `Description` tinytext,
  PRIMARY KEY (`Transaction_Transfer_ID`),
  KEY `AccountNoFrom` (`AccountNoFrom`),
  KEY `AccountNoTo` (`AccountNoTo`),
  CONSTRAINT `transaction_transfer_ibfk_1` FOREIGN KEY (`AccountNoFrom`) REFERENCES `account` (`AccountNo`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `transaction_transfer_ibfk_2` FOREIGN KEY (`AccountNoTo`) REFERENCES `account` (`AccountNo`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of transaction_transfer
-- ----------------------------


-- ----------------------------
-- Table structure for `transaction_withdraw`
-- ----------------------------
DROP TABLE IF EXISTS `transaction_withdraw`;
CREATE TABLE `transaction_withdraw` (
  `Transaction_Withdraw_ID` bigint(11) NOT NULL AUTO_INCREMENT,
  `AccountNo` bigint(11) NOT NULL,
  `Date` date NOT NULL,
  `Amount` int(11) NOT NULL,
  `Description` tinytext NOT NULL,
  PRIMARY KEY (`Transaction_Withdraw_ID`),
  KEY `AccoutNo` (`AccountNo`),
  CONSTRAINT `transaction_withdraw_ibfk_1` FOREIGN KEY (`AccountNo`) REFERENCES `account` (`AccountNo`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of transaction_withdraw
-- ----------------------------


-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userID` bigint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(8) NOT NULL,
  `password` varchar(32) NOT NULL,
  `type` enum('customer','employee') NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------

