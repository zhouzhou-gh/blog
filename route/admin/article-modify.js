const { Article } = require('../../model/article');
//引入formidable第三方模块
const formidable = require('formidable');

const path = require('path');

module.exports = async(req, res) => {
    // //接收客户端传递过来的请求参数
    // const body = req.body;
    const id = req.query.id;
    // const title = req.query.title;
    // res.send(req.body);
    // return;

    //1.创建表单解析对象
    const form = new formidable.IncomingForm();
    //2.配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../../', 'public', 'uploads');
    //3.保留上传文件的后缀
    form.keepExtensions = true;
    //4.解析表单
    form.parse(req, async(err, fields, files) => {
            //1.err错误对象 如果表单解析失败 err里面存储错误信息 如果表单解析成功 err将会为空
            //2.fields 对象类型  保存普通表单数据
            //3.files 对象类型 保存了和上传文件相关的数据
            // res.send(files.cover.path.split('public')[1]);

            await Article.updateOne({ _id: id }, {
                title: fields.title,
                author: fields.author,
                publishDate: fields.publishDate,
                cover: files.cover.path.split('public')[1],
                content: fields.content,
            });

            res.redirect('/admin/article');

        })
        // let article = await Article.findOne({ _id: id });
        // // res.send(article.title);
        // // return;


    // // 密码比对成功
    // if (id) {
    //     // res.send('修改成功');
    //     //将用户信息更新到数据库中  第一个参数是查询条件 第二个参数就是一个对象   就是你要修改的用户信息
    //     await Article.updateOne({ _id: id }, {
    //         title: req.body.article.title,
    //         // publishDate: req.body.publishDate,
    //         publishDate: req.body.article.publishDate,
    //         content: req.body.article.content
    //     });

    //     //将页面重定向到用户列表页面  
    //     res.redirect('/admin/article');

    // } else {

    //     res.send('修改失败');

    // }
}