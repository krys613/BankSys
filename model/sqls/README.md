### sqls
sqls cataloged by scenes

**1.建表语句存放在bank.sql中,表的关系和结构可参见ER.pdf**

**2.注册场景存在歧义，目前考虑的是用户先注册成user,可以取个昵称，然后根据类别填入employee或customer表中，以上两个表均需实名，且主键employeeID和CustID为身份证号。此场景可以考虑调用insertInfo.js插入注册信息**

**3.存、取、转业务可以调用transaction.js和account.js，前者写入交易表，后者可以更新账户表**

**4.交易记录和个人信息展示请考虑account.js和query.js**

**5.贷款和汇票业务我暂且有疑问等周一和产品经理沟通后再处理**

**6.如果有需要定制的取数请及时沟通，我进行添加修改**

