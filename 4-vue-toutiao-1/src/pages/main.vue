<template>
    <div>
        <keep-alive>
            <component 
                :is="page"
                :tabs="tabs" 
                :curTab="curTab"
                @switchTab="switchTab"
                @more="showMoreTab"
            >
                <template v-slot:content="{list}">
                    <component 
                        v-for="item in list" 
                        :is="item.type | formatComponentName" 
                        :data="item.data">
                    </component>
                </template>
            </component>
        </keep-alive>
    </div>
</template>
<script>
import * as components from '@/components/items/index'
import {TABS} from '@/config'
import Tabs from '@/components/tabs'

export default {
    components: {
        Setting: () => ({
            component: import('@/components/setting.vue'),
            //loading: Loading
        }),
       ...components,
       Tabs
    },
    data() {
        const constructTabs = tabs => {
            let result = {};
            for (let name in tabs) {
                result[name] = {
                    label: tabs[name],
                    index: 0,
                    list: []
                };
            }
            return result;
        };
        return {
            listData: [],
            page: 'Tabs',
            tabs: constructTabs(TABS),
            curTab: 'agriculture',
        }
    },
    created() {
        // this.getData(this.curTab);
        // this.$watch('curTab',newTab => {
        //     this.getData(newTab)
        // })
        this.getListData(this.curTab)
            .then(listData => {
                this.setTabsData(this.curTab, {
                    list: listData
                });
            });

        // this.$watch('curTab', newTab => {
        //     this.switchTab(newTab);
        // });
    },
    filters: {
        formatComponentName: componentName => {
            return componentName.replace(/^\w/g, name => name.toUpperCase());
        }
    },
    methods: {
        // onReachBottom() {
        //     this.getData(this.curTab)
        // },
        // getData(tabName) {
        //     fetch(`/list?tab=${tabName}`).then(res => res.json())
        //         .then(res => {
        //             this.dataList = this.dataList.concat(res.data);
        //         });
        // },
        // switchTab(name){
        //     this.curTab = name;
        //     this.dataList = [];
        // }
        onReachBottom() {
            this.getListData(this.curTab)
                .then(listData => {
                    this.setTabsData(this.curTab, {
                        list: this.tabs[this.curTab].list.concat(listData)
                    });
                });
        },

        getListData(tabName) {

            const tab = this.tabs[this.curTab];

            return fetch(
                `/list?tab=${tabName}&index=${tab.index}`
            )
            .then(res => res.json())
            .then(res => res.data);
        },

        setTabsData(tabName, data) {
            this.$set(this.tabs, tabName, {
                ...this.tabs[tabName],
                ...data
            });
        },

        switchTab(tabName) {
            this.curTab = tabName;
            if (!this.tabs[tabName].list.length) {
                this.getListData(tabName)
                    .then(listData => {
                        this.setTabsData(this.curTab, {
                            list: listData
                        });
                    });
            }
        },
        showMoreTab(event) {
            if (event === 'hide') {
                this.page = 'tabs';
            }
            else {
                this.page = 'setting';
            }
        }
    }
}
</script>