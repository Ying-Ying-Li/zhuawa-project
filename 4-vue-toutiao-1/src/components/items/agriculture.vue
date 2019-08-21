<template>
    <div class="item agriculture">
        <h3>猪肉价格查询器</h3>
        <label for="area">地名/区号</label>
        <input v-model="area" type="text" value="" id="area"/>
        <div class="price-area">
            <h4>{{area}}猪肉价格:</h4>
            <span>(测算时间：{{date()}})</span>
            <echarts v-bind:options="chartsOptions"></echarts>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Agriculture',
    data() {
        return {
            area: '',
            chartsOptions: []
        }
    },
    methods: {
        date() {
            const date = new Date;
            return date.getFullYear() + '/' + this.PrefixZero(date.getMonth() + 1) + '/' + this.PrefixZero(date.getDate()) + '/' + this.PrefixZero(date.getHours()) + ':' + this.PrefixZero(date.getMinutes()) + ':' + this.PrefixZero(date.getSeconds());
        },
        PrefixZero(num, n=2) {
            return (Array(n).join(0) + num).slice(-n);
        }
    }
}
</script>
<style scoped>
    @import "~@/styles/index.css";
    h3 {
        font-size: 17px;
        font-weight: normal;
        margin: 0 0 1em 0;
    }

    input,
    button {
        font-size: 17px;
    }

    .price-area {
        min-height: 170px;
    }

    span {
        font-size: 12px;
    }
</style>