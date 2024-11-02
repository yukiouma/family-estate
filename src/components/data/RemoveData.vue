<script lang="ts" setup>
import { removeData } from '@/apis/data';

const closeEvent = "close";
const { id, name } = defineProps<{ id: number, name: string }>();
const emit = defineEmits<(e: "close", confirm: boolean) => void>();

async function confirm() {
    await removeData(id);
    emit(closeEvent, true);
}

function notConfirm() {
    emit(closeEvent, false);
}

</script>

<template>
    <div style="margin-bottom: 10%;">
        <span>是否删除项目: {{ name }}</span>
    </div>
    <el-button type="primary" plain @click="confirm">
        <el-icon>
            <Check />
        </el-icon>
    </el-button>
    <el-button type="danger" plain @click="notConfirm">
        <el-icon>
            <Close />
        </el-icon>
    </el-button>
</template>