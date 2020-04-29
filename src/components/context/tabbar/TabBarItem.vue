<template>
    <div class="tab-bar-item" @click="tabBarItemClick" :class="{active:isActive}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props:{
            path:String
        },
        data(){
          return{

          }
        },
        methods:{
            tabBarItemClick(){
                this.$router.push(this.path)
            }
        },
        computed:{
            isActive(){
                return   this.$route.path.indexOf(this.path) !== -1
            }
        }
    }
</script>

<style scoped>
    .tab-bar-item{
        font-size: 14px;
        padding-bottom: 5px;
        border-bottom: 1px solid transparent;
    }
.active{

    color: yellow;

    border-bottom: 1px solid yellow;
}
</style>