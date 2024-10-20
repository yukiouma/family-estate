<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import DeleteConfirm from '../DeleteConfirm.vue';
import { modifyCategory, removeCategory } from '../../apis/category';

const props = defineProps<{ id: number, name: string }>();
const label = ref(props.name);
const emit = defineEmits<(e: string) => void>();
const deleteCategory = ref(false);
const deleteConfirmDislplay = ref(false);

function deleteEvent(confirm: boolean) {
    deleteCategory.value = confirm;
    deleteConfirmDislplay.value = false;
}

async function sumbit() {
    if (label.value.length === 0) {
        ElMessage.error("分类不能为空");
    } else {
        if (deleteCategory.value) {
            try {
                await removeCategory(props.id);
                ElMessage.success("分类删除成功");
            } catch (error) {
                ElMessage.error(`分类删除失败: ${error}`);
            }
        } else {
            try {
                await modifyCategory({ id: props.id, name: label.value });
                ElMessage.success("分类修改成功");
            } catch (error) {
                ElMessage.error(`分类修改失败: ${error}`);
            }
        }
    }
    emit("close");
}

</script>

<template>
    <el-form label-width="auto">
        <el-form-item label="分类">
            <el-input v-model="label" clearable />
        </el-form-item>
        <el-form-item label="删除分类">
            <el-switch @change="() => { if (deleteCategory) deleteConfirmDislplay = true }" v-model="deleteCategory"
                style=" --el-switch-on-color: #ff4949" />
        </el-form-item>
        <el-form-item>
            <div style="display: flex;">
                <el-button type="primary" plain @click="sumbit">
                    <el-icon>
                        <Check />
                    </el-icon>
                </el-button>
                <el-button type="danger" plain>
                    <el-icon>
                        <Close />
                    </el-icon>
                </el-button>
            </div>
        </el-form-item>
    </el-form>
    <el-dialog width="90%" v-model="deleteConfirmDislplay">
        <DeleteConfirm :message="`是否要移除分类: ${label}`" @close="deleteEvent" />
    </el-dialog>
</template>