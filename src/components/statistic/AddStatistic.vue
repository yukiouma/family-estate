<script lang="ts" setup>
import { listCategories } from '@/apis/category';
import { addStatistic } from '@/apis/statistic';
import { ElMessage } from 'element-plus';
import { onMounted, ref, type Ref } from 'vue';

const emit = defineEmits<{
    (e: "close"): void;
}>();
const label = ref("");
const categoryId: Ref<number[]> = ref([]);
const categories: Ref<{
    id: number;
    name: string;
}[]> = ref([]);

async function submit() {
    await addStatistic({
        name: label.value,
        categories: categoryId.value,
    });
    ElMessage.success("创建成功");
    close();
}

function close() {
    emit("close");
}

onMounted(async () => {
    categories.value = await listCategories();
});
</script>

<template>
    <el-form>
        <el-form-item label="描述">
            <el-input v-model="label" />
        </el-form-item>
        <el-form-item label="分类">
            <el-select v-model="categoryId" multiple>
                <el-option v-for="category in categories" :key="category.id" :value="category.id"
                    :label="category.name" />
            </el-select>
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
.confirm {
    margin-top: 20px;
}
</style>