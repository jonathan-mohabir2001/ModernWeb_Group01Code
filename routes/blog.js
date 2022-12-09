var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Message = require('../schemas/message');
const User = require('../schemas/users');
const { check, validationResult } = require('express-validator');
const message = require('../schemas/message');

function ensureIsLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect("/signIn");
    }
    else {
        next();
    }
}

router.route('/')
    .get((req, res, next) => {
        Message.find({}, (error, message) => {
            if (error) {
                console.log(error);
                res.redirect('/');
            }
            else {
                if (req.user !== null) {
                    res.render('allBlogs', { blogs: message, user: req.user });
                }
                else {
                    res.render('allBlogs', { blogs: message });
                }
            }
        })

    })

router.route('/add')
    .get(ensureIsLoggedIn, (req, res, next) => {
        res.render('addBlog', { username: req.user.username });
    })
    .post(ensureIsLoggedIn, async (req, res, next) => {
        var blog = new Message();
        await check('title', "Title is required").notEmpty().run(req);
        await check('message', "Message is required").notEmpty().run(req);
        const errors = validationResult(req);
        blog.title = req.body.title;
        blog.message = req.body.message;
        blog.author = req.user.username;
        // blog.posted_by = req.user.id;
        if (errors.isEmpty()) {
            blog.save((error) => {
                if (error) {
                    console.log(error);
                    res.end("Error happened")
                }
                else {
                    res.redirect("/");
                }
            });
        }
        else {
            console.log('hellow world')
            res.render("addBlog", { "errors": errors.array() })
        }

    });

router.get("/delete/:id", (req, res, next) => {
    let id = req.params.id;
    Message.deleteOne({ _id: id }, (error) => {
        if (error) {
            console.log(error);
        }
    });
    res.redirect('/blog');
});

router.route('/edit/:id')
    .get((req, res, next) => {
        let id = req.params.id;
        Message.findById(id, (error, message) => {
            if (message.author != req.user.username) {
                res.redirect("/blog");
            }
            if (error) {
                res.end("You cannot edit this blog");
            }
            else {
                res.render('editBlog', { title: 'Edit a blog', blog: message, username: req.user.username });
            }
        });
    })
    .post((req, res, next) => {
        let id = req.params.id;
        let message = {};
        message.title = req.body.title;
        message.message = req.body.message;
        Message.findById(id, (error, foundBlog) => {
            if (foundBlog.author != req.user.username) {
                res.redirect("/");
            }
            // else {
            if (error) {
                console.log(error)
            }
            else {
                Message.updateOne({ _id: id }, message, (error) => {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        res.redirect("/blog");

                    }
                });
            }
            // }
        });
    });

module.exports = router;