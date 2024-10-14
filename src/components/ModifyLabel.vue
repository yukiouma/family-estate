<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const props = defineProps<{ label: string }>();
const label = ref(props.label);
const emit = defineEmits<(e: string, label: string) => void>();

function sumbit() {
    if (label.value.length === 0) {
        ElMessage.error("分类或者标签不能为空");
    } else {
        emit("changeLabel", label.value);
    }
}

</script>

<template>
    <el-form>
        <el-form-item label="分类">
            <el-input v-model="label" clearable />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" plain @click="sumbit">
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