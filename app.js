 require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo')

const connectDB = require('./server/config/db');
const isActiveRoute = require('./server/helpers/routeHelpers').isActiveRoute;




const app = express();
const PORT = 2000;

// Connect to Database

connectDB();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl:process.env.MONGODB_URI
    }),
    //  cookie: {
    //     maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
    // }
}));

app.use(express.static('Public'));

app.use(expressLayout);
app.set('layout', ('./layouts/main'));
app.set('view engine', ('ejs'));



app.locals.isActiveRoute = isActiveRoute;



app.use('/', require('./server/routes/main'));
app.use('/admin', require('./server/routes/admin'));

app.listen(PORT, () => {
    console.log(`App dey run on port ${PORT} Bumboclat`);  
});