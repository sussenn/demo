import { createRouter, createWebHashHistory } from "vue-router";

import NotFound from '@/views/404.vue';
import Admin from "@/layouts/admin.vue";

const routes = [
    {
        path: "/",
        // 页面布局
        component: Admin,
        children: [{
            path: "/",
            // 别名
            alias: ["/home", "/index"],
            component: () => import("@/views/index.vue"),
            meta: {
                title: "首页"
            }
        },
        {
            path: "/goods/list",
            component: () => import("@/views/goods/list.vue"),
            meta: {
                title: "商品管理页"
            }
        },
        {
            path: "/notice/list",
            component: () => import("@/views/notice/list.vue"),
            meta: {
                title: "公告管理页"
            }
        }]
    },
    {
        path: "/content/getById/:id",
        component: () => import("@/views/content.vue")
    },
    {
        path: "/login",
        component: () => import("@/views/login.vue"),
        meta: {
            title: "登录页"
        }
    },
    {
        // 404页面匹配
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            title: "错误页"
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router