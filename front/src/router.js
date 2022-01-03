import Vue from "vue";
import VueRouter from "vue-router";

import Login from "./views/Login.vue"
import Accountregister from "./views/Accountregister.vue"
import Top from "./views/Top.vue"
import Profile from "./views/Profile.vue"

//
// 他のコンポーネントは省略
//

Vue.use(VueRouter);

const routes = [
    // ログインページ
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    // 登録
    {
        path: "/accountRegister",
        name: "accountRegister",
        component: Accountregister,
    },
    // トップページ
    {
        path: "/top",
        name: "top",
        component: Top,
    },
    // プロフィール
    {
        path: "/profile",
        name: "profile",
        component: Profile,
    }
];

const router = new VueRouter(
    {
        // デフォルトの挙動では URL に `#` が含まれる.
        // URL から hash を取り除くには `mode:history` を指定する
        mode: "history",
        // base: process.env.BASE_URL,
        routes: routes,
    }
);

export default router;