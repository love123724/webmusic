<template>
    <div class="search-suggest" v-if="Object.keys(data).length!==0">
        <scroll class="content">
            <ul>
                <li v-for="(item,index) in data" :key="index" @click.stop="liClick(item,index)">
                    <span>{{item.name}}一{{item.artists[0].name}}</span>
                </li>
            </ul>
        </scroll>
    </div>
</template>

<script>
    import Scroll from "../../../components/common/scroll/Scroll";

   import {getSongUrl,getSongDetail} from "../../../network/player";

    export default {
        name: "SearchSuggest",
        props:{
            data:Array
        },
        components:{
            Scroll,

        },
        methods:{
            liClick(item,index){
                console.log(item)
                this.$emit('select')
                 this.$toast.show('正在努力实现中...',2000)
              /*getSongUrl(item.id).then(res=>{
                    //console.log(res.data.data[0].url)
                    const url=res.data.data[0].url
                  getSongDetail(item.id).then(res=>{
                      console.log(res.data.songs[0].al.picUrl)
                      item.image=res.data.songs[0].al.picUrl
                     this.$store.dispatch("insertSong",item)
                  }).catch(err=>{
                      console.log(err)
                  })
                    this.$store.commit("setUrl",url)
                    this.$store.commit('fullScreen',true)
                   this.$store.commit('playing',true)
                }).catch(err=>{
                    console.log(err)
                })*/
            },

        }
    }
</script>

<style scoped>
    .search-suggest{
        position: relative;
        height: 100vh;
    }
.search-suggest li{
    width: 100%;
    height: 60px;
    line-height: 58px;
    border-top: 1px solid gray;
    padding-left: 15px;
    box-sizing: border-box;
}
    .content{
        position: absolute;
        left: 0;
        right: 0;
        top: 0px;
        bottom: 120px;
        overflow: hidden;
    }
</style>