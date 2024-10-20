<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { addTag } from '../../apis/tag';
import { ref } from 'vue';

const newTag = ref("");
const closeEvent = "close";
const emit = defineEmits<{ (e: "close"): void }>();

async function submit() {
    if (newTag.value.length === 0) {
        ElMessage.error("标签不能为空");
    } else {
        try {
            await addTag(newTag.value);
            ElMessage.success("创建成功");
        } catch (error) {
            ElMessage.error(`创建失败: ${error}`);
        }
    }
    emit(closeEvent);
}
</script>

<template>
    <el-form label-width="auto">
        <el-form-item label="标签">
            <el-input v-model="newTag" clearable />
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" type="primary" plain>
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