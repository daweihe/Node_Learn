web服务器一般指网站服务器，是驻留在因特网上某种类型计算机的程序，可以向浏览器等web客户端提供文档，也可以放置网站文件，让全世界浏览；可以放置数据文件，让全世界下载。目前主流的Web服务器是`Apache`、`Nginx`、`IIS`。


下面使用Node.js实现类似功能的web服务器：

实现步骤：
- 1、获取客户端发来的url
- 2、根据url中的`pathname`的后缀名获取对应的文件类型
- 3、取读文件

```
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var mime = require('./model/getmime.js');

var server = http.createServer(function (req, res) {

    var pathname = url.parse(req.url).pathname;    //过滤url中的get传值

    if (pathname == '/') {
        pathname = '/index.html'    //默认访问首页
    }

    if (pathname != '/favicon.ico') {   //过滤无效请求

        var extrname = path.extname(pathname);   //获取文件后缀名

        var type = mime.getMime(fs, extrname);       //获取对应的文件类型

        fs.readFile('static/' + pathname, function (err, data) {     //读取文件
            if (err) {
                res.write("访问出错！");
                fs.readFile('static/404.html', function (err404, data404) {
                    res.writeHead(404, {"Content-Type": type + ";charset='utf-8'"});
                    res.write(data404);
                    res.end();
                })
            } else {
                res.writeHead(200, {"Content-Type": type + ";charset='utf-8'"});
                res.write(data);
                res.end();
            }
        })
    }

});

server.listen("8082");

console.log("server is servering in http://localhost:8082/");
```

```
//getmime.js
exports.getMime=function(fs, extrname){  /*获取后缀名对应的方法*/
    var data = fs.readFileSync('./mime.json');

    var Mimes = JSON.parse(data.toString());

    return Mimes[extrname] || 'text/html';
}
```
