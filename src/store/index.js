import Vue from 'vue'

import Vuex from 'vuex'

import {playMode} from './mode'
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { loadSearch} from '../common/cache';

Vue.use(Vuex)
const state={
    singer:{},
    fullScreen:false,//是否全屏(没有迷你播放器)
    playing:false,//是否播放
    playList:[],//播放列表
    sequenceList:[],//播放顺序列表,顺序播放时,顺序和播放列表的一样
    mode:playMode.sequence,//播放模式
    currentIndex:-1,//播放下标,
    currentUrl:'',//当前播放音乐的map3的url,
    topList:[],//当前排行榜的歌曲数据,
    searchHistory:loadSearch()//搜索历史记录
   // disc:{}//当前歌单
   // currentSong:this.playList[this.playList]||{}//正在播放的音乐
}

const store=new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store