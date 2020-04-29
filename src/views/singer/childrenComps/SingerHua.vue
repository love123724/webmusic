<template>
    <div class="singer-hua"
         @touchstart="touchStart"
         @touchmove="touchMove"
         @touchend="touchEnd">
        <ul>
            <li v-for="(item,index) in data" :key="index" :class="{active:currentIndex===index}"

                @click="singerHuaClick(index)" :data-index="index">{{item.title}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SingerHua",
        data(){
            return{
                currentIndex:0,
                currentAlpha:''
            }
        },
        created() {
            this.touch={}
        },
        props:{
            data:Array,
            currentIndex2:0
        },
        methods:{
            singerHuaClick(index){
                    //console.log(currentAlpha)
                    this.currentIndex=index
                    console.log(  this.currentIndex)
                    //this.$emit(" liClick",currentAlpha)

            },
            touchStart(e){
                //console.log(e.target.getAttribute('data-index'))
                let index=e.target.getAttribute('data-index')
                let touchStart=e.touches[0]
                this.touch.y1=touchStart.pageY
                this.$bus.$emit("move",index)

            },
            touchMove(e){

            },
            touchEnd(){

            }
        },
        mounted() {
            this.$bus.$on('index',(index)=>{
                this.currentIndex=index+1
                //console.log(index)
            })
        }

    }
</script>

<style scoped>
    .singer-hua ul{
        width: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,.4);
        text-align: center;
        position: relative;
        top: -40px;
        right: 0;
        padding-bottom: 10px;
    }
    ul>li:nth-child(1){
      padding-top: 10px;
    }

li{
    list-style: none;
    color: white;
    width: 100%;
    margin-top: 5px;
    font-size: 14px;

}
    .active{
        color: yellow;
    }
</style>