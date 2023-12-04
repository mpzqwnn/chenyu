<template>
    <div class="home">
        <Header></Header>
        <Banner></Banner>
        <Category></Category>
        <gap></gap>
        <Nearby></Nearby>
        <Tabbar  tag="home"></Tabbar>
    </div>
</template>

<script>
import Header from "./Header"
import Banner from "./Banner"
import Category from "./Category"
import Gap from "./Gap"
import Nearby from './Nearby'
import Tabbar from '../../components/Tabbar.vue'
    export default {
        components:{
            Header,Banner,Category,Gap,Nearby,Tabbar
        }
    }
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
</style>