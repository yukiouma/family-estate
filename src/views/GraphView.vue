<script lang="ts" setup>
import { computed, onMounted, ref, type Ref } from 'vue';
import * as echart from "echarts";
import { listCategoryData, listSubCategoryData } from '@/apis/data';

const activeTagId = ref(0);
const tags: Ref<{ id: number, name: string }[]> = ref([{ id: 1, name: "yuki" }, { id: 2, name: "malney" }]);
const categoryData: Ref<{ id: number; name: string; value: number }[]> = ref([]);
const subCategoryData: Ref<{ id: number; categoryId: number; subCategory: string; value: number }[]> = ref([]);
const totalAmount = ref("");
const data = computed(() => {
    const set: Set<string> = new Set();
    set.add(totalAmount.value);
    subCategoryData.value.forEach(data => {
        set.add(data.subCategory);
    });
    categoryData.value.forEach(data => {
        if (data.value > 0) {
            set.add(data.name);
        }
    });
    return Array.from(set).map(e => {
        return { name: e };
    });
});

const linkData = computed(() => {
    const categoryMap = new Map(categoryData.value.map(d => [d.id, d]));
    const data: { source: string, target: string, value: number }[] = [];
    categoryData.value.forEach(d => {
        data.push({
            source: totalAmount.value,
            target: d.name,
            value: d.value,
        })
    });
    subCategoryData.value.forEach(d => {
        let source = categoryMap.get(d.categoryId);
        if (source) {
            data.push({
                source: source.name,
                target: d.subCategory,
                value: d.value,
            });
        }
    });
    return data;
});

function init(id: string) {
    const myChart = echart.init(document.getElementById(id), "dark", { height: "400px", width: "950px", });
    const option = {
        series: {
            type: 'sankey',
            layout: 'none',
            emphasis: {
                focus: 'adjacency'
            },
            data: data.value,
            links: linkData.value,
        }
    };
    myChart.setOption(option);
}

async function switchTag(id: number) {
    if (id === activeTagId.value) {
        activeTagId.value = 0;
    } else {
        activeTagId.value = id;
    }
    await fetchData();
    init("graph");
}

async function fetchData() {
    const category = await listCategoryData(activeTagId.value);
    const subCategory = await listSubCategoryData(activeTagId.value);
    let sum = 0;
    category.forEach(data => {
        sum += data.value;
    });
    category.forEach(e => {
        e.name = `${e.name} (${(e.value / sum * 100).toFixed(2)}%)\n￥${e.value.toFixed(2)}`;
    });
    subCategory.forEach(e => {
        e.subCategory = `${e.subCategory} (${(e.value / sum * 100).toFixed(2)}%)\n￥${e.value.toFixed(2)}`;
    })
    categoryData.value = category;
    subCategoryData.value = subCategory;
    totalAmount.value = `总资产\n￥${sum.toFixed(2)}`;
}

onMounted(async () => {
    await fetchData()
    init("graph")
})

</script>

<template>
    <div id="graph" />
    <div class="tags">
        <el-tag :type="tag.id === activeTagId ? 'success' : 'primary'" @click="() => { switchTag(tag.id) }" class="tag"
            v-for="tag in tags" :key="tag.id">{{ tag.name }}</el-tag>
    </div>
</template>

<style>
.tag {
    margin-right: 5px;
    width: 80px;
}

.tags {
    width: 180px;
    rotate: 90deg;
    top: 85px;
    left: 310px;
    position: absolute;
}

#graph {
    top: 125px;
    left: -235px;
    position: absolute;
    width: 105vh;
    height: 60vh;
    rotate: 90deg;
    transform: scale(0.88);
}
</style>