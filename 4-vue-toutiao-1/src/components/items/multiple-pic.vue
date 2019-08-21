<template>
    <div class="item multiple-image" @click="skip">
        <h3>
            {{data.title}}
        </h3>
        <div class="image-list">
            <img v-for="image in data.imageList" :src="image" />
        </div>
    </div>
</template>
<script>
import BaseOptions from './base'
export default {
    name: 'MultiplePic',
    extends: BaseOptions
}
</script>
<style scoped>
    @import "~@/styles/index.css";

    .item.multiple-image h3 {
        font-size: 17px;
    }

    .item.multiple-image .image-list img {
        width: 33%;
    }
</style>