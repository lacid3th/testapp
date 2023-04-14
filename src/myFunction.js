import axios from "axios";

function printEmpty() {
    console.log("");
}

function obj2Array(obj){
    var result = [];
    var keys = Object.keys(obj[0])
    result.push(keys);

    for (let i = 0; i < obj.length; i++) {
        result.push(Object.values(obj[i]));
    }
    return result;
}

function array2Table(array){
    var header = [];
    var row = [];

    header = array[0];
    for (let i = 1; i < array.length; i++) {
        row.push(array[i]);
    }
    return [header, row];
}



function obj2Array_for_Table(obj) {
    var result = [];
    var header = [];
    var row = [];
    var keys = Object.keys(obj[0])
    result.push(keys);

    for (let i = 0; i < obj.length; i++) {
        result.push(Object.values(obj[i]));
    }
    header = result[0];
    for (let i = 1; i < result.length; i++) {
        row.push(result[i]);
    }
    return [header, row];
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
function columnInsert(array, colNum, columnName, value) {
    var result = [];
    array[0].splice(colNum, 0, columnName);

    for (let i = 1; i < array.length; i++) {
        array[i].splice(colNum, 0, value);
    }
    result = array;

    return result;
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

async function loadFromServer_byObj(url) {
    let result = [];
    await axios.post(url, "dummy").then(
        (response) => {
            result = response.data;
        },
        (error) => {
            console.log(error);
        }
    );
    return result;
}


export { printEmpty, obj2Array, array2Table, array2Json, columnDel, columnInsert, obj2Array_for_Table, loadFromServer_byObj, } // 여기에 함수 다 추가해야 함 엑셀로드니 뭐니 하는것들 전부다