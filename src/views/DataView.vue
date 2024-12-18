<script lang="ts" setup>
import { computed, onMounted, ref, type Ref } from 'vue';
import AddRecord from '../components/data/AddRecord.vue';
import ModifyData from '../components/data/ModifyData.vue';
import RemoveData from '../components/data/RemoveData.vue';
import HistoryView from './HistoryView.vue';
import { listSubCategoryData, listCategoryData } from '../apis/data';
import { listTags } from '../apis/tag';
import { moneyDisplay } from '../utils/format';

const newItemDialogDisplay = ref(false);
const activeCategoryID = ref(0);
const activeTag = ref(0);
const activeRecordId = ref(0);
const activeSubCategory = ref(0);
const activeSubCategoryName = ref("");
const modifyNumberDialogDisplay = ref(false);
const deleteConfirmDisplay = ref(false);
const categoryAccount: Ref<{ id: number; name: string; value: number }[]> = ref([]);
const subCategoryAccount: Ref<{ id: number; categoryId: number; subCategory: string; value: number }[]> = ref([]);
const historyDialogDisplay = ref(false);
const subCategoryAccountDisplay = computed(() => {
    return subCategoryAccount.value.filter(acc => acc.categoryId === activeCategoryID.value);
});
const tags: Ref<{ id: number, name: string }[]> = ref([]);
const activeItem: Ref<{
    id: number,
    categoryId: number,
    subCategory: string,
    value: number
}> = ref({
    id: 0,
    categoryId: 0,
    subCategory: "",
    value: 0,
});

function activeCategory(id: number) {
    activeCategoryID.value = id;
}

function activeTagStyle(id: number): string {
    return id === activeTag.value ? "success" : "primary";
}

function clickSubCategoryTag(activeRecord: number, subCategoryId: number, subCategoryName: string) {
    activeSubCategoryName.value = subCategoryName;
    activeSubCategory.value = subCategoryId;
    activeRecordId.value = activeTag.value === 0 ? 0 : activeRecord;
    historyDialogDisplay.value = true;
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
    activeCategoryID.value = categoryAccount.value[0].id;
});

</script>

<template>
    <el-scrollbar style="margin-top: 10px;">
        <div style="display: flex;">
            <el-tag :type="category.id === activeCategoryID ? 'success  ' : 'primary'" class="category"
                v-for="category in categoryAccount" :key="category.id" @click="() => { activeCategory(category.id) }">
                <template #default>
                    <div>{{ category.name }}</div>
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
                    <el-tag
                        @click="() => { clickSubCategoryTag(scope.row.id, scope.row.subCategoryId, scope.row.subCategory) }"
                        style="width: 70px; margin-left: 0;">
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
                <template #default="scope">
                    <div style="float: right;">
                        <el-button :disabled="activeTag === 0" @click="() => {
                            activeItem = scope.row;
                            modifyNumberDialogDisplay = true;
                        }" plain text size="small">
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </el-button>
                        <el-button :disabled="activeTag === 0" type="danger" plain text size="small" @click="() => {
                            activeItem = scope.row;
                            deleteConfirmDisplay = true;
                        }">
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog width="90%" destroy-on-close v-model="newItemDialogDisplay" title="添加项目">
        <AddRecord :activeCategory="activeCategoryID" :activeTag="activeTag" @close="async () => {
            await updateAccount();
            newItemDialogDisplay = false;
        }" />
    </el-dialog>
    <el-dialog width="90%" v-model="modifyNumberDialogDisplay" destroy-on-close title="修改数据">
        <ModifyData :id="activeItem.id" :account="activeItem.value" @close="async () => {
            await updateAccount();
            modifyNumberDialogDisplay = false;
        }" />
    </el-dialog>
    <el-dialog width="90%" destroy-on-close v-model="deleteConfirmDisplay">
        <RemoveData :id="activeItem.id" :name="activeItem.subCategory" @close="async () => {
            await updateAccount();
            deleteConfirmDisplay = false;
        }" />
    </el-dialog>
    <el-dialog v-model="historyDialogDisplay" destroy-on-close width="80%" top="30px">
        <template #header>
            <el-tag class="historyCategoryTag">{{ activeSubCategoryName }}</el-tag>
        </template>
        <HistoryView :record-id="activeRecordId" :sub-category-id="activeSubCategory" />
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

.historyCategoryTag {
    width: 100px;
}
</style>