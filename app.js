const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// set view engine
app.set('view engine', 'ejs');

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI)
  .then(result => app.listen(4000))
  .catch(err => console.log(err));

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});