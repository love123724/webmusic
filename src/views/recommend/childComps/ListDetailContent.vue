<template>
    <transition name="slide">
        <div class="list-detail-content" >
                <img :src="bgl" ref="img">
                 <div></div>
                <div class="content-bottom" @click.stop="randPlay">
                <i class="iconfont icon-bofang"></i>
                <span class="text">随机播放</span>
        </div>
        </div>
    </transition>

</template>

<script>
    import {getSongUrl} from  '../../../network/player'

    import {mapActions,mapGetters} from 'vuex'
    export default {
        name: "ListDetailContent",
        props:{
            bgl:String,
            data:{
                type:Array,
                default(){
                    return[]
                }
            },
        },
        mounted(){
            this.$emit("getImage",this.$refs.img)
        },
        methods:{
            ...mapActions({
                randomPlay:'randomPlay'
            }),
            randPlay(){
                this.randomPlay({
                    list:this.data,
                    index:0
                })
                getSongUrl(this.playList[0].id).then(res=>{
                    const url=res.data.data[0].url
                    this.$store.commit("setUrl",url)
                    this.$store.commit("playing",!this.playing)
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        computed:{
            ...mapGetters({
                currentSong:'currentSong',
                currentIndex:'currentIndex',
                playList:'playList',
                playing:'playing'
            })
        }
    }
</script>

<style scoped>
    .list-detail-content{
        position: relative;
    }

   img{
        width: 100%;
        display: block;
    }
    .content-bottom{
        position: absolute;
        left: 50%;
        bottom: 10px;
        width: 120px;
        height: 40px;
        line-height: 38px;
        text-align: center;
        border: 1px solid yellow;
        border-radius: 20px;
        transform: translateX(-50%);

    }
    .icon-bofang{
        color:yellow;
        font-size: 20px;
    }
    .text{
        color: yellow;
        margin-left: 8px;
    }
</style>