<template>
    <div>
        <NavHead 
            :tabs="tabs" 
            :curTab="curTab"
            @select="selectTab"
            @more="$emit('more')"
        ></NavHead>
        <div class="tab-list">
            <template v-for="(tab, name) in tabs">
                <transition name="fade">
                    <div v-show="name === curTab">
                        <slot name="content" :list="tab.list"></slot>
                    </div>
                </transition>
            </template>
        </div>
    </div>
</template>
<script>
import NavHead from './nav-head'
export default {
    name: 'Tabs',
    props:['tabs','curTab'],
    components: {
        NavHead
    },
    methods: {
        selectTab(name){
            this.$emit('switchTab', name)
        }
    }
}
</script>
<style scoped>
nav {
    white-space: nowrap;
    width: 100%;
    overflow-x: scroll;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>