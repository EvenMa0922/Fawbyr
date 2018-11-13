if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Top level routes
const index = require('./routes/index');
const users = require('./routes/users');
const team = require('./routes/team');

// Authentication routes
const register = require('./routes/register');
const login = require('./routes/login');

// Image routes for vertical prototype
const imageUpload = require('./routes/test-image');
const searchResults = require('./routes/test-search');

// Team routes
const teamBen = require('./routes/team-ben');
const teamRazmik = require('./routes/team-razmik');
const teamAndy = require('./routes/team-andy');
const teamWenjun = require('./routes/team-wenjun');
const teamFlavy = require('./routes/team-flavy');
const teamYusen = require('./routes/team-yusen');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/default-layout.ejs');
app.set('view engine', 'ejs');

app.use(expressLayouts);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define custom paths for local assets.
app.use('/styles', express.static(__dirname + '/styles'));
app.use(
  '/styles',
  express.static(__dirname + '/node_modules/bootstrap/dist/css')
);
app.use(
  '/scripts',
  express.static(__dirname + '/node_modules/bootstrap/dist/js')
);
app.use('/scripts', express.static(__dirname + '/node_modules/jquery/dist'));

app.use(
  expressValidator({
    errorFormatter: (param, msg, value) => {
      const namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

// Top level routes
app.use('/', index);
app.use('/users', users);
app.use('/team', team);

// Authentication routes
app.use('/register', register);
app.use('/login', login);

// Routes for vertical prototype
app.use('/image', imageUpload);
app.use('/search', searchResults);

// Team routes
app.use('/team/ben', teamBen);
app.use('/team/razmik', teamRazmik);
app.use('/team/andy', teamAndy);
app.use('/team/wenjun', teamWenjun);
app.use('/team/flavy', teamFlavy);
app.use('/team/yusen', teamYusen);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
