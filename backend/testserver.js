const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.listen(8000, () => console.log('Server is running on port 8000'));  
app.get('/api', (req, res) => {
    res.send('Hello World!');
});