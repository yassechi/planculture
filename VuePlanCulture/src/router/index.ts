import Users from "@/views/users/Users.vue";
import Login from "@/views/users/Login.vue";
// import AddUser from "@/views/users/AddUser.vue";
// import DelUser from "@/views/users/DelUser.vue";
// import EditUser from "@/views/users/EditUser.vue";

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/users",
      name: "users",
      component: Users,
    },

    // {
    //   path: '/add-user',
    //   name: 'AddUser',
    //   component: AddUser,
    // },
    //     {
    //   path: '/del-user',
    //   name: 'DelUser',
    //   component: DelUser,
    // },
    //     {
    //   path: '/edit-user',
    //   name: 'EditUser',
    //   component: EditUser,
    // },
   
  ],
});

export default router;
