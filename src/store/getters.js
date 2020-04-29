export default {
    currentSong(state){//当前播放的歌曲
        console.log(state.playList[state.currentIndex])
        // console.log(state.currentIndex)
        //return state.playList[state.playList.length-1] || {}
        return state.playList[state.currentIndex] || {}
    },
    playing(state){
        return state.playing
    },
    currentIndex(state){
        return state.currentIndex
    },
    playList(state){
        return state.playList
    },
    currentUrl(state){
        return state.currentUrl
    },
    mode(state){
        return state.mode
    },
    sequenceList(state){
        return state.sequenceList
    },
    topList(state){
        return state.topList
    },
    saveSearchHistory(state){
        //console.log( state.searchHistory)
        return state.searchHistory
    },

}