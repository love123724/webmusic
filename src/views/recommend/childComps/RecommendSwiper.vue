<template>
    <div class="recommend-swiper">
        <swiper>
            <swiper-item v-for="(item,index) in banners" :key="index">
                <a :href="item.url"><img :src="item.pic" @load="imgLoad"></a>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import {Swiper,SwiperItem} from '../../../components/common/swiper'
    export default {
        name: "RecommendSwiper",
        props:{
          banners:Array
        },

        components:{
            Swiper,
            SwiperItem
        },
        methods:{
            imgLoad(){
                this.$bus.$emit("imgLoad")
            }
        }

    }
</script>

<style scoped>

</style>