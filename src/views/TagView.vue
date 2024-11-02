<script lang="ts" setup>
import { listTags, removeTag } from '../apis/tag';
import { onMounted, ref, type Ref } from 'vue';
import { ElMessage } from 'element-plus';
import AddTag from '../components/tag/AddTag.vue';
import ModifyTag from '../components/tag/ModifyTag.vue';
import RemoveTag from '../components/tag/RemoveTag.vue';

// const loading = ref(false);
const deleteConfirmDisplay = ref(false);
const tags: Ref<{ id: number, name: string }[]> = ref([]);
const addNewTagDisplay = ref(false);
const updateTagDialogDisplay = ref(false);
const activeTag: { id: number, name: string } = {
    id: 0,
    name: ''
};


async function addNewTagDialogClose() {
    addNewTagDisplay.value = false;
    tags.value = await listTags();
}

async function updateTagDialogClose() {
    updateTagDialogDisplay.value = false;
    tags.value = await listTags();
}

async function deleteTag(confirm: boolean) {
    if (confirm) {
        try {
            await removeTag(activeTag.id);
            await updateTagList();
            ElMessage.success("删除成功");
        } catch (error) {
            ElMessage.error(`删除失败: ${error}`);
        }
    }
    deleteConfirmDisplay.value = false;
}

async function updateTagList() {
    tags.value = await listTags();
}

onMounted(async () => {
    await updateTagList();
    // loading.value = true;
});

</script>

<template>
    <div style="margin-top: 10px;">
        <el-table :data="tags">
            <el-table-column label="标签">
                <template #default="scope">
                    <el-tag style="width: 80px;" type="primary" plain> {{ scope.row.name }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column>
                <template #header>
                    <el-button size="small" text style="float: right;" @click="() => { addNewTagDisplay = true }">
                        <el-icon>
                            <DocumentAdd />
                        </el-icon>
                    </el-button>
                </template>
                <template #default="scope">
                    <div style="float: right;">
                        <el-button plain text size="small"
                            @click="() => { activeTag = scope.row; updateTagDialogDisplay = true }">
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </el-button>
                        <el-button @click="() => { activeTag = scope.row; deleteConfirmDisplay = true }" type="danger"
                            plain text size="small">
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog destroy-on-close v-model="addNewTagDisplay" title="新增标签" width="95%">
            <AddTag @close="addNewTagDialogClose" />
        </el-dialog>
        <el-dialog width="90%" v-model="updateTagDialogDisplay" destroy-on-close title="更新标签">
            <ModifyTag :tag="{ id: activeTag.id, name: activeTag.name }" @close="updateTagDialogClose" />
        </el-dialog>
        <el-dialog width="90%" v-model="deleteConfirmDisplay" destroy-on-close>
            <RemoveTag :id="activeTag.id" :name="activeTag.name" @close="deleteTag" />
        </el-dialog>
    </div>
</template>
