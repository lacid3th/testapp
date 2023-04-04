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
const { reactive } = require('vue');
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

const sellerListSchema = new mongoose.Schema({
    Seller: { type: String },
},
    {
        timestamps: true,
        collection: 'sellerList'
    })

// 스키마로 모델 만들기.. 왜 하는지 모름
var orderlist = mongoose.model('orderlist', orderlistSchema);
// const orderlist = mongoose.model('orderlist', orderlistSchema);
var sellerListModel = mongoose.model('sellerList', sellerListSchema);

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
    // 어마어마 하게 중요한 코드 
    // MongoDB Atlas 에서 Collection 옵션에서 no_1 뭐 이딴게 중복허용을 안했었음
    for (let i = 0; i < req.body.length; i++) {
        // 반복문 내부에서 인스턴스 새로 생성해야 동일 id 버그 안남
        var orderedlst = new orderlist();
        // 이건 더 섹시하게 하는 방법이 있을듯
        orderedlst.순번 = req.body[i].순번,
            orderedlst.이름 = req.body[i].이름,
            orderedlst.금액 = req.body[i].금액,
            orderedlst.Seller = req.body[i].Seller,
            orderedlst.Brand = req.body[i].Brand,
            orderedlst.Manager = req.body[i].Manager

        orderedlst.save();
    }
    res.send(orderedlst);
});
// tmpRegister
app.post('/tmpRegister', (req, res) => {
    var sellerList = new sellerListModel();
    sellerList.Seller = req.body.Seller,
    sellerList.save();
    res.send(sellerList);
});



app.post('/access', (req, res) => {
    // getItems() 이 서버를 거치고 오기때문에 작업이 완료되길 기다렸다가 then 으로 불러줘야 함
    getItems(req.body).then(function (data) {
        console.log(data + "bb");
        res.send(data);
    });

});

app.post('/tmpLoad',(req, res) => {
    getItemsSeller().then(function(data){
        res.send(data);
    })
})

// async await 을 사용해서 비동기 처리를 동기처럼 처리
async function getItems(object) {
    const items = await orderlist.find(object);
    console.log(items);
    return items;
};

async function getItemsSeller(){
    const items = await sellerListModel.find();
    console.log(items);
    return items;
}
