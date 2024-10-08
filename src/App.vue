<script setup lang="ts">
import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from "vue";

const modules: { [key: string]: string } = { "/data": "数据编辑", "/graph": "数据可视化", "/class": "分类管理" };
const currentModule = ref(modules["/data"]);
function moduleChange(key: string) {
  currentModule.value = modules[key];
}
</script>

<template>
  <el-menu mode="horizontal" @select="moduleChange" router>
    <el-sub-menu>
      <template #title>{{ currentModule }}</template>
      <el-menu-item v-for="(module, path) in modules" v-bind:key="path" :index="path">{{ module
        }}</el-menu-item>
    </el-sub-menu>
  </el-menu>
  <!-- <el-button type="primary" plain>流动资金</el-button>
  <el-button type="success" plain>固定资产</el-button>
  <el-button type="warning" plain>投资理财</el-button>
  <el-button type="" plain>应收款</el-button>
  <el-button type="danger" plain>负债</el-button> -->
  <RouterView />
</template>

<style scoped>
.el-menu--horizontal>.el-menu-item:nth-child(0) {
  margin-right: auto;
}
</style>
