import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import UserTodoView from "../views/UserTodoView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/todos",
    name: "todos",
    component: UserTodoView,
  },
];
const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
