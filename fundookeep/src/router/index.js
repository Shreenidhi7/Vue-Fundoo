import Vue from "vue";

import VueRouter from "vue-router";

import Vuelidate from "vuelidate";

import VueMaterial from "vue-material";

import "vue-material/dist/vue-material.min.css";

import "vue-material/dist/theme/default.css";

import "vue-material-design-icons/styles.css";

import login from "../components/login";

import signup from "../components/signup";

import dashboard from "../components/dashboard";

import dash from "../components/dash";

import notes from "../components/notes";

import takeNote from "../components/takeNote";

import reminder from "../components/reminder";

import archive from "../components/archive";

import trash from "../components/trash";

import noteDisplay from "../components/noteDisplay";

import iconList from "../components/iconList";

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(VueMaterial);

const routes = [
  {
    path: "/",
    redirect: {
      name: "login"
    }
  },

  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/signup",
    name: "signup",
    component: signup
  },
  {
    path: "/icon-list",
    name: "icon-list",
    component: iconList
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    beforeEnter: (to, from, next) => {
      if (
        localStorage.getItem("token") === "" ||
        localStorage.getItem("token") === "undefined" ||
        localStorage.getItem("token") === null
      ) {
        next("/login");
      } else {
        next(true);
      }
    },

    children: [
      {
        path: "/",
        redirect: "notes",
        pathMatch: "full"
      },

      {
        path: "notes",
        // name: "notes",
        component: notes
      },

      {
        path: "take-note",
        // name: "takeNote",
        component: takeNote
      },

      {
        path: "reminder",
        // name: "reminder",
        component: reminder
      },

      {
        path: "archive",
        // name: "archive",
        component: archive
      },

      {
        path: "trash",
        name: "trash",
        component: trash
      },
      {
        path: "note-display",
        name: "note-display",
        component: noteDisplay
      }
    ]
  },

  {
    path: "/dash",
    name: "dash",
    component: dash
  }

  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
