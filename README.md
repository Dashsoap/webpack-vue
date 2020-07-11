# 一看就会! 如何从O用webpack 打包一个vue项目 

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性

## Topic One： webpack 的构建流程主要环节

### 1.首先我们要先定义入口文件和出口文件

``` javascript
//不管是dev/prod/common 我们都需要定义入口和出口文件
entry: './src/main.js',// 这是我的入口文件
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
```

### 2.然后我们需要安装各种各样的loader来处理文件

先分析，我们这是一个`Vue`项目 所以理所应当的需要一个vue-loader

```shell
npm install vue-loader
```

![安装截图](https://raw.githubusercontent.com/Dashsoap/PhoneBed/master/uPic/H0Ka2Y.png)

然后因为我们的Vue的文件里面是会写CSS代码的 所以理所应当要安装css-loader 的 这个在Vueloader的官方文件中也提示了。

```shell
npm install css-loader
```

然后相应的 在webpack配置文件中配置这几个

```javascript
        {
            test: /\.css$/,
            use:["style-loader", 'css-loader']
        },
        {
            test: /\.less$/,
            use: ["style-loader", 'css-loader', 'less-loader']

        }
```

### 3.安装url-loader

因为我们的Vue项目是有一个PNG的图片的 所以我们需要url-loader 来处理静态文件

```shell
npm i url-loader -D

webpack --config ./webpack.prod/jd
```

安装完我们先试着配置一下

```javascript
{
            test: /\.(jpg|png)$/,
            loader: 'url-loader',
            options: {
                name: '[name].[ext]',
                esModule: false,
                limit: 5 * 1024//当图片大于5kb 将以url的形式导入
            }
```

然后build 一下发现报错了
![错误信息](https://raw.githubusercontent.com/Dashsoap/PhoneBed/master/uPic/o4f5Vf.png)
`Cannot find module 'file-loader'` 这是什么意思？

上面的注释我们提到过 urlloader 在图片大于5kb 的时候会以url的形式打包，那么大于5kb呢？

这时候我们就需要我们的file-loader  所以我们需要安装一个file-loader 即使我们没有配置它，但是url-loader 需要他。

## loader 和 plugin 的区别

最后我们打包出来的文件只有js文件，而忽视了我们最重要的，index.html文件，这个时候我们就需要 `html-webpack-plugin` 来帮我进行模板的搬运和打包

这时候就有同学就问了，诶！同学！刚刚我们用的都是loader  怎么这个叫plugin啊？

他们有啥区别咧？

### plugin 

其实我们这个里面不只是用了html-webpack-plugin 这一个 plugin 我们在导入vue的loader 的时候 其实同时还使用了`VueLoaderPlugin` 

#### 配置plugin

1.plugin是和module平级的 在安装之后先在webpac.config 文件中导入 

```javascript
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
```

2.然后我们需要new一个对象，对这个plugin进行配置，总体思路和loader 差不多

```javascript
plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            title:"Zjt's App"
        }),
        new webpack.DefinePlugin({
            BASE_URL:"'/'"
        })


```

template和title都是我们在index.html 文件里面定义的模板变量

### 差异在哪？

对于loader，它是一个转换器，将A文件进行编译形成B文件，这里操作的是文件，比如将A.scss转换为A.css，单纯的文件转换过程

plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务


## 最后附上完整的webpack.config.js地址

完整代码 [地址](https://github.com/Dashsoap/webpack-vue/blob/master/webpack.dev.js)
