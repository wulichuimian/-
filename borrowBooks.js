const Router = require('@koa/router');
const router = new Router();
const jwtAuth = require('koa-jwt');
const { getDate, db } = require('./function/index');
const fs = require('fs');
router.prefix('/books');
router.get('/list', async ctx => {
    let sql = `select * from books`
    let a = await db([], sql, '查找成功');
    if (a.code != 1) {
        a.code = 1;
        ctx.body = a;
    }
    const data = a.data;
    let { limit, page } = ctx.query;
    let data1 = data.slice(limit * (page - 1), data.length - limit * (page) > 0 ? limit * (page) : data.length);
    let flag = true;
    if (data1.length == 0) {
        flag = false
        data1 = data.slice(limit * (page - 2), data.length - limit * (page - 1) > 0 ? limit * (page - 1) : data.length);
    }
    ctx.body = {
        code: 0,
        data: data1,
        count: data.length,
    }
})
router.get('/addBook', async ctx => {
    let { title, author } = ctx.query;
    if (!title || !author) {
        ctx.body = {
            code: 0,
            msg: '请输入完整的信息'
        }
        return
    }
    let sql = `select * from books where title=? and author=?`;
    let a = await db([title, author], sql, '查找成功');
    if (a.code == 1 && a.data.length > 0) {
        a.code = 0;
        a.msg = '不能添加同样的书籍'
    }
    if (a.code == 1 && a.data.length == 0) {
        let sql = `insert into books (Id,title,author,isBorrow,borrowName,borrowTime) values (null,?,?,?,?,?)`;
        a = await db([title, author, 'false', '', ''], sql, '添加成功');
    } else {
        a.code = 1;
    }
    console.log(a);
    ctx.body = a
})
router.get('/delete', async ctx => {
    let { id } = ctx.query;
    if (!id) {
        ctx.body = {
            code: 0,
            msg: '请输入Id',
        }
        return
    }
    let sql = `delete from books where Id=?`;
    let a = await db([id], sql, '删除成功');
    if (a.code == 3) {
        a.msg = '该管理员不存在'
    }
    ctx.body = a
})
router.get('/borrow', async ctx => {
    let { borrowName, id } = ctx.query;
    if (!borrowName && !id) {
        ctx.body = {
            code: 0,
            msg: '请输入完整信息'
        }
        return
    }
    let sql = `select * from books where Id=?`;
    let a = await db([id], sql, '查询成功');
    if (a.code == 1 && a.data.length == 0) {
        ctx.body = {
            code: 0,
            msg: '书籍不存在'
        }
        return
    }
    if (a.code == 1 && a.data.length > 0) {
        if (a.data[0].isBorrow == 'true') {
            ctx.body = {
                code: 0,
                msg: '这本书被借走了'
            }
            return
        } else {
            let borrowTime = getDate();
            let sql = `update books set isBorrow=?,borrowName=?,borrowTime=? where id=?`;
            a = await db(['true', borrowName, borrowTime, id], sql, '借书成功');
        }
    }
    ctx.body = a
})
router.get('/return', async ctx => {
    let { id } = ctx.query;
    if (!id) {
        ctx.body = {
            code: 0,
            msg: '请输入Id'
        }
        return
    }
    let sql = `select * from books where Id=?`;
    let a = await db([id], sql, '查询成功');
    if (a.code == 1 && a.data.length == 0) {
        ctx.body = {
            code: 0,
            msg: '书籍不存在'
        }
        return
    }
    if (a.code == 1 && a.data.length > 0) {
        if (a.data[0].isBorrow == 'false') {
            ctx.body = {
                code: 0,
                msg: '这本书没有借出去'
            }
            return
        } else {
            let sql = `update books set isBorrow=?,borrowName=?,borrowTime=? where id=?`;
            a = await db(['false', '', '', id], sql, '还书成功');
        }
    }
    ctx.body = a

})
module.exports = router