const localStrategy = require("passport-local").Strategy;
const User = require("../schemas/users");
const bcryptjs = require('bcryptjs');
const passport = require('passport');

module.exports = (passport) => {
    passport.use(new localStrategy({ usernameField: "username" }, (username, password, done) => {
        User.findOne({ username: username }, (error, user) => {
            if (user != null) {
                bcryptjs.compare(password, user.password, (error, success) => {
                    if (error) {
                        console.log(JSON.stringify(error))

                    }
                    else {
                        if (success) {
                            done(null, user);
                        }
                        else {
                            console.log("Wrong Password")
                            done(null, false, { message: "Password is Wrong" });
                        }
                    }
                })
            }
            else{
                done(null, false, { message: "User Not Found" });
            }
        })
    }))
}

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
        if (error) {
            console.log("Had problem finding the user by Id:" + id)
        }
        else {
            done(null, user)
        }
    })
})