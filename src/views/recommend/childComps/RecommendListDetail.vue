<template>
        <div class="recommend-list-detail">
            <list-detail-nav-bar :title="playlist.name"/>
            <list-detail-content :bgl="playlist.coverImgUrl" @getImage="getImage" :data="playlist.tracks"/>
            <scroll class="content" :probe-type="3"  ref="scroll" @gud="gud">
                <list-detail-content2 :data="playlist.tracks" ref="content2"/>
            </scroll>
            <loding v-show="!playlist.tracks.length"></loding>

        </div>

</template>

<script>
   import ListDetailNavBar from "./ListDetailNavBar";
   import ListDetailContent from "./ListDetailContent";
   import ListDetailContent2 from "./ListDetailContent2";

   import Loding from "../../../components/common/loading/Loding";
   import Scroll from "../../../components/common/scroll/Scroll";


    import {getPlistDetail} from '../../../network/recommend'

    export default {
        name: "RecommendListDetail",
        components:{
            ListDetailNavBar,
            ListDetailContent,
            ListDetailContent2,
            Scroll,
            Loding
        },
        data(){
            return{
                playlist:{
                    name:'',
                    coverImgUrl:'',
                    tracks:[],
                    trackIds:[],
                },
                Image:''
            }
        },
        created() {
            this.$route.meta.show=false
            getPlistDetail(this.$route.params.id).then(res=>{
                console.log( res.data)
                const {name,coverImgUrl,trackIds,tracks}=res.data.playlist;
                this.playlist.name=name;
                this.playlist.coverImgUrl=coverImgUrl;
                this.playlist.tracks=tracks;
                this.playlist.trackIds=trackIds;

            })
        },
        methods:{
            gud(position){
                //console.log(position.y)
                let scale=1

                let percent=Math.abs(position.y/100)
                if(position.y>0){
                    scale=1+percent
                }
                //console.log(this.Image)
                this.Image.style.transform='scale('+scale+')'


            },
            getImage(img){
                 this.Image=img
            }
        },
        destroyed() {
            this.$route.meta.show=true
            //console.log( this.$route.meta.show)
        }
    }
</script>

<style scoped>
    .recommend-list-detail{
        height: 100vh;
        position: relative;
        overflow: hidden;
    }
.content{
    height: calc(100% - 40px);
}
    .fixed{
        position: fixed;
        left: 0;
        right: 0;
        top: 40px;
    }

</style>