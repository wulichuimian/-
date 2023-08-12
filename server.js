const Koa = require('koa');
const app = new Koa();
const Router = require('@koa/router');
const router = new Router();
const jwt = require('jsonwebtoken');
const jwtAuth = require('koa-jwt');
const koaBody = require('koa-body');
const static = require('koa-static');
const cors = require('koa2-cors');
const fs = require('fs');
const { getDate, db } = require('./function/index.js')
const borrowBooks = require('./borrowBooks.js')
const user = require('./user.js')
app.use(cors());
app.use(koaBody({
    multipart: true
}));
app.use(static(__dirname + '/public'));
const secret = require('./secret/secret.json');
router.post('/login', async ctx => {
    let { name, passwd } = ctx.request.body;
    if (!name && !passwd) {
        ctx.body = {
            code: 0,
            msg: '请输入完整的信息'
        }
        return
    }
    let sql = `select * from user where name=? and passwd=?`;
    let a = await db([name, passwd], sql, '登录成功');
    if (a.code == 1 && a.data.length > 0) {
        let token = jwt.sign({
            data: { name, passwd },
            exp: Math.floor(new Date() / 1000) + 60 * 60
        }, secret)
        a.token = token;
    } else {
        a.code = 0;
        a.msg = '账户或密码错误'
    }
    ctx.body = a;
})
router.post('/signin', /* jwtAuth({ secret }), */ async ctx => {
    let { name, passwd } = ctx.request.body;
    if (!name && !passwd) {
        ctx.body = {
            code: 0,
            msg: '请输入完整的信息'
        }
        return
    }
    /* if (ctx.state.user.data.name !== 'admin') {
        ctx.body = {
            code: 0,
            msg: '该用户没有权限注册用户',
        }
        return
    } */
    let sql = `select * from user where name=?`
    let a = await db([name], sql, '查找数据成功');
    if (a.code == 1 && a.data.length > 0) {
        a.code = 0;
        a.msg = '账户已存在'
    } else if (a.code == 1 && a.data.length == 0) {
        let date = getDate();
        let sql = `insert into user (Id,name,passwd,creatTime,updataTime) values(null,?,?,?,?)`
        a = await db([name, passwd, date, ''], sql, '添加成功');
    }
    ctx.body = a;
})
app.use(borrowBooks.routes());
app.use(user.routes());
app.use(router.routes());
app.listen(3000);