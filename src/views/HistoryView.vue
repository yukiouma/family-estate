<script lang="ts" setup>
import { listHistory, listCategoryHistory } from '@/apis/data';
import { moneyDisplay, changeDisplay } from '../utils/format';
import { computed, onMounted, ref, type Ref } from 'vue';

const { recordId, subCategoryId } = defineProps<{ recordId: number, subCategoryId: number }>();
const data: Ref<{
    id: number,
    date: string;
    amount: number;
    change: number;
    isMax: boolean;
    isMin: boolean;
}[]> = ref([]);
const displayData = computed(() => {
    return data.value.map(d => {
        return {
            date: d.date,
            amount: d.amount,
            dotType: d.change > 0 ? "danger" : (d.change === 0 ? "info" : "success"),
            amountType: d.isMax ? "danger" : (d.isMin ? "success" : "info"),
            change: d.change,
        }
    });
});

onMounted(async () => {
    if (recordId) {
        data.value = await listHistory(recordId);
    } else {
        data.value = await listCategoryHistory(subCategoryId);
    }
});
</script>

<template>
    <el-scrollbar max-height="600">
        <el-timeline class="timeline">
            <el-timeline-item v-for="(d, index) in displayData" :key="index" :timestamp="d.date" placement="top"
                :type="d.dotType">
                <el-text :type="d.amountType">{{ moneyDisplay(d.amount) }} {{ changeDisplay(d.change) }}</el-text>
            </el-timeline-item>
        </el-timeline>
    </el-scrollbar>
</template>

<style scoped>
.timeline {
    /* margin: 0; */
    padding-left: 2px;
}
</style>