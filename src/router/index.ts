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
      component: () => import("../views/Index.vue"),
      children: [
        {
          path: "personalmessage",
          name: "personalmessage",
          component: () => import("../components/message/PersonalMeassage.vue"),
        },
        {
          path: "userinfo",
          name: "userinfo",
          component: () => import("../components/user/UserInfo.vue"),
        },
        {
          path: "topiclist",
          name: "topiclist",
          component: () => import("../components/topic/TopicList.vue"),
        },
      ],
    },
  ],
});

export default router;
