/*
* @Author: Star
* @Date:   2018-11-23 18:38:31
* @Last Modified by:   Star
* @Last Modified time: 2018-11-23 19:46:26
*/
-- DROP TABLE IF EXISTS `books`;

create table books (
  id int(11) NOT NULL AUTO_INCREMENT primary key,
  isbn varchar(20) NOT NULL,
  openid varchar(100) NOT NULL,
  title varchar(100) NOT NULL,
  image varchar(100) NOT NULL,
  alt varchar(100) NOT NULL,
  publisher varchar(100) NOT NULL,
  summary varchar(1000) NOT NULL,
  price varchar(100) DEFAULT NULL,
  rate float DEFAULT NULL,
  tags varchar(100) DEFAULT NULL,
  author varchar(100) DEFAULT NULL,
  count int(11) NOT NULL DEFAULT '0'
)