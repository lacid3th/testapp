
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

function obj2Array(obj) {
    var result = [];
    var keys = Object.keys(obj[0])
    result.push(keys);

    for (let i = 0; i < obj.length; i++) {
        result.push(Object.values(obj[i]));
    }
    return result;
}

function columnDel(array, colNum) { 
    var result = [];
    array[0].splice(colNum, 1);

    for (let i = 1; i < array.length; i++) {
        array[i].splice(colNum, 1);
    }
    result = array;

    return result;
}
function columnInsert(array, colNum, columnName, value){
    var result = [];
    array[0].splice(colNum, 0, columnName);

    for (let i = 1; i < array.length; i++) {
        array[i].splice(colNum, 0, value);
    }
    result = array;

    return result;
}

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

function array2Json(array) {
    var jsonReturn = [];
    var row;
    let key = array[0];
    var value = [];
    for (let i = 1; i < array.length; i++) {
        value.push(array[i]);
    }

    for (let i = 0; i < value.length; i++) {
        row = key.reduce((acc, curr, idx) => {
            acc[curr] = value[i][idx];
            return acc;
        }, new Object);
        jsonReturn.push(row)
    }

    return jsonReturn;
}


export { printout, json2Array, array2Table, array2Json, columnDel, columnInsert, obj2Array } // 여기에 함수 다 추가해야 함 엑셀로드니 뭐니 하는것들 전부다