<template>
    <div id="search-keys">
        <h2>热门搜索</h2>
        <ul>
            <li v-for="(item,index) in hot" :key="index" @click="hotClick(item.first)">
               <span>{{item.first}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import {getSearchHot} from "../../../network/search";

    export default {
        name: "SearchKeys",
        data(){
            return{
                hot:[]
            }
        },
        created() {
            getSearchHot().then(res=>{
                console.log(res.data.result.hots)
                this.hot=res.data.result.hots;
            })
        },
        methods:{
            hotClick(query){
                this.$emit('hotClick',query)
            }
        }
    }
</script>

<style scoped>
h2{
    color: white;
    font-size: 16px;
    font-weight: normal;
    padding-left: 10px;
    margin-bottom: 25px;

}
    #search-keys ul{
        margin-left: 20px;
     width: 100%;
        overflow: hidden;
    }
#search-keys ul li{
    list-style: none;
    color: white;
    float: left;
    width:33%;
    margin: 5px 0;
    font-size: 14px;
}
#search-keys ul li span:nth-child(2){
    margin: 0 60px;

}
</style>