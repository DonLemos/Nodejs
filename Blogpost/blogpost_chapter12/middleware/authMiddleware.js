const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.redirect('/');
        }

        next();
    } catch (error) {
        console.error('Error finding user by ID:', error);
        res.status(500).send('An error occurred while processing the request');
    }
};

