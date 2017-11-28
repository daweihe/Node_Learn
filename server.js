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