<script lang="ts" setup>
import { computed, onMounted, ref, type Ref } from 'vue';
import AddRecord from '../components/AddRecord.vue';
import { listTags } from '../apis/tag';
import ModifyData from '@/components/ModifyData.vue';
import { listSubCategoryData, listCategoryData } from '../apis/data';

const newItemDialogDisplay = ref(false);
const activeCategoryID = ref(0);
const activeTag = ref(0);
const modifyNumberDialogDisplay = ref(false);

const categoryAccount: Ref<{ categoryId: number; categoryName: string; value: number }[]> = ref([]);
const subCategoryAccount: Ref<{ id: number; categoryId: number; subCategory: string; value: number }[]> = ref([]);
const subCategoryAccountDisplay = computed(() => {
    return subCategoryAccount.value.filter(acc => acc.categoryId === activeCategoryID.value);
});

const tags: Ref<{ id: number, name: string }[]> = ref([]);

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

function activeTagStyle(id: number): string {
    return id === activeTag.value ? "success" : "primary";
}

async function clickTag(id: number) {
    if (id === activeTag.value) {
        activeTag.value = 0;
    } else {
        activeTag.value = id;
    }
    await updateAccount();
}

async function updateAccount() {
    categoryAccount.value = await listCategoryData(activeTag.value);
    subCategoryAccount.value = await listSubCategoryData(activeTag.value);
}

onMounted(async () => {
    await updateAccount();
    tags.value = await listTags();
    activeCategoryID.value = categoryAccount.value[0].categoryId;
});

</script>

<template>
    <el-scrollbar style="margin-top: 10px;">
        <div style="display: flex;">
            <el-tag :type="category.categoryId === activeCategoryID ? 'success  ' : 'primary'" class="category"
                v-for="category in categoryAccount" :key="category.categoryId"
                @click="() => { activeCategory(category.categoryId) }">
                <template #default>
                    <div>{{ category.categoryName }}</div>
                    <div style="margin-top: 10px;">{{ moneyDisplay(category.value) }}</div>
                </template>
            </el-tag>
        </div>
    </el-scrollbar>

    <div style="margin-top: 10px;">
        <el-scrollbar>
            <el-tag v-for="tag in tags" :key="tag.id" plain :type="activeTagStyle(tag.id)"
                style="width: 70px; margin-right: 5px;" @click="() => { clickTag(tag.id) }">
                {{ tag.name }}
            </el-tag>
        </el-scrollbar>
    </div>

    <div style="margin-top: 10px;">
        <el-table :data="subCategoryAccountDisplay">
            <el-table-column label="分类" width="100px">
                <template #default="scope">
                    <el-tag style="width: 70px; margin-left: 0;">
                        {{ scope.row.subCategory }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="数额">
                <template #default="scope">
                    {{ moneyDisplay(scope.row.value) }}
                </template>
            </el-table-column>
            <el-table-column>
                <template #header>
                    <el-button :disabled="activeTag === 0" size="small" text style="float: right;"
                        @click="() => { newItemDialogDisplay = true }">
                        <el-icon>
                            <DocumentAdd />
                        </el-icon>
                    </el-button>
                </template>
                <template #default>
                    <div style="float: right;">
                        <el-button :disabled="activeTag === 0" @click="() => { modifyNumberDialogDisplay = true }" plain
                            text size="small">
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </el-button>
                        <el-button :disabled="activeTag === 0" type="danger" plain text size="small">
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog style="width: 95%;" destroy-on-close v-model="newItemDialogDisplay" title="添加项目">
        <AddRecord :activeCategory="activeCategoryID" />
    </el-dialog>
    <el-dialog style="width: 95%;" v-model="modifyNumberDialogDisplay" destory-on-close title="修改数据">
        <ModifyData :account="100" />
    </el-dialog>
</template>

<style scoped>
.dialog {
    width: 95%;
}

.category {
    margin-right: 10px;
    width: 115px;
    height: 80px;
    display: flex;
    flex-shrink: 0;
}
</style>