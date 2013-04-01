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
