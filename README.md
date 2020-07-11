# vue-app-base

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性

## 1. webpack 的构建流程主要环节

### 首先我们要先定义入口文件和出口文件

``` javascript
//不管是dev/prod/common 我们都需要定义入口和出口文件
entry: './src/main.js',// 这是我的入口文件
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
```

### 然后我们需要安装各种各样的loader来处理文件

先分析，我们这是一个`Vue`项目 所以理所应当的需要一个vue-loader

```shell
npm install vue-loader
```

![安装截图](https://raw.githubusercontent.com/Dashsoap/PhoneBed/master/uPic/H0Ka2Y.png)

然后因为我们的Vue的文件里面是会写CSS代码的 所以理所应当要安装css-loader 的 这个在Vueloader的官方文件中也提示了。

```shell
npm install css-loader
```

