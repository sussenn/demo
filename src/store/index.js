// 状态管理
import { createStore } from 'vuex'
import { login, getUserInfo } from '@/api/manager.js'
import { setToken, removeToken } from '@/composables/auth'

const store = createStore({
    state() {
        return {
            // 用户信息
            user: {},

            // 侧边菜单栏的宽度
            asideWidth: "250px"
        }
    },
    mutations: {
        // 记录用户信息
        SET_USERINFO(state, user) {
            state.user = user
        },

        // 展开/收缩侧边菜单栏
        handleAsideWidth(state){
            state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px"
        } 
    },
    actions: {
        // 登录请求的处理
        login({ commit }, { uname, pwd }) {
            return new Promise((resolve, reject) => {
                login(uname, pwd).then(res => {
                    setToken(res.data)
                    resolve(res)
                })
                    .catch(err => reject(err))
            })
        },
        // 请求当前用户登录信息
        getUserinfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    commit("SET_USERINFO", res.data);
                    resolve(res);
                })
                    .catch(err => reject(err));
            })
        },
        // 退出登录
        logout({ commit }) {
            // 移除cookie
            removeToken()
            // 清空用户vuex状态
            commit("SET_USERINFO", {})
        }
    }
});

export default store;