const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');


// @route   POST api/posts
// @desc    Create a post
// @access  private
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
    ]], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const newPost = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            };
            const post = new Post(newPost);
            await post.save();

            return res.json(post);
        } catch(err) {
            return res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/posts
// @desc    Get all post
// @access  private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        return res.json(posts);
    } catch (err) {
        return res.status(500).send('Server Error');
    }
});

// @route   GET api/posts/:post_id
// @desc    Get a post
// @access  private
router.get('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({ msg: 'Post with the given ID is found.' });
        }
        return res.json(post);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post with the given ID is found.' });
        }
        return res.status(500).send('Server Error');
    }
});

// @route   DELETE api/posts/:post_id
// @desc    Delete a post
// @access  private
router.delete('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(400).json({ msg: 'Post with the given ID is found. '})
        }

        if (post.user.toString() != req.user.id) {
            return res.status(401).json({ msg: 'User not authorized.' });
        }
        await post.remove();
        return res.json({msg : 'Post removed successfully '});
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post with the given ID is found.' });
        }
        return res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  private

router.put('/like/:id', auth, async(req, res) => {
    try {
        let post = await Post.findById(req.params.id);

        // Check if posted has been liked by this user
        if(
            post.like.filter(like => like.user.toString() === req.user.id).length > 0
        ){
            return res.status(400).json({msg: 'Post already liked.'});
        }
        post.like.unshift({ user: req.user.id });

        await post.save();

        return res.json(post.like);
    } catch (err){
        return res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/dislike/:id
// @desc    Dislike a post
// @access  private

router.put('/dislike/:id', auth, async(req, res) => {
    try {
        let post = await Post.findById(req.params.id);

        // Check if posted has been liked by this user
        if(
            post.like.filter(like => like.user.toString() === req.user.id).length === 0
        ){
            return res.status(400).json({msg: 'Post has not yet been liked.'});
        }
        
        // Get remove index
        const removeIndex = post.like.findIndex(like => like.user.toString() === req.user.id);
        post.like.splice(removeIndex, 1);

        await post.save();

        return res.json(post.like);
    } catch (err){
        return res.status(500).send('Server Error');
    }
});

// @route   POST api/posts/comment/:id
// @desc    Comment a post
// @access  private
router.post('/comment/:id', [auth, [
        check('text', 'Text is required').not().isEmpty()
    ]], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const post = await Post.findById(req.params.id);
            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            };

            post.comments.unshift(newComment);
            await post.save();

            return res.json(post.comments);
        } catch(err) {
            return res.status(500).send('Server Error');
        }
    }
);


// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete a Comment
// @access  private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        // Pull out comments
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }
        // Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized'});
        }
        // Remove Index
        const removeIndex = post.comments.findIndex(comment => comment.user.toString() === req.user.id);
        post.comments.splice(removeIndex, 1);
        
        await post.save();

        return res.json(post.comments);
    } catch(err) {
        return res.status(500).send('Server Error');
    }
}
);

module.exports = router;
