<template>
    <div class="list-detail-content2">
        <div class="content2-content" v-for="(item,index) in data" :key="index"
             @click="songClick(item,index)"
             v-show="!$route.query.id">
            <div class="song-name">{{item.name}}</div>
            <div class="singer-name">{{item.ar[0].name}}</div>
        </div>
        <div class="content2-content" v-for="(item,index) in data" :key="item.id" v-show="$route.query.id"
             @click="songClick(item,index)"
             :class="{active:isActive}">
            <div class="iconfont  icon-jiangbei2 left" v-if="index<=2" style="font-size: 24px;color:yellow"></div>
            <div class=" left" v-else style="font-size: 24px;color: yellow;margin-left: 6px">{{index+1}}</div>
            <div class="song-detail left">
                <div class="detail-name">{{item.name}}</div>
                <div class="detail-singer">{{item.ar[0].name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getSongUrl} from "../../../network/player";
    import{playMode} from "../../../store/mode";
    import {random} from "../../../common/untils";
    import {mapGetters} from 'vuex'
    export default {
        name: "ListDetailContent2",
        props:{
          data:{
              type:Array,
              default(){
                  return[]
              }
          }
        },
       data(){
            return{
                url:'',
                isActive:true
            }
       },
        computed:{
            active(){
                return
            }
        },
        created() {
          console.log(this.data)
        },
        computed:{
            ...mapGetters({
                mode:'mode',
                playList:'playList'
            })
        },
        methods:{
            songClick(item,index){
                let list2=null
                if(this.mode===playMode.random){
                   //console.log("oo")
                    /*this.$bus.$on('daLun',(res)=>{
                        console.log(res)
                        if(res==true){
                            list2=random(this.data)
                            //this.resetCurrentIndex(list2)
                            //console.log(playList[])

                        }
                    })*/

                }
                //console.log(item)
                getSongUrl(item.id).then(res=>{
                    //console.log(res.data.data[0].url)
                    const url=res.data.data[0].url
                    this.$store.dispatch("selectItem",{
                        list:this.data,
                        index,
                        url:url
                    })
                }).catch(err=>{
                    console.log(err)
                })

            },
            resetCurrentIndex (list) {//解决当你直接点击切换模式时放旧歌却又新歌信息的bug
                let index = list.findIndex((item) => {//切换模式后,任然放当前歌曲并显示当前播放歌的信息
                    return item.id === this.currentSong.id
                })
                this.$store.commit("currentIndex",index)
            },


        }
    }
</script>

<style scoped>
.song-name{
    padding-top: 15px;
    color: white;
   font-size: 14px;
    margin-bottom: 10px;
}
.list-detail-content2{
    background-color: black;
    padding-left: 15px;
}
    .content2-content{
        height: 70px;
        line-height: 20px;
        box-sizing: border-box;
    }
    .active{
        display: flex;
        align-items: center;
        height: 70px;
        box-sizing: border-box;
    }
.active .song-detail{
    margin-left: 15px;
    color: white;
}
.detail-name{
    margin-bottom: 6px;
}
    .detail-singer{
        color:gray;
    }
</style>