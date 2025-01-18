const express = require('express');
const app = express();
const homeRoute = require('./routes/home');
const controllers = require('./controllers/homeController');


const PORT = process.env.PORT || 3000;

// Use the home route
app.use('/', homeRoute);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

