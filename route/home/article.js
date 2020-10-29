//导入文章集合构造函数
const { Article }=require('../../model/article');
//导入评论集合构造函数
const { Comment }=require('../../model/comment');

module.exports = async(req, res) => {
    //接收客户端传递过来的文章ID值
    const id =req.query.id;
    //根据id查询文章详细信息
    let article=await Article.findOne({_id:id}).populate('author');
    //查询当前文章所对应的评论信息
    let comments=await Comment.find({aid:id}).populate('uid');

    // res.send(article);
    var str=JSON.stringify(article);
    article=JSON.parse(str);
    var str1=JSON.stringify(comments);
    comments=JSON.parse(str1);
    res.render('home/article.art',{
        article,
        comments
    });
}