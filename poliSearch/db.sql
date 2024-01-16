drop table SENATOR;
drop table HREP;

create table SENATOR (
  id       int,
  lname    varchar(25),
  fname    varchar(25),
  birthday date,
  gender   char(1),
  state    char(2),
  party    varchar(20),
  url      varchar(50),
  twitter  varchar(50),
  facebook varchar(50),
  youtube  varchar(50),
  primary key (id)
);

create table HREP (
  id       int,
  lname    varchar(25),
  fname    varchar(25),
  birthday date,
  gender   char(1),
  state    char(2),
  party    varchar(20),
  district int,
  url      varchar(50),
  twitter  varchar(50),
  facebook varchar(50),
  youtube  varchar(50),
  primary key (id)
);