<template>
    <div>
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Register Page</h1>

            <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group me-2">
                    <button type="button" class="btn btn-sm btn-outline-secondary">
                        <router-link to="/registerUser">USER</router-link>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">
                        <router-link to="/registerSeller">SELLER</router-link>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">
                        <router-link to="/registerBrand">BRAND</router-link>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">
                        <router-link to="/registerProject">PROJECT</router-link>
                    </button>
                </div>
            </div>
        </div>
        <div>
            <RouterView></RouterView>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import * as my from '../myFunction.js'; 

export default {
    data() {
        return {
            sellerName: null,
            loadedData: null,
            data : null,
            headers : null,
        }
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
            await axios.post("http://localhost:8000/tmpLoad","dummy").then(
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
}

</script>

<style>

</style>