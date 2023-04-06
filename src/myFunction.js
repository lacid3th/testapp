function printout(){
    console.log("Hello World");
}

function json2Array(json){
    var result = [];
    var keys = Object.keys(json[0]);
    result.push(keys);

    for(var i = 0; i < json.length; i++){
        result.push(Object.values(json[i]));
    }
    return result;
    }
    

export { printout, json2Array } // 여기에 함수 다 추가해야 함 엑셀로드니 뭐니 하는것들 전부다