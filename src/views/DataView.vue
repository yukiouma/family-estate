<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import AddRecord from '../components/AddRecord.vue';

const newItemDialogDisplay = ref(false);
const activeCategoryID = ref(0);
const categories: { id: number, name: string, account: number, minues: boolean }[] = [
    { id: 1, name: "流动资金", account: 100000, minues: false },
    { id: 2, name: "固定资产", account: 1000000.1, minues: false },
    { id: 3, name: "投资理财", account: 100000.01, minues: false },
    { id: 4, name: "应收款", account: 0, minues: false },
    { id: 5, name: "负债", account: 100000, minues: true },
];

const accounts: { categoryId: number, subCategories: { id: number, name: string, account: number, minues: boolean }[] }[] = [
    {
        categoryId: 1, subCategories: [
            { id: 1, name: "存款", account: 100000, minues: false },
        ]
    },
    {
        categoryId: 2, subCategories: [
            { id: 1, name: "汽车", account: 100000, minues: false },
        ]
    },
    {
        categoryId: 3, subCategories: [
            { id: 1, name: "基金", account: 100000, minues: false },
        ]
    },
    {
        categoryId: 4, subCategories: [
            { id: 1, name: "公积金", account: 100000, minues: false },
        ]
    },
    {
        categoryId: 5, subCategories: [
            { id: 1, name: "房贷", account: 100000, minues: false },
        ]
    },
];

const accountDisplay = computed(() => {
    let result: any[] = [];
    for (const account of accounts) {
        if (account.categoryId === activeCategoryID.value) {
            result = account.subCategories;
        }
    }
    return result;
});

function activeCategory(id: number) {
    activeCategoryID.value = id;
}



function moneyDisplay(n: number): string {
    const source = n.toString().split(".");
    let float = "";
    if (source.length === 1) {
        float = "00";
    } else {
        if (source[1].length === 1) {
            float = `${source[1]}0`
        } else {
            float = source[1].slice(0, 2)
        }
    }
    let decimal: string[] = [];
    let times = 0;
    Array.from(source[0]).reverse().forEach((n: string) => {
        if (times === 3) {
            decimal.unshift(",");
            times = 0
        }
        decimal.unshift(n);
        times += 1;
    });
    return `￥${decimal.join("")}.${float}`;
}

onMounted(() => {
    activeCategoryID.value = categories[0].id;
});

</script>

<template>
    <el-scrollbar style="margin-top: 10px;">
        <div style="display: flex;">
            <el-tag :type="category.id === activeCategoryID ? 'success  ' : 'primary'" class="category"
                v-for="category in categories" :key="category.id" @click="() => { activeCategory(category.id) }">
                <template #default>
                    <!-- <div>{{ category.name }}</div> -->
                    <div>{{ category.name }}</div>
                    <div style="margin-top: 10px;">{{ moneyDisplay(category.account) }}</div>
                </template>
            </el-tag>
        </div>
    </el-scrollbar>
    <div style="margin-top: 10px;">
        <el-table :data="accountDisplay">
            <el-table-column label="分类" width="70px">
                <template #default="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label="数额">
                <template #default="scope">
                    {{ moneyDisplay(scope.row.account) }}
                </template>
            </el-table-column>
            <el-table-column>
                <template #header>
                    <el-button size="small" text style="float: right;" @click="() => { newItemDialogDisplay = true }">
                        <el-icon>
                            <DocumentAdd />
                        </el-icon>
                    </el-button>
                </template>
                <template #default>
                    <div style="float: right;">
                        <el-button plain text size="small">
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </el-button>
                        <el-button type="danger" plain text size="small">
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog destroy-on-close v-model="newItemDialogDisplay" title="添加项目" style="width: 95%;">
        <AddRecord :activeCategory="activeCategoryID" />
    </el-dialog>
</template>

<style scoped>
.category {
    margin-right: 10px;
    width: 115px;
    height: 80px;
    display: flex;
    flex-shrink: 0;
}
</style>