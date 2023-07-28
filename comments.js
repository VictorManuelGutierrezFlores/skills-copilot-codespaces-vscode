// Create web server application with Node.js

// Import modules

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const { ensureAuthenticated } = require('../config/auth');


// Create comment


router.post('/create/:id', ensureAuthenticated, [
    check('content', 'Content is required').not().isEmpty()
], (req, res) => {   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error_msg', errors.array()[0].msg);
        res.redirect('back');
    } else {
        const postId = req.params.id;
        const userId = req.user._id;
        const content = req.body.content;
        const comment = new Comment({
            postId: postId,
            userId: userId,
            content: content
        });
        comment.save()
            .then(comment => {
                req.flash('success_msg', 'Comment created successfully');
                res.redirect('back');
            })
            .catch(err => {
                req.flash('error_msg', 'Error creating comment');
                res.redirect('back');
            });
    }
})
