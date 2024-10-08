<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import AddSubclass from '../components/AddSubclass.vue';


const currentClasses: Ref<{ id: number, name: string, subClass: { id: number, name: string }[] } | null> = ref(null);
const activeClassId = ref(0);
const newSubclassDialogDisplay = ref(false);

const classes: Ref<{ id: number, name: string, subClass: { id: number, name: string }[] }[]> = ref([
    { id: 1, name: "流动资金", subClass: [{ id: 10, name: "活期" }, { id: 13, name: "余额宝" }] },
    { id: 2, name: "固定资产", subClass: [{ id: 11, name: "汽车" }] },
    { id: 3, name: "投资理财", subClass: [{ id: 12, name: "基金" }] },
    { id: 4, name: "应收款", subClass: [] },
    { id: 5, name: "负债", subClass: [{ id: 14, name: "信用卡" }] },
])

function switchSubclass(id: number) {
    for (const item of classes.value) {
        if (item.id === id) {
            currentClasses.value = item;
            activeClassId.value = item.id;
        }
    }
}

onMounted(() => {
    currentClasses.value = classes.value[0];
    activeClassId.value = classes.value[0].id;
})

</script>

<template>
    <el-scrollbar style="margin-top: 10px;">
        <div style="display: flex;">
            <el-tag class="main-class" @click="() => { switchSubclass(item.id) }" closable v-for="item in classes"
                :key="item.id" :type="item.id === activeClassId ? 'success' : 'primary'">
                {{ item.name }}
            </el-tag>
        </div>
    </el-scrollbar>

    <div v-if="currentClasses" style="margin-top: 30px;">
        <el-table :data="currentClasses.subClass">
            <el-table-column label="分类">
                <template #default="scope">
                    <el-tag class="subclass">{{ scope.row.name }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column>
                <template #header>
                    <el-button style="float: right; margin-right: 5px;" type="primary" plain circle size="small"
                        @click="() => { newSubclassDialogDisplay = true }">
                        <el-icon>
                            <DocumentAdd />
                        </el-icon>
                    </el-button>
                </template>
                <template #default="scope">
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

    <el-dialog destroy-on-close style="margin-top: 50%;" width="90%" v-model="newSubclassDialogDisplay" title="新增二级分类">
        <AddSubclass :classes="classes" :current-main-class-id="activeClassId" />
    </el-dialog>
</template>

<style scoped>
.main-class {
    margin-right: 10px;
    width: 115px;
    height: 80px;
    display: flex;
    flex-shrink: 0;
}

.subclass {
    width: 80px;
}
</style>