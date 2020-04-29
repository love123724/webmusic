<template>
    <div class="recommend-nav-bar" v-if="">
        <nav-bar>
            <div slot="left" class="iconfont icon-left left" v-show="title.length!==0"></div>
            <div slot="right" class="text">{{title}}</div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from "../../../components/common/navbar/NavBar";
    export default {
        name: "RecommendNavBar",
        components:{
            NavBar
        },
        props:{
           title:String,
            bgl:String
        }
    }
</script>

<style scoped>
.recommend-nav-bar{
    background-color: black;
    position: relative;
    z-index: 999;
    height: 80px;
}
.left{
    color:yellow;
    font-size: 25px;
    vertical-align: middle;
    margin-left: 10px;
}
.text{
    text-align: center;
    color: white;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
}
</style>