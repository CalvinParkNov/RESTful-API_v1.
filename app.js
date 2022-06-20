//express basic step
const express = require("express");
const bodyParser = require("body-parser"); 
const request = require("request");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/wikiDB', {useNewUrlParser: true});

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);


app.get("/articles", (req,res)=>{
  Article.find({}, (error,foundArticle) => {
    if(!error){
      res.render("main", {article: foundArticle});
    }else {
      res.send(error);
    }
  })
})




app.listen(3000, ()=>{
  console.log("server is running on port 3000");
})