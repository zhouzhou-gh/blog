const { Article } = require('../../model/article');
module.exports = async(req, res) => {
    //标识  表示当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    //获取地址栏里的id参数
    const { id } = req.query;
    // res.send(id);
    // return;

    //如果当前传递了id参数
    if (id) {
        //
        let article = await Article.findOne({ _id: id });
        // res.send(article);
        // return;




        //渲染用户编辑页面(修改)
        res.render('admin/article-edit', {
            article: article,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        });
    } else {
        //添加操作
        res.render('admin/article-edit', {
            link: '/admin/article-add',
            button: '添加'
        });
    }
    // res.render('admin/article-edit.art');
}