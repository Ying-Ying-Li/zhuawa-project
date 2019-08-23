<template>
    <div class="item video">
        <h3>{{data.title}}</h3>
        <img v-bind:src="data.avatar" />
    </div>
</template>

<script>
import BaseOptions from './base'
export default {
    name: 'Video',
    extends: BaseOptions
}
</script>

<style scoped>
@import "~@/styles/index.css";

.video {
    position: relative;
    padding: 0;
    margin: 16px 15px;
}

h3 {
    position: absolute;
    top: 0;
    color: #fff;
    margin: 5px 10px;
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
img {
    border: none;
    display: block;
    width: 100%;
    pointer-events: none;
}
</style>
