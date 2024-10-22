<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, ref } from "vue";
import router from './router';
const menuDisplay = ref(false);
const modules: { [key: string]: string } = { "/data": "数据编辑", "/graph": "数据可视化", "/category": "分类管理", "/tag": "标签管理" };
const currentModule = ref(modules["/data"]);
function moduleChange(key: string) {
  currentModule.value = modules[key];
  menuDisplay.value = false;
}
onMounted(() => { router.push("/data") });
</script>

<template>
  <RouterView />
  <el-button class="float-menu" @click="() => { menuDisplay = true }">
    <el-icon>
      <Menu />
    </el-icon>
  </el-button>
  <el-drawer size="180px" v-model="menuDisplay" direction="ltr" :show-close="false">
    <el-menu mode="vertical" @select="moduleChange" router>
      <el-menu-item v-for="(module, path) in modules" v-bind:key="path" :index="path">
        {{ module }}
      </el-menu-item>
    </el-menu>
  </el-drawer>
</template>

<style scoped>
.el-menu--horizontal>.el-menu-item:nth-child(1) {
  margin-right: auto;
}

.float-menu {
  position: absolute;
  top: 4.5%;
  left: 1%;
  z-index: 1;
  opacity: 50%;
  height: 80px;
  width: 20px;
  padding: 0;
}
</style>
