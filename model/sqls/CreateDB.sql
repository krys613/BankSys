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

 Date: 08/11/2018 23:06:35
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
INSERT INTO `account` VALUES (123480, '1', '2018-11-03', 'asdasd', 0.00, '0');
INSERT INTO `account` VALUES (123481, '1', '2018-11-04', 'adadojqdo', 89739.00, '1');
INSERT INTO `account` VALUES (123482, '1', '2018-11-04', 'zzzzzzz', 100027.00, '1');
INSERT INTO `account` VALUES (123483, '1', '2018-11-04', 'zzzzzzz', 33333.00, '0');
INSERT INTO `account` VALUES (123484, '1', '2018-11-04', 'zzzzzzz', 100000.00, '1');
INSERT INTO `account` VALUES (123485, '1', '2018-11-04', 'zzzzzzz', 10234.00, '1');
INSERT INTO `account` VALUES (123486, '1', '2018-11-04', 'zzzzzzz', 96510.00, '1');
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
-- Records of customer
-- ----------------------------
BEGIN;
INSERT INTO `customer` VALUES ('123', '1', 'a', 'F', 'a', '1');
COMMIT;

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
  `Status` int(1) NOT NULL DEFAULT '0' COMMENT '0代表审批中 1代表拒绝 2代表通过',
  `LoanTerm` enum('10','5','1') NOT NULL COMMENT '单位：月',
  `UserID` varchar(65) NOT NULL,
  `PassDate` date DEFAULT NULL,
  `FinishedAmount` double DEFAULT NULL COMMENT '已还金额',
  PRIMARY KEY (`LoanID`),
  KEY `AccountNo` (`AccountNo`),
  KEY `loan_fk_userid` (`UserID`),
  CONSTRAINT `loan_fk_userid` FOREIGN KEY (`UserID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `loan_ibfk_1` FOREIGN KEY (`AccountNo`) REFERENCES `account` (`AccountNo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of loan
-- ----------------------------
BEGIN;
INSERT INTO `loan` VALUES (5, 123481, 'dasd', 's', 'Ali', 100000, 10000000, 0.0435, 0, '1', '1', '2018-12-08', 0);
INSERT INTO `loan` VALUES (6, 123481, 'dasd', 's', 'Ali', 100000, 10000000, 0.0435, 0, '1', '1', '2018-12-08', 0);
INSERT INTO `loan` VALUES (7, 123481, 'dasd', 's', 'Ali', 100000, 10000000, 0.0435, 0, '1', '1', '2018-12-08', 0);
INSERT INTO `loan` VALUES (8, 123481, 'dasd', 's', 'Ali', 100000, 10000000, 0.0435, 0, '1', '1', '2018-12-08', 0);
INSERT INTO `loan` VALUES (9, 123481, 'dasd', 's', 'Ali', 100000, 10000000, 0.0435, 0, '1', '1', '2018-12-08', 0);
INSERT INTO `loan` VALUES (10, 123481, 'dasd', 's', 'Ali', 100000, 10000000, 0.0435, 2, '1', '1', '2018-12-08', 0);
INSERT INTO `loan` VALUES (11, 123481, 'dasd', 's', 'Ali', 100000, 10000000, 0.0435, 0, '1', '1', '2018-12-08', 0);
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

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
INSERT INTO `transaction_save` VALUES (9, 123486, '2018-11-07', 100.000);
INSERT INTO `transaction_save` VALUES (10, 123486, '2018-11-07', 100.000);
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of transaction_transfer
-- ----------------------------
BEGIN;
INSERT INTO `transaction_transfer` VALUES (2, 123482, 123481, '1212-12-12', 10000);
INSERT INTO `transaction_transfer` VALUES (3, 123481, 123482, '1221-12-12', 100);
INSERT INTO `transaction_transfer` VALUES (4, 123481, 123482, '1212-12-12', 10);
INSERT INTO `transaction_transfer` VALUES (5, 123481, 123482, '1212-12-12', 22);
INSERT INTO `transaction_transfer` VALUES (6, 123484, 123485, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (7, 123484, 123485, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (8, 123484, 123485, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (9, 123484, 123485, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (10, 123484, 123485, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (11, 123484, 123485, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (12, 123484, 123485, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (13, 123484, 123485, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (14, 123482, 123481, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (15, 123482, 123481, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (16, 123482, 123481, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (17, 123482, 123481, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (18, 123482, 123481, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (19, 123482, 123481, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (20, 123482, 123481, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (21, 123482, 123481, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (22, 123482, 123481, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (23, 123482, 123481, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (24, 123482, 123481, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (25, 123482, 123481, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (26, 123482, 123481, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (27, 123482, 123481, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (28, 123482, 123481, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (29, 123482, 123481, '2018-11-07', 100);
INSERT INTO `transaction_transfer` VALUES (30, 123481, 123485, '2018-11-07', 1);
INSERT INTO `transaction_transfer` VALUES (31, 123482, 123481, '2018-11-08', 12);
INSERT INTO `transaction_transfer` VALUES (32, 123482, 123481, '2018-11-08', 12);
INSERT INTO `transaction_transfer` VALUES (33, 123482, 123481, '2018-11-08', 12);
INSERT INTO `transaction_transfer` VALUES (34, 123481, 123482, '2018-11-08', 2);
INSERT INTO `transaction_transfer` VALUES (35, 123482, 123481, '2018-11-08', 12);
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

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
INSERT INTO `transaction_withdraw` VALUES (8, 123486, '2018-11-07', 1000);
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
  PRIMARY KEY (`userID`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', '1234', 'customer', 'dsad');
INSERT INTO `user` VALUES ('2', '1111', 'customer', 'aaaa');
COMMIT;

-- ----------------------------
-- Procedure structure for proc_TransferAction
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_TransferAction`;
delimiter ;;
CREATE PROCEDURE `BankSys`.`proc_TransferAction`(in accNoFrom bigint(11), 
			in accNoTo bigint(11), in today date, in amou double(11,2), out transRecordNo bigint(11))
BEGIN
	DECLARE con1 INT DEFAULT NULL;
	DECLARE con2 INT DEFAULT NULL;
	DECLARE am1 DOUBLE(11,2) DEFAULT 0;
	DECLARE am2 DOUBLE(11,2) DEFAULT 0;
	DECLARE t_error INTEGER DEFAULT 0;  
		DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET t_error=1;
	
	SELECT Status into con1 FROM account WHERE AccountNo = accNoFrom;
	SELECT Status into con2 FROM account WHERE AccountNo = accNoTo;
	
	IF con1=1 and con2=1 THEN
		SELECT Amount INTO am1 FROM account WHERE AccountNo = accNoFrom;
		SELECT Amount INTO am2 FROM account WHERE AccountNo = accNoTo;
		IF am1-amou >= 0 THEN
			SET am1 = am1 - amou;
			SET am2 = am2 + amou;
			START TRANSACTION;
				UPDATE account SET Amount = am1 WHERE AccountNo = accNoTo;
				UPDATE account SET Amount = am2 WHERE AccountNo = accNoFrom;
				INSERT INTO transaction_transfer(AccountNoFrom,AccountNoTo,Date,Amount)
							VALUES (accNoFrom,accNoTo,today,amou);
			IF t_error = 1 THEN  
         ROLLBACK;  
      ELSE  
         COMMIT;  
      END IF;
			SELECT LAST_INSERT_ID() INTO transRecordNo;
		ELSE
			SET transRecordNo = NULL;
		END IF;                               
	ELSE
		SET transRecordNo = NULL;
	END IF;
	SELECT transRecordNo;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
