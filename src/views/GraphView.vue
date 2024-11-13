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
                    name: 'a'
                },
                {
                    name: 'b'
                },
                {
                    name: 'a1'
                },
                {
                    name: 'a2'
                },
                {
                    name: 'b1'
                },
                {
                    name: 'c'
                }
            ],
            links: [
                {
                    source: 'a',
                    target: 'a1',
                    value: 5
                },
                {
                    source: 'a',
                    target: 'a2',
                    value: 3
                },
                {
                    source: 'b',
                    target: 'b1',
                    value: 8
                },
                {
                    source: 'a',
                    target: 'b1',
                    value: 3
                },
                {
                    source: 'b1',
                    target: 'a1',
                    value: 1
                },
                {
                    source: 'b1',
                    target: 'c',
                    value: 2
                }
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
    top: 170px;
    left: -235px;
    position: absolute;
    width: 105vh;
    height: 60vh;
    rotate: 90deg;
}
</style>