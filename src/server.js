const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://lacid3th:qwer1234@cluster0.roez9yo.mongodb.net/testapp?retryWrites=true&w=majority').then(() => console.log('Mongoose DB connect')).catch(err => console.log(err));
app.listen(7777, () => console.log('Server is running on port 7777'));
