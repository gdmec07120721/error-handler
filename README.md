## Error-handler

一个异常捕获上报的处理器。

### 安装
---

```
> npm install error-handler
```

### 使用
---

在main.js文件或者主入口文件创建构建函数 `new ErrorHandler(options, Vue)`，并传入参数，参数类型为对象。

**参数：** 

  `options` 对象（必传）。

    属性 `baseUrl` 指定上报请求的 url ，为必传属性。
    属性 `params` 是上报请求的参数，为必传属性。

  `Vue` 对象，表示是否使用了Vue框架。如果是，需要把主入口文件中引入的 `Vue` 传入。

**示例：**

```js
new ErrorHandler({
  baseUrl: 'http://47.106.184.118:8888/market/json',
  params: {}
}, Vue);
```

**另外：** 

异常信息上报的固定属性如下：

`error`：异常的指定文件信息等

`msg`：异常信息

`date`：触发事件的时间


