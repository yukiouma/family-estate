<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { listCategories } from '../apis/category';

const { activeCategory } = defineProps<{ activeCategory: number }>();
const steps = ref("100");
const activeCategoryId = ref(activeCategory);
const value = ref(null);
const categories: Ref<{ id: number, name: string }[]> = ref([]);

onMounted(async () => {
    categories.value = await listCategories();
});

</script>

<template>
    <el-form label-width="auto">
        <el-form-item label="分类">
            <el-select v-model="activeCategoryId">
                <el-option v-for="category in categories" :key="category.id" :value="category.id"
                    :label="category.name" />
            </el-select>
        </el-form-item>
        <el-form-item label="项目">
            <el-select>
            </el-select>
        </el-form-item>
        <el-form-item label="数额">
            <el-input-number min="0" :precision="2" :step="steps" v-model="value" controls-position="right"
                style="width: 60%;" />
            <el-select v-model="steps" style="margin-left: 5%;width: 35%;">
                <el-option label="±0.01" value="0.01" />
                <el-option label="±0.1" value="0.1" />
                <el-option label="±1" value="1" />
                <el-option label="±10" value="10" />
                <el-option label="±100" value="100" />
                <el-option label="±1000" value="1000" />
                <el-option label="±10000" value="10000" />
            </el-select>
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