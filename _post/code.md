﻿字符编码 2013-3-20
===================
ASCII
-------------------
ASCII（American Standard Code for Information Interchange，美国信息互换标准编码）。  
7位（bits）表示一个字符，共128字符，字符值从0到127，其中32到127是可打印字符。
0x00-0x20|0x7F为控制字符，0x21-0x7E为字符

ANSI
-------------------
ANSI(American National Standards Institute,美国国家标准学会)  
使用大于0x7F的2个字节来代表一个字符的各种延伸编码方式，称为 ANSI 编码。如：GB2312、BIG5、 GB18030
两个字节中前面的字节为第一字节，后面的字节为第二字节。习惯上称第一字节为“高字节” ，而称第二字节为“低字节”。
由于大于0x7F所以兼容ASCII,并且兼容部分仍用1个字节表示

GB2312
-------------------
“高位字节”使用了0xA1-0xF7(把01-87区的区号加上0xA0)，“低位字节”使用了0xA1-0xFE(把01-94加上0xA0)  
一级汉字 16-55区，共40个区  
二级汉字 56-87区,共32个区  
三级汉字 1-9区,共9个区  
用户自定义10-15区,共6个区  
共87个区,每个区94个字  
87x94-5:共6763字,理论上应该有:128x128个