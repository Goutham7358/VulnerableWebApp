
const User = require('../models/user');
const Post = require('../models/post');

const getPostsList = async (posts)=>{
    return Promise.all(
        posts.map(async (post)=>{
            const user = await post.getUser();
             
            return `[<i>${user.UserName}</i>] : ${post.Message}`;
        })
    )
}


exports.getXss = async (req,res,next)=>{
    const posts = await Post.findAll();
    console.log(posts);
    const postsList = await getPostsList(posts);
    console.log(postsList);
    const user = req.user;
    //console.log(document.cookie);
    console.log("***********************************");
    res.render('xss',{
        posts: postsList,
        userName: user.UserName
    });
}

exports.postXss = async (req,res,next)=>{
    const userMessage = req.body.userMessage;
    const user = req.user;

    await user.createPost({Message: userMessage});

    res.redirect('/xss');
}

exports.getReflectedXss = async (req,res,next)=>{
    const user = req.user;
    const query = req.query.q;
    let message = 'No such user found!!';
    console.log(query);
    if(query){
        const queriedUser=   await User.findOne({where:{ UserName: query}});
     if(queriedUser!=null)
     {
        message = `<i>${queriedUser.UserName}</i> : ${queriedUser.Qualification}`
     }
     console.log(message);
     console.log("||||||||||||||||||||||||||||||||||||||");
    }
     
    
    res.render('search',{
        userName: user.UserName,
        query: query,
        message: message
    })
}

exports.postReflectedXss = async (req,res,next)=>{
    const query = req.body.query;
    console.log(`/reflectedXss?q=${query}`);
    console.log("***********************************");
    res.redirect(`/reflectedXss?q=${query}`);
}