"use strict";

const express = require("express");
const path = require("path");
const app = new express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const BlogPost = require('./models/BlogPost.js')
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//     res.render("index");
// });

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
    console.log('Received form data:', req.body);
    // Create a new BlogPost document with data from the form
    BlogPost.create(req.body)
        .then(blogpost => {
            console.log('New blog post created successfully:', blogpost);
            res.redirect('/');
        })
        .catch(error => {
            console.error('Error creating blog post:', error);
            res.status(500).send('Error creating blog post');
        });
});


app.listen(4000, () => {
    console.log("App listening on port 4000")
});


