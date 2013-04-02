nodejs的package.json 2013-4-2
=============================
详细描述
-------------
```javascript
{
    name: "package-name", //包名称，必须为url安全的字符，不能以.和_开始
    version: "1.0.0-1-beta", //前三个数字为主版本，连字符后的数字为编译版本，如果包含非数字，则认为是预发布版本，版本关系`0.1.2-7 > 0.1.2-7-beta > 0.1.2-6 > 0.1.2 > 0.1.2beta`
    description: "", //包描述
    keywords: [], //包关键字，是一个字符串数组
    homepage: "", //项目地址
    bugs: { //bug地址
        "url" : "", //地址 
        "email" : "" //邮箱
    },
    license: "BSD", //许可
    author: { //作者，可以是单行字符串`name<email>`
        name: "", //姓名
        email: "", //邮箱
        url: "" //地址
    },
    contributors: [{ //贡献者们
        name: "", //姓名
        email: "", //邮箱
        url: "" //地址
    }],
    files: [], //项目包括的文件/文件夹，可以用.npmignore文件来标明不包括的文件
    main: "", //模块的id，标明程序的入口
    bin: { //安装可执行文件，并且将路径放入PATH环境变量中 
        "bin-name":"bin-path" //可执行命令与文件映射键值对
    },
    man: "", //建立包的man命令与帮助文档关系，可以是单个字符串，也可以是数组
    directories: { //包管理器使用的规范名称映射，如lib，src，doc与本地目录映射关系
    }, 
    repository: { //代码托管
        type: "git", //托管类型
        url: "" //托管地址
    }, 
    scripts: { //使用npm执行命令，如npm start
        start: "app.js"
    }, 
    config: { //环境变量配置，`npm_package_config_xxx`即可拿到此变量，也可以用`npm config set [package]:xxx yyy`覆盖
    }, 
    dependencies: { //包依赖，开发的相关依赖放`devDependencies`中
        "package-name": "package-version|package-url" //包名称与版本或地址键值对
    },
    devDependencies: {},
    bundledDependencies: [], //依赖包名称集合
    optionalDependencies: [], //可选依赖包，当依赖安装失败的时候，会安装这里的
    engines: { //执行引擎
        "engine-name": "engine-version" //引擎名称与版本
    },
    engineStrict: false, //严格引擎声明
    os: [], //支持的操作系统，可以是白名单也可以是黑名单，黑名单前加`!`符号
    cpu: [], //支持的CPU，可以是白名单也可以是黑名单，黑名单前加`!`符号
    preferGlobal: true, //是否优先全局安装
    private: true, //标明是否是私有包，如果是，则不发布
    publishConfig: {} //发布配置
}
```
依赖包版本的详细说明
-------------
* `version`指定版本
* `=version`同上
* `>version`必须大于某个版本 
* `>=version`大于等于
* `<version`小于
* `<=version`小于等于
* `~version`大于等于最小版本且小于次小版本加1，`~1.2`相当于`>=1.2.0 <1.3.0`
* `1.2.x`x处为任意数字或者没有`1.2.1 = 1.2.x`,`1.2 = 1.2.x`
* `http://...`http地址
* `*`任何版本
* 空字符同上
* `version1 - version2`相当于`>=version1 <=version2`
* `range1 || range2`range1或者range2
* `git...`git地址

常用模板
-------------
可以使用`npm init`来根据提示生成
```javascript
{
    name: "package-name",
    version: "1.0.0",
    description: "",
    keywords: [],
    author: "",
    dependencies: {
        "package-name": ""
    },
    devDependencies: {
        "package-name": ""
    }
}
```