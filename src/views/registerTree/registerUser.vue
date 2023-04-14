<template>
  <div>
    <p
      class="pa-5"
      style="
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      "
    >
      USER
    </p>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="userName"
              label="Name"
              required
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="userAge"
              label="Age"
              required
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="userID"
              label="ID"
              required
            ></v-text-field>
          </v-col>

          <v-col class="m-2">
            <v-btn class="mr-3" @click="save2Server"> APPLY </v-btn>
            <v-btn class="mr-3" @click="delFromServer"> DELETE </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    
    <div>
      <v-table class="" style="">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(line, i) in data" :key="i">
            <td v-for="(row, j) in data[0]" :key="j">
              {{ data[i][j] }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import * as my from "../../myFunction.js";

export default {
  data() {
    return {
      userName: null,
      userAge: null,
      userID: null,

      data: null,
      headers: null,
      loadedData: null,
    };
  },
  methods: {
        async loadFromServer() {
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
        this.headers = my.obj2Array_for_Table(this.loadedData)[0];
        this.data = my.obj2Array_for_Table(this.loadedData)[1];

    },
    async save2Server() {
      var c = confirm(
        "이름 :" +
          this.userName +
          "\n" +
          "나이 :" +
          this.userAge +
          "\n" +
          "ID :" +
          this.userID +
          "\n" +
          "로 입력하시겠습니까?"
      );
      if (c == true) {
        let userInfo = {
          Name: this.userName,
          Age: this.userAge,
          ID: this.userID,
        };

        await axios
          .post("http://localhost:8000/saveUser", userInfo)
          .then(function (result) {
            console.log(result.data);
          });
        // setTimeout 쓸때 매개변수 있으면 조심해야 함, 뒤쪽에 넣어야 됨
        setTimeout(this.loadFromServer, 1000);
      } else {
        alert("취소되었습니다");
      }
    },

    async delFromServer() {
      let userName = {
        Name: this.userName,
      };
      await axios
        .post("http://localhost:8000/delUser", userName)
        .then(function (result) {
          console.log(result.data);
        });
      this.loadFromServer();
    },
  },
  // 여기 있으면 페이지 불러오자마자 실행됨
  mounted() {
    this.loadFromServer();
  },
};
</script>

<style></style>