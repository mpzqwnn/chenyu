<template>
  <div class="order">
    <div class="head">
      <span class="iconfont"></span>
      <span class="title">我的订单</span>
      <span class="button"></span>
    </div>
    <div class="order-list">
      <div
        v-for="(order, index) of orderList"
        :key="order.id"
        class="order-item"
      >
        <div class="top">
          <span class="shop-name">{{ order.title }}</span>
          <span class="order-status">已完成</span>
        </div>
        <div class="bottom">
          <div class="products">
            <img
              v-for="(product, index) of order.products.slice(0, 5)"
              :key="product.id"
              :src="product.img"
              alt=""
              class="product-img"
            />
          </div>
          <div class="data">
            <div class="price">¥{{ computedTotalPrice(order.products) }}</div>
            <div class="count">
              共{{ computedTotalNumber(order.products) }}件
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Tabbar tag="order" />
</template>
<script>
import Tabbar from "@/components/Tabbar.vue";
import { ref, onMounted } from "vue";
import { get } from "@/utils/request.js";
export default {
  name: "OrderList",
  components: {
    Tabbar,
  },
  setup() {
    const orderList = ref([]);
    const getOrderList = async () => {
      // 获取订单列表, 通过接口
      // 通过ajax, 商铺相关的信息
      const result = await get(`/order-list`);
      // 更新到响应式数据中
      orderList.value = result.data;
      console.log(result);
    };
    const computedTotalNumber = (products) => {
      // 计算总数量
      return products.reduce((total, product) => {
        return total + product.cartCount;
      }, 0);
    };
    const computedTotalPrice = (products) => {
      // 计算总价, 保留两位小数
      return products
        .reduce((total, product) => {
          return total + product.currentPrice * product.cartCount;
        }, 0)
        .toFixed(2);
    };
    onMounted(() => {
      // 获取订单列表
      getOrderList();
    });
    return {
      orderList,
      computedTotalPrice, // 计算总价
      computedTotalNumber, // 计算总数量
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/order.scss";
</style>
