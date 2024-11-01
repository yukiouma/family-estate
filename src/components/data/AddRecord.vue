<script lang="ts" setup>
import { onMounted, ref, watch, type Ref } from 'vue';
import { listCategories, listSubCategories } from '../../apis/category';
import { listTags } from '../../apis/tag';
import { debounce } from 'lodash';
import { ElMessage } from 'element-plus';
import { createData } from '../../apis/data';

const closeEvent = "close";
const emit = defineEmits<{ (e: "close"): void }>();
const { activeCategory } = defineProps<{ activeCategory: number }>();
const steps = ref("100");
const activeCategoryId = ref(0);
const activeSubCategoryId: Ref<number | null> = ref(null)
const value: Ref<number | null> = ref(null);
const categories: Ref<{ id: number, name: string }[]> = ref([]);
const subCategories: Ref<{ id: number, name: string }[]> = ref([]);
const activeTag: Ref<number | null> = ref(null);
let tags: Ref<{
    id: number;
    name: string;
}[]> = ref([]);


onMounted(async () => {
    categories.value = await listCategories();
    subCategories.value = await listSubCategories(activeCategory);
    activeCategoryId.value = activeCategory;
    tags.value = await listTags();
    console.log(`add record: ${tags.value}`);
});

watch(activeCategoryId, debounce(async () => {
    subCategories.value = await listSubCategories(activeCategoryId.value);
    activeSubCategoryId.value = null;
    value.value = null;
}, 100));

function validate(): boolean {
    if (!activeSubCategoryId.value) {
        ElMessage.error("项目不能为空");
        return false;
    }
    if (!value.value) {
        ElMessage.error("数值不能为空");
        return false;
    }
    if (!activeTag.value) {
        ElMessage.error("标签不能为空");
        return false;
    }
    return true;
}

async function sumbit() {
    if (validate()) {
        try {
            await createData({
                categoryId: activeCategoryId.value,
                subCategoryId: activeSubCategoryId.value as number,
                value: value.value as number,
                tagId: activeTag.value as number
            });
            ElMessage.success("添加成功")
        } catch (error) {
            ElMessage.error(`添加项目失败: ${error}`);
        }
    }
    emit(closeEvent);
}


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
            <el-select v-model="activeSubCategoryId">
                <el-option v-for="subCategory in subCategories" :key="subCategory.id" :label="subCategory.name"
                    :value="subCategory.id" />
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
        <el-form-item label="标签">
            <el-select v-model="activeTag">
                <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.id" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" plain @click="sumbit">
                <el-icon>
                    <Check />
                </el-icon>
            </el-button>
            <el-button type="danger" plain @click="() => { emit(closeEvent) }">
                <el-icon>
                    <Close />
                </el-icon>
            </el-button>
        </el-form-item>
    </el-form>
</template>