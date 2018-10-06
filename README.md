# egg-alinode-async

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-alinode-async.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-alinode-async
[download-image]: https://img.shields.io/npm/dm/egg-alinode-async.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-alinode-async

> fork自egg-alinode，文档请看[README](https://github.com/eggjs/egg-alinode/blob/master/README.md)

主要是针对开启alinode之前需要从服务器或者数据库等远端获取`appid`和`secret`，可以“异步”启动alinode

## Install

``` bash
$ npm i egg-alinode-async
```

## Usage

使用方法和`egg-alinode`一模一样，除了初始配置和启动方式不同

1. 开启插件

``` js
// config/plugin.js
exports.alinode = {
  enable: true,
  package: 'egg-alinode-async'
}
```

2. 设置配置项

这一步可省略，无需配置`appid`和`secret`，因为我们是异步获取这俩的

3. 通知agent启动alinode

``` js
// app.js 在获取配置后
app.messenger.sendToAgent('alinode', {
  appid: 'remote appid',
  secret: 'remote secret'
})
```
