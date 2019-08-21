/**
 * 入口文件
 */
import Vue from 'vue'
import Main from '@/pages/main'
import {functionalTool} from '@/utils'

Vue.use(functionalTool);

const vm = new Vue({
    el: '#app',
    render: h => h(Main)
})