<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增/刷新 -->
        <div class="flex items-center justify-between mb-4">
            <el-button type="primary" size="small" @click="handleAdd">
                新增
            </el-button>
            <el-tooltip effect="dark" content="刷新数据" placement="top">
                <el-button text @click="getData">
                    <el-icon :size="20">
                        <Refresh />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="公告标题" />
            <el-table-column prop="createTime" label="创建时间" width="380" />
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>

                    <!-- 删除提示 -->
                    <el-popconfirm title="是否删除?" confirmButtonText="确认" cancelButtonText="取消"
                        @confirm="handleDel(scope.row.id)">
                        <template #reference>
                            <el-button text class="px-1" type="primary" size="small">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>

        <!-- 新增功能的抽屉 -->
        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="form.title" placeholder="公告标题"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>


<script setup>
import { computed, reactive, ref } from 'vue';
import { getNoticeList, addNotice, editNotice, delNotice } from '@/api/notice';
import FormDrawer from '@/components/FormDrawer.vue';
import { toast } from '@/composables/util';

const tableData = ref([])
const loading = ref(false)

// 分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)

function getData(page = null) {
    if (typeof page == "number") {
        currentPage.value = page
    }
    loading.value = true
    getNoticeList(
        currentPage.value,
        limit.value
    )
        .then(res => {
            console.log(res);
            tableData.value = res.data.list
            total.value = res.data.total
        })
        .finally(() => {
            loading.value = false
        })
};

getData();

const formDrawerRef = ref(null)
const formRef = ref(null)
const form = reactive({
    title: '',
    content: ''
})
const rules = {
    title: [
        { required: true, message: '公告标题不能为空', trigger: 'blur' }
    ],
    content: [
        { required: true, message: '公告内容不能为空', trigger: 'blur' }
    ]
}

// 删除
const handleDel = (id) => {
    loading.value = true
    delNotice(id)
        .then(res => {
            toast("删除成功")
            getData(1)
        })
        .finally(() => {
            loading.value = false
        })
}

// 标识 0:新增 other:修改
const editId = ref(0);

// 重置表单
function resetForm(row = false) {
    // 有数据表示修改, 去除规则验证
    if (formRef.value) formRef.value.clearValidate();
    // 修改的表单就填充数据
    if (row) {
        for (const key in form) {
            form[key] = row[key]
        }
    } else {
        for (const key in form) {
            form[key] = ''
        }
    }
}

// 修改
const handleEdit = (row) => {
    editId.value = row.id
    resetForm(row);
    formDrawerRef.value.open()
}

// 新增
const handleAdd = () => {
    editId.value = 0
    resetForm()
    formDrawerRef.value.open()
}

const drawerTitle = computed(() => editId.value ? '修改' : '新增');

const handleSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) return;

        formDrawerRef.value.showLoading();

        // 新增or修改
        const fun = editId.value ? editNotice(editId.value, form) : addNotice(form)
        fun.then(res => {
            toast(drawerTitle.value + "成功")
            // 修改:刷新当前页 新增刷新第一页
            getData(editId.value ? currentPage.value : 1)
            formDrawerRef.value.close();
        })
            .finally(() => {
                formDrawerRef.value.hideLoading();
            })
    })
}
</script>