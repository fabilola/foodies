const express = require("express");
const session = require('express-session');
const passport = require('passport');
const cors = require("cors");
const MongoStore = require('connect-mongo');
require('./config/passport')(passport);
require('dotenv').config();

const app = express();

//cors
let corsOptions = {
             origin: ['http://localhost:8080',
                      'http://localhost:3000'],
             credentials: true
};
app.use(cors(corsOptions));

//db
const db = require("./models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        try{
            console.log("Connected to the database!");
        }catch(err){
            console.log("Cannot connect to the database!", err);
            process.exit();
        }
    });

//session
app.use(session(
    {
        secret: process.env.MONGO_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: db.url
        })
    }
));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session({
        secret: 'fab',
        resave: false,
        saveUninitialized: true
}
));


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true,limit: '50mb'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/recipe.routes")(app);
require("./routes/user.routes")(app);
require("./routes/rating.routes")(app);
require("./routes/favorite.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/mail.routes")(app);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});