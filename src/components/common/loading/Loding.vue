<template>
    <div id="loding">
        <img src="../../../assets/img/loading/loading.gif" width="20px">
        <div>加载更多....</div>
    </div>
</template>

<script>
    export default {
        name: "Loding"
    }
</script>

<style scoped>
#loding{
    position:relative;
    left: 50%;
    top: 50%;
     margin-left: -20px;
    margin-top: 20px;
}
    #loding>div{
         margin-left: -10px;
        color: deeppink;
    }
</style>