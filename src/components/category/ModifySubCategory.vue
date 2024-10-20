<script lang="ts" setup>
import { modifyCategory } from '../../apis/category';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
const closeEvent = "close";
const props = defineProps<{ category: { id: number, name: string }, }>();
const name = ref(props.category.name);
const emit = defineEmits<{ (e: "close"): void }>();

async function submit() {
    if (name.value.length === 0) {
        ElMessage.error("分类不能为空");
    } else {
        try {
            await modifyCategory({ id: props.category.id, name: name.value });
            ElMessage.success("分类修改成功");
        } catch (error) {
            ElMessage.error(`分类修改失败: ${error}`);
        }
    }
    emit(closeEvent);
}
</script>

<template>
    <el-form label-width="auto">
        <el-form-item label="分类名称">
            <el-input v-model="name" clearable></el-input>
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