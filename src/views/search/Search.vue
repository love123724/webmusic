<template>
    <div id="search">
        <search-top :data="showKeyWord" @searchList="searchList" @clear="clear" ref="searchTop"/>
        <search-suggest v-show="isShow" class="suggest" :data="songs" @select="select"/>
        <search-keys @hotClick="hotClick"/>
        <search-history @setQuery2="setQuery2"/>
    </div>
</template>

<script>
    import SearchTop from "./searchComps/SearchTop";
    import SearchKeys from "./searchComps/SearchKeys";
    import SearchHistory from "./searchComps/SearchHistory";
    import SearchSuggest from "./searchComps/SearchSuggest";
    import Confirm from "../../components/common/confirm/Confirm";
    import {getSearchDefault} from "../../network/search";

    export default {
        name: "Search",
        data(){
            return{
               showKeyWord:'',
                isShow:false,
                songs:[]
            }
        },
        components: {
            SearchTop,
            SearchKeys,
            SearchHistory,
            SearchSuggest,
            Confirm
        },
        created(){
            getSearchDefault().then(res=>{
                //console.log(res.data.data.showKeyword)
                this.showKeyWord=res.data.data.showKeyword
                //console.log( this.showKeyWord)
            })
        },
        methods:{
            searchList(songs){
                this.songs=songs
                this.isShow=true
               // console.log(this.songs)
            },
            clear(){
                this.isShow=false
            },
            hotClick(query){
                this.$refs.searchTop.setQuery(query)
            },
            select(){
                let query=this.$refs.searchTop.key
                //console.log(query)
                this.$store.commit('saveSearch', query)
            },
            setQuery2(item){
                this.$refs.searchTop.setQuery(item)
            }
        }
    }
</script>

<style scoped>
#search{
    background-color: black;
    height: 100vh;
    position: relative;
}
    .suggest{
        position: absolute;
        left: 0;
        top: 60px;
        height: 100vh;
        background-color: black;
        width: 100%;
        color: white;
    }
</style>