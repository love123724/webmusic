<template>
    <div id="search-top">
        <div class="iconfont icon-sousuo1"></div>
        <div class="search-input">
            <input type="text" :placeholder=data  v-model="key">
        </div>
        <div class="iconfont icon-chahao2" v-show="showX" @click="clear"></div>
    </div>
</template>

<script>
    import {getSearchList} from "../../../network/search";

    export default {
        name: "SearchTop",
        data(){
            return{
                showX:false,
                key:'',
            }
        },
        props:{
            data:String
        },
        watch:{
            key(newValue){
                if(!newValue||newValue===''){//解决回车键删除完关键后请求报错
                    this.clear()
                   // this.showX=false
                    return
                }
               //this.key=newValue
                getSearchList(newValue).then(res=>{
                    this.showX=true
                    //console.log(res.data.result.songs)
                    this.$emit("searchList",res.data.result.songs)
                })

            }
        },
        created() {
            /*this.$watch('key',newValue=>{
                console.log(newValue)
            })*/
        },
        methods:{
            clear(){
                this.key=''
                this.showX=false
                this.$emit("clear")
            },
            setQuery(query){
                this.key=query
            }
        }
    }
</script>

<style scoped>
    #search-top{
        width: 100%;
        margin: 0 0 15px 0;
        display: flex;
       padding-top: 20px;
        align-items: center;

        box-sizing: border-box;
    }
.icon-sousuo1{
    color: yellow;
    font-size: 24px;
    width: 64px;
    padding-left: 30px;
    box-sizing: border-box;
    padding-bottom: 1px;
}
   .icon-chahao2{
       color: yellow;
       font-size: 15px;
       width: 64px;
       box-sizing: border-box;
       padding-left:10px;
   }
    .search-input{
        width: 80%;
        box-sizing: border-box;
    }
    .search-input input{
        width: 100%;
        display: block;
        outline: none;
        border: none;
        height: 28px;
      padding-left: 10px;
        background-color: white;
    }
    .search-input input:hover{
        cursor: pointer;
    }
</style>