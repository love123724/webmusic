<template>
    <transition name="confirm">
        <div id="confirm">
            <div class="confirm-wrapper" v-show="isShow">
                <div class="confirm-top">
                    <p>{{text}}</p>
                </div>
                <div class="confirm-bottom">
                    <div class="text-cancel" @click.stop="cancel">{{cancelText}}</div>
                    <div class="text-sure" @click.stop="sure">{{confirmText}}</div>
                </div>
            </div>
        </div>
    </transition>

</template>

<script>
    export default {
        name: "Confirm",
        data(){
            return{
                isShow:false
            }
        },
       props:{
           text:String,
           cancelText:{
               type:String,
               default:'取消'
           },
           confirmText:{
               type:String,
               default:'确定'
           }
       },
        methods:{
            show(){
                this.isShow=true
            },
            close(){
                this.isShow=false
            },
            cancel(){
                this.close()
                this.$emit('cancel')
            },
            sure(){
                this.close()
                this.$emit('confirm')
            }
        }
    }
</script>

<style scoped>

.confirm-wrapper{
    background-color: white;
    border-radius: 20px;
    position: absolute;
    width: 270px;
    left: 52.5px;
    top: 300px;

    animation: confirm-zoom 1s;

}
.confirm-top{
    text-align: center;
    border-bottom: 1px solid black;
    color: black;
    height: 60px;
    line-height: 58px;
}
.confirm-bottom{
    display: flex;
}
.confirm-bottom>div{
    flex: 1;
    height: 30px;
    line-height: 28px;
    text-align: center;
    color: black;
}
.confirm-bottom>div:nth-child(1){
    border-right: 1px solid black;
}

    .confirm-enter-active,.confirm-leave-active{
        animation:confirm-fadein ;
    }
    @keyframes confirm-fadein {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    @keyframes confirm-zoom {
        0%{
            transform: scale(0);
        }
        50%{
            transform: scale(1.2);
        }
        100%{
            transform: scale(1);
        }
    }
</style>