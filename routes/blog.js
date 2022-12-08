var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Blog = require('../schemas/blog');
const User = require('../schemas/user');
const { check, validationResult } = require('express-validator');

function ensureIsLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect("/signIn");
    }
    else {
        next();
    }
}

router.route('/add')
    .get(ensureIsLoggedIn, (req, res, next) =>{
        res.render('addBlog', {username: req.user.username});
    })
    .post(ensureIsLoggedIn, async (req, res, next) => {
        var blog = new Blog();
        await check('title', "Title is required").notEmpty().run(req);
        await check('message', "Message is required").notEmpty().run(req);
        const errors = validationResult(req);
        blog.title = req.body.title;
        blog.message = req.body.message;
        blog.posted_by = req.user.id;
        if (errors.isEmpty()) {
            blog.save((error) => {
                if (error) {
                    console.log(error);
                    res.end("Error happened")
                }
                else {
                    res.redirect("/blog/add");
                }
            });
        }
        else {
            res.render("addBlog", { "errors": errors.array() })
        }

    });

module.exports = router;