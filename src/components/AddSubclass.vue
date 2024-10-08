<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const newSubclassName = ref("");
const mainClassId = ref("");
const props = defineProps<{ classes: { id: number, name: string }[], currentMainClassId: number }>();
let items: { id: number, name: string }[] = [];

onMounted(() => {
    items = props.classes;
    mainClassId.value = props.currentMainClassId.toString();
})
</script>

<template>
    <el-form label-width="auto">
        <el-form-item label="一级分类">
            <el-select v-model="mainClassId">
                <el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id.toString()" />
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类名称">
            <el-input v-model="newSubclassName" clearable />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" plain>
                <el-icon>
                    <Check />
                </el-icon>
            </el-button>
            <el-button type="danger" plain>
                <el-icon>
                    <Close />
                </el-icon>
            </el-button>
        </el-form-item>
    </el-form>
</template>