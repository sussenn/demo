import { showModal,toast } from '@/composables/util'

import { logout } from '@/api/manager'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useLogout() {
    const router = useRouter();
    const store = useStore();

    function handleLogout() {
        showModal("是否退出登录?").then(res => {
            logout().finally(() => {
                // 请求退出登录
                store.dispatch("logout");
                // 跳转到/login`
                router.push("/login");
                // 弹窗提示
                toast("退出登录成功");
            })
        })
            // "取消"的处理
            .catch(() => { });
    };

    return {
        handleLogout
    }
}