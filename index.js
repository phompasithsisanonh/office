// const MongoStore = require("connect-mongo"); // Or the appropriate import for your chosen store
require("dotenv").config();
const methodOverride = require("method-override");
const express = require("express");
const app = express();
const cors = require("cors");
const ms = require("ms");
const serverless = require("serverless-http");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDB = require("./MongooDB/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const api = require("./routes/router");
const isProduction = process.env.NODE_ENV === "production";
const session = require("express-session");
const { createClient } = require("redis");
const RedisStore = require("connect-redis").default; 
const start = async () => {
  try {
    const corsOptions = {
      origin: ["https://my-app-phi-pied.vercel.app/"],
      credentials: true,
      optionSuccessStatus: 200,
    };

    const setupRedis = async () => {
      let redisClient = createClient({
        url: process.env.REDIS_URL,
        legacyMode: true,
      });

      redisClient.on("error", (err) => {
        console.error("Redis Client Error", err);
      });

      try {
        await redisClient.connect();
        console.log("Connected to Redis");
      } catch (err) {
        console.error("Error connecting to Redis:", err);
      }

      return redisClient;
    };

    const setupSession = (redisClient) => {
      return new RedisStore({
        client: redisClient,
        prefix: "myapp:",
      });
    };
    const redisClient = async () => {
      await setupRedis();
    };
    const redisStore = setupSession(redisClient);

    const sessionOptions = {
      store: redisStore,
      secret: process.env.SESSION_SECRET || "defaultSecret",
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: true,
        secure: isProduction,
        maxAge: ms("7d"),
      },
    };

    app.use(cors(corsOptions));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session(sessionOptions));
    app.use(cookieParser("ab231"));
    app.use(methodOverride("_method"));
    const isTesting =
      process.env.NODE_ENV === "test" || process.env.NODE_ENV === "testing";

    if (isProduction) {
      console.log("This is production!");
    } else if (isTesting) {
      console.log("This is testing!");
    } else {
      console.log("This is development!");
    }

    app.use(notFoundMiddleware);
    app.use(errorMiddleware);
    const port = process.env.PORT || 8080;
    app.use("/api", api);

    // connectDB
    if (!process.env.MONGODB_URL) {
      console.error("MONGODB_URL environment variable is not set.");
      process.exit(1);
    }
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
    module.exports.handler = serverless(app);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start().catch((error) => {
  console.error("Setup Error:", error);
  process.exit(1);
});
