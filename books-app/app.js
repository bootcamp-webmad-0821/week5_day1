require("dotenv/config");

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const { capitalize } = require("./utils");
app.locals.siteTitle = capitalize(`ironBooks_`);

require('./config/session.config')(app)

require('./routes')(app)

require("./error-handling")(app);

module.exports = app