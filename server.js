const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbconnect = require('./config/database')
const categoryRoute = require('./routes/categoryRoute');
const ApiError = require('./utils/apierror');
const globalerror = require('./middleware/errormiddleware');

const app = express();
dotenv.config();
dbconnect();

    app.use(express.json())
    if(process.env.NODE_ENV == 'development')
    {
        app.use(morgan('dev'));
        console.log(process.env.NODE_ENV);
    }


app.use('/api/v1/category', categoryRoute);
app.use('/*any', (req, res, next)=>{
    next(new ApiError(`Not found route ${req.originalUrl}`, 404));
})

// global error handler (4 paramter)
app.use(globalerror);



const PORT = process.env.PORT
const server = app.listen(PORT, () =>{
    console.log(`port running ${PORT}`)
})


process.on('unhandledRejection', (err) => {
    console.error(`unhandledRejection error ${err.name} | ${err.message}`)
    server.close(() => {
        console.log('close server')
        process.exit(1)
    })
})