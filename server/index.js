// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

/*
  DB Setup
 */
mongoose.connect('mongodb://localhost:auth/auth');

/* 
  App Setup
*/

// Express middleware
app.use(morgan('combined')); // HTTP request logger middleware
app.use(cors()); // Handle CORS (different port, diferrent domain...)
app.use(bodyParser.json({ type: '*/*' })); // Body parsing middleware
router(app);

/* 
  Server Setup
*/
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);