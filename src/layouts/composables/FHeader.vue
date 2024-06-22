<template>
    <div class="f-header">
        <span class="logo">
            <el-icon class=" mr-1">
                <ChromeFilled />
            </el-icon>
            后台系统
        </span>
        <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
            <Fold v-if="$store.state.asideWidth == '250px'" />
            <Expand v-else />
        </el-icon>
        <el-tooltip effect="dark" content="刷新" placement="bottom">
            <el-icon class="icon-btn" @click="onRefresh">
                <Refresh />
            </el-icon>
        </el-tooltip>

        <!-- 头部右边 -->
        <!-- 自动靠右 margin-left: auto -->
        <div class=" ml-auto flex items-center">
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-light-50">
                    <el-avatar class=" mr-2" :size="50" :src="$store.state.user.avatar" />
                    {{ $store.state.user.name }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="editPwd">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <!-- el 抽屉组件 -->
    <el-drawer v-model="showDrawer" title="修改密码" :close-on-click-modal="false">
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">

            <el-form-item prop="oldPwd" label="旧密码">
                <el-input v-model="form.oldPwd" placeholder="请输入旧密码" />
            </el-form-item>
            <el-form-item prop="pwd" label="新密码">
                <el-input type="password" v-model="form.pwd" placeholder="请输入密码" show-password />
            </el-form-item>
            <el-form-item prop="rePwd" label="确认密码">
                <el-input type="password" v-model="form.rePwd" placeholder="请输入确认密码" show-password />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
            </el-form-item>

        </el-form>
    </el-drawer>
</template>

<script setup>
import { toast } from '@/composables/util'
import { editPwd } from '@/api/manager'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { useLogout } from '@/composables/useManager'

// 修改密码弹窗
const showDrawer = ref(false)
const loading = ref(false)

const form = reactive({
    oldPwd: "",
    pwd: "",
    rePwd: ""
})

const rules = {
    oldPwd: [
        { required: true, message: '旧密码不能为空', trigger: 'blur' }
    ],
    pwd: [
        { required: true, message: '密码不能为空', trigger: 'blur' }
    ],
    rePwd: [
        { required: true, message: '确认密码不能为空', trigger: 'blur' }
    ]
}

const router = useRouter()
const store = useStore()

const formRef = ref(null)
const onSubmit = () => {
    formRef.value.validate(
        (valid) => {
            if (!valid) {
                return false
            }
            loading.value = true
            editPwd(form).then(res => {
                toast("修改密码成功,请重新登录")
                store.dispatch("logout")
                router.push("/login");
            })
                .finally(() => {
                    loading.value = false
                })
        }
    )
}


// 刷新功能
const onRefresh = () => location.reload();

// 从useManger.js引用方法
const {
    handleLogout
} = useLogout()

const handleCommand = (c) => {
    switch (c) {
        case "logout":
            handleLogout();
            break;
        case "editPwd":
            showDrawer.value = true
            break;
    }
}
</script>

<style scoped>
.f-header {
    /* fixed: 页面滑动时固定 */
    @apply flex items-center bg-green-500 text-light-50 fixed top-0 left-0 right-0;
    height: 64px;
}

.logo {
    @apply flex items-center justify-center text-xl font-thin;
    width: 250px;
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    /* 鼠标移入时变手形态 */
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-green-400;
}

/* 头像下拉框 */
.f-header .dropdown {
    @apply flex justify-center items-center mx-5;
    height: 64px;
    cursor: pointer;
}
</style>