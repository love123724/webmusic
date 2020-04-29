import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router)


const Recommend=()=>import('../views/recommend/Recommend')
const Singer=()=>import('../views/singer/Singer')
const Rank=()=>import('../views/rank/Rank')
const Search=()=>import('../views/search/Search')
const RecommendListDetail=()=>import('../views/recommend/childComps/RecommendListDetail')
const Player=()=>import('../components/common/player/Player')
const SingerListDetail=()=>import('../views/singer/childrenComps/SingerListDetail')
const RankListDetail=()=>import('../views/rank/childrenComps/RankListDetail')
const Register=()=>import('../components/context/Register/Register')
const routes=[
    {
      path:'',
        redirect:'recommend'
    },
    {
        path:'/recommend',
        component:Recommend,
        meta:{
            show:true
         }
    },
    {
        path:'/singer',
        component:Singer,
        meta:{
            show:true
        }
    },
    {
        path:'/rank',
        component:Rank,
        meta:{
            show:true
        }
    },
    {
        path:'/search',
        component:Search,
        meta:{
            show:true
        }
    },
    {
        path:'/listDetail/:id',
        component:RecommendListDetail
    },
    {
        path:'/player',
        component:Player,

    },
    {
        path:'/singerListDetail/:id',
        component:SingerListDetail,

    },
   {
        path:'/rankListDetail',
        component:RankListDetail
    },
    {
        path:'/register',
        component:Register
    }
]
const router=new Router({
    routes,
    mode:'history'
})
export default router