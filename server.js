import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import logger from "morgan";

import routes from "./routes";
const app = express();

app.disable("x-powered-by");
app.set("view engine", "pug");
app.set("views", "./views");
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.json({ type: "application/json", extended: true, limit: "5mb" })
);
app.use(bodyParser.text({ type: "application/graphql" }));
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static("public"));
app.use(routes);
app.use(function(err, req, res, next) {
  //todo: handle error below, try catch api with catch(e) { next(e) }
  if (err) {
    switch (err.name) {
      case "UnauthorizedError": {
        console.error("error:", err);
        return next(err);
      }
      default: {
        console.error("error:", err);
        return res.status(503).send("Server Error");
      }
    }
  } else {
    next();
  }
});

module.exports = app;
