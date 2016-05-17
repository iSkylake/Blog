var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    app = express();

//All routes (GET, POST, PUT and DELETE) for /blog
var blogRoutes = require("./routes/blog");

mongoose.connect("mongodb://localhost/blog"); //Connects to local mongodb
app.set("view engine", "ejs"); //Looks for ejs files
app.use(express.static("public")); //Static files
app.use(bodyParser.urlencoded({extended:true})); //Takes content from body
app.use(expressSanitizer()); //Must be after bodyParse
app.use(methodOverride("_method")); //Need for PUT and DELETE routes

app.use("/blog", blogRoutes);

app.get("/", function(req, res){
    res.redirect("/blog");
});

//PORT enviroment for deploy and 3000 for local use
app.listen(process.env.PORT || 3000, function(){
    console.log("Server Started");
});