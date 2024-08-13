// const MongoStore = require("connect-mongo"); // Or the appropriate import for your chosen store
const methodOverride = require("method-override");
const express = require("express");
const app = express();
const cors = require("cors");
const ms = require("ms");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDB = require("./MongooDB/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const api = require("./routes/router");


const session = require("express-session");
const { createClient } = require("redis");
const RedisStore = require("connect-redis").default; // Correct import
const corsOptions = {
  origin: ["https://office-zeta.vercel.app"],
  credentials: true,
  optionSuccessStatus: 200,
};

// Initialize client.
let redisClient = createClient({
  url: "redis://127.0.0.1:6379",
  legacyMode: true,
});
redisClient.connect().catch(console.error);
// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});
const sessionOptions = {
  store: redisStore,
  secret: "abcde111",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: ms("7d"),
  },
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(sessionOptions));
app.use(cookieParser("ab231"));
app.use(methodOverride("_method"));

const isProduction = process.env.NODE_ENV === "production";
const isTesting =
  process.env.NODE_ENV === "test" || process.env.NODE_ENV === "testing";

if (isProduction) {
  console.log("This is production!");
} else if (isTesting) {
  console.log("This is testing!");
} else {
  console.log("This is development!");
}
require("dotenv").config();
app.use(notFoundMiddleware);
app.use(errorMiddleware);
const port = process.env.PORT || 8080;
app.use("/api", api);

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
