<template>
  首页内容<br>
  <div class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>


  {{ $store.state.user }}
  <br>

</template>
<script setup>
import { showModal, toast } from '@/composables/util'
import { logout } from '@/api/manager'
import { removeToken } from '@/composables/auth'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'



</script>

<style scoped></style>