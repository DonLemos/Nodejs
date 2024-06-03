"use strict";

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) {
                reject(err); // Reject the promise if there's an error
            } else {
                resolve(); // Resolve the promise if session is destroyed successfully
            }
        });
    })
    .then(() => {
        res.redirect('/'); // Redirect to home page after session destruction
    })
    .catch((err) => {
        // Handle errors, if any
        console.error("Error destroying session:", err);
        res.status(500).send("Internal Server Error");
    });
};
