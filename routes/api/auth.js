const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcryptjs = require('bcryptjs');

// @route GET api/auth
// @desc Test Users Route
// @access public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        return res.json(user);
    } catch (err) {
        return res.status(500).send({ errors: [{ msg: 'Server Error'}] });
    }
});


// @route   GET api/auth
// @desc    Authenticate User and Get token
// @access  public
router.post('/', [
        check('email', 'Email is required').isEmail(),
        check('password', 'Please is required').exists()
    ], async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }

        let { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid email or password.' }] })
            }

            const isPasswordMatched = await bcryptjs.compare(password, user.password);
            if (!isPasswordMatched) {
                return res.status(400).json({ errors: [{ msg: 'Invalid email or password.' }] })
            }
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, config.get('jwtSecretToken'), {expiresIn: 360000 }, (err, token) => {
                if (err) {throw err;}
                res.json({ token, user: { name: user.name, email: user.email, avatar: user.avatar, date: user.date, id: user._id } });
            });
        
        } catch (error) {
            return res.status(500).send({ errors: [{ msg: 'Server Error'}] });
        }
    }
);


module.exports = router;
