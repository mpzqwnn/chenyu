<template>
  <div class="commit-order">
    <div class="head">
      <span @click="handleBackClick" class="iconfont icon-left"></span>
      <span class="title">确认订单</span>
    </div>
    <div class="address">
      <div class="left">
        <div class="title">收货地址</div>
        <div class="order-address">北京理工大学国防科技园2号楼10层</div>
        <div class="user-info">
          <span class="username">瑶妹（先生）</span>
          <span class="user-phone">18911024266</span>
        </div>
      </div>
      <div class="right">
        <span class="iconfont icon-right"></span>
      </div>
    </div>
    <div class="cart-list">
		<Cartitem :shop="shop"/>
	</div>
    <div class="foot">
      <div class="left">
        <span class="left-title">实付金额</span>
        <span class="left-price">¥{{ totalPrice }}</span>
      </div>
      <div @click="submitOrder" class="right active">提交订单</div>
    </div>
  </div>
  <div
    @click.self="cancleClick"
    class="confirm-mask"
    v-show="isShowConfirmMask"
  >
    <div class="modal">
      <div class="modal-title">确认要离开收银台？</div>
      <div class="modal-content">请尽快完成支付，否则将被取消</div>
      <div class="modal-buttons">
        <div @click="cancleClick" class="modal-button cancel">取消订单</div>
        <div @click="confirmPay" class="modal-button confirm">确认支付</div>
      </div>
    </div>
  </div>
  <div v-show="isShowNoticeMask" class="remind-mask">
    <div class="modal">
      <span class="iconfont icon-wrong-b"></span>
      <span class="iconfont icon-correct"></span>
      <p class="content">支付成功，等待配送</p>
    </div>
  </div>
</template>
<script>
// 导入路由相关的对象
import { useRoute, useRouter } from "vue-router";
// 导入vuex相关的对象
import { ref, computed } from "vue";
import store from "../../store";
import Cartitem from '../../components/Cartitem.vue'
export default {
  name: "OrderConfirmation",
  components: {
    Cartitem,
  },
  setup() {
    // 获取路由参数
    const route = useRoute();
    const router = useRouter();
    const isShowConfirmMask = ref(false);
    const isShowNoticeMask = ref(false);
    // 从路由参数中获取id
    const shopId = route.params.id;
    // 通过shopId, 从vuex中, 获取当前商铺的信息
    const shop = computed(() => {
      let shopData = store.state.cartData.find((item) => item.id == shopId);
      if (!shopData) {
        shopData = {
          id: 0,
          title: "",
          products: [],
        };
      }
      return shopData;
    });
    const handleBackClick = () => {
      router.back();
    };
    // 通过shop里的数据, 计算总价
    const totalPrice = computed(() => {
      let total = 0;
      shop.value.products.forEach((item) => {
        total += item.currentPrice * item.cartCount;
      });
      return total.toFixed(2);
    });
    // 提交订单
    const submitOrder = () => {
      // 显示确认框
      isShowConfirmMask.value = true;
    };
    // 提交订单
    const cancleClick = () => {
      // 显示确认框
      isShowConfirmMask.value = false;
    };
    // 确认支付
    const confirmPay = () => {
      // 隐藏确认框
      isShowConfirmMask.value = false;
      // 显示提示框
      isShowNoticeMask.value = true;
      // 2秒后, 隐藏提示框
      setTimeout(() => {
        isShowNoticeMask.value = false;
        const shopId = Number(route.params.id);
        store.commit("clearCart", { shopId });
        // 跳转到订单列表页
        router.push("/order-List");
      }, 2000);
    };
    return {
      shop, // 当前商铺的信息, vuex中的数据, 包括购物车数据
      handleBackClick,
      totalPrice,
      isShowConfirmMask,
      isShowNoticeMask,
      submitOrder,
      cancleClick,
      confirmPay,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/commit-order.scss";
</style>
