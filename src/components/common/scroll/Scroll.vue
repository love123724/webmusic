<template>
    <div class="scroll" ref="scroll">
<div class="content">
    <slot></slot>
</div>


    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        data(){
            return{
               scroll:null
            }
        },
        props:{
            pullUpLoad: {
                type:Boolean,
                default:false
            },
            probeType:Number
        },

        mounted() {
            this.scroll=new BScroll(this.$refs.scroll,{
                click:true,
                pullUpLoad:this.pullUpLoad,
                probeType:this.probeType
            })
            this.scroll.on('pullingUp',()=>{
                this.$emit("pullingUp")
               // this.scroll.finishPullUp();
            })
        this.scroll.on('scroll',(res=>{
               this.$emit("gud",res)
        }))

        },
       methods:{
            loadMore(){
                this.scroll.finishPullUp();
            },
            refresh(){
                this.scroll.refresh();
                console.log('---')
            },
           scrollToElement() {
               this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
           },
           scrollTo() {
               this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
           },

       }
    }
</script>

<style scoped>

</style>