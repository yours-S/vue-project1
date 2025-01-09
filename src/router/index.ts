import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/index",
      name: "index",
      component: () => import("../views/Home/Index.vue"),
      children: [
        {
          path: "personalmessage",
          name: "personalmessage",
          component: () => import("../views/Home/Message/PersonalMeassage.vue"),
        },
        {
          path: "topiclist",
          name: "topiclist",
          component: () => import("../views/Home/Topic/TopicList.vue"),
        },
        {
          path: "userinfo",
          name: "userinfo",
          component: () => import("../views/Home/User/UserInfo.vue"),
        },
      ],
    },
  ],
});

export default router;
