const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));


//Mongoose DB
const mongoose = require('mongoose');


var db = mongoose.connection;
var data;
var jsonTemplate = [{ data: "hello" }, { data: "world" }];

mongoose.connect('mongodb+srv://lacid3th:qwer1234@cluster0.roez9yo.mongodb.net/testapp?retryWrites=true&w=majority', {
    dbName: 'testapp',
    useNewUrlParser: true,
}).then(() => console.log('Mongoose DB connect')).catch(err => console.log(err));


app.listen(8000, () => console.log('Server is running on port 8000'));

app.get('/api', (req, res) => {
    res.send("hello world");
});

app.post('/order', (req, res) => {
    data = req;
    console.log(data);
    console.log(data.jsonTemplate);
});


// 몽구스 스키마 만들기
const orderlistSchema = new mongoose.Schema({
    순번: { type: Number, required: true, unique: true },
    이름: { type: String, required: true },
    금액: { type: Number, required: true },
    Seller: { type: String, required: true },
    Brand: { type: String, required: true },
    Manager: { type: String, required: true },
},
    {
        timestamps: true,
        collection: 'orderlist'
    });

// 스키마로 모델 만들기.. 왜 하는지 모름
const orderlist = mongoose.model('orderlist', orderlistSchema);

// 이건 그냥 하드코딩으로 넣은거고, 원래는 프론트로부터 값 받아와야 함
var mylist = new orderlist({
    순번: null,
    이름: "",
    금액: null,
    Seller: "",
    Brand: "",
    Manager: "",
});

function inputData() {
    mylist.순번 = data.body.순번;
    mylist.이름 = data.body.이름;
    mylist.금액 = data.body.금액;
    mylist.Seller = data.body.Seller;
    mylist.Brand = data.body.Brand;
    mylist.Manager = data.body.Manager;
}


// mylist.save().then(() => console.log('saved'));