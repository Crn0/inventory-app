import 'dotenv/config';
import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url'
import createError from "http-errors";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index.mjs";
import usersRouter from "./routes/users.mjs";

// if import meta dirname is undefine use import meta url to instead
const __dirname = import.meta.dirname || dirname(fileURLToPath(import.meta.url));

const app = express();

// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
