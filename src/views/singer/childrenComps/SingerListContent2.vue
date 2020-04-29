<template>
    <div class="singer-list-content2" v-if="Object.keys(data).length!==0">
        <div class="content2-content" v-for="(item,index) in data" :key="index" @click="songClick(item,index)">
            <div class="song-name">{{item.name}}</div>
            <div class="singer-name">{{item.ar[0].name}}</div>
        </div>
    </div>
</template>

<script>
    import {getSongUrl} from "../../../network/player";

    export default {
        name: "SingerListContent2",
        props:{
            data:Array
        },
        methods:{
            songClick(item,index){
               // console.log(item.id)
                getSongUrl(item.id).then(res=>{
                    console.log(res)
                    const url=res.data.data[0].url
                    this.$store.dispatch("selectItem",{
                        list:this.data,
                        index,
                        url:url
                    })
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .song-name{
        padding-top: 15px;
        color: white;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .singer-list-content2{
        background-color: black;
        padding-left: 15px;
    }
    .content2-content{
        height: 70px;
        line-height: 20px;

        box-sizing: border-box;
    }

</style>