import {deleteSearchAll, deleteSearchOne, loadSearch, saveHistory} from '../common/cache';

export default {
    fullScreen(state,isfull){
        state.fullScreen=isfull
        console.log(state.fullScreen)
    },
    currentIndex(state,index){
        state.currentIndex=index
        //console.log(state.currentIndex)
    },
    playing(state,isPlay){
        state.playing=isPlay
        //console.log( state.playing)
    },
    sequenceList(state,list){
        state.sequenceList=list
    },
    playList(state,list){
        state.playList=list
        //console.log(state.playList)
        //console.log(  state.playList)
        //console.log(state.playList)
    },
    setUrl(state,url){
        state.currentUrl=url
        console.log( state.currentUrl)
    },
    setDisc(state,disc){
        state.disc=disc
    },
    changeFullScreen(state){
        state.fullScreen=false
        console.log( state.fullScreen)
    },
    changeMode(state,mode){
        state.mode=mode
    },
    setTopList(state,list){
        state.topList=list
        console.log( state.topList)
    },
    saveSearch(state,query){
        saveHistory(query)
        state.searchHistory=loadSearch()
        //console.log(state.searchHistory)
    },
    deleteSearch1(state,query){
        deleteSearchOne(query)
        state.searchHistory=loadSearch()
    },
    clearSearch(state){
        deleteSearchAll()
        state.searchHistory=loadSearch()
    }

}