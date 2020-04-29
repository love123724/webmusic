<template>
    <div id="rank">
        <rank-list :data="rank"/>
    </div>
</template>

<script>
    import RankList from "./childrenComps/RankList";
    import {getTopList,getTopListDetail} from "../../network/rank";
  const RANK_TOP=[0,1,2,17,26,33]
    export default {
        name: "Rank",
        components:{
            RankList
        },
        data(){
            return{
                rank:[]
            }
        },
        created(){
            for(let i=0;i<RANK_TOP.length;i++){
                getTopList(RANK_TOP[i]).then(res=>{
                    this.rank.push(res.data)
                     console.log(res.data)
                }).catch(err=>{
                    console.log(err)
                })
            }


        },
        updated() {
            //console.log(this.rank)
        }
    }
</script>

<style scoped>
#rank{
    background-color:#333333;
    height: 100vh;
}
</style>