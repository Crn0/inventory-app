import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import __dirname from '../dirname.mjs';
import createError from 'http-errors';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.mjs';
import inventoryRouter from './routes/inventory.mjs';

// if import meta dirname is undefine use import meta url to instead

const app = express();

// Set up rate limiter: maximum of twenty requests per minute
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
});

// Define the database URL to connect to.
const mongoDb = process.env.MONGO_DB;

// Wait for database to connect, logging an error if there is a problem
const main = async () => await mongoose.connect(mongoDb);
main().catch(console.error);
// view engine setup
app.set('views', join(__dirname, 'src/views'));
app.set('view engine', 'pug');

// Apply rate limiter to all requests
app.use(limiter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Add helmet to the middleware chain.
// Set CSP headers to allow our Bootstrap and Jquery to be served
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            'img-src': ["'self'", 'data:', 'https://res.cloudinary.com'],
        },
    })
);
app.use(compression()); // Compress all routes
app.use(express.static(join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/inventory', inventoryRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, _) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
