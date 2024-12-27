<script lang="ts" setup>
import { getStatistic, modifyStatistic } from '@/apis/statistic';
import { ElMessage } from 'element-plus';
import { onMounted, ref, type Ref } from 'vue';


const { id } = defineProps<{
    id: number;
}>();
const emit = defineEmits<{
    (e: "close"): void;
}>();
const data: Ref<{
    id: number;
    name: string;
    categories: {
        id: number;
        name: string;
    }[];
}> = ref({
    id: 0,
    name: '',
    categories: []
});

async function submit() {
    const { id, name } = data.value;
    await modifyStatistic(id, name);
    ElMessage.success("更新成功");
    close();
}

function close() {
    emit("close");
}

onMounted(async () => {
    data.value = await getStatistic(id);
});
</script>

<template>
    <el-form label-width="auto">
        <el-form-item label="描述">
            <el-input v-model="data.name" />
        </el-form-item>
        <el-form-item label="合计类别">
            <div>
                <el-tag class="category-tag" v-for="category in data.categories" :key="category">
                    {{ category }}
                </el-tag>
            </div>
        </el-form-item>
        <div class="confirm">
            <el-button @click="submit" type="primary" plain>
                <el-icon>
                    <Check />
                </el-icon>
            </el-button>
            <el-button @click="close" type="danger" plain>
                <el-icon>
                    <Close />
                </el-icon>
            </el-button>
        </div>
    </el-form>
</template>

<style scoped>
.category-tag {
    margin-right: 2px;
}
</style>