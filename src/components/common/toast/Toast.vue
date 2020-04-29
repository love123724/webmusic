<template>
    <div id="toast"  v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        data(){
            return{
                isShow:false,
                message:String
            }
        },
        methods:{
            show(message,duration){
                this.message=message
                this.isShow=true
                setTimeout(()=>{
                    this.isShow=false
                },duration)
            }
        }
    }
</script>

<style scoped>
    #toast{
        position: fixed;
        left: 130px;
        top: 300px;
        background-color: rgba(180,100,0,.5);
        color: white;
        padding: 8px 10px;
        z-index: 999999;
    }
</style>