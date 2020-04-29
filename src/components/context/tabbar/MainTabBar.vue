<template>
    <div class="main-tab-bar" v-if="$route.meta.show">
        <tab-bar class="tab-bar">
            <tab-bar-item path="/recommend">
                <div>推荐</div>
            </tab-bar-item>
        </tab-bar>
        <tab-bar class="tab-bar">
            <tab-bar-item path="/singer">
                <div>歌手</div>
            </tab-bar-item>
        </tab-bar>
        <tab-bar class="tab-bar">
            <tab-bar-item path="/rank">
                <div>排行</div>
            </tab-bar-item>
        </tab-bar>
        <tab-bar class="tab-bar">
            <tab-bar-item path="/search">
                <div>搜索</div>
            </tab-bar-item>
        </tab-bar>
    </div>
</template>

<script>
    import TabBar from "./TabBar";
    import TabBarItem from "./TabBarItem";
    export default {
        name: "MainTabBar",
        components:{
            TabBar,
            TabBarItem
        }
    }
</script>

<style scoped>
.main-tab-bar{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    background-color: black;
    position: relative;
    z-index: 999;
}
.main-tab-bar>.main-tab-bar{
        flex: 1;
    }
    .main-tab-bar>div{
        box-sizing: border-box;
    }
</style>