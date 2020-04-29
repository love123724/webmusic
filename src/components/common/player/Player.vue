<template>
    <div id="player" v-show="currentSong"  ref="player">
          <div class="normal-music" v-show="$store.state.fullScreen">
              <transition name="normal">
                  <play-nav-bar></play-nav-bar>
              </transition>

              <div class="middle">
                      <div class="middle-l" v-if="!showLyric">
                                   <div class="background"  v-if="Object.keys(currentSong).length!==0">
                                       <img :src="currentSong.al.picUrl" style="width: 100%;height:100%" alt="图片" :class="rotate" v-if="currentSong.al.picUrl">
                               </div>
                              <div class="playing-lyric">
                                  <p>{{playingLyric}}</p>
                              </div>
                      </div>
                  <div class="middle-r" v-else>
                      <scroll class="content6" ref="scroll">
                          <div class="lyric-wrapper" ref="lyricList">
                              <div v-if="currentLyric">
                                  <p ref='lyric' v-for="(item,index) in currentLyric.lines" :key="index" :class="{current:currentLyricNum==index}">
                                      {{item.txt}}
                                  </p>
                              </div>
                          </div>
                      </scroll>

                  </div>

              </div>
              <div class="bottom">
                  <div class="dot-wrapper">
                      <span :class="{active2:currentActive==='cd'}" class="dot" @click="leftClick"></span>
                      <span :class="{active2:currentActive==='lyric'}"  class="dot" @click="rightClick"></span>
                  </div>
                  <div class="bottom-inner">
                      <span class="timer timer-l">{{format(currentTime)}}</span>
                      <progress-bar class="progress-bar" :percent="percent" @onPercentChange="onPercentChange"></progress-bar>
                      <span class="timer timer-r">{{format(duration)}}</span>
                  </div>
              </div>
              <div class="operators">
                  <div class="iconfont icon-shunxubofang" :class="iconFont" @click="changeIcon"></div>
                  <div class=" iconfont icon-shangyishoudianji" @click="pre"></div>
                  <div class="iconfont" @click.stop="isPlay" :class="playIcon"></div>
                  <div class="icon-shangyishoudianji-copy iconfont" @click="next"></div>
                  <div class="iconfont icon-shoucang1"></div>
              </div>

          </div>
         <div class="mini-music" v-if="Object.keys(currentSong).length!==0">
             <div class="mini-music-left">
                 <div class="mini-img" @click.stop="isFull" >
                     <img :src="currentSong.al.picUrl" style="width: 40px;border-radius: 50%" v-if="currentSong.al.picUrl" >
                 </div>
                 <div class="mini-text"  >
                     <p class="song-name">{{currentSong.name}}</p>
                     <p class="singer-name">{{currentSong.ar[0].name}}</p>
                 </div>
             </div>
             <div class="mini-music-right right">
                 <div class="iconfont" :class="playIcon2"></div>
                 <div class="iconfont icon-bofangye-caozuolan-suijibofang"></div>
             </div>
         </div>
        <div v-if="!$store.state.playList.length"><loding class="loding"></loding></div>
        <audio :src="currentUrl" ref="audio" @canplay="ready" @error="error" @timeupdate="updateTime"   @ended="end"></audio>
    </div>

</template>

<script>
import PlayNavBar from "./childrenComps/PlayNavBar";
import Loding from "../loading/Loding";
import Lyric from 'lyric-parser'
import ProgressBar from "./childrenComps/ProgressBar";
 import {playMode} from '../../../store/mode'
import {getSongUrl,getLyric} from "../../../network/player";
import Scroll from "../scroll/Scroll";

 import {random} from '../../../common/untils'
import {mapGetters} from 'vuex'
    export default {
        name: "Player",
        data(){
            return{
              songReady:false,
                currentTime:0,
                duration:0,//总时长,
                currentLyric:{},
                currentActive:'lyric',
                showLyric:true,
                currentLyricNum:0,//滚动的行数num
                playingLyric:''//cd页面显示的歌词

            }
        },
        components:{
            PlayNavBar,
            Loding,
            ProgressBar,
            Scroll

        },
        methods:{
            isPlay(){
                if(!this.songReady){//为防止多次点击报错,
                    return
                }
                this.$store.commit("playing",!this.playing)
                //console.log("oo")
            },
            next(){
                if(!this.songReady){//为防止多次点击next报错,
                    return
                }
                let index=this.currentIndex+1
                if(index===this.playList.length){//为最后一首歌时
                    index=0
                }
                this.getUrl(this.playList[index].id)
                this.$store.commit("currentIndex",index)
               // console.log(this.playing)
                //this.$store.commit("playing",true)
                if(this.playing){
                    this.isPlay()
                }

                this.songReady=false
                //this.$bus.$emit("daLun",true)

            },
            pre(){
                if(!this.songReady){
                    return
                }
                let index=this.currentIndex-1
                if(index===-1){//为第一首歌时
                    index=0
                }
               // console.log(this.playList[index].id)
                this.$store.commit("currentIndex",index)
                this.getUrl(this.playList[index].id)
                //console.log(this.playing)
                if(this.playing){//当点击播放下一曲时,playing的值是false,所以播放的图标会变为暂停图标，此时我们
                    this.isPlay()
                    //console.log(this.playing)
                }
                this.songReady=false
            },
            getUrl(id){
                getSongUrl(id).then(res=>{
                    //console.log(res.data.data[0])
                   // this.$refs.audio.pause();
                    this.$store.commit("setUrl",res.data.data[0].url)
                    //console.log(res.data.data[0].url)
                }).catch(err=>{
                    console.log(err)
                })
            },
            ready(){
                this.songReady=true
                this.duration = this.$refs.audio.duration
            },
            error(){
                this.songReady=true
            },
            updateTime(e){//获取当前时间的时间戳
                this.currentTime=e.target.currentTime
            },
            format(num){//格式化时间戳
                 num=num|0//把num向下取整相当于Math.floor
                const minute=(num/60)|0
                const second=this._pad((num%60))
                return minute+":"+second//缺点是秒只有个位
            },
            _pad(num,n=2){
                let length=num.toString().length
                while(length<2){
                    num="0"+num
                    length+=1
                }
                return num
            },
            loop(){//循环播放原理
              this.$refs.audio.currentTime=0;
              if(this.currentLyric){
                  this.currentLyric.seek(0)
              }
              this.$refs.audio.play()
            },
            end(e){  // 歌曲播放完了
                   if(this.mode===playMode.loop){
                       this.loop()
                   }else{
                       this.next()
                   }
            },
            onPercentChange(percent){
                const currentTime=this.duration * percent
                this.$refs.audio.currentTime=currentTime//这里要用this.duration，否则无效,还在思考为什么
                //console.log(this.$refs.audio.currentTime)
                if(!this.playing){
                    this.isPlay()
                }
                if(this.currentLyric){
                    this.currentLyric.seek(currentTime*1000)
                }
            },
            changeIcon(){
                const mode= (this.mode+1)%3
                this.$store.commit('changeMode',mode)
                let list=null
                if(mode===playMode.random){
                    list=random(this.sequenceList)
                }else{
                     list=this.sequenceList
                }
                this.resetCurrentIndex(list)
                this.$store.commit('playList',list)//改变playlist
            },
            resetCurrentIndex (list) {//解决当你直接点击切换模式时放旧歌却又新歌信息的bug
                let index = list.findIndex((item) => {//切换模式后,任然放当前歌曲并显示当前播放歌的信息
                    return item.id === this.currentSong.id
                })
                this.$store.commit("currentIndex",index)
            },
            getLyr(){
                getLyric(this.currentSong.id).then(res=>{
                   this.currentLyric= new Lyric(res.data.lrc.lyric,this.handleLyric)
                         this.currentLyric.play()//让currentLyricNum发生变化,动态改变当前的歌词行数
                    //console.log(this.currentLyric)
                    //console.log(this.currentLyric)
                }).catch(err=>{
                    this.currentLyric=null
                    this.playingLyric=''
                        this.currentLyricNum=0
                })
            },
            handleLyric({lineNum,txt}){
                //console.log(132)
                this.currentLyricNum=lineNum
                if(lineNum>5){//当行数>5时获取一个当前要滚动到的元素
                    const lineEl=this.$refs.lyric[lineNum-5]//往上滚动
                    setTimeout(()=>{
                        this.$nextTick(()=>{
                            this.$refs.scroll.scrollToElement(lineEl,1000)//1s后滚动到lineEl位置
                        })
                    },1000)


                    //scroll对象有scrollToElement方法,用于滚动到指定元素的位置
                }else{
                    if( this.$refs.scroll.scrollTo){
                        this.$refs.scroll.scrollTo(0,0,1000)
                    }

                }
                this.playingLyric=txt
                //console.log(lineNum)
            },
            leftClick(){
                this.showLyric=false
                this.currentActive='cd'
            },
            rightClick(){
                this.showLyric=true
                this.currentActive='lyric'
            },
            isFull(){
                console.log('sdf')
                this.$store.commit("fullScreen",true)
            }

        },
        computed:{
          ...mapGetters({
              currentSong:'currentSong',
              playing:'playing',
              currentIndex:'currentIndex',
              playList:'playList',
              currentUrl:'currentUrl',
              mode:'mode',
              sequenceList:'sequenceList'
          }),
            playIcon(){
              return this.playing? 'icon-bofang1':'icon-bofang'
            },
            rotate(){
              return this.playing? 'play':'pause'
            },
            percent(){
              //console.log(this.currentTime/this.duration)
              return this.currentTime/this.duration
            },
            iconFont(){
              return this.mode===playMode.sequence ?'icon-shunxubofang':this.mode===playMode.loop? 'icon-icon-':'icon-bofangye-caozuolan-suijibofang'
            },
            playIcon2(){
              return this.playing ? 'icon-bofang1':'icon-bofang'
            },

        },
        watch:{
            currentSong(newSong,oldSong){
                  //console.log(newSong.id)

                if(newSong.id===oldSong.id){
                    return
                }
                if(this.currentLyric.stop){//解决歌词来回跳动,原因是歌词的滚动是一个定时器,我们需要手动停掉
                    //console.log(this.currentLyric.stop)
                    this.currentLyric.stop()
                }
                this.$nextTick(()=>{
                        this.$refs.audio.play()
                        this.getLyr()
                    //console.log( this.$refs.audio)
                   // console.log(this.currentUrl)
                })

            },
            playing(newPlaying){
                let audio= this.$refs.audio
                this.$nextTick(()=>{
                    //console.log(newPlaying)
                    //console.log(this.$refs.audio)
                    newPlaying ? audio.play() : audio.pause()
                })

            }
        },
        created() {
            this.touch={}
        },
        mounted() {
            this.$nextTick(()=>{
                console.log(this.currentSong)
            })

        }
    }
</script>

<style scoped>
.normal-music{
    background-color: black;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 99999999;

}
.background{
margin-top: 60px;
    padding: 0 20px;
    box-sizing: border-box;
}
.background img{
    width: 100px;
    border-radius: 50%;
}
.middle{

}
.middle-l{

}
.middle-r{
    margin: 40px 0 0px 0;
    height: 410px;
    width: 100%;
    overflow: hidden;
    text-align: center;
}

.bottom{
    position: absolute;
    bottom: 60px;
    width: 100%;
}
.dot-wrapper{
    position: relative;
    left: 50%;
    margin-left: -51px;
    margin-bottom: 10px;
}
.dot{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    margin-left: 10px;

}
.active2{
    width: 40px;
    border-radius: 20px;
}
.playing-lyric{
    text-align: center;
    margin-top: 20px;
    color: yellow;
}
.bottom-inner{
    display: flex;
    align-items: center;
    width: 80%;
    margin: 0px auto;
    padding: 10px 0;
}
.timer {
    color: #fff;
    font-size: 15px;
    margin: -25px 0 0 0;
    line-height: 30px;
    width: 30px;
}
.lyric-wrapper p{
    margin: 10px auto;
}
.content6{
    height: calc(100% - 44px);
}
.current{
    color: white;
}
.timer-l {
    text-align: left;
    margin-right: 12px;
}
.timer-r {
    text-align: right;
    margin-left: 4px;
}
.timer{
    width: 20px;
}
.progress-bar{
    flex: 1;
}
.operators{
    position: absolute;
    left: 0;
    bottom: 20px;
    display: flex;
    height: 50px;
    width: 100%;
    align-items: center;
    text-align: center;
    color: yellow;
    font-size: 20px;
}
.operators>div{
    flex: 1;
    font-size: 24px;
}
.operators .icon-bofang{
    font-size: 30px;
}
.mini-music{
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 44px;
    background-color: black;
    bottom: 0;
}
.mini-music-left{
   float: left;

    height: 40px;
}
.mini-music-left img{
    vertical-align: middle;
}
.mini-music-left>div{
float: left;
    margin-left: 10px;
    margin-top: 2px;
    font-size: 12px;

}
.mini-music-right{
    color: yellow;
    height: 44px;
    display: flex;
    line-height: 40px;
}
.mini-music-right>div{
    flex: 1;
    font-size: 30px;
    margin-right: 20px;
}
.mini-text>p{
    color: white;
    margin-top: 5px;
}
    .normal-enter,.normal-leave-to{
        opacity: 0;
        transform: translate3d(0,-100px,0);
    }
    .normal-enter-active,.normal-leave-active{
        transition: all 1s;
    }
   .middleL-enter,.middle-leave-to{
       opacity: 0;
       transform: scale(1.2);
   }
.middleL-enter-active, .middleL-leave-active{
    transition: all 1s;
}
    .play{
        animation: rotate 20s linear infinite;
    }
    .pause{
        animation-play-state: paused;
    }
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>