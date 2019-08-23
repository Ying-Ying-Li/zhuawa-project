<template>
    <nav>
        <div class="nav-content">
            <span
                v-for="(tab, name) in tabs"
                :data-name="name"
                @click="$emit('select', name)"
                :class="{'cur':curTab==name}"
            >
                {{tab.label}}
            </span>
        </div>
        <a class="more_btn" v-on:click.prevent="$emit('more')">
            <span class="cross"></span>
        </a>
    </nav>
</template>
<script>
export default {
    name: 'NavHead',
    props: ['tabs','curTab']
}
</script>
<style scoped>
nav {
    display: flex;
    background: #f4f5f6;
}
.nav-content {
    flex: 1;
    white-space: nowrap;
    overflow-x: scroll;
    position: relative;
}
span {
    display: inline-block;
    padding: 10px;
}
span.cur{
    color: #f85959;
}

.more_btn {
    display: block;
    position: relative;
    width: 34px;
    height: 40px;
    color: #f85959;
    text-align: center;
    background: #f4f5f6;
}
.cross {
    position: absolute;
    width: 17px;
    height: 17px;
    opacity: 0.9;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%); 
}

.cross:before,
.cross:after {
    position: absolute;
    content: ' ';
    height: 17px;
    width: 4px;
    background-color: #f85959;
}

.cross:before {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
}
</style>