import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    name: "backend",
    path: "/backend",
    component: () => import("../views/backend/NewPropertyView.vue")
  },
  {
    name: "allpropsview",
    path: "/allpropsview",
    component: () => import("../views/MockUpPropView.vue")
  },
  {
    name: "quicksearch",
    path: "/quicksearch",
    component: () => import("../views/QuickSearch.vue")
  },
  {
    name: "error",
    path: "/error/:error",
    component: () => import("../views/errors/ResponseError.vue"),
    props: true
  },
  {
    name: "viewsingle",
    path: "/viewsingle/:propinfo",
    component: () => import("../views/SinglePropertyView.vue"),
    props: true
  },
  {
    name: "deleteprop",
    path: "/deleteprop/:id",
    component: () => import("../components/backend/DeleteProperty.vue"),
    props: true
  },
  {
    name: "editprop",
    path: "/editprop/:id",
    component: () => import("../components/backend/EditSingleProperty.vue"),
    props: true
  },
  {
    path: "/delme",
    component: () => import("../views/TestPaginated.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
