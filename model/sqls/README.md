### sqls
sqls cataloged by scenes

**1.建表语句存放在bank.sql中,表的关系和结构可参见ER.pdf,有一些表结构与设计不同 具体参见建表语句**

**2.注册场景存在歧义，目前考虑的是用户先注册成user,可以取个昵称，然后根据类别填入employee或customer表中，以上两个表均需实名，且主键employeeID和CustID为身份证号。此场景可以考虑调用insertInfo.js插入注册信息**

**3.存、取、转业务可以调用transaction.js和account.js，前者写入交易表，后者可以更新账户表**

**4.交易记录和个人信息展示请考虑account.js和query.js**

**5.贷款需求可以考虑loan.js**

**6.汇票需求可以考虑**

**7.转账事务语句请调用transferAffair.js中的transferAffairSql.transfer(AccountNoFrom,AccountNoTo,date,Amount,Description)**



