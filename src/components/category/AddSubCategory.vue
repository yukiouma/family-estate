<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { addSubCategory } from '../../apis/category';
import { onMounted, ref } from 'vue';

const closeEvent = "close";
const newSubCategoryName = ref("");
const mainCategoryId = ref(0);
const props = defineProps<{ categories: { id: number, name: string }[], currentCategoryId: number }>();
const emit = defineEmits<{ (e: "close"): void }>();

let items: { id: number, name: string }[] = [];

async function sumbit() {
    if (newSubCategoryName.value.length === 0) {
        ElMessage.error("分类不能为空");
    } else {
        try {
            await addSubCategory(mainCategoryId.value, newSubCategoryName.value);
            ElMessage.success("分类创建成功");
        } catch (error) {
            ElMessage.error(`分类创建失败: ${error}`);
        }
    }
    emit(closeEvent);
}

onMounted(() => {
    items = props.categories;
    mainCategoryId.value = props.currentCategoryId;
})
</script>

<template>
    <el-form label-width="auto">
        <el-form-item label="一级分类">
            <el-select v-model="mainCategoryId">
                <el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类名称">
            <el-input v-model="newSubCategoryName" clearable />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="sumbit" plain>
                <el-icon>
                    <Check />
                </el-icon>
            </el-button>
            <el-button type="danger" @click="() => emit(closeEvent)" plain>
                <el-icon>
                    <Close />
                </el-icon>
            </el-button>
        </el-form-item>
    </el-form>
</template>