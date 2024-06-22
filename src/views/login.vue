<template>
    <el-row class="login-container">
        <!--  lg/md: el响应式布局 -->
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div>小小站点</div>
                <div>uname: zsc pwd: 123</div>
            </div>
        </el-col>

        <el-col :lg="8" :md="12" class="right">
            <h2 class="title">蓝色妖姬</h2>
            <div>
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>
            <!-- el表单Form -->
            <!-- rules:内容校验 formRef:获取检验结果-->
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
                <!-- prop:校验数据绑定 -->
                <el-form-item prop="uname">
                    <el-input v-model="form.uname" placeholder="请输入用户名">
                        <!-- 插槽引入图标 -->
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>

                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input type="password" v-model="form.pwd" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button round class="w-[250px]" type="primary" @click="onSubmit"
                        :loading="loading">登录</el-button>
                </el-form-item>

            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { toast } from '@/composables/util'
import { useRouter } from 'vue-router'
import { setToken } from '@/composables/auth'
import { useStore } from 'vuex'

const form = reactive({
    uname: "",
    pwd: "",
})
// 校验规则
const rules = {
    uname: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    pwd: [
        { required: true, message: '密码不能为空', trigger: 'blur' }
    ]
}
// 路由
const router = useRouter()
// 登录按钮加载等待(防止重复点击)
const loading = ref(false)
// 状态管理器
const store = useStore()
// 表单校验
const formRef = ref(null)
const onSubmit = () => {
    // 数据内容的校验
    formRef.value.validate(
        (valid) => {
            if (!valid) {
                return false
            }
            loading.value = true
            // 通过store处理登录请求
            store.dispatch("login", form).then(res => {
                if (res.code == 2000) {
                    toast("登录成功", "success");
                    // 跳转首页
                    router.push("/");
                } else {
                    toast(res.msg, "error");
                }
            })
            .finally(() => {
                    loading.value = false;
                });
            // 请求
            // login(form.uname, form.pwd)
            //     .then(res => {
            //         console.log(res);
            //         if (res.code === 2000) {
            //             toast("登录成功", "success");
            //             // 保存token
            //             setToken(res.data);

            //             // 跳转首页
            //             router.push("/");
            //         } else {
            //             toast(res.msg, "error");
            //         }
            //     })
            //     .finally(() => {
            //         loading.value = false;
            //     });
        }
    )
}
</script>

<style scoped>
/* css尺寸Sizing */
.login-container {
    @apply min-h-screen bg-indigo-500;
}

/* css布局FlexBox/Positioning
    垂直水平居中 */
.login-container .left,
.login-container .right {
    @apply flex items-center justify-center;
}

/* class定位 */
.login-container .right {
    @apply bg-light-50 flex-col;
}

/* 标签元素定位 */
.left>div>div:first-child {
    @apply font-bold text-5xl text-light-50 mb-4;
}

.left>div>div:last-child {
    @apply text-gray-200 text-sm;
}

.right .title {
    @apply font-bold text-3xl text-gray-800;
}

/* my-5:上下间距 space-x-2:x轴方向的间距 */
.right>div {
    @apply flex items-center justify-center text-gray-300 my-5 space-x-2;
}

.right .line {
    @apply h-[1px] w-16 bg-gray-200;
}
</style>