<template>
    <div class="nav-bar">
            <div class="left" @click="back"><slot name="left"></slot></div>
            <div class="text"><slot name="right"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        props:{

        },
        methods:{
            back(){
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
.nav-bar{
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
}

    .left{
        width: 40px;
    }
.text{
    flex: 1;

}
</style>