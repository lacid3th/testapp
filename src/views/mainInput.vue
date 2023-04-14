<template>
  <div class="text-h4 pa-5">
    <p
      style="
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      "
    >
      INPUT
    </p>
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-file-input
            class="w-100"
            label="File input"
            v-on:change="addfile($event)"
            placeholder="Upload file"
            accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          ></v-file-input>
        </v-col>
        <v-col cols="auto" class="m-2">
          <v-btn class="mr-3" @click="columnControl"> Del Column </v-btn>
          <v-btn class="mr-3" @click="serverSend"> Send Serve </v-btn>
          <v-btn class="mr-3"> Button </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-center">
            <v-select
              v-model="selectedManager"
              :items="managerlist"
              label="USER"
            ></v-select>
          </div>
        </v-col>
        <v-col>
          <div class="text-center">
            <v-select
              v-model="selectedSeller"
              :items="sellerlist"
              label="SELLER"
            ></v-select>
          </div>
        </v-col>
        <v-col>
          <div class="text-center">
            <v-select
              v-model="selectedBrand"
              :items="brandlist"
              label="BRAND"
            ></v-select>
          </div>
        </v-col>
        <v-col>
          <v-btn class="mr-3 w-100" @click="SBMApply"> APPLY </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <div>
      <v-table class="text-left" density="compact">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="(line, i) in data" :key="i">
            <td style="font-size:auto" v-for="(row, j) in data[0]" :key="j">
              {{ data[i][j] }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>


<script>
import * as XLSX from "xlsx";
import axios from "axios";
import * as my from "../myFunction.js";

export default {
  components: {},
  data: function () {
    return {
      file: File,
      arrayBuffer: null,
      filelist: null,
      arraylist: null, // Array형식
      jsonlist: [],
      data: null, // 데이터 Array (표시용도)
      headers: null, // 헤더 Array (표시용도)
      sellerlist: ["김진성", "김기운", "김수겸"],
      selectedSeller: null,
      brandlist: ["애즈유", "침대팔이", "XYZ"],
      selectedBrand: null,
      managerlist: [],
      selectedManager: null,
      loadedData: null,
    };
  },
  methods: {
    addfile(event) {
      this.file = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(this.file);
      fileReader.onload = () => {
        // eslint-disable-line no-unused-vars

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
        this.arraylist = XLSX.utils.sheet_to_json(worksheet, {
          header : 1,
          blankrows: false,
        });
        // { header : 1 옵션 넣으면 json 아니고 그냥 array로 나옴}
        this.filelist = [];

        console.log(this.arraylist);

        // OBJ 형식 Array 로 바꿔서 HTML 전송
        this.headers = my.array2Table(this.arraylist)[0];
        this.data = my.array2Table(this.arraylist)[1];

        // Array 수정 파트

        this.jsonlist = my.array2Json(this.arraylist);

        console.log(this.jsonlist);
      };
    },
    columnControl() {
      my.columnDel(this.arraylist, 1);
      this.headers = my.array2Table(this.arraylist)[0];
      this.data = my.array2Table(this.arraylist)[1];
    },

    SBMApply() {
      // for (let index = 0; index < this.data.length; index++) {
      //   this.data[index].Seller = this.selectedSeller;
      //   this.data[index].Brand = this.selectedBrand;
      //   this.data[index].Manager = this.selectedManager;
      // }
      my.columnInsert(this.arraylist, 1, "Seller", this.selectedSeller);
      my.columnInsert(this.arraylist, 2, "Brand", this.selectedBrand);
      my.columnInsert(this.arraylist, 3, "Manager", this.selectedManager);

      this.headers = my.array2Table(this.arraylist)[0];
      this.data = my.array2Table(this.arraylist)[1];

      this.jsonlist = my.array2Json(this.arraylist);
    },

    jsontoArray(json) {
      var jsonHeader = json.key();
      var jsonData = json.values();
      var jsonArrayData = jsonHeader.concat(jsonData);

      return jsonArrayData;
    },

    serverSend() {
      console.log(this.jsonlist);
      axios
        .post("http://localhost:8000/order", this.jsonlist)
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

    async loadUserData_FromServer() {
      // 조건 붙여서 리퀘스트 하기
      await axios.post("http://localhost:8000/loadUserInfo", "dummy").then(
        (response) => {
          // console.log(response.data);
          this.loadedData = response.data;
          console.log(this.loadedData);
        },
        (error) => {
          console.log(error);
        }
      );
      this.managerlist = this.loadedData.map(row=>row.Name);
    },
  },
  mounted() {
    this.loadUserData_FromServer();
  },
};
</script>
<style>
table {
  font-size: 9px;
}
</style>