const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

const app = express();
const server = http.createServer(app);

dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 3000;
// const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sellingplatform";

const indexRouteController = require('./routes/indexRouteController');

const {
  SESSION_SECRET
} = process.env;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// mongoose.connect(mongoUri, { useNewUrlParser: true, auto_reconnect: true });
// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const session = expressSession({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});

app.use(session);
app.use(helmet());

app.use('/', indexRouteController);

server.listen(PORT, () => {
  console.log(`Server is on port ${PORT}`);
});
