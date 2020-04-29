<template>
    <div class="header" @click="headerClick">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        methods:{
            headerClick(){
                this.$router.push('/register')
            }
        }
    }
</script>

<style scoped>
.header{
    display: flex;
    align-items: center;
    height: 40px;
    background-color: black;
    color: yellow;
}

.center{
    flex: 1;
    text-align: center;
    font-size: 24px;
}
.right{
text-align: center;
}
    .left,.right{
        width: 64px;
    }
</style>