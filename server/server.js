
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const dailyRouter = require('./routes/dailyCheckin.router');
const noteRouter = require('./routes/note.router');
const rxRouter = require('./routes/rx.Router');
const migRouter = require('./routes/migraine.router');
const graphRouter = require('./routes/graph.router')
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/daily', dailyRouter);
app.use('/api/note', noteRouter);
app.use('/api/rx', rxRouter);
app.use('/api/migr', migRouter);
app.use('/api/graph', graphRouter);
// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 6000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
