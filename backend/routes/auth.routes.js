module.exports = app => {
    const passport = require("passport");
    app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile'],prompt: 'select_account', }));

    // check if code and exchange for profile info
    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: 'http://localhost:3000/auth' }),
        (req, res) =>
            // Successful authentication, redirect home.
            res.redirect('http://localhost:3000/browse')
    );

    app.get('/auth/facebook',
        passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/auth' }),
        function(req, res) {
            res.redirect('http://localhost:3000/browse');
        });

    app.get('/auth/github',
        passport.authenticate('github', { scope: [ 'user:email' ] }));

    app.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect:'http://localhost:3000/auth' }),
        function(req, res) {
            res.redirect('http://localhost:3000/browse');
        });

};

