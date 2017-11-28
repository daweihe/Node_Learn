web������һ��ָ��վ����������פ������������ĳ�����ͼ�����ĳ��򣬿������������web�ͻ����ṩ�ĵ���Ҳ���Է�����վ�ļ�����ȫ������������Է��������ļ�����ȫ�������ء�Ŀǰ������Web��������`Apache`��`Nginx`��`IIS`��


����ʹ��Node.jsʵ�����ƹ��ܵ�web��������

ʵ�ֲ��裺
- 1����ȡ�ͻ��˷�����url
- 2������url�е�`pathname`�ĺ�׺����ȡ��Ӧ���ļ�����
- 3��ȡ���ļ�

```
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var mime = require('./model/getmime.js');

var server = http.createServer(function (req, res) {

    var pathname = url.parse(req.url).pathname;    //����url�е�get��ֵ

    if (pathname == '/') {
        pathname = '/index.html'    //Ĭ�Ϸ�����ҳ
    }

    if (pathname != '/favicon.ico') {   //������Ч����

        var extrname = path.extname(pathname);   //��ȡ�ļ���׺��

        var type = mime.getMime(fs, extrname);       //��ȡ��Ӧ���ļ�����

        fs.readFile('static/' + pathname, function (err, data) {     //��ȡ�ļ�
            if (err) {
                res.write("���ʳ���");
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
exports.getMime=function(fs, extrname){  /*��ȡ��׺����Ӧ�ķ���*/
    var data = fs.readFileSync('./mime.json');

    var Mimes = JSON.parse(data.toString());

    return Mimes[extrname] || 'text/html';
}
```
