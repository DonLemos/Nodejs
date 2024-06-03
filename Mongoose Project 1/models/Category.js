const mongoose = require("mongoose");

const createCategory = function(category) {
    return db.Category.create(category).then(docCategory => {
      console.log("\n>> Created Category:\n", docCategory);
      return docCategory;
    });
  };
  
  const addTutorialToCategory = function(tutorialId, categoryId) {
    return db.Tutorial.findByIdAndUpdate(
      tutorialId,
      { category: categoryId },
      { new: true, useFindAndModify: false }
    );
  };

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: String,
    description: String
  })
);

module.exports = Category;