const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'manage',
    port: 3306
})
connection.connect();
function db(data, sql, successful) {
    return new Promise((resolve, reject) => {
        connection.query(sql, data, (err, res) => {
            if (err) {
                resolve({
                    code: 2,
                    msg: err.message
                })
            } else {
                console.log(res);
                if(res.affectedRows == 0){
                    resolve({
                        code: 3,
                        msg: '操作失败',
                        data: res
                    })
                }else{
                    resolve({
                        code: 1,
                        msg: successful,
                        data: res
                    })
                }
                
            }
        })
    })
}
function getDate() {
    var dt = new Date(),
        y = dt.getFullYear(),
        M = completeZero(dt.getMonth() + 1),
        d = completeZero(dt.getDate()),
        h = completeZero(dt.getHours()),
        m = completeZero(dt.getMinutes()),
        s = completeZero(dt.getSeconds());
    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
    function completeZero(time) {
        return time < 10 ? '0' + time : time;
    }
}
module.exports = { getDate,db }
