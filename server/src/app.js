const express = require('express');
const morgan = require('morgan');
const { errHandling } = require("./utils/errorController");
const AppErorr = require('./utils/appError')

const fs = require('fs');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');
const app = express();

const publicDirectoryPath = path.join(__dirname, "/public");
app.use(express.static(publicDirectoryPath));
app.use(cors({
    origin:'*'
}));

app.use(express.json());

const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined',{stream:logStream}));
app.use('/api/v1',routes);
app.all("*", (req, res, next) => {
    
    return next(new AppErorr("Page is not found", 404));
  });

  app.use(errHandling);

module.exports = app