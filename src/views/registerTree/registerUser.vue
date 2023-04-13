<template>
    <div>
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 class="h2">USER Register</h4>
        </div>
        <div style="display: block; justify-items: flex-start"
            class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom gap-2">
            <input v-model="userName" class="form-control" type="text" placeholder="Name"
                aria-label="default input example">
            <input v-model="userAge" class="form-control" type="text" placeholder="Age" aria-label="default input example">
            <input v-model="userID" class="form-control" type="text" placeholder="ID" aria-label="default input example">
            <div>
                <button type="button" class="btn btn-outline-secondary" @click="save2Server">
                    Save to DB
                </button>
                <button type="button" class="btn btn-outline-secondary" @click="delFromServer">
                    Del from DB
                </button>
            </div>
        </div>
        <div>
            <table class="table table-striped table-sm" style="">
                <thead>
                    <!-- 이거 있어야 스타일 제대로 먹음 -->
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
            </table>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import * as my from '../../myFunction.js';

export default {
    data() {
        return {
            userName: null,
            userAge: null,
            userID: null,
            data: null,
            headers: null,
            loadedData: null,
            loadedArray: null,
        }
    },
    methods: {
        async loadFromServer() {
            // 조건 붙여서 리퀘스트 하기
            await axios.post("http://localhost:8000/loadUserInfo", "dummy").then(
                (response) => {
                    // console.log(response.data);
                    this.loadedData = response.data;
                    console.log(this.loadedData)
                },
                (error) => {
                    console.log(error);
                }
            );
            this.loadedArray = my.obj2Array(this.loadedData)
            this.headers = my.array2Table(this.loadedArray)[0];
            this.data = my.array2Table(this.loadedArray)[1];
        },
        async save2Server() {
            var c = confirm("이름 :" + this.userName + '\n'
                          + "나이 :" + this.userAge + '\n'
                          + "ID :" + this.userID + '\n'
                          + "로 입력하시겠습니까?");
            if(c == true){
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
            setTimeout(this.loadFromServer,1000);
            }
            else {
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
}

</script>

<style></style>