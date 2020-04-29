<template>
    <div class="singer-list" v-if="Object.keys(data).length!==0">
        <scroll class="content" ref="scroll" :probe-type="3" @gud="gud2">
            <div class="singer-wrapper">
                <ul>
                    <li v-for="(item,index) in data" :key="index" class="list-group" ref="list">
                        <h2 :class="{active:isActive}">{{item.title}}</h2>
                        <ul>
                            <li v-for="(item2,indey) in item.items" :key="indey" class="list-group-item"  @click="singerListClick(item2.id)">
                                <img  v-lazy="item2.img1v1Url" @load="loadImage">
                                <span class="singer-name">{{item2.name}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </scroll>


    </div>
</template>

<script>
    import Scroll from "../../../components/common/scroll/Scroll";
    export default {
        name: "SingerList",
        props:{
            data:Array
        },
        components:{
            Scroll
        },
        methods:{
            singerListClick(id){
                 this.$router.push("/singerListDetail/"+id)
            },
            gud2(position){
                let positionY=-position.y
                for( var i=0;i<this.offsetTop.length;i++){
                                 if(positionY>=this.offsetTop[i]&&positionY<this.offsetTop[i+1]){
                                    this.currentIndex2=i
                                     this.$bus.$emit( "index",this.currentIndex2)
                                 }
                }
                //console.log( this.offsetTop)

            },
            loadImage(){
                let height=0
                this.offsetTop=[]
                //console.log(this.$refs.h2.scrollTop)
                this.$refs.list.forEach((item,index)=>{
                    let li= this.$refs.list[index]
                    height+=li.clientHeight
                    this.offsetTop.push(height)
                })
                //console.log( this.offsetTop)
            }
        },
        mounted() {
            this.$bus.$on('move',(index)=>{
                this.$refs.scroll.scrollToElement(this.$refs.list[index],1000)
                 this.isActive=true
            })
        },
        data(){
            return{
                isActive:false,
                currentIndex2:0
            }
        },

    }
</script>

<style scoped>
    .singer-list{
        background-color: black;
        height: 100vh;
        position:relative;
    }
    h2{
        color: black;
        width: 100%;
        height:30px;
        background-color:darkgrey;
        font-size: 14px;
        line-height: 28px;
        padding-left: 15px;
        box-sizing: border-box;
    }
  .list-group{


  }
  .list-group-item{
      display: flex;
      align-items: center;
      padding: 5px 0;
      margin: 0 5px;
      height: 80px;
  }
 img{
    width: 50px;
    border-radius: 50%;
    vertical-align:middle ;
}
    .singer-name{
        margin-left: 16px;
    }
    .content{
        position: absolute;
        top: 0px;
        bottom: 80px;
        left: 0;
        right: 0;

    }
    .active{
        color:yellow
    }
</style>