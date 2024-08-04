require("dotenv").config();
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
  origin: ["http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
};
const sessionOptions = {
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



app.use(notFoundMiddleware);
app.use(errorMiddleware);
app.use('/api', api);

const port = 8000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
