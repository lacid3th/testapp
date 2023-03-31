<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">FORLOUD</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <a class="nav-link px-3" href="#">Sign out</a>
      </div>
    </div>
  </header>

  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="www.naver.com#"> <!-- # 뒤에 페이지 이동 url 작성 참고로 포트번호 입력-->
                <span data-feather="home"></span>
                Main Input
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"> <!-- # 뒤에 페이지 이동 url 작성-->
                <span data-feather="file"></span>
                OrderList
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"> <!-- # 뒤에 페이지 이동 url 작성-->
                <span data-feather="shopping-cart"></span>
                PaperWork
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"> <!-- # 뒤에 페이지 이동 url 작성-->
                <span data-feather="users"></span>
                Balance
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"> <!-- # 뒤에 페이지 이동 url 작성-->
                <span data-feather="bar-chart-2"></span>
                Etc1
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"> <!-- # 뒤에 페이지 이동 url 작성-->
                <span data-feather="layers"></span>
                Etc2
              </a>
            </li>
          </ul>

        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Functions</h1>

          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group me-2">
              <input type="file" class="btn btn-sm btn-outline-secondary" v-on:change="addfile($event)"
                placeholder="Upload file"
                accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
              <button type="button" class="btn btn-sm btn-outline-secondary">Apply</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Server Send</button>
            </div>
          </div>
        </div>
        <div style="display : block; justify-items: flex-start;"
          class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom gap-2">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
              data-bs-toggle="dropdown" aria-expanded="false">
              Seller : {{ selectedSeller }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-for="(item, i) in sellerlist" :key="i"><a class="dropdown-item" href="#"
                  @click="sellerNameApply(i)">{{ item }}</a></li>
            </ul>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2"
              data-bs-toggle="dropdown" aria-expanded="false">
              Brand : {{ selectedBrand }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-for="(item, i) in brandlist" :key="i"><a class="dropdown-item" href="#"
                  @click="brandNameApply(i)">{{ item }}</a></li>
            </ul>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton3"
              data-bs-toggle="dropdown" aria-expanded="false">
              Manager : {{ selectedManager }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-for="(item, i) in managerlist" :key="i"><a class="dropdown-item" href="#"
                  @click="managerNameApply(i)">{{ item }}</a></li>
            </ul>
          </div>
          <div>
            <button type="button" class="btn btn-outline-secondary">Apply</button>
          </div>
        </div>
        <h2>Order List</h2>
        <div>
          <table class="table table-striped table-sm" style="">
            <thead> <!-- 이거 있어야 스타일 제대로 먹음 -->
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
      </main>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import { ref } from 'vue';

export default {
  components: {

  },
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
      let data = ref(this.arraylist)
      const getHeaders = () => {
        let h = []
        if (data.value.length > 0) {
          var columnsIn = data.value[0];
          for (var key in columnsIn) {
            h.push({ text: key })
            console.log(key); // here is your column name you are looking for
          }
        } else {
          console.log("No columns");
        }
        return h
      }
      // let headers = ref([{text : 'col-1'},{text : 'col-2'}])
      let headers = ref(getHeaders())
      // return {
      //   data,
      //   headers
      // }
      this.data = data;
      this.headers = headers;

      console.log(this.data);
      console.log(this.headers);
    },
    sellerNameApply(i) {
      this.selectedSeller = this.sellerlist[i];
    },
    brandNameApply(i) {
      this.selectedBrand = this.brandlist[i];
    },
    managerNameApply(i) {
      this.selectedManager = this.managerlist[i];
    }
  }
};
</script>

<style>
table {
  font-size: 9px;
}
</style>

<!-- "../node_modules/vue3-xlsx/dist/vue3-xlsx.cjs.prod.js" -->
