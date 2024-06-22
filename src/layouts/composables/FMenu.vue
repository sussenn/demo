<template>
    <div class="f-menu" :style="{ width: $store.state.asideWidth }">
        <el-menu :default-active="defActive" unique-opened :collapse-transition="false" :collapse="isCollapse" default-active="2" class=" border-0" @select="handleSelect">
            <template v-for="(item, index) in asideMenus" :key="index">
                <!-- 有子级的一级菜单 -->
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontPath">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <!-- 没有子级的一级菜单 -->
                <el-menu-item v-else :index="item.frontPath">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute()
// 获取当前路由path(使菜单默认选中当前路径)
const defActive = ref(route.path);

const store = useStore()
// 是否折叠侧边栏
const isCollapse = computed(() => !(store.state.asideWidth == '250px'))

const asideMenus = [{
    "name": "后台面板",
    "icon": "help",
    "child": [
        {
            "name": "主控台",
            "icon": "home-filled",
            "frontPath": "/"
        }
    ]
},
{
    "name": "商城管理",
    "icon": "shopping-bag",
    "child": [
        {
            "name": "商品管理",
            "icon": "shopping-cart-full",
            "frontPath": "/goods/list"
        }
    ]
},
{
    "name": "公告管理",
    "icon": "bell",
    "frontPath": "/notice/list"
}];

const router = useRouter()

// 点击菜单跳转
const handleSelect = (path) => {
    router.push(path)
}

</script>

<style scoped>
.f-menu {
    top: 64px;
    bottom: 0;
    left: 0;
    /* 可滑动 */
    overflow-y: auto;
    overflow-x: hidden;
    @apply shadow-md fixed bg-light-50;
    /* 动画效果 */
    transition: all 0.2s;
}
/* 隐藏滚动条 */
.f-menu::-webkit-scrollbar{
    width: 0px;
}
</style>