<template>
    <div class="rank-list" v-if="Object.keys(data).length!==0">
        <scroll class="content">
            <div class="rank-list-inner" v-for="(item,index) in data" :key="index"
                 @click="rankList(item,item.playlist.id)">
                <div class="list-inner-left">
                    <img v-lazy="item.playlist.coverImgUrl">
                </div>
                <div class="list-inner-right" >
                    <div v-for="(item2,indey) in item.playlist.tracks.slice(0,3)">
                        <p>{{indey+1}} {{item2.name}}-{{item2.ar[0].name}}</p>
                    </div>

                </div>
            </div>
        </scroll>

    </div>
</template>

<script>
    import Scroll from "../../../components/common/scroll/Scroll";

    export default {
        name: "RankList",
        props:{
           data:Array
        },
        created() {
            console.log(this.data)
        },
        components:{
            Scroll
        },
        methods:{
            rankList(item,id){
              console.log(item.playlist.tracks)

                this.$router.push({
                    path:'/rankListDetail',
                    query:{
                        id
                    }
                })
                this.$store.commit("setTopList",item)
            }
        }
    }
</script>

<style scoped>
    .rank-list{
        padding-top: 30px;
        height: 100vh;
    }
.rank-list-inner{
    width:90%;
    margin: 0 auto 30px;
    display: flex;
    height: 99px;
    background-color:black;
}
    .list-inner-left{
        width: 99px;
        height: 100%;
    }
    .list-inner-right{
        flex: 1;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .list-inner-right>div p{
       font-size: 14px;
        color: #f6f6f6;
        margin-top: 10px;
        padding-left: 6px;
    }
    img{
        width: 99px;
        height: 100%;
    }
    .content{
        height: calc(100% - 80px);
    }
</style>