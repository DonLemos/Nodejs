"use strict";

const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController");
app.set("port", process.env.PORT || 3000);

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});



app.get("/items/:vegetable", homeController.sendReqParam)
  .get("/name", homeController.respondWithName)

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});