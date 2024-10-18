<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const className = ref("");
</script>

<template>
    <el-form label-width="auto">
        <el-form-item label="分类名称">
            <el-input v-model="className" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-form-item>
                <el-button type="primary" plain>
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
        </el-form-item>
    </el-form>
</template>