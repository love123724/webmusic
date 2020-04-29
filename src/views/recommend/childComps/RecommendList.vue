<template>
    <div class="recommend-list">
       <h2>热门歌单推荐</h2>
        <div class="list-content" v-for="(item,index) in  data" :key="index" @click="listClick(item.id,item)" >
            <div class="list-img">
                <img v-lazy="item.picUrl" @load="imgLoad">
            </div>
            <div class="list-text">
                <div>{{item.name}}</div>
                <div>{{item.copywriter}}</div>
                <div>播放量 &nbsp;&nbsp;&nbsp;{{item.playCount|showDate}}</div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: "RecommendList",
        data(){
            return{

            }

        },
        props:{
            data:Array
        },
        filters:{
            showDate(value){
                return value>10000? value/10000 +'万次':value+'次'
            }
        },
        methods:{
            imgLoad(){
                this.$bus.$emit("imgLoad")
            },
        listClick(index,item){
                console.log(item)
           // console.log(index+" "+name)
            this.$router.push('/listdetail/'+index)
            this.$store.commit("setDisc",item)

        }

        }
    }
</script>

<style scoped>
    .recommend-list{

    }
h2{
    color:yellow;
    margin-top: 10px;
    font-weight: normal;
    font-size: 16px;
    text-align: center;
}
.list-content{
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 14px;

}
.list-text{
    flex: 1;

    margin-left: 10px;
}
    .list-text>div{
        margin-bottom: 5px;
    }
.list-text>div:nth-child(1){
    color: white;
    font-weight: 700;
}
    .list-text>div:nth-child(2){
      text-overflow: ellipsis;
        overflow: hidden;
        white-space: normal;
    }
    .list-img{
        width: 80px;
        margin-left: 20px;

    }
    .list-img img{
        width: 100%;
    }
</style>