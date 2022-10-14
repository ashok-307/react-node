const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get Current User Profile
// @access  public
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar', 'email']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user. '});
        }

        return res.json(profile);
    } catch (err) {
        return res.status(500).send('Server Error');
    }
});

// @route   POST api/profile
// @desc    Create or Update profile
// @access  public
router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        instagram,
        linkedin,
        twitter
    } = req.body;

    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) { profileFields.company = company; }
    if (website) { profileFields.website = website; }
    if (location) { profileFields.location = location; }
    if (bio) { profileFields.bio = bio; }
    if (status) { profileFields.status = status; }
    if (githubusername) { profileFields.githubusername = githubusername; }
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build Social Object
    profileFields.social = {};
    if(youtube) { profileFields.social.youtube = youtube; }
    if(facebook) { profileFields.social.facebook = facebook; }
    if(instagram) { profileFields.social.instagram = instagram; }
    if(linkedin) { profileFields.social.linkedin = linkedin; }
    if(twitter) { profileFields.social.twitter = twitter; }
    
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }

        // Create
        profile = new Profile(profileFields);

        await profile.save();

        return res.json(profile);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server Error');
    }
});

// @route   GET api/profile
// @desc    Get all profiles
// @access  public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        return res.json(profiles);
    } catch (err) {
        console.log(err.message)
        return res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/user/user_id
// @desc    Get profile by user ID
// @access  public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        return res.json(profile);
    } catch (err) {
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        console.log(err.message)
        return res.status(500).send('Server Error');
    }
});


// @route   DELETE api/profile
// @desc    Delete Profile, User and Posts
// @access  public
router.delete('/', auth, async (req, res) => {
    try {
        // @todo - remove user posts

        // Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id });

        await User.findOneAndRemove({ _id: req.user.id });

        return res.json({ msg: 'User removed successfully' });
    } catch (err) {
        console.log(err.message)
        return res.status(500).send('Server Error');
    }
});


// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  private
router.put('/experience', [auth, [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From Date is required').not().isEmpty()
    ]], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };
        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.experience.unshift(newExp);

            await profile.save();

            return res.json(profile);
        } catch (err) {
            console.log(err.message);
            return res.status(500).send('Server Error');
        }
    }
);

// @route   DELETE api/profile/experience/experience_id
// @desc    Remove experience from Profile
// @access  private

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removedIndex = profile.experience.findIndex(experienceEle => experienceEle._id === req.params.exp_id );
        profile.experience.splice(removedIndex, 1);
        await profile.save();

        return res.json(profile);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server Error');
    }
});


// @route   PUT api/profile/education
// @desc    Add profile education
// @access  private
router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEducation = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEducation);

        await profile.save();

        return res.json(profile);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server Error');
    }
}
);

// @route   DELETE api/profile/education/edu_id
// @desc    Remove education from Profile
// @access  private

router.delete('/education/:edu_id', auth, async (req, res) => {
try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removedIndex = profile.education.findIndex(educationEle => educationEle._id === req.params.edu_id );
    profile.education.splice(removedIndex, 1);
    await profile.save();

    return res.json(profile);
} catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
}
});

// @route   GET api/profile/github/:username
// @desc    Get User Repos
// @access  Public

router.get('/github/:username', auth, async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:ascclient_id=${config.get('githubClientID')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        };

        request(options, (error, response, body) => {
            if (error) {console.log(error);}

            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No Github profile found' });
            }

            return res.json(JSON.parse(body));
        })
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server Error');
    }
})


module.exports = router;
