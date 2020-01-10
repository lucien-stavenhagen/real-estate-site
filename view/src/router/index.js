import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../components/home/Home.vue")
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/About.vue")
  },
  {
    name: "backend",
    path: "/backend",
    component: () => import("../components/backend/DashboardMain.vue")
  },
  {
    name: "allpropsview",
    path: "/allpropsview",
    component: () => import("../components/mainview/MainPropertyView.vue")
  },
  {
    name: "quicksearch",
    path: "/quicksearch",
    component: () => import("../components/search/QuickSearch.vue")
  },
  {
    name: "error",
    path: "/error/:message",
    component: () => import("../components/errors/ResponseError.vue"),
    props: true
  },
  {
    name: "viewsingle",
    path: "/viewsingle/:propinfo",
    component: () => import("../components/singleview/SinglePropertyView.vue"),
    props: true
  },
  {
    name: "deleteprop",
    path: "/deleteprop/:id",
    component: () =>
      import("../components/backend/properties/DeleteProperty.vue"),
    props: true
  },
  {
    name: "editprop",
    path: "/editprop/:id",
    component: () =>
      import("../components/backend/properties/EditSingleProperty.vue"),
    props: true
  },
  {
    name: "login",
    path: "/login",
    component: () => import("../components/user/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
