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
];

const router = createRouter({
history: createWebHistory(process.env.BASE_URL),
routes,
});

export default router;