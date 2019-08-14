/**
 * 管理全局的入口文件
 * @author liyingying
 */

import {request} from './utils'
import components from './item'

const THRESHOLD = 50;
class Manager {
    constructor($container) {
        this.$container = $container;
    }

    init() {
        this.getData();
        this.reachBottom(() => this.getData())
    }

    getData() {
        request({
            url: './mock/list.json'
        }).then(res => {
            const {data} = res;
            data.forEach(item => {
                const componentName = item.type.replace(/^\w/g, w => w.toUpperCase());
                const Component = components[componentName];
                const component = new Component(item);
                const element = component.constructElement();
                this.$container.append(element);
            })
        })
    }

    reachBottom(callback = () => {}) {
        window.onscroll = () => {
            const bodyHeight = document.documentElement.offsetHeight;
            const screenHeight = window.screen.height;
            const scrollY = window.scrollY;
            const gap = bodyHeight - screenHeight - scrollY;
            if(gap < THRESHOLD) {
                callback();
            }
        }
    }

    static getInstance($container) {
        return new Manager($container)
    }
}

let $container = document.getElementById('container');
let manager = Manager.getInstance($container);
manager.init();