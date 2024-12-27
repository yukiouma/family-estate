<script lang="ts" setup>
import { computed, onMounted, ref, type Ref } from 'vue';
import { moneyDisplay } from '@/utils/format';
import { listStatistic, removeStatistic } from '@/apis/statistic';
import { ElMessage } from 'element-plus';
import ModifyStatistic from '@/components/statistic/ModifyStatistic.vue';
import AddStatistic from '@/components/statistic/AddStatistic.vue';
import DeleteConfirm from '@/components/DeleteConfirm.vue';

const addNewStatisticDisplay = ref(false);
const modifyStatisticDisplay = ref(false);
const removeStatisticDisplay = ref(false);
const activeStatisticId = ref(0);
const activeStatisticName = ref("");
const deleteMessage = computed(() => `是否移除统计项目: ${activeStatisticName.value}?`);
const data: Ref<{
    id: number;
    label: string;
    total: number;
    byTag: {
        id: number;
        amount: number;
    }[];
}[]> = ref([]);

const addNewStatisticClick = () => {
    addNewStatisticDisplay.value = true;
};

const modifyStatisticClick = (id: number) => {
    activeStatisticId.value = id;
    modifyStatisticDisplay.value = true;
};

const removeStatisticClick = (id: number, name: string) => {
    activeStatisticId.value = id;
    activeStatisticName.value = name;
    removeStatisticDisplay.value = true;
};


async function addStatisticClose() {
    await updateData();
    addNewStatisticDisplay.value = false;
}

async function modifyStatisticClose() {
    await updateData();
    modifyStatisticDisplay.value = false;
}

async function removeStatisticClose(confirm: boolean) {
    if (confirm) {
        await removeStatistic(activeStatisticId.value);
        ElMessage.success("删除成功");
        await updateData();
    }
    removeStatisticDisplay.value = false;
}

async function updateData() {
    data.value = await listStatistic();
}

onMounted(async () => {
    await updateData();
});

</script>

<template>
    <el-table :data="data">
        <el-table-column label="描述" width="130">
            <template #default="{ row }">
                <el-tag class="label-tag">{{ row.label }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="金额" width="190">
            <template #default="{ row }">
                <el-tag class="tag" type="warning">合计</el-tag>
                {{ moneyDisplay(row.total) }}
                <div v-for="tag in row.byTag" :key="tag.id">
                    <el-tag class="tag">{{ tag.name }}</el-tag>
                    {{ moneyDisplay(tag.amount) }}
                </div>
            </template>
        </el-table-column>
        <el-table-column>
            <template #header>
                <el-button @click="addNewStatisticClick" type="primary" link>
                    <el-icon>
                        <DocumentAdd />
                    </el-icon>
                </el-button>
            </template>
            <template #default="{ row }">
                <div>
                    <el-button @click="() => { modifyStatisticClick(row.id) }" type="primary" link>
                        <el-icon>
                            <Setting />
                        </el-icon>
                    </el-button>
                </div>
                <div>
                    <el-button @click="() => { removeStatisticClick(row.id, row.label) }" type="danger" link>
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </el-button>
                </div>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog width="90%" v-model="addNewStatisticDisplay" title="新增统计" destroy-on-close>
        <AddStatistic @close="addStatisticClose" />
    </el-dialog>
    <el-dialog width="90%" v-model="modifyStatisticDisplay" title="调整统计" destroy-on-close>
        <ModifyStatistic :id="activeStatisticId" @close="modifyStatisticClose" />
    </el-dialog>
    <el-dialog width="90%" v-model="removeStatisticDisplay" title="移除统计" destroy-on-close>
        <DeleteConfirm :message="deleteMessage" @close="removeStatisticClose" />
    </el-dialog>
</template>

<style scoped>
.label-tag {
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: left;
}

.tag {
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: left;
}
</style>