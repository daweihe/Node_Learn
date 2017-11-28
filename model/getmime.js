/**
 * Created by Administrator on 2017/7/2 0002.
 */
exports.getMime=function(fs, extrname){  /*获取后缀名对应的方法*/
    var data = fs.readFileSync('./mime.json');

    var Mimes = JSON.parse(data.toString());

    return Mimes[extrname] || 'text/html';

}