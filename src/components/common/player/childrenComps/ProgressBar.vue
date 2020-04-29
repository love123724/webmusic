<template>
   <div class="progress-bar" ref="progressBar" @click="progressClick">
       <div class="bar-inner">
           <div class="progress" ref="progress"></div>
           <div class="progress-btn-wraper" ref="progressBtn"
                @touchstart.prevent="progressTouch"
                @touchmove.prevent="progressMove"
                @touchend="progressTouchEnd">
               <div class="progress-btn" ></div>
           </div>
       </div>
   </div>
</template>

<script>
    export default {
        name: "ProgressBar",
        props:{
            percent:{
                type:Number,
                default:0
            }
        },
        watch: {
            percent(newPercent){
                //console.log(!this.touch.init)
                if(newPercent>=0 && !this.touch.init){//只有percent>=0且用户没拖动时才执行它，解决持续拖动回跳
                  // console.log("ooooo")
                    let barWidth=this.$refs.progressBar.clientWidth-16

                    let offsetWidth=newPercent*barWidth
                    this.$refs.progress.style.width=offsetWidth+'px'
                    //this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
                    this.$refs.progressBtn.style.transform='translate3d('+offsetWidth+'px,0,0)'
                }

            }

        },
        mounted() {
          this.touch={}
        },
        methods:{
            progressTouch(e){
                this.touch.init=true
                this.touch.left=this.$refs.progress.clientWidth
                this.touch.startX=e.touches[0].pageX
            },
            progressMove(e){
                if(!this.touch.init){//如果没有初始化时,就不进入执行拖动的这个函数
                    return
                }
                let moveWidth=e.touches[0].pageX-this.touch.startX
                // Math.min(this.$refs.progressBar.clientWidth - this.progressBthWidth, Math.max(0, this.touch.left + deltaX))
                let offsetWidth=Math.min(this.$refs.progressBar.clientWidth-16,Math.max(0,this.touch.left+moveWidth))
               this.offsetWidth(offsetWidth)
            },
            progressTouchEnd(e){//拖动结束
                this.touch.init=false
                this.triggerPercent()

            },
            offsetWidth (offsetWidth) {
                // 进度条的宽度 不断变化
                this.$refs.progress.style.width = `${offsetWidth}px`
                // 小球位置 不断变化
                this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
            },
            triggerPercent(){//当拖动结束时触发这个事件
                const  barWidth=this.$refs.progressBar.clientWidth-16 //把当前进度条的宽度/总宽度得一百分比
                const percent=this.$refs.progress.clientWidth/barWidth
                console.log(percent)
                this.$emit('onPercentChange',percent)
            },
            progressClick(e){//加给progressBar组件的根标签
                this.offsetWidth(e.offsetX)
             this.triggerPercent()
            }
        }
    }
</script>

<style scoped>
.progress-bar{
    height: 30px;
}
    .bar-inner{
        position: relative;
        height: 4px;
        left: 0;
        top: 0;
        background-color: rgba(120,120,0,.5);
    }
    .progress{
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
        background-color: white;
    }
    .progress-btn-wraper{
        position: absolute;
        left: 0;
        top: 0;
        height: 30px;
    }
    .progress-btn{
        position: absolute;
        left: 0;
        top: -4px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 3px solid white;
        background-color: yellow;
    }
</style>