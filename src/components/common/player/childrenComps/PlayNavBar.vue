<template>
    <div class="play-nav-bar" v-if="Object.keys(currentSong).length!==0">
        <nav-bar>
            <div class="iconfont icon-arrow-down" slot="left" @click="back"></div>
            <div class="text" slot="right">{{currentSong.name}}</div>
        </nav-bar>
        <div class="text2">{{currentSong.ar[0].name}}</div>
    </div>
</template>

<script>
    import NavBar from "../../navbar/NavBar";
    import {mapGetters} from 'vuex'
    export default {
        name: "PlayNavBar",
        components:{
            NavBar
        },
       computed:{
            ...mapGetters({
                currentSong:'currentSong'
            }),
       },
        methods:{
            back(e){
                e=e||window.event
                if(e.stopPropagation){//阻止父级事件发生,解决点击时跳转路由
                    e.stopPropagation()
                }else{
                    e.cancelBubble=true
                }
                this.$store.commit('changeFullScreen')
                //this.$router.back()
                //this.$emit('zIn')

            }
        },
        created() {
            console.log(this.currentSong)
        },
        mounted() {

        }
    }
</script>

<style scoped>
.play-nav-bar{
    height: 40px;
    width: 100%;
}
    .iconfont{
        color: yellow;
        font-size: 20px;
        margin-left: 10px;
        width:40px;
        vertical-align: middle;
    }
.text{
    margin-left: -20px;
}
    .text,.text2{
        color:white;
        font-size: 20px;
        text-align: center;
    }
</style>