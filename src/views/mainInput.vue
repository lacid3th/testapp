<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Functions</h1>

      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <input
            type="file"
            class="btn btn-sm btn-outline-secondary"
            v-on:change="addfile($event)"
            placeholder="Upload file"
            accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          <button type="button" class="btn btn-sm btn-outline-secondary">
            Apply
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            @click="serverSend"
          >
            Server Send
          </button>
        </div>
      </div>
    </div>
    <div
      style="display: block; justify-items: flex-start"
      class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom gap-2"
    >
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Seller : {{ selectedSeller }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li v-for="(item, i) in sellerlist" :key="i">
            <a class="dropdown-item" href="#" @click="sellerNameApply(i)">{{
              item
            }}</a>
          </li>
        </ul>
      </div>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Brand : {{ selectedBrand }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li v-for="(item, i) in brandlist" :key="i">
            <a class="dropdown-item" href="#" @click="brandNameApply(i)">{{
              item
            }}</a>
          </li>
        </ul>
      </div>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton3"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Manager : {{ selectedManager }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li v-for="(item, i) in managerlist" :key="i">
            <a class="dropdown-item" href="#" @click="managerNameApply(i)">{{
              item
            }}</a>
          </li>
        </ul>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="SBMApply"
        >
          Apply
        </button>
      </div>
    </div>
    <h2>Order List</h2>
    <div>
      <table class="table table-striped table-sm" style="">
        <thead>
          <!-- 이거 있어야 스타일 제대로 먹음 -->
          <tr>
            <th v-for="header in headers" :key="header.text">
              {{ header.text }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index">
            <td v-for="header in headers" :key="header.text">
              {{ row[header.text] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import * as XLSX from "xlsx";
import axios from "axios";

export default {
  components: {},
  data: function () {
    return {
      file: File,
      arrayBuffer: null,
      filelist: null,
      arraylist: null, // 이게 Json 형식
      data: null, // 헤더 Array (표시용도)
      headers: null, // 데이터 Array (표시용도)
      sellerlist: ["김진성", "김기운", "김수겸"],
      selectedSeller: null,
      brandlist: ["애즈유", "침대팔이", "XYZ"],
      selectedBrand: null,
      managerlist: ["유지영", "송유진", "윤혜미"],
      selectedManager: null,
    };
  },
  methods: {
    addfile(event) {
      this.file = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(this.file);
      fileReader.onload = (e) => { // eslint-disable-line no-unused-vars
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        this.arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        this.filelist = [];

        // Json Array object 에서 key 값 하고 value 를 모든 Array 에 다 추가해야 합니다. How to?

        console.log(this.headers);

        return this.setup(); // 순차적으로 Setup 함수 실행
      };
    },
    setup() {
      var data = this.arraylist;
      const getHeaders = () => {
        let h = [];
        if (data.length > 0) {
          var columnsIn = data[0];
          for (var key in columnsIn) {
            h.push({ text: key });
            // console.log(key); // here is your column name you are looking for
          }
        } else {
          console.log("No columns");
        }
        return h;
      };
      // let headers = ref([{text : 'col-1'},{text : 'col-2'}])
      var headers = getHeaders();
      // return {
      //   data,
      //   headers
      // }

      for (let index = 0; index < data.length; index++) {
        data[index].Seller = "";
        data[index].Brand = "";
        data[index].Manager = "";
      }

      this.data = data;
      headers = headers.concat(
        { text: "Seller" },
        { text: "Brand" },
        { text: "Manager" }
      );
      this.headers = headers;

      console.log(this.data);
      console.log(headers);
    },
    SBMApply() {
      for (let index = 0; index < this.data.length; index++) {
        this.data[index].Seller = this.selectedSeller;
        this.data[index].Brand = this.selectedBrand;
        this.data[index].Manager = this.selectedManager;
      }
    },

    jsontoArray(json) {
      var jsonHeader = json.key();
      var jsonData = json.values();
      var jsonArrayData = jsonHeader.concat(jsonData);

      return jsonArrayData;
    },

    serverSend() {
      console.log(this.data);
      axios
        .post("http://localhost:8000/order", this.data)
        .then(function (result) {
          console.log(result.data);
        });
    },

    

    serverSend2() {
      axios.get("http://localhost:8000/api").then(function (result) {
        console.log(result.data);
      });
    },

    sellerNameApply(i) {
      this.selectedSeller = this.sellerlist[i];
    },
    brandNameApply(i) {
      this.selectedBrand = this.brandlist[i];
    },
    managerNameApply(i) {
      this.selectedManager = this.managerlist[i];
    },
  },
};
</script>
<style>
table {
  font-size: 9px;
}
</style>