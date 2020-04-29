<template>
    <div id="singer-list-detail">
        <list-detail-nav-bar :title="artist.name" class="list-nav-bar"/>
        <list-detail-content :bgl="artist.picUrl?artist.picUrl:artist.img1v1Url" @getImage="getImage"/>
        <scroll class="content" :probe-type="3"  ref="scroll" @gud="gud">
            <singer-list-content2 :data="hotSongs"/>
        </scroll>

    </div>
</template>

<script>
    import ListDetailNavBar from "../../recommend/childComps/ListDetailNavBar";
    import ListDetailContent from "../../recommend/childComps/ListDetailContent";
    import SingerListContent2 from "./SingerListContent2";

    import Scroll from "../../../components/common/scroll/Scroll";
    import {getSingerAblum,getSingerSingle} from "../../../network/singer";

    export default {
        name: "SingerListDetail",
        components:{
            ListDetailNavBar,
            ListDetailContent,
            SingerListContent2,
            Scroll
        },
        data(){
            return{
                hotSongs:[],
                artist:{},
                Image:''
            }
        },
        created() {
            getSingerSingle(this.$route.params.id).then(res=>{
                //console.log(res.data)
                const {artist,hotSongs}=res.data
                this.artist=artist
                this.hotSongs=hotSongs

                //console.log( this.hotSongs)
            }).catch(err=>{
                console.log(err)
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
        }
    }
</script>

<style scoped>
.list-nav-bar{
    text-align: center;
}
    #singer-list-detail{
      height: 100vh;
        position: relative;
    }
    .content{
     position: absolute;
        top: 340px;
        bottom: 0px;
        left: 0;
        right: 0;
    }
</style>