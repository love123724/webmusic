<template>
    <div class="rank-list-detail" v-if="Object.keys(topList).length!==0">
     <list-detail-nav-bar :title="topList.playlist.name"/>
        <list-detail-content :bgl="topList.playlist.coverImgUrl" :data="topList.playlist.tracks"  @getImage="getImage" />
        <scroll class="content" :probe-type="3" @gud="gud" ref="scroll">
            <list-detail-content2 :data="topList.playlist.tracks" ref="content2"></list-detail-content2>
        </scroll>

    </div>
</template>

<script>
    import ListDetailNavBar from "../../recommend/childComps/ListDetailNavBar";
    import ListDetailContent from "../../recommend/childComps/ListDetailContent";
    import ListDetailContent2 from "../../recommend/childComps/ListDetailContent2";

    import Scroll from "../../../components/common/scroll/Scroll";

    import {getTopList} from "../../../network/rank";

    import {mapGetters} from 'vuex'
    export default {
        name: "RankListDetail",
        components:{
            ListDetailNavBar,
            ListDetailContent,
            ListDetailContent2,
            Scroll,
        },
        data(){
            return{

            }
        },
        computed:{
            ...mapGetters({
                topList:'topList'
            })
        },
        created() {
         // this.tracks=this.$route.query.value
           // console.log(this.$route.query.value)
            this.$nextTick(()=>{
                //console.log(this.topList)
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
    .rank-list-detail{
        height: 100vh;
        position: relative;
    }
.content{
    position: absolute;
    top: 410px;
    bottom: 0px;
    left: 0;
    right: 0;
}
</style>