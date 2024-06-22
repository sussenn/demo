<!-- 公共组件: 抽屉弹窗组件 -->
<template>
    <el-drawer v-model="showDrawer" :title="title" :size="size" :close-on-click-model="false"
        :destroy-on-close="destroyOnClose">
        <div class="formDrawer">
            <!-- 内容区域,可滑动 -->
            <div class="body">
                <slot></slot>
            </div>
            <!-- 固定最底下按钮区域 -->
            <div class="actions">
                <el-button type="primary" @click="submit">{{ confirmText }}</el-button>
                <el-button type="default" @click="close">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
const showDrawer = ref(false)
// v3-defineProps() 动态绑定引用者填充的属性
const props = defineProps({
    // 弹窗标题
    title: String,
    // 弹窗大小
    size: {
        type: String,
        default: "45%"
    },
    // 弹窗关闭时,是否销毁子元素
    destroyOnClose: {
        type: Boolean,
        default: false
    },
    // 按钮文字
    confirmText: {
        type: String,
        default: "提交"
    }
});

// 打开弹窗
const open = () => showDrawer.value = true
// 关闭弹窗
const close = () => showDrawer.value = false

// 按钮加载状态
const loading = ref(false)
const showLoading = () => loading.value = true
const hideLoading = () => loading.value = false


// v3-defineEmits() 绑定引用者clict事件
const emit = defineEmits(["submit"])
const submit = () => emit("submit")

// v3-defineExpose() 向父组件暴露open,close...等方法
defineExpose({
    open,
    close,
    showLoading,
    hideLoading
})
</script>

<style scoped>
.formDrawer {
    width: 100%;
    height: 100%;
    position: relative;
    @apply flex flex-col;
}

.formDrawer .body {
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
}

.formDrawer .actions {
    height: 50px;
    @apply mt-auto flex items-center;
}
</style>