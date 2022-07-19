const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const db = require("../models");
const User = db.users;
require('dotenv').config();
const passport = require("passport");

module.exports = function(passport) {

    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:8080/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email', 'first_name', 'last_name']
        },
        async (accessToken, refreshToken, profile, done) => {
            await verify(profile, done, 'facebook');
        }));

    passport.use(new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/auth/github/callback"
        },
        async function (accessToken, refreshToken, profile, done) {
            await verify(profile, done, 'github');
        }
    ));

    const verify = async (profile, done, service) => {
        const newUser = new User({
            authServiceId: profile.id,
            displayName: service === 'github' ? profile.username : profile.displayName,
            image: profile.photos[0].value
        });

        try {
            // check if user is already in db
            let user = await User.findOne({authServiceId: profile.id})
            if (user) {
                done(null, user);
            } else {
                user = await User.create(newUser);
                done(null, user);
            }
        } catch (err) {
            console.log(err);
        }
    }

    passport.use(new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            scope: ['email', 'profile'],
        },
        async (accessToken, refreshToken, profile, done) =>{
            await verify(profile, done, 'google');

        } ))

    // create cookie from user
    passport.serializeUser((user,done) => {
        done(null,user.id);
    });

    // get user info from cookie sent
    passport.deserializeUser((id,done) => {
        User.findById(id, (err, user) =>{
            done(null,user);
        })

    });
}