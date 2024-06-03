"use strict";

module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
        if (req.session.userId) {
            res.redirect('/'); // if user logged in, redirect to home page
        } else {
            next();
        }
        resolve();
    })
        .catch(next); // Pass any errors to the next middleware
};
