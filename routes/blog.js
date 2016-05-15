var express = require('express'),
    router = express.Router(),
    Blog = require('../models/blog');

router.get("/", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else{
            res.render("index", {blogs:blogs});
        }
    });
})

router.get("/new", function(req, res){
    res.render("new");
});

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

router.get("/:id", function(req, res){
    Blog.findById(req.params.id, function(err, blogId){
        if(err){
            res.redirect("/blog");
        } else{
            res.render("show", {blog: blogId});
        }
    });
});

router.get("/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, blogId){
        if(err){
            res.redirect("/blog/:id");
        } else{
            res.render("edit", {blog: blogId});
        }
    });
});

router.put("/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, editedBlog){
       if(err){
           res.redirect("/blog");
       } else{
           res.redirect("/blog/" + req.params.id);
       }
    });
});

router.delete("/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, removedBlog){
        if(err){
            res.redirect("/blog/:id");
        } else{
            res.redirect("/blog");
        }
    });
});

module.exports = router;