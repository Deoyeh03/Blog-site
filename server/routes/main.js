const express = require('express');
const routes = express.Router();
const Post = require('../models/posts')

routes.get('/',async (req,res) => {
    

    try {
            const locals = {
            title: "NodeJs Blog",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ {$sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();


        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        });

    } catch (error) {
        console.log("Error fetching post: ",error);
    }


});



// GET
// Post :id

routes.get('/post/:id',async (req,res) => {
    try {
        let slug = req.params.id;
        const data = await Post.findById({_id: slug});


        const locals = {
                title: data.title,
                description: "Simple Blog created with NodeJs, Express & MongoDb.",
                currentRoute: `/post/${slug}`
             }



             
        res.render('post', {locals, data});
    } catch (error) {
        console.log("This na the Headache:",error);
    }
    
    });


    
// Post 
// Post :id

    routes.post('/search', async (req,res) => {
        try {
            const locals = {
                title:"Search",
                description: "Simple Blog created with N"
            }

            let searchTerm = req.body.searchTerm;
            const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

            const data = await Post.find({
                $or: [
                    {title: {$regex: new RegExp(searchNoSpecialChar, 'i') }},
                    {body: {$regex: new RegExp(searchNoSpecialChar, 'i') }},
                ]
            });

            res.render("searchTerm",{
                data,
                locals,
                currentRoute: '/search',
            });      
        } catch (error) {
            console.log("This na the Headache:",error);  
        }
    });






    // routes.get('', async (req,res) => {
    //     const locals = {
    //         title:"NodeJs Blog",
    //         description: "Simple Blog created with N"
    //     }
    //     try {
    //         const data = await Post.find();
    //         res.render('index', {locals, data});
            
    //     } catch (error) {
    //         console.log("This na the Headache:",error);
            
    //     }
    // });














routes.get('/about', (req,res) => {
    res.render('about', {
        currentRoute: '/about',
    });
});



module.exports = routes;
