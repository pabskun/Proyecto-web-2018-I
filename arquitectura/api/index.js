'use strict';

const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      path = require('path');

require('dotenv').config();

const app = express(),
      db = mongoose.connection,
      dburl = 'mongodb://admin:cenfotec@ds029715.mlab.com:29715/db_taller_rapidito',
      port = 6000,
      server = app.listen(port, _server());