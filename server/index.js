import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import rateLimiter from "express-rate-limit";
import cors from "cors";
import { getUrl } from "./constant.js";

import { connectDB, configDb } from "./db/connect.js";

//Error imports
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

//Routes
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Extra packages
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.get("/", (req, res) => {
  res.send("Api working perfectly");
});

//Authentication Route
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/posts", postRoutes);

//Errors
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    configDb();
    await connectDB(getUrl());
    app.listen(port, () =>
      console.log(`Server is listening on port: ${port} and Url: ${getUrl()}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

export default app;
