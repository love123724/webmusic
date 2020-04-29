<template>
    <div id="search-history">
        <div class="history-title" v-if="saveSearchHistory.length!==0">
            <div class="history-text">搜索历史</div>
            <div class="iconfont icon-shanchu right" @click="deleteAll"></div>
        </div>
        <ul class="history-list">
            <li v-for="(item,index) in saveSearchHistory" :key="index">
                <div class="text" @click="setQuery2(item)">{{item}}</div>
                <div class="iconfont icon-chuyidong" @click.stop="deleteOne(item)"></div>
            </li>
        </ul>
        <confirm  text="是否清空搜索历史数据" confirm-text="确定" ref="confirm" @confirm="confirm"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Confirm from "../../../components/common/confirm/Confirm";
    export default {
        name: "SearchHistory",
        components:{
            Confirm
        },
        computed:{
            ...mapGetters({
                saveSearchHistory:'saveSearchHistory'
            })
        },
        methods:{
            deleteOne(item){
                //console.log(item)
                this.$store.commit('deleteSearch1',item)
            },
            deleteAll(){
                this.$refs.confirm.show()
                    //this.$store.commit('clearSearch')
            },
            setQuery2(item){
                this.$emit('setQuery2',item)
            },
            confirm(){
                this.$store.commit('clearSearch')
            }
        }
    }
</script>

<style scoped>
    #search-history{
        padding-right: 10px;
        padding-left: 10px;
        width: 100%;
        box-sizing: border-box;
    }
    .history-title{
        display: flex;
        margin-top: 30px;

    }
.history-text{
    color: white;
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 25px;
}
    .icon-shanchu{
        color: yellow;
       text-align: right;
        flex: 1;
        font-size: 20px;
    }
    .history-list{

    }
    .history-list li{
        list-style: none;
        display: flex;
        margin-top: 0;
        height: 30px;


    }
    .history-list .text{
        font-size: 14px;
       width: 120px;
    }
    .icon-chuyidong{
        text-align: right;
        font-weight: 700;
        color: yellow;
        flex: 1;
        text-align: right;
    }
</style>