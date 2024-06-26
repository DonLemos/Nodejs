"use strict";

const express = require("express");
const path = require("path");
const app = new express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const BlogPost = require('./models/BlogPost.js')
const fileUpload = require('express-fileupload')
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });


const customMiddleWare = (req, res, next) => {
    console.log('Custom middle ware called')
    next()
}
const validateMiddleWare = (req, res, next) => {
    if (req.files == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
}

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload())
app.use(customMiddleWare)
app.use('/posts/store',validateMiddleWare)


app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    });
})

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})

app.get('/posts/new', (req, res) => {
    res.render('create')
});

app.post('/posts/store', (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        res.redirect('/')
    })
})


app.listen(4000, () => {
    console.log("App listening on port 4000")
});


