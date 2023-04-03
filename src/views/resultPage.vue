<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Result Data</h1>

      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">
            Apply
          </button>
          <button type="button" class="btn btn-sm btn-outline-secondary">
            Server Send
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            @click="serverLoad"
          >
            Load Server
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
          class="btn btn-sm btn-secondary dropdown-toggle"
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
          class="btn btn-sm btn-secondary dropdown-toggle"
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
          class="btn btn-sm btn-secondary dropdown-toggle"
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
          Query
        </button>
      </div>
    </div>
    <h2>Result List</h2>
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
// import * as XLSX from "xlsx";
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
      sellerlist: ["김진성", "김기운", "김수겸", "이승우"],
      selectedSeller: null,
      brandlist: ["애즈유", "침대팔이", "XYZ"],
      selectedBrand: null,
      managerlist: ["유지영", "송유진", "윤혜미"],
      selectedManager: null,

      loadedData: null,
    };
  },
  methods: {
    setup() {
      var data = this.loadedData;
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
      this.headers = headers;
      this.data = data;
    },
    async serverLoad() {
      // 조건 붙여서 리퀘스트 하기
      await axios.post("http://localhost:8000/access", { 이름: this.selectedSeller }).then(
        (response) => {
          console.log(response.data);
          this.loadedData = response.data;
          this.setup();
        },
        (error) => {
          console.log(error);
        }
      );
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
<style lang="">
</style>