<template>
  <div class="text-h4 pa-5">
    <v-container>
      <v-row justify="center">
        <v-col>
          <p
            style="
              font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial,
                sans-serif;
            "
          >
            REGISTER
          </p>
        </v-col>
        <v-col cols="auto" class="m-2">
          <router-link to="/registerUser">
            <v-btn class="mr-3"> USER </v-btn>
          </router-link>
          <router-link to="/registerSeller">
            <v-btn class="mr-3"> SELLER </v-btn>
          </router-link>
          <router-link to="/registerBrand">
            <v-btn class="mr-3"> BRAND </v-btn>
          </router-link>
          <router-link to="/registerProject">
            <v-btn class="mr-3"> PROJECT </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import * as my from "../myFunction.js";

export default {
  data() {
    return {
      sellerName: null,
      loadedData: null,
      data: null,
      headers: null,
    };
  },
  methods: {
    tmpServerInput() {
      axios
        .post("http://localhost:8000/tmpRegister", { Seller: this.sellerName })
        .then(function (result) {
          console.log(result.data);
        });
    },
    async tmpServerLoad() {
      // 조건 붙여서 리퀘스트 하기
      await axios.post("http://localhost:8000/tmpLoad", "dummy").then(
        (response) => {
          // console.log(response.data);
          this.loadedData = response.data;
          this.setup();
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  // 여기 있으면 페이지 불러오자마자 실행됨
  mounted() {
    my.printEmpty();
  },
};
</script>

<style>
</style>