<script lang="ts" setup>

const closeEvent = "close";
const { message } = defineProps<{ message: string }>();
const emit = defineEmits<(e: "close", confirm: boolean) => void>();

function confirm() {
    emit(closeEvent, true);
}

function notConfirm() {
    emit(closeEvent, false);
}

</script>

<template>
    <div style="margin-bottom: 10%;">
        <span>{{ message }}</span>
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