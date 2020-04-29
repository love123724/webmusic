import {random} from "../common/untils";

export default {
    selectItem(context,payload){
        //console.log(payload.index)
        context.commit("currentIndex",payload.index)
        context.commit("fullScreen",true)
        context.commit("playing",true)
        context.commit("sequenceList",payload.list)
        context.commit("playList",payload.list)
        context.commit("setUrl",payload.url)
    },
    randomPlay(context,payload){
        context.commit('changeMode',2)
        context.commit('sequenceList',payload.list)
        let radomList=random(payload.list)
        context.commit('playList',radomList)
        context.commit("currentIndex",payload.index)
        //context.commit('setUrl',payload.url)
        //context.commit('playing',true)
        context.commit('fullScreen',true)
    },
    insertSong({commit,state},song){
        let playList=state.playList.slice()
        let sequenceList=state.sequenceList.slice()
        let currentIndex=state.currentIndex

        let currentSong=playList[currentIndex]
        let fpIndex=playList.findIndex(item=>{
            return item.id===song.id
        })
        currentIndex++
        playList.splice(currentIndex,0,song)
        if(fpIndex>-1){
            if(currentIndex>fpIndex){
                playList.splice(fpIndex,1)
                currentIndex--
            }else{
                playList.splice(fpIndex+1,1)
            }
        }

        let currentSIndex=sequenceList.findIndex(item=>{
            return item.id===currentSong.id
        })+1
        let fsIndex=sequenceList.findIndex(item=>{
            return item.id===song.id
        })

        sequenceList.splice(currentSIndex,0,song)
        if(fsIndex>-1){
            if(currentSIndex>fsIndex){
                sequenceList.splice(fsIndex,1)
            }else{
                sequenceList.splice(fsIndex+1,1)
            }
        }
        commit("playList",playList)
        commit("sequenceList",sequenceList)
        commit("currentIndex",currentIndex)
        commit("playing",true)

    },

}