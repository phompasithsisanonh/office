const MongoStore = require('connect-mongo'); // Or the appropriate import for your chosen store
const methodOverride = require("method-override");
const express = require("express");
const app = express();
const cors = require("cors");
const ms = require("ms");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDB =require('./MongooDB/connect')
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const api = require('./routes/router')
const corsOptions = {
  origin: ["*"],
  credentials: true,
  methods :["GET","POST","DELETE"],
  optionSuccessStatus: 200,
};
const sessionOptions = {
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/Office'
  }),
  secret: "abcde111",
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: ms("7d"),
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(sessionOptions));
app.use(cookieParser("ab231"));
app.use(methodOverride("_method"));


require("dotenv").config();
app.use(notFoundMiddleware);
app.use(errorMiddleware);
const port = process.env.PORT || 8080
const isProduction = process.env.NODE_ENV === 'production';
const isTesting = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testing';

app.use('/api', api);
if (isProduction) {
  console.log('This is production!');
  // Production-specific configuration, error handling, etc.
} else if (isTesting) {
  console.log('This is testing!');
  // Testing-specific configuration, mocks, etc.
} else {
  console.log('This is development!');
  // Development-specific configuration, logging, etc.
}
const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
