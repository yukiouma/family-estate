<script lang="ts" setup>
import { addCategory } from '../../apis/category';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
const category = ref("");
const closeEvent = "close";
const emit = defineEmits<{ (e: "close"): void }>();

async function submit() {
    if (category.value.length === 0) {
        ElMessage.error("分类不能为空");
    } else {
        try {
            await addCategory(category.value);
            ElMessage.success("分类创建成功");
        } catch (error) {
            ElMessage.error(`分类创建失败: ${error}`);
        }
    }
    emit(closeEvent);
}
</script>

<template>
    <el-form label-width="auto">
        <el-form-item label="分类名称">
            <el-input v-model="category" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit" plain>
                    <el-icon>
                        <Check />
                    </el-icon>
                </el-button>
                <el-button type="danger" @click="() => { emit(closeEvent) }" plain>
                    <el-icon>
                        <Close />
                    </el-icon>
                </el-button>
            </el-form-item>
        </el-form-item>
    </el-form>
</template>