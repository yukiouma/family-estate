<script lang="ts" setup>
import { listTags } from '@/apis/tag';
import { onMounted, ref, type Ref } from 'vue';

const tags: Ref<{ id: number, name: string }[]> = ref([]);
const newTag = ref("");
const addNewTagDisplay = ref(false);

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
        <el-dialog v-model="addNewTagDisplay" title="新增标签" width="95%">
            <el-form label-width="auto">
                <el-form-item label="标签">
                    <el-input v-model="newTag" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain>
                        <el-icon>
                            <Check />
                        </el-icon>
                    </el-button>
                    <el-button type="danger" plain>
                        <el-icon>
                            <Close />
                        </el-icon>
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
