<template>
    <div class="head">
      <div class="head-info">
        <div class="left">
          <span class="iconfont icon-location"></span>
          <span class="address">北京理工大学国防科技园2号楼10层</span>
        </div>
        <span class="iconfont icon-notice"></span>
      </div>
      <Search />
    </div>
</template>
<script>
// 引入组件
import Search from "./Search.vue";
export default {
  // 组件名
  name: "Header",
  // 注册组件
  components: {
    Search,
  },
};
</script>
<style lang="scss" scoped>
</style>
