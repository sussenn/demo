<template>
    <!-- 外层容器 -->
    <el-container>
        <!-- 头部 -->
        <el-header>
            <f-header />
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="$store.state.asideWidth">
                <f-menu></f-menu>
            </el-aside>
            <el-main>
                <!-- 标签导航 -->
                <f-tage-list></f-tage-list>
                <!-- 引入 内容区域 -->
                <router-view />
            </el-main>

        </el-container>
    </el-container>
</template>

<script setup>
import FHeader from './composables/FHeader.vue'
import FMenu from './composables/FMenu.vue'
import FTageList from './composables/FTageList.vue'


</script>

<style scoped></style>