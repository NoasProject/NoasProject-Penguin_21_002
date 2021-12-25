import Vue from "vue";
import VueRouter from "vue-router";
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
        path: "/register",
        name: "register",
        component: AccountRegister,
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