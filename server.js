const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// routes
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');

// express
const app = express();

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// cors
if(process.env.NODE_ENV === 'development'){
    app.use(cors({origin: `${process.env.CLIENT_URL}`}));
}
// routes middleware
app.use('/api',blogRoutes);
app.use('/api',authRoutes);

// mongo db connection
mongoose.connect(process.env.DATABASE, {useUnifiedTopology:true, useNewUrlParser: true, useCreateIndex:true, useFindAndModify:false})
.then(()=> console.log('Database connected!'));


// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server Started on port: ${port}!`);
});