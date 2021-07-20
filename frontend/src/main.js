import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import store from "./store/store";
import axios from "axios";

//Pages imports
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Brands from "./pages/Brands";
import NewCollections from "./pages/NewCollections";
import Archive from "./pages/Archive";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";

//Admin components imports
import Admin from "./components/admin/Admin";
import AdminDashboard from "./components/admin/AdminDashboard";

import AdminStatistics from "./components/admin/AdminDashboardTabs/AdminDashboardStatistics";

import AdminSliders from "./components/admin/AdminDashboardTabs/AdminMainSlider";
import AdminCreateSlider from "./components/admin/AdminDashboardTabs/AdminCreateMainSlide";
import AdminEditSlider from "./components/admin/AdminDashboardTabs/AdminEditMainSlide";

import AdminProducts from "./components/admin/AdminProducts";
import AdminProductsList from "./components/admin/AdminProducts/AdminProductsList";
import AdminCreateProduct from "./components/admin/AdminProducts/AdminCreateProduct";
import AdminEditProduct from "./components/admin/AdminProducts/AdminEditProduct";
import AdminSingleProduct from "./components/admin/AdminProducts/AdminSingleProduct";

import AdminCategory from "./components/admin/AdminCategory";
import AdminBrands from "./components/admin/AdminBrands";
import AdminOrders from "./components/admin/AdminOrders";
import AdminUsers from "./components/admin/AdminUsers";

//Login
import Login from "./components/auth/Login";

//Registration
import Registration from "./components/auth/Registration";

//Layouts
import adminLayout from "./layouts/adminLayout";
import defaultLayout from "./layouts/defaultLayout";

//Page not found import
import PageNotFound from "./pages/PageNotFound";

//Tailwind css
import "./assets/tailwind.css";

//Handling Expired Token (Forbidden Requests)
axios.interceptors.response.use(null, function(error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch("logout");
      return router.push("/login");
    }
  }
});

//Routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { breadcrumb: "Home" },
  },
  {
    path: "/about-us",
    name: "About",
    component: AboutUs,
    meta: { breadcrumb: "About us" },
  },
  {
    path: "/brands",
    name: "Brands",
    component: Brands,
    meta: { breadcrumb: "Brands" },
  },
  {
    path: "/new-collections",
    name: "NewCollections",
    component: NewCollections,
    meta: { breadcrumb: "New collections" },
  },
  {
    path: "/archive",
    name: "Archive",
    component: Archive,
    meta: { breadcrumb: "Archive" },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: { breadcrumb: "Contact" },
  },
  {
    path: "/products/:id",
    name: "Product",
    component: Product,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      breadcrumb: "Profile",
    },
    beforeEnter: (to, from, next) => {
      let authenticated = localStorage.getItem("token");
      let user = localStorage.getItem("user");
      if (!authenticated) {
        next({ name: "Login" });
      } else {
        if (user != 0) {
          console.log(user);
          next({ name: "Admin" });
        }
        next();
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { breadcrumb: "Login", guest: true },
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
    meta: { breadcrumb: "Registration", guest: true },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      layout: adminLayout,
      breadcrumb: "Admin",
    },
    children: [
      {
        path: "dashboard",
        component: AdminDashboard,
        name: AdminDashboard,
        meta: { breadcrumb: "Admin Dashboard" },
        children: [
          {
            path: "",
            component: AdminStatistics,
            meta: { breadcrumb: "Admin Statistics" },
          },
          {
            path: "sliders",
            component: AdminSliders,
            name: AdminSliders,
            meta: { breadcrumb: "Admin Slider" },
          },
          {
            path: "create-slider",
            component: AdminCreateSlider,
            name: AdminCreateSlider,
            meta: { breadcrumb: "Admin Create Slider" },
          },
          {
            path: "edit-slider/:id",
            component: AdminEditSlider,
            name: AdminEditSlider,
            meta: { breadcrumb: "Admin Edit Slider" },
          },
        ],
      },

      {
        path: "products",
        component: AdminProducts,
        name: "AdminProducts",

        children: [
          {
            path: "",
            component: AdminProductsList,
            name: AdminProductsList,
            meta: { breadcrumb: "Admin Product" },
            props: true,
          },
          {
            path: "product/:id",
            component: AdminSingleProduct,
            name: AdminSingleProduct,
            meta: { breadcrumb: "Admin Product" },
          },
          {
            path: "create-product",
            component: AdminCreateProduct,
            name: AdminCreateProduct,
            meta: { breadcrumb: "Admin Create Product" },
          },
          {
            path: "edit-product/:id",
            component: AdminEditProduct,
            name: AdminEditProduct,
            meta: { breadcrumb: "Admin Edit Product" },
          },
        ],
      },
      {
        path: "category",
        component: AdminCategory,
      },
      {
        path: "brands",
        component: AdminBrands,
      },
      {
        path: "orders",
        component: AdminOrders,
      },
      {
        path: "users",
        component: AdminUsers,
      },
    ],
    beforeEnter: (to, from, next) => {
      let authenticated = localStorage.getItem("token");
      let user = localStorage.getItem("user");
      if (!authenticated) {
        next({ name: "Login" });
      } else {
        if (user != 1) {
          console.log(user);
          next({ name: "Profile" });
        }
        next();
      }
    },
  },

  {
    path: "/:catchAll(.*)",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authenticated = store.getters["user/isAuthenticated"];
  if (to.matched.some((record) => record.meta.guest)) {
    if (!authenticated) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

createApp(App)
  .use(router)
  .use(store)
  .component("default-layout", defaultLayout)
  .component("admin-layout", adminLayout)

  .mount("#app");
