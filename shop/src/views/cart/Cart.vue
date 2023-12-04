<template>
  <div class="Cart">
    <div class="head">
      <span class="iconfont"></span>
      <span class="title">我的全部购物车（{{ total }}）</span>
      <span class="button"></span>
    </div>
    <div v-for="shop of cartData" :key="shop.id" class="cart-list">
      <CartItem :shop="shop" />
    </div>
  </div>
  <Tabbar tag="cart" />
  <Toast v-if="isShow" :message="toastMessage" />
</template>
<script>
import Tabbar from "@/components/Tabbar.vue";
// 导入vuex
import { computed } from "vue";
import { useStore } from "vuex";
import CartItem from "../../components/Cartitem.vue";
import Toast, { showToastEffect } from "../../components/Toast.vue";
export default {
  name: "Cart",
  components: {
    Tabbar,
    CartItem,
    Toast,
  },
  setup() {
    const { showToast, isShow, toastMessage } = showToastEffect();
    // 从vuex中获取购物车数据
    const store = useStore();
    const cartData = computed(() => store.state.cartData);
    // 计算购物车总量
    const total = computed(() => {
      let total = 0;
      cartData.value.forEach((shop) => {
        if (typeof shop.products != "undefined") {
          shop.products.forEach((product) => {
            total += product.cartCount;
          });
        }
      });
      if (total == 0) {
        showToast("购物车空空如也，快去购物吧");
      }
      return total;
    });
    return {
      cartData,
      total,
      isShow,
      toastMessage,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/cart.scss";
</style>
