var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    app = express();

var blogRoutes = require("./routes/blog");

mongoose.connect("mongodb://localhost/blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer()); //Must be after bodyParse
app.use(methodOverride("_method"));

app.use("/blog", blogRoutes);

app.get("/", function(req, res){
    res.redirect("/blog");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server Started");
});