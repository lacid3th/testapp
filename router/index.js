// @/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import mainInput from "../src/views/mainInput.vue";

const routes = [
    {
        path: "/",
        name: "mainInput",
        component: mainInput,
    },
    {
        path: "/result",
        name: "resultPage",
        component: () => import("../src/views/resultPage.vue"),
    },
    {
        path: "/register",
        name: "registerPage",
        component: () => import("../src/views/registerPage.vue"),
        children: [
            // {
            //     path: "",
            //     component: () => import("../src/views/registerPage.vue"),
            // },
            {
                path: "/registerUser",
                name: "registerUser",
                component: () => import("../src/views/registerTree/registerUser.vue"),
            },
            {
                path: "/registerSeller",
                name: "registerSeller",
                component: () => import("../src/views/registerTree/registerSeller.vue"),
            },
            {
                path: "/registerBrand",
                name: "registerBrand",
                component: () => import("../src/views/registerTree/registerBrand.vue"),
            },
            {
                path: "/registerProject",
                name: "registerProject",
                component: () => import("../src/views/registerTree/registerProject.vue"),
            },
        ]
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;