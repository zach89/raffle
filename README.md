# 抽奖WEB应用

一个简单的WEB 应用。
MYSQL+PHP5.4
后台页面：backviews/index.html
抽奖页面: index.html

## 本地运行
php/zsql.php
填写password,raffle(database)
```
$mysqli = new mysqli('localhost','root','password','raffle');

```

## 部署到 SAE
php/zsql.php
```
$mysqli = new SaeMysql();

```

