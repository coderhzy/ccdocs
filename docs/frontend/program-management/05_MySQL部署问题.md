# 部署问题

## 一、在Centos7上安装mysql8并用工具连接mysql

### 1. 购买 服务器

这里不多介绍，自行选择即可

### 2. 登录服务器，安装mysql

1. 本地登录远程ssh

```shell
ssh -p 22 root@101.34.88.158
```

输入密码登录

2.  运行以下命令更新YUM源

```shell
sudo rpm -Uvh https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
```

3. 运行以下命令安装MySQL

```shell
sudo yum -y install mysql-community-server --enablerepo=mysql80-community --nogpgcheck
```

4. 运行以下命令查看MySQL版本号

```shell
mysql -V
```

返回结果如下，表示MySQL安装成功。
![mysql安装成功](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/0792384461/p401705.png)

## 3. 配置MySQL

1. 运行以下命令启动MySQL服务

```shell
systemctl start mysqld
```

2. 运行以下命令设置MySQL服务开机自启动

```shell
systemctl enable mysqld
```

3. 运行以下命令查看/var/log/mysqld.log文件，获取并记录root用户的初始密码。

```shell
grep 'temporary password' /var/log/mysqld.log
```

4. 修改MySQL密码

```shell
mysql -u root -p '原来的密码'   //进入数据库中

show databases;

use mysql;

使用下面的语句修改密码：
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '你的密码';

刷新
flush privileges;

重启MySQL
service mysql restart
```

5. 使用新密码登录
```shell
mysql -u root -p '原来的密码'
```

6. 修改Host连接（解决1130-host ... is not allowed to connect to this MySql server如何处理）

这个问题是因为在数据库服务器中的mysql数据库中的user的表中没有权限(也可以说没有用户)，下面将记录我遇到问题的过程及解决的方法。

```shell
mysql -u root -p # 连接

show databases; # 展示数据库

use mysql; # 使用mysql数据库

show tables; # 查看mysql数据库的表

select Host,User from user; # 查看user表中的数据

update user set Host='%' where User='root'; # 将user表中Host变更

flush privileges; # 刷新一下
```

此时使用Navicate使用root连接则成功;


# END-关于我


[掘金地址](https://juejin.cn/user/1714893872178823)
[个人博客](https://www.codehzy.cn/)
[GitHub](https://github.com/codehzy)