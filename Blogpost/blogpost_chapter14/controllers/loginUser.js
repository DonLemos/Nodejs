const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (user) {
            const same = await bcrypt.compare(password, user.password);

            if (same) {
                req.session.userId = user._id
                res.redirect('/');
            } else {
                res.redirect('/auth/login');
            }
        } else {
            res.redirect('/auth/login');
        }
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).send('An error occurred while processing the request');
    }
};