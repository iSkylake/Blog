var express = require('express'),
    router = express.Router(),
    Blog = require('../models/blog');

//Get route for index, renders the index page and show every post
router.get("/", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else{
            res.render("index", {blogs:blogs}); //Pass the blogs object from the blog schema
        }
    });
})

//Get route for new, renders the new page to create a post
router.get("/new", function(req, res){
    res.render("new");
});

//Post route to create the post after submiting
router.post("/", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newPost){
        if(err){
            res.redirect("new");
        } else{
            res.redirect("blog");
        }
    });
});

//Get route to show a post individually with full information
router.get("/:id", function(req, res){
    Blog.findById(req.params.id, function(err, blogId){
        if(err){
            res.redirect("/blog");
        } else{
            res.render("show", {blog: blogId});
        }
    });
});

//Get route for edit, shows the edit page of a post
router.get("/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, blogId){
        if(err){
            res.redirect("/blog/:id");
        } else{
            res.render("edit", {blog: blogId});
        }
    });
});

//Put route for edit, updates the post after submiting
router.put("/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, editedBlog){ //Look for the post using the id and update the post
       if(err){
           res.redirect("/blog");
       } else{
           res.redirect("/blog/" + req.params.id);
       }
    });
});

//Delete route, deletes the post after pressing the 'delete button'
router.delete("/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, removedBlog){ //Looks for the post using the id and removes it
        if(err){
            res.redirect("/blog/:id");
        } else{
            res.redirect("/blog");
        }
    });
});

module.exports = router;