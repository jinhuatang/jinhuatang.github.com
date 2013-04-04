shell学习 2012-2-20
=======================
参数
------------
学习shell过程中，首先碰到问题就是shell如何接受参数，因为只有这样才能进行多样性的input和out
put。

这里记下以作备忘：

* `$#`：这里的`#`代表number，自然数表示第几个参数，第0个指参数前的命令
* `$*`：代表所有参数

示例代码：
```shell
#!/bin/bash
#test.sh
echo all params: $*
echo first param: $1
```

运行：
```shell
./test.sh p1 p2 p3  
all params: p1 p2 p3  
first param: p1
```
sed递归文件替换内容
-----------------------
一般情况下使用这个命令即可`find . -type f | xargs sed -i 's/old/new/g'`  
但是当文件名有空格，则会出现异常，因为空格相当于分成多个参数了  
解决办法为`find . -type f -print0 | xargs -0 sed -i 's/old/new/g'`  
`-print0`将在字符串尾部加`\0`即`null`，`xargs`的`-0`表示用`\0`分隔符来解析参数，这样配合使用问题解决