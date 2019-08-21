<template>
    <div>

        <component 
            v-for="item in dataList" 
            :is="item.type | formatComponentName" 
            :data="item.data">
        </component>
    </div>
</template>
<script>
import * as components from '@/components/items/index';

export default {
    components: {
       ...components
    },
    data() {
        return {
            dataList: []
        }
    },
    created() {
        this.getData();
    },
    filters: {
        formatComponentName: componentName => {
            return componentName.replace(/^\w/g, name => name.toUpperCase());
        }
    },
    methods: {
        getData() {
            var _this = this;
            fetch('/list?tab=agriculture').then(res => res.json())
                .then(res => {
                    _this.dataList = res.data;
                });
        }
    }
}
</script>