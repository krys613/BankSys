/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : BankSys

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 07/11/2018 10:43:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `AccountNo` bigint(11) NOT NULL AUTO_INCREMENT,
  `UserID` varchar(65) NOT NULL,
  `CreatingDate` date NOT NULL,
  `Password` varchar(32) NOT NULL,
  `Amount` double(11,2) NOT NULL,
  `Status` enum('1','0') NOT NULL DEFAULT '1' COMMENT '1：正常 0：冻结',
  PRIMARY KEY (`AccountNo`),
  KEY `CustID` (`UserID`),
  CONSTRAINT `acc_fk_UserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=123491 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------
BEGIN;
INSERT INTO `account` VALUES (123456, '1', '2018-10-16', '1234', 123.00, '0');
INSERT INTO `account` VALUES (123478, '1', '2018-11-03', 'dasdad', 200.00, '1');
INSERT INTO `account` VALUES (123479, '1', '2018-11-03', 'asdasd', 0.00, '1');
INSERT INTO `account` VALUES (123480, '1', '2018-11-03', 'asdasd', 0.00, '1');
INSERT INTO `account` VALUES (123481, '1', '2018-11-04', 'adadojqdo', 0.00, '1');
INSERT INTO `account` VALUES (123482, '1', '2018-11-04', 'zzzzzzz', 0.00, '1');
INSERT INTO `account` VALUES (123483, '1', '2018-11-04', 'zzzzzzz', 0.00, '1');
INSERT INTO `account` VALUES (123484, '1', '2018-11-04', 'zzzzzzz', 0.00, '1');
INSERT INTO `account` VALUES (123485, '1', '2018-11-04', 'zzzzzzz', 0.00, '1');
INSERT INTO `account` VALUES (123486, '1', '2018-11-04', 'zzzzzzz', 98310.00, '1');
INSERT INTO `account` VALUES (123487, '1', '2018-11-04', 'zzzzzzz', 0.00, '1');
INSERT INTO `account` VALUES (123488, '1', '2018-11-04', 'zzzzzzz', 0.00, '1');
INSERT INTO `account` VALUES (123489, '1', '2018-11-04', 'zzzzzzz', 0.00, '1');
INSERT INTO `account` VALUES (123490, '1', '2018-11-06', '12312312aaaa', 0.00, '1');
COMMIT;

-- ----------------------------
-- Table structure for bankdraft
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
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `custID` varchar(20) NOT NULL COMMENT '身份证号',
  `userID` varchar(65) NOT NULL,
  `name` varchar(8) NOT NULL,
  `gender` enum('F','M') NOT NULL DEFAULT 'F',
  `address` tinytext NOT NULL,
  `phoneNumber` varchar(11) NOT NULL,
  PRIMARY KEY (`custID`),
  KEY `c_u` (`userID`),
  CONSTRAINT `cus_fk_UserID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `employeeID` varchar(20) NOT NULL DEFAULT '身份证号',
  `userID` varchar(65) NOT NULL,
  `name` varchar(8) NOT NULL,
  `gender` enum('F','M') NOT NULL,
  `job` tinytext NOT NULL,
  PRIMARY KEY (`employeeID`),
  KEY `e_t` (`userID`),
  CONSTRAINT `em_fk_UserID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for loan
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
-- Table structure for transaction_save
-- ----------------------------
DROP TABLE IF EXISTS `transaction_save`;
CREATE TABLE `transaction_save` (
  `Transaction_Save_ID` bigint(11) NOT NULL AUTO_INCREMENT,
  `AccountNo` bigint(11) NOT NULL,
  `Date` date NOT NULL,
  `Amount` double(13,3) DEFAULT NULL,
  PRIMARY KEY (`Transaction_Save_ID`),
  KEY `AccountNo` (`AccountNo`),
  CONSTRAINT `transaction_save_ibfk_1` FOREIGN KEY (`AccountNo`) REFERENCES `account` (`AccountNo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of transaction_save
-- ----------------------------
BEGIN;
INSERT INTO `transaction_save` VALUES (1, 123486, '2018-11-05', 100.000);
INSERT INTO `transaction_save` VALUES (3, 123486, '2018-11-06', 100.000);
INSERT INTO `transaction_save` VALUES (4, 123486, '2018-11-06', 100.000);
INSERT INTO `transaction_save` VALUES (5, 123478, '2018-11-06', 100.000);
INSERT INTO `transaction_save` VALUES (6, 123486, '2018-11-06', 100.000);
INSERT INTO `transaction_save` VALUES (7, 123486, '2018-11-06', 100.000);
INSERT INTO `transaction_save` VALUES (8, 123486, '2018-11-07', 100000.000);
COMMIT;

-- ----------------------------
-- Table structure for transaction_transfer
-- ----------------------------
DROP TABLE IF EXISTS `transaction_transfer`;
CREATE TABLE `transaction_transfer` (
  `Transaction_Transfer_ID` bigint(11) NOT NULL AUTO_INCREMENT,
  `AccountNoFrom` bigint(11) NOT NULL,
  `AccountNoTo` bigint(11) NOT NULL,
  `Date` date NOT NULL,
  `Amount` int(11) NOT NULL,
  PRIMARY KEY (`Transaction_Transfer_ID`),
  KEY `AccountNoFrom` (`AccountNoFrom`),
  KEY `AccountNoTo` (`AccountNoTo`),
  CONSTRAINT `transaction_transfer_ibfk_1` FOREIGN KEY (`AccountNoFrom`) REFERENCES `account` (`AccountNo`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `transaction_transfer_ibfk_2` FOREIGN KEY (`AccountNoTo`) REFERENCES `account` (`AccountNo`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for transaction_withdraw
-- ----------------------------
DROP TABLE IF EXISTS `transaction_withdraw`;
CREATE TABLE `transaction_withdraw` (
  `Transaction_Withdraw_ID` bigint(11) NOT NULL AUTO_INCREMENT,
  `AccountNo` bigint(11) NOT NULL,
  `Date` date NOT NULL,
  `Amount` int(11) NOT NULL,
  PRIMARY KEY (`Transaction_Withdraw_ID`),
  KEY `AccoutNo` (`AccountNo`),
  CONSTRAINT `transaction_withdraw_ibfk_1` FOREIGN KEY (`AccountNo`) REFERENCES `account` (`AccountNo`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of transaction_withdraw
-- ----------------------------
BEGIN;
INSERT INTO `transaction_withdraw` VALUES (1, 123486, '2018-11-06', 9999);
INSERT INTO `transaction_withdraw` VALUES (2, 123486, '2018-11-06', 999);
INSERT INTO `transaction_withdraw` VALUES (3, 123486, '2018-11-06', 1000);
INSERT INTO `transaction_withdraw` VALUES (4, 123486, '2018-11-06', 1000);
INSERT INTO `transaction_withdraw` VALUES (5, 123456, '2018-11-06', 1000);
INSERT INTO `transaction_withdraw` VALUES (6, 123486, '2018-11-07', 1000);
INSERT INTO `transaction_withdraw` VALUES (7, 123486, '2018-11-07', 1000);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userID` varchar(65) NOT NULL,
  `password` varchar(32) NOT NULL,
  `type` enum('customer','employee') NOT NULL,
  `name` varchar(8) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', '1234', 'customer', 'dsad');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
