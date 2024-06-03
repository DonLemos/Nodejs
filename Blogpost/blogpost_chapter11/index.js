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
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware =
require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')



app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload())


app.use('/posts/store',validationMiddleware)
app.use(expressSession({
    secret: 'keyboard cat'
    }))

    global.loggedIn = null;
app.use("*", (req, res, next) => {
loggedIn = req.session.userId;
next()
});



app.get('/',homeController)
app.get('/post/:id',getPostController)
app.post('/posts/store', authMiddleware, storePostController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/posts/new', authMiddleware, newPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)

app.use((req, res) => res.render('notfound'))

app.listen(4000, () => {
    console.log("App listening on port 4000")
});


