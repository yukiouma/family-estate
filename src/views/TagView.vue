<script lang="ts" setup>
import { listTags, removeTag } from '../apis/tag';
import { onMounted, ref, type Ref } from 'vue';
import AddTag from '../components/tag/AddTag.vue';
import { ElMessage } from 'element-plus';
import ModifyTag from '../components/tag/ModifyTag.vue';

const tags: Ref<{ id: number, name: string }[]> = ref([]);
const addNewTagDisplay = ref(false);
const updateTagDialogDisplay = ref(false);
const updateTag: { id: number, name: string } = {
    id: 0,
    name: ''
};

async function deleteTag(id: number) {
    await removeTag(id);
    ElMessage.success("删除成功");
    tags.value = await listTags();
}

async function addNewTagDialogClose() {
    addNewTagDisplay.value = false;
    tags.value = await listTags();
}

async function updateTagDialogClose() {
    updateTagDialogDisplay.value = false;
    tags.value = await listTags();
}

onMounted(async () => {
    tags.value = await listTags();
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
                            @click="() => { updateTag = scope.row; updateTagDialogDisplay = true }">
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </el-button>
                        <el-button @click="() => { deleteTag(scope.row.id) }" type="danger" plain text size="small">
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
        <el-dialog v-model="updateTagDialogDisplay" destroy-on-close style="width: 95%;" title="更新标签">
            <ModifyTag :tag="{ id: updateTag.id, name: updateTag.name }" @close="updateTagDialogClose" />
        </el-dialog>
    </div>
</template>
