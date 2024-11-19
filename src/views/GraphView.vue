<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echart from "echarts";


const data = ref([]);


function init(id: string) {
    const myChart = echart.init(document.getElementById(id), "dark", { height: "400px", width: "950px", });
    const option = {
        // xAxis: {
        //     position: 'top',
        // },
        series: {
            type: 'sankey',
            layout: 'none',
            emphasis: {
                focus: 'adjacency'
            },
            data: [
                {
                    name: '净资产'
                },
                {
                    name: '总资产'
                },
                {
                    name: '流动资金'
                },
                {
                    name: '固定资产'
                },
                {
                    name: '负债'
                },
                {
                    name: '招商银行活期'
                },
                {
                    name: '中国银行活期'
                },
                {
                    name: '微信'
                },
                {
                    name: '支付宝'
                },
                {
                    name: '光大银行活期'
                },
                {
                    name: '汽车'
                },
                {
                    name: '房贷'
                },
                {
                    name: '信用卡'
                },
            ],
            links: [
                {
                    source: '房贷',
                    target: '负债',
                    value: 90000
                },
                {
                    source: '信用卡',
                    target: '负债',
                    value: 10000
                },
                {
                    source: '负债',
                    target: '总资产',
                    value: 100000
                },
                {
                    source: '净资产',
                    target: '总资产',
                    value: 458498.54 + 210000.00
                },
                {
                    source: '总资产',
                    target: '流动资金',
                    value: 458498.54
                },
                {
                    source: '总资产',
                    target: '固定资产',
                    value: 210000.00
                },
                {
                    source: '流动资金',
                    target: '招商银行活期',
                    value: 379883.87
                },
                {
                    source: '流动资金',
                    target: '中国银行活期',
                    value: 52395.93
                },
                {
                    source: '流动资金',
                    target: '微信',
                    value: 7409.08
                },
                {
                    source: '流动资金',
                    target: '支付宝',
                    value: 15804.98
                },
                {
                    source: '流动资金',
                    target: '光大银行活期',
                    value: 3004.68
                },
                {
                    source: '固定资产',
                    target: '汽车',
                    value: 210000
                },
            ]
        }
    };
    myChart.setOption(option);
}


onMounted(() => {
    init("graph")
})

</script>

<template>
    <div id="graph"></div>
</template>

<style>
#graph {
    top: 125px;
    left: -235px;
    position: absolute;
    width: 105vh;
    height: 60vh;
    rotate: 90deg;
    transform: scale(0.95);
}
</style>