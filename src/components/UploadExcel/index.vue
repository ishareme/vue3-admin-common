<template>
    <div class="upload-excel">
        <div class="btn-upload">
            <el-button :loading="loading" @click="handleUpload" type="primary">
                {{ $t('msg.uploadExcel.upload') }}
            </el-button>
        </div>
        <input
            ref="excelUploadInput"
            type="file"
            class="excel-upload-input"
            accept=".xlsx, .xls, .csv"
            @change="handleChange"
        />
        <div
            class="drop"
            @drop.stop.prevent="handleDrop"
            @dragover.stop.prevent="handleDragOver"
            @dragenter.stop.prevent="handleDragOver"
        >
            <i class="el-icon-upload"></i>
            <span>{{ $t('msg.uploadExcel.drop') }}</span>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { getHeaderRow, isExcel } from './utils';

const props = defineProps({
    // 上传之前的回调
    beforeUpload: Function,
    // 上传成功的回调
    onSuccess: Function
});

// 点击上传触发
const loading = ref(false);
const excelUploadInput = ref(null);

const handleUpload = () => {
    excelUploadInput.value.click();
};
// 触发上传事件
const upload = (rawFile) => {
    excelUploadInput.value.value = null;
    // 如果用户 没有指定上传前的回调
    if (!props.beforeUpload) {
        readerData(rawFile);
        return;
    }
    // 如果用户 指定上传前的回调  只有返回true的时候  才会执行对应后的后续操作  因为也可以中断上传
    const before = props.beforeUpload(rawFile);
    if (before) {
        readerData(rawFile);
    }
    console.log('[ rawFile ]', rawFile);
};
// 读取数据
const readerData = (rawFile) => {
    loading.value = true;
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // 读取操作完成时
        reader.onload = (e) => {
            // 1. 获取到解析后的数据
            const data = e.target.result;
            // 2. 利用XLSX对数据进行解析
            const workbook = XLSX.read(data, {
                // 解析类型是数组类型
                type: 'array'
            });
            // 3. 获取第一张表格 工作薄 名称
            const fisrtSheetName = workbook.SheetNames[0];
            // 4. 读取sheet1 第一张表格的数据
            const workSheet = workbook.Sheets[fisrtSheetName];
            // 5. 解析数据表头
            const header = getHeaderRow(workSheet);
            // 6. 解析数据体
            const results = XLSX.utils.sheet_to_json(workSheet);
            // 7. 传入解析之后的数据
            generateData({
                header,
                results
            });
            // 8. 处理loading
            loading.value = false;
            // 9. 成功回调
            resolve();
        };
        reader.readAsArrayBuffer(rawFile);
    });
};
// 根据导入内容，生成数据
const generateData = (excelData) => {
    props.onSuccess && props.onSuccess(excelData);
};
const handleChange = (e) => {
    const files = e.target.files;
    const rawFile = files[0];
    if (!rawFile) return;
    upload(rawFile);
};
// 拖拽上传
const handleDrop = (e) => {
    if (loading.value) return;
    const files = e.dataTransfer.files;
    if (files.length !== 1) {
        ElMessage.error('必须上传一个文件');
        return;
    }
    const rawFile = files[0];
    if (!isExcel(rawFile)) {
        ElMessage.error('文件必须是 .xlsx, xls, csv 格式');
        return;
    }
    upload(rawFile);
};
const handleDragOver = (e) => {
    e.dataTransfer.dropEffect = 'copy';
};
</script>

<style lang="scss" scoped>
.upload-excel {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    .excel-upload-input {
        display: none;
        z-index: -9999;
    }
    .btn-upload,
    .drop {
        border: 1px dashed #bbb;
        width: 350px;
        height: 160px;
        text-align: center;
        line-height: 160px;
    }
    .drop {
        line-height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #bbb;
        i {
            font-size: 60px;
            display: block;
        }
    }
}
</style>
