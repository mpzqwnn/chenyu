<template>
  <div class="nearby">
    <div class="title">附近店铺</div>
    <router-link :to="`/shop/${item.id}`" v-for="item of nearbyItems" :key="item.id">
      <ShopInfo :item="item" :showBorder="true" v-if="item.logo" />
    </router-link>
  </div>
  <Toast v-if="isShow" :message="toastMessage" />
</template>
<script>
// 导入弹框组件, ref
import { onMounted, ref } from "vue";
// 导入封装好的get方法
import { get } from "../../utils/request.js";
import Toast, { showToastEffect } from "../../components/Toast";
import ShopInfo from "../../components/ShopInfo";
export default {
  // 组件的名称
  name: "Nearby",
  // 注册组件
  components: {
    Toast,
    ShopInfo,
  },
  setup() {
    // 定义一个响应式的数据, 用来存储附近店铺的数据
    const nearbyItems = ref([]);
    // 通过ajax请求, 获取附近店铺的数据
    const getNearbyItems = async function () {
      // 发送ajax请求, 获取附近店铺的数据
      const res = await get("/home/nearby");
      // 判断错误码
      if (res.errno !== 0) {
        // 提示用户
        showToast(res.message);
        // 终止代码执行
        return;
      }
      // 返回附近店铺的数据
      nearbyItems.value = res.data;
    };
    // 这段代码是在Vue.js框架中的生命周期钩子函数 onMounted 中，定义了一个箭头函数。当组件挂载时，也就是在页面渲染之后，会调用 getNearbyItems() 函数。该函数可能用于获取附近物品的信息或数据
    onMounted(() => {
      getNearbyItems();
    });
    return {
      nearbyItems,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>
