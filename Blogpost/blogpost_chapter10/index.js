"use strict";

const express = require("express");
// const path = require("path");
const app = new express();
const ejs = require("ejs");
const mongoose = require("mongoose");
// const BlogPost = require('./models/BlogPost.js')
const fileUpload = require('express-fileupload')
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });


const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const validationMiddleware = require("./middleware/validationMiddleware");
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload())
//app.use(customMiddleWare)
app.use('/posts/store',validationMiddleware)



app.get('/',homeController)
app.get('/post/:id',getPostController)
app.post('/posts/store', storePostController)
app.post('/users/register', storeUserController)
app.get('/posts/new',newPostController)
app.get('/auth/register', newUserController)
app.get('/auth/login', loginController);
app.post('/users/login',loginUserController)

app.listen(4000, () => {
    console.log("App listening on port 4000")
});


