<template>
     <div class="item single-pic" @click="skip">
        <div class="content">
            <span>
                {{data.title}}
            </span>
        </div>
        <img :src="data.imageList[0]" />
    </div>
</template>
<script>
import BaseOptions from './base'

export default {
    name: 'SinglePic',
    extends: BaseOptions
}
</script>
<style scoped>
    @import "~@/styles/index.css";

    .item.single-pic {
        display: flex;
    }

    .single-pic .content {
        flex: 2;
        font-size: 17px;
        padding-right: 24px;
    }

    .single-pic img {
        width: 33%;
        display: block;
    }
</style>