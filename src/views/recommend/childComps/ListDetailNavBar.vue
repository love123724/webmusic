<template>
    <div class="list-detail-nav-bar">
        <nav-bar class="nav-bar">
            <div slot="left" class="re-tb iconfont icon-left"></div>
            <div slot="right" class="text">{{title}}</div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from "../../../components/common/navbar/NavBar";
    export default {
        name: "ListDetailNavBar",
        components:{
            NavBar
        },
        props:{
            title:String,
            bgl:String
        },
        created() {
            console.log(this.title)
        },

    }
</script>

<style scoped>
    .re-tb{
        color: yellow;
        font-size: 20px;
        vertical-align: middle;
        margin-left: 10px;
    }
    .nav-bar{
        height: 40px;
    }
    .list-detail-nav-bar{
        position: relative;
        z-index: 999;
        color: white;
        background-color: black;
    }
    .text{
        margin-left: 20px;
    }
</style>