
function printout() {
    console.log("Hello World");
}

function json2Array(json) {
    var result = [];
    var keys = Object.keys(json[0]);
    result.push(keys);

    for (var i = 0; i < json.length; i++) {
        result.push(Object.values(json[i]));
    }
    return result;
}

// function columnDel(array) { 
//     var result = [];
//     return result;
// }

function array2Table(arrayRawData) {
    var headers = [];
    var row = [];
    headers = arrayRawData[0];
    for (let i = 1; i < arrayRawData.length; i++) {
        row.push(arrayRawData[i]);
    }

    return [headers, row];
    // console.log(headerData);
    // console.log(rowData);
}

function array2Json(array){
    var jsonReturn = [];
    jsonReturn = JSON.stringify(array)
    return jsonReturn;
}


export { printout, json2Array, array2Table, array2Json } // 여기에 함수 다 추가해야 함 엑셀로드니 뭐니 하는것들 전부다