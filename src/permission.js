// 权限控制
import router from '@/router'
import { getToken } from './composables/auth'
import { toast } from './composables/util'
import store from './store'

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    // 没有token,并且不是到达/login
    const token = getToken();
    if (!token && to.path != "/login") {
        // 提示
        toast("请先登录", "error");
        // 跳转到/login
        return next({ path: "/login" })
    }

    // 防止重复登录
    if (token && to.path == "/login") {
        toast("当前用户已登录", "error");
        return next({ path: from.path ? from.path : "/" })
    }

    // 获取用户信息, 存到vuex中
    if (token) {
        await store.dispatch("getUserinfo")
    }

    // 设置页面title
    let title = to.meta.title ? to.meta.title : ""
    document.title = title

    next();
})