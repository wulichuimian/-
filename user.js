const Router = require('@koa/router');
const router = new Router();
const jwtAuth = require('koa-jwt');
const { getDate, db } = require('./function/index');
const fs = require('fs');
router.prefix('/user');
const secret = require('./secret/secret.json');
router.get('/list', async ctx => {
    let sql = `select * from user`
    let a = await db([], sql, '查询成功');
    if (a.code != 1) {
        a.code = 1;
        ctx.body = a;
        return
    }
    let data = a.data;
    let { limit, page } = ctx.query;
    let data1 = data.slice(limit * (page - 1), data.length - limit * (page) > 0 ? limit * (page) : data.length);
    if (data1.length == 0) {
        data1 = data.slice(limit * (page - 2), data.length - limit * (page - 1) > 0 ? limit * (page - 1) : data.length);
    }
    ctx.body = {
        code: 0,
        data: data1,
        count: data.length,
    }
})
router.get('/delete', jwtAuth({ secret }), async ctx => {
    let { name } = ctx.query;
    if (!name) {
        ctx.body = {
            code: 0,
            msg: '请输入管理员名字'
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
    let sql = `delete from user where name=?`
    let a = await db([name], sql, '删除成功');
    if(a.code == 3){
        a.msg = '管理员不存在'
    }
    ctx.body = a;
})

module.exports = router