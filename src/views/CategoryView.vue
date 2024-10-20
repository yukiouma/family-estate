<script lang="ts" setup>
import { computed, onMounted, ref, type Ref } from 'vue';
import AddCategory from '../components/category/AddCategory.vue';
import AddSubCategory from '../components/category/AddSubCategory.vue';
import ModifySubCategory from '../components/category/ModifySubCategory.vue';
import ModifyCategory from '../components/category/ModifyCategory.vue';
import DeleteConfirm from '../components/DeleteConfirm.vue';

import { listCategoryWithSub, removeSubCategory } from '@/apis/category';
import { ElMessage } from 'element-plus';


const currentCategoryes: Ref<{ id: number, name: string, subCategory: { id: number, name: string }[] } | null> = ref(null);
const activeCategoryId = ref(0);
const activeCategoryName = computed(() => {
    const currentCategory = categories.value.filter((c) => c.id === activeCategoryId.value)
    return currentCategory.length === 0 ? "" : currentCategory[0].name;
});
const newSubCategoryDialogDisplay = ref(false);
const updateSubCategoryDialogDisplay = ref(false);
const newCategoryDialogDisplay = ref(false);
const editCategoryDialogDisplay = ref(false);
const deleteConfirmDisplay = ref(false);
const activeSubCategoryId = ref(0);
const activeSubCategoryName = computed(() => {
    const subCategory = currentCategoryes.value?.subCategory.filter((c) => c.id === activeSubCategoryId.value)
    if (!subCategory) {
        return "";
    }
    return subCategory.length === 0 ? "" : subCategory[0].name;
});


const categories: Ref<{ id: number, name: string, subCategory: { id: number, name: string }[] }[]> = ref([])

function switchCategory(id: number) {
    activeCategoryId.value = id;
    switchSubCategory(id);
}

function switchSubCategory(id: number) {
    for (const item of categories.value) {
        if (item.id === id) {
            currentCategoryes.value = item;
            activeCategoryId.value = item.id;
        }
    }
}

async function updateCategories() {
    categories.value = await listCategoryWithSub();
}

async function deleteSubCategory(confirm: boolean) {
    if (confirm) {
        try {
            await removeSubCategory(activeCategoryId.value);
            await updateCategories();
            ElMessage.success("删除成功");
        } catch (error) {
            ElMessage.error(`删除失败: ${error}`);
        }
    }
    deleteConfirmDisplay.value = false;
}

onMounted(async () => {
    await updateCategories();
    currentCategoryes.value = categories.value[0];
    activeCategoryId.value = categories.value[0].id;
})

</script>

<template>
    <el-scrollbar style="margin-top: 10px;">
        <div style="display: flex;">
            <el-tag class="main-category" @click="() => { switchCategory(item.id) }" v-for="item in categories"
                :key="item.id" :type="item.id === activeCategoryId ? 'success' : 'primary'">
                <template #default>
                    <div style="display: flex;">
                        <span style="margin-left: 18%;padding-top: 3%;">
                            {{ item.name }}
                        </span>
                        <el-button style="padding-top: 0%;" size="small" text
                            @click="() => { switchCategory(item.id); editCategoryDialogDisplay = true }">
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </el-button>
                    </div>
                </template>
            </el-tag>
        </div>
    </el-scrollbar>

    <el-button style=" width: 100%; margin-top: 2%;" size="small" text
        @click="() => { newCategoryDialogDisplay = true }">
        <el-icon>
            <CirclePlus />
        </el-icon>
    </el-button>

    <div v-if="currentCategoryes" style="margin-top: 1%;">
        <el-table :data="currentCategoryes.subCategory">
            <el-table-column label="分类">
                <template #default="scope">
                    <el-tag class="sub-category">{{ scope.row.name }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column>
                <template #header>
                    <el-button text style="float: right; margin-right: 5px;" plain circle size="small"
                        @click="() => { newSubCategoryDialogDisplay = true }">
                        <el-icon>
                            <DocumentAdd />
                        </el-icon>
                    </el-button>
                </template>
                <template #default="scope">
                    <div style="float: right;">
                        <el-button plain text size="small" @click="() => {
                            activeSubCategoryId = scope.row.id;
                            updateSubCategoryDialogDisplay = true;
                        }">
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </el-button>
                        <el-button type="danger" plain text size="small" @click="() => {
                            activeSubCategoryId = scope.row.id;
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

    <el-dialog destroy-on-close width="90%" v-model="newCategoryDialogDisplay" title="新增分类">
        <AddCategory @close="async () => {
            await updateCategories();
            newCategoryDialogDisplay = false;
        }" />
    </el-dialog>

    <el-dialog destroy-on-close style="margin-top: 50%;" width="90%" v-model="newSubCategoryDialogDisplay"
        title="新增二级分类">
        <AddSubCategory @close="async () => {
            await updateCategories();
            newSubCategoryDialogDisplay = false;
        }" :categories="categories" :current-category-id="activeCategoryId" />
    </el-dialog>

    <el-dialog v-model="updateSubCategoryDialogDisplay" destroy-on-close style="width: 95%;" title="更新分类名称">
        <ModifySubCategory @close="async () => {
            await updateCategories();
            updateSubCategoryDialogDisplay = false;
        }" :category="{ id: activeSubCategoryId, name: activeSubCategoryName }" />
    </el-dialog>

    <el-dialog v-model="editCategoryDialogDisplay" destroy-on-close width="90%" title="编辑分类">
        <ModifyCategory :id="activeCategoryId" :name="activeCategoryName" @close="async () => {
            await updateCategories();
            editCategoryDialogDisplay = false;
        }" />
    </el-dialog>

    <el-dialog destroy-on-close width="90%" v-model="deleteConfirmDisplay">
        <DeleteConfirm @close="deleteSubCategory" :message="`是否删除二级分类: ${activeSubCategoryName}`" />
    </el-dialog>
</template>

<style scoped>
.main-category {
    margin-right: 10px;
    width: 115px;
    height: 80px;
    display: flex;
    flex-shrink: 0;
}

.sub-category {
    width: 80px;
}
</style>