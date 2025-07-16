const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbconnect = require('./config/database')
const categoryRoute = require('./routes/categoryRoute')

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



const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`port running ${PORT}`)
})