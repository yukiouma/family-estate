<script lang="ts" setup>
import { ref } from 'vue';
import { updateData } from '../../apis/data';
import { ElMessage } from 'element-plus';

const closeEvent = "close";
const props = defineProps<{ account: number, id: number }>();
const account = ref(props.account);
const emit = defineEmits<(e: "close") => void>();
const step = ref("100");
async function submit() {
    try {
        await updateData(props.id, account.value);
        ElMessage.success("更新成功");
    } catch (error) {
        ElMessage.error(`更新失败: ${error}`)
    }
    emit(closeEvent);
}

</script>

<template>
    <el-form>
        <el-form-item>
            <el-form-item label="数额">
                <el-input-number min="0" :precision="2" :step="step" v-model="account" controls-position="right"
                    style="width: 60%;" />
                <el-select v-model="step" style="margin-left: 5%;width: 35%;">
                    <el-option label="±0.01" value="0.01" />
                    <el-option label="±0.1" value="0.1" />
                    <el-option label="±1" value="1" />
                    <el-option label="±10" value="10" />
                    <el-option label="±100" value="100" />
                    <el-option label="±1000" value="1000" />
                    <el-option label="±10000" value="10000" />
                </el-select>
            </el-form-item>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" plain @click="submit">
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