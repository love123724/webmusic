<template>
    <div class="recommend">
        <scroll class="content" :pull-up-load="true" @pullingUp="pullingUp" ref="scroll">
           <recommend-swiper :banners="banners" @imgLoad="imgLoading"/>
            <recommend-list :data="lists.data"></recommend-list>
            <loding v-show="!lists.data.length"/>
        </scroll>
           <transition name="slide">
               <router-view></router-view>
           </transition>



    </div>
</template>

<script>
    import RecommendList from "./childComps/RecommendList";
    import RecommendSwiper from "./childComps/RecommendSwiper";
    import Loding from "../../components/common/loading/Loding";
    import Scroll from "../../components/common/scroll/Scroll";

    import {getBanners,getRecommendList} from "../../network/recommend";

    export default {
        name: "Recommend",
        components:{
            RecommendSwiper,
            RecommendList,
            Loding,
            Scroll
        },
        data(){
            return{
                banners:[],
                type:1,
                lists:{
                    limit:0,
                     data:[]
                }
            }
        },
        created() {
            getBanners(this.type).then(res=>{
                //console.log(res.data.banners)
                this.banners=res.data.banners
            })
            this.getRecList()
        },
        mounted() {
             const refresh=this.debounce(  this.$refs.scroll.refresh,30)
            this.$bus.$on("imgLoad",()=>{
                 refresh()
            })


        },
        methods:{
            debounce(func,delay){
                let timer=null
                return function(...args){
                    if(timer) clearTimeout(timer)
                    timer = setTimeout(()=>{
                        func.apply(this,args)
                        // console.log(timer)
                    },delay)

                }
            },
            getRecList(){
                 const limit=this.lists.limit+10
                //const limit=this.lists.limit+10 > 30 ? 30:this.lists.limit+7
                    getRecommendList(limit).then(res=>{
                    //console.log(res.data)
                        if(limit<=30){
                            this.lists.data.push(... res.data.result.slice(limit-10,limit))
                            this.lists.limit+=10
                        }else{
                            this.lists.limit=30
                        }

                        //this.lists.limit=this.lists.limit>30? 30: this.lists.limit+=10
                    this.$refs.scroll.loadMore()
                    //console.log(res.data)
                })

            },
            pullingUp(){
                this.getRecList()
                //console.log("上啦加载更多")
            },
            imgLoading(){



            },

        }
    }
</script>

<style scoped>
.recommend{
    background-color: black;
    position: relative;
    height:100vh;
    overflow: hidden;
}
.content{
    height:calc(100% - 80px);
  overflow: hidden;
}
.slide-enter,.slide-leave-to{
    transform: translate3d(100%,0,0);
}
.slide-enter-active,.slide-leave-active{
    transition: all 1s;
}
</style>