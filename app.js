var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    app = express();
    
mongoose.connect("mongodb://localhost/blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer()); //Must be after bodyParse
app.use(methodOverride("_method"));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now()}
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res){
    res.redirect("/blog");
});

app.get("/blog", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else{
            res.render("index", {blogs:blogs});
        }
    });
})

app.get("/blog/new", function(req, res){
    res.render("new");
});

app.post("/blog", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newPost){
        if(err){
            res.redirect("new");
        } else{
            res.redirect("blog");
        }
    });
});

app.get("/blog/:id", function(req, res){
    Blog.findById(req.params.id, function(err, blogId){
        if(err){
            res.redirect("/blog");
        } else{
            res.render("show", {blog: blogId});
        }
    });
});

app.get("/blog/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, blogId){
        if(err){
            res.redirect("/blog/:id");
        } else{
            res.render("edit", {blog: blogId});
        }
    });
});

app.put("/blog/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, editedBlog){
       if(err){
           res.redirect("/blog");
       } else{
           res.redirect("/blog/" + req.params.id);
       }
    });
});

app.delete("/blog/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, removedBlog){
        if(err){
            res.redirect("/blog/:id");
        } else{
            res.redirect("/blog");
        }
    });
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server Started");
});