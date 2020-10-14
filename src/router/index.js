import Vue from "vue";
import VueRouter from "vue-router";
import ListArticle from "../views/ListArticle.vue";
import CreateArticle from "../views/CreateArticle.vue";
import EditArticle from "../views/EditArticle.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: ListArticle,
    redirect: "/article/list",
  },
  {
    path: "/article/list",
    name: "ListArticle",
    component: ListArticle,
  },
  {
    path: "/article/create",
    name: "CreateArticle",
    component: CreateArticle,
  },
  {
    path: "/article/edit/:id",
    name: "EditArticle",
    component: EditArticle,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
