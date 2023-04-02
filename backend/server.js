const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// cors 제약 해제 - 나중에 공부 더 필요함
const cors = require('cors');


// Json 파싱을 위한 코드 
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Mongoose DB
const mongoose = require('mongoose');
// 몽구스 스키마 만들기
const orderlistSchema = new mongoose.Schema({
    순번: { type: Number },
    이름: { type: String },
    금액: { type: Number },
    Seller: { type: String },
    Brand: { type: String },
    Manager: { type: String },
},  
    {
        timestamps: true,
        collection: 'orderlist'
    });

// 스키마로 모델 만들기.. 왜 하는지 모름
module.exports = orderlist = mongoose.model('orderlist', orderlistSchema);
// const orderlist = mongoose.model('orderlist', orderlistSchema);

var db = mongoose.connection;
var data;


mongoose.connect('mongodb+srv://lacid3th:qwer1234@cluster0.roez9yo.mongodb.net/testapp?retryWrites=true&w=majority', {
    dbName: 'testapp',
    useNewUrlParser: true,
}).then(() => console.log('Mongoose DB connect')).catch(err => console.log(err));


app.listen(8000, () => console.log('Server is running on port 8000'));

app.get('/api', (req, res) => {
    res.send("hello world");
});

app.post('/order', (req, res) => {
    const orderedlst = new orderlist({
        순번: req.body.순번,
        이름: req.body.이름,
        금액: req.body.금액,
        Seller: req.body.Seller,
        Brand: req.body.Brand,
        Manager: req.body.Manager,
    });

    console.log(orderedlst);
});




// mylist.save();




// mylist.save().then(() => console.log('saved'));