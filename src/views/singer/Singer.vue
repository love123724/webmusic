<template>
    <div id="singer">
        <singer-list :data="singer" class="singer-list"></singer-list>
        <singer-hua class="singer-hua"  :data="singer"></singer-hua>
    </div>
</template>

<script>
    import {getSinger} from "../../network/singer";
  import SingerList from "./childrenComps/SingerList";
  import SingerHua from "./childrenComps/SingerHua";
  import pinyin from 'pinyin'
    const HOTname='热门'
    const HOTsingers=6
    export default {
        name: "Singer",
        data(){
            return{
                singer:[],
                hot:'热门'
            }
        },
        mounted(){
             this.$nextTick(()=>{
                 getSinger(30,0).then(res=>{
                     //console.log(res)
                     //this.singer=res.data.artists
                    this.singer= this.SingerList( res.data.artists)//获取每个歌手名字的首个汉字的大写英文字母,然后把这个字母作为一个属性加入到item里
                     //console.log(this.SingerList( res.data.artists))
                 })
             })



        },
        components:{
            SingerList,
            SingerHua
        },
        methods:{

            SingerList(list){
              list.map(item=>{//获取每个歌手名字的首个汉字的大写英文字母,然后把这个字母作为一个属性加入到item里
                     let py=pinyin(item.name[0],{
                        style:pinyin.STYLE_FIRST_LETTER
                    })
                    item.py=py[0][0].toUpperCase()
                    //console.log( item)
                })

                // 分别把热门歌手,按字母分类的歌手数据弄出来
                let map={
                    hot:{
                        title:HOTname,
                        items:[]
                    }
                }
              list.forEach((item,index)=>{
                  if(index<HOTsingers){//默认吧下标小于6的item数据给热门歌手
                      map.hot.items.push(item)
                  }
                  //当index>=6时 如果map对象没有key属性时就创建一个key对象,title属性为key值,items属性放该类key的歌手数据,如果有的话就直接把
                  //这个歌手的数据加到该类key的items里面
                  const key=item.py
                  if(!map[key]){
                      map[key]={
                          title:key,
                          items:[]
                      }
                  }
                  map[key].items.push(item)
                  //console.log(map)


                 // console.log( this.singer)
              })
                //把上面得到的数据分别放到hot,ret数组里面
                const hot=[]
                const ret=[]
                for(let key in map) {
                    let val = map[key]
                    if (val.title.match(/[A-Z]/)) {
                        ret.push(val)
                    } else if (val.title === HOTname) {
                        hot.push(val)
                    }
                }
                ret.sort((a,b)=>{//含有字母的map数组中顺序排列
                    return a.title.charCodeAt(0)-b.title.charCodeAt(0)
                })
               return  hot.concat(ret)//数组之间的合并
            },
        },
        updated() {

        }

    }
</script>

<style scoped>
    #singer{
        position: relative;

    }
    .singer-top{
        height: 30px;
        width: 100%;
        background-color: #333333;
        color: white;
        line-height: 28px;
       padding-left: 20px;
        box-sizing: border-box;
        position: relative;
        z-index: 999;
    }
    .singer-hua{
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
    .singer-list{
        background-color: gray();
    }
</style>