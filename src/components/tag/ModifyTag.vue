<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { modifyTag } from '../../apis/tag';
import { ref } from 'vue';

const closeEvent = "close";
const emit = defineEmits<{ (e: "close"): void }>();
const props = defineProps<{ tag: { id: number, name: string } }>();
const tag = ref(props.tag);

async function submit() {
    const data = tag.value;
    if (data.name.length === 0) {
        ElMessage.error("标签不能为空");
    } else {
        try {
            await modifyTag(data);
            ElMessage.success("修改成功");
        } catch (error) {
            ElMessage.error(`修改失败: ${error}`)
        }
    }
    emit(closeEvent);
}
</script>

<template>
    <el-form label-width="auto">
        <el-form-item label="标签">
            <el-input v-model="tag.name" clearable />
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