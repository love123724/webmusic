<template>
  <div id="app">
     <top class="header" v-if="$route.meta.show" >
         <div slot="center">XIAO TAO MUSIC</div>
         <div slot="left"  class="iconfont icon-liebiao" style="font-size: 24px;"></div>
     </top>
     <main-tab-bar />
      <keep-alive exclude="RecommendListDetail">
          <transition name="slide"> <router-view></router-view></transition>
      </keep-alive>
      <player></player>
  </div>
</template>

<script>
import Top from "./components/common/header/Top";
import MainTabBar from "./components/context/tabbar/MainTabBar";
import Player from "./components/common/player/Player";
export default {
  name: 'App',
  components: {
      Top,
      MainTabBar,
      Player
  },
    data(){
      return{

      }
    }
}
</script>

<style>
  @import "assets/css/base.css";
.header{
    background-color: black;
    position: relative;
    z-index:999;
}
.icon-liebiao{
    margin-left: 15px;
}
  .slide-enter-active,.slide-leave-active{
      transition: all 1s;
  }
  .slide-enter,.slide-leave-to{
      transform: translate3d(100%,0,0);
     opacity:0;
  }
</style>
