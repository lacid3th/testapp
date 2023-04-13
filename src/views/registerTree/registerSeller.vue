<template>
    <div>
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 class="h2">Seller Register</h4>
        </div>
        <div style="display: block; justify-items: flex-start"
            class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom gap-2">
            <input v-model="sellerName" class="form-control" type="text" placeholder="Seller Name"
                aria-label="default input example">
            <input class="form-control" type="text" placeholder="Brand Name" aria-label="default input example">
            <input class="form-control" type="text" placeholder="Manager Name" aria-label="default input example">
            <div>
                <button type="button" class="btn btn-outline-secondary" @click="SBMApply">
                    Query
                </button>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>
<script>
// import axios from "axios";
// import * as my from '../myFunction.js'; 

export default {
    data() {
        return {
            data : null,
            headers : null,
        }
    },
    methods: {
        
    },
    // 여기 있으면 페이지 불러오자마자 실행됨
    mounted() {
        
    },
}

</script>

<style></style>