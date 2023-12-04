<template>
  <div class="shop">
    <div class="head">
      <router-link :to="{ path: `/` }"
        ><span class="iconfont icon-left"></span
      ></router-link>
      <span class="iconfont icon-search"></span>
      <input
        type="text"
        class="search-input"
        placeholder="请输入商品名称搜索"
      />
    </div>
    <ShopInfo class="shop-info" :item="item" :showBorder="false" />
    <div class="shop-body">
      <div class="category">
        <div
          @click="handleItemClick(item.name)"
          v-for="item of leftItems"
          :tab-name="item.name"
          :key="item.id"
          :class="{
            'category-item': true,
            active: item.name === currentItemName,
          }"
        >
          {{ item.text }}
        </div>
      </div>
      <div class="detail">
        <div v-for="item of rightItems" :key="item.id" class="detail-item">
          <div class="left">
            <img :src="item.img" alt="" class="product-img" />
          </div>
          <div class="right">
            <div class="product-title">{{ item.title }}</div>
            <div class="product-sale">月售{{ item.sale }}件</div>
            <div class="product-data">
              <div class="data-left">
                <span class="current-price">{{ item.currentPrice }}</span>
                <span class="previous-price">¥{{ item.previousePrice }}</span>
              </div>
              <div class="data-right">
                <span
                  @click="changeCartCount(item.id, -1)"
                  v-show="item.cartCount"
                  class="iconfont icon-minus-circle"
                ></span>
                <span v-show="item.cartCount" class="product-count">{{
                  item.cartCount
                }}</span>
                <span
                  @click="changeCartCount(item.id, 1)"
                  class="iconfont icon-plus-circle-fill"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="foot">
        <div class="left">
          <span class="dot" v-show="total">{{ total }}</span>
          <img
            @click="cartIconClick()"
            src="../../assets/img/cart.png"
            alt=""
            class="cart-img"
          />
          <span v-show="JSON.stringify(cartItems) === '[]'" class="left-title"
            >购物车是空的</span
          >
          <span v-show="JSON.stringify(cartItems) !== '[]'" class="left-title"
            >总计：</span
          >
          <span v-show="JSON.stringify(cartItems) !== '[]'" class="left-price"
            >¥{{ sumPrice }}</span
          >
        </div>
        <div
          @click="gotoOrder"
          v-show="JSON.stringify(cartItems) !== '[]'"
          class="right active"
        >
          去结算
        </div>
        <div v-show="JSON.stringify(cartItems) === '[]'" class="right">
          去结算
        </div>
      </div>
    </div>
    <div v-show="isShowCartList" @click="cartMaskClick" class="cart-mask">
      <div class="cart-info">
        <div class="cart-top">
          <div class="left">
            <span
              @click="changeAllChecked"
              v-show="!allChecked"
              class="iconfont icon-Checkbox_unselected2"
            ></span>
            <span
              @click="changeAllChecked"
              v-show="allChecked"
              class="iconfont icon-selected"
            ></span>
            <span class="text">全选</span>
          </div>
          <div @click="clearCart" class="button">清空购物车</div>
        </div>
        <div class="cart-content">
          <div v-for="item of cartItems" class="cart-item">
            <div class="left">
              <span
                @click="changeItemChecked(item.id)"
                v-show="!item.checked"
                class="iconfont icon-Checkbox_unselected2"
              ></span>
              <span
                @click="changeItemChecked(item.id)"
                v-show="item.checked"
                class="iconfont icon-selected"
              ></span>
              <img :src="item.img" alt="" class="cart-img" />
              <div class="product-info">
                <div class="product-title">{{ item.title }}</div>
                <div class="product-data">
                  <span class="current-price">{{ item.currentPrice }}</span>
                  <span class="previous-price">¥{{ item.previousePrice }}</span>
                </div>
              </div>
            </div>
            <div class="right">
              <span
                @click="changeCartCount(item.id, -1)"
                class="iconfont icon-minus-circle"
              ></span>
              <span class="product-count">{{ item.cartCount }}</span>
              <span
                @click="changeCartCount(item.id, 1)"
                class="iconfont icon-plus-circle-fill"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
// 引入ref, 创建ref对象
import { ref, onMounted, computed } from "vue";
// 引入useRouter
import { useRouter, useRoute } from "vue-router";
// 引入get
import { get } from "@/utils/request";
// 导入shopInfo组件
import ShopInfo from "@/components/ShopInfo.vue";
export default {
  name: "Shop",
  components: {
    ShopInfo,
  },

  setup() {
    const isShowCartList = ref(false);
    const store = useStore();
    // 创建响应式数据
    const item = ref({});
    const leftItems = ref({});
    const rightItems = ref({});
    // 获取路由对象
    const router = useRouter();
    // 获取路由参数
    const route = useRoute();
    const shopId = route.params.id;
    // 通过ajax, 获取item的数据
    // 定义一个数组, 用来存储所有的商品数据
    let allItems = [];
    const getItemData = async () => {
      const result = await get(`/shop/${shopId}`);
      item.value = result.data;
    };
    const getLeftItems = async () => {
      const result = await get(`/shop/${shopId}/tags`);
      leftItems.value = result.data;
    };
    // 通过ajax, 获取右侧商品的数据
    const getRightItems = async () => {
      // 获取右侧的商品数据
      const result = await get(`/shop/${shopId}/product-list`);
      // 更新到响应式数据中
      rightItems.value = result.data;
      // 存到allItems中, 方便后面的筛选操作
      allItems = result.data;
      // 通过shopId, productId, 获取购物车数量
      allItems.forEach((element) => {
        element.cartCount = getProductFromVuex(shopId, element.id).cartCount;
        element.checked = getProductFromVuex(shopId, element.id).checked;
      });
      // 更新rightItems中的数据
      rightItems.value = allItems;
    };
    // 完善商品数据, 通过商铺id, 商品id, 从vuex中查询cartCount属性, 添加到商品中, 记录的购物车数量
    // 参数1: 商铺id, 参数2: 商品id
    const getProductFromVuex = (shopId, productId) => {
      // shopId转数字, productId转数字
      shopId = Number(shopId);
      productId = Number(productId);
      // 定义一个购物车数量, 默认为0
      let cartCount;
      let checked;
      // 通过商铺id, 商品id, 从vuex中查询cartCount属性, 添加到商品中, 记录的购物车数量, 如果vuex中没有数据, 默认为空数组
      const cartData = store.state.cartData || [];
      // 先通过商铺id, 获取商铺的数据
      let shop = {
        products: [],
      };
      cartData.forEach((element) => {
        if (element.id === shopId) {
          shop = element;
        }
      });
      // 通过商品id, 获取商品的数据
      let product = {};
      shop.products.forEach((element) => {
        if (element.id === productId) {
          product = element;
        }
      });
      // 获取商品的购物车数量, 如果没有, 默认为0
      cartCount = product.cartCount || 0;
      checked = product.checked || false;
      // 返回购物车数量
      return { cartCount, checked };
    };
    // 修改购物车数据, 参数1: 商品id, 参数2: 购物车数量
    const changeCartCount = (productId, cartNumber) => {
      // 准备shop的所有信息
      const shopInfo = item.value;
      // 通过productId, 获取商品的信息
      const products = rightItems.value;
      // 这段代码用于在 products 数组中查找具有特定 productId 的对象。它使用了 find 方法，通过一个箭头函数来检查每个数组内的元素（这里是 item ）。如果元素的 id 属性与给定的 productId 相匹配，则返回该元素。如果找到匹配项， productInfo 将存储该匹配对象；否则， productInfo 将存储 undefined 。
      const productInfo = products.find((item) => {
        return item.id === productId;
      });
      // 通过mutation, 修改vuex中的数据
      store.commit("changeCartCount", {
        shopInfo,
        productInfo,
        cartNumber,
      });
    };
    const currentItemName = ref("all");
    const handleItemClick = (name) => {
      currentItemName.value = name;
      rightItems.value = allItems.filter((item) => {
        return item.tags.includes(name);
      });
    };
    onMounted(() => {
      getItemData();
      getLeftItems();
      getRightItems();
    });

    const handleBackClick = () => {
      // 返回上一页
      router.back();
    };
    // 计算购物车的总数量, 计算属性
    const total = computed(() => {
      // 定义一个总数量
      let totalNumber = 0;
      // 通过shopId, productId, 获取当前商品在购物车中的数量
      let rightItem = Array.from(rightItems.value);
      rightItem.forEach((element) => {
        totalNumber += getProductFromVuex(shopId, element.id).cartCount;
      });
      // 返回总数量
      return totalNumber;
    });
    // 计算购物车的总价格, 计算属性
    const sumPrice = computed(() => {
      // 定义一个总价格
      let sumPrice = 0;
      // 通过shopId, productId, 获取当前商品在购物车中的数量
      let rightItem = Array.from(rightItems.value);
      rightItem.forEach((element) => {
        if (element.checked) {
          sumPrice +=
            getProductFromVuex(shopId, element.id).cartCount *
            element.currentPrice;
        }
      });
      // 返回总价格, 保留两位小数
      return sumPrice.toFixed(2);
    });
    // 购物车图标的点击事件处理函数
    // 获取购物车数据,做成计算属性, 从rightItems中获取有购物车数量的商品数据
    const cartItems = computed(() => {
      // 定义一个数组, 用来存储购物车数据
      const tmpArr = [];
      const shopId = route.params.id;
      // 从vuex中获取购物车数据
      let rightItem = Array.from(rightItems.value);
      rightItem.forEach((element) => {
        element.cartCount = getProductFromVuex(shopId, element.id).cartCount;
        element.checked = getProductFromVuex(shopId, element.id).checked;
      });
      // 遍历rightItems, 获取有购物车数量的商品数据
      rightItem.forEach((element) => {
        // 如果商品的购物车数量大于0, 就添加到tmpArr中
        if (element.cartCount > 0) {
          tmpArr.push(element);
        }
      });
      if (tmpArr.length === 0) {
        isShowCartList.value = false;
      }
      // 返回tmpArr
      return tmpArr;
    });
    const cartIconClick = () => {
      // 判断, 如果购物车数量为0, 点击无效
      if (cartItems.value.length === 0) {
        return;
      }
      // 点击购物车图标, 显示购物车列表
      isShowCartList.value = !isShowCartList.value;
    };
    // 切换商品的选中状态, 参数1: 商品id
    const changeItemChecked = (productId) => {
      // 获取shop的id
      const shopInfo = item.value;
      const shopId = shopInfo.id;
      // 通过mutation, 修改vuex中的数据, 商品的checked状态取反
      store.commit("changeItemChecked", {
        shopId,
        productId,
      });
    };
    // 定义一个计算属性, 用于判断是否全选
    const allChecked = computed(() => {
      // 默认返回true
      let allChecked = true;
      // 遍历购物车中的所有商品, 如果有一个商品没有选中, 就返回false
      cartItems.value.forEach((element) => {
        if (!element.checked) {
          allChecked = false;
        }
      });
      // 返回是否全选
      return allChecked;
    });
    // 切换全选
    const changeAllChecked = () => {
      // 获取shopId
      const shopId = item.value.id;
      // 根据allChecked的值, 确定修改的状态
      const checked = !allChecked.value;
      // 通过mutation, 修改vuex中的数据
      store.commit("changeAllChecked", {
        shopId,
        checked,
      });
    };
    // 清空购物车
    const clearCart = () => {
      // 获取shopId
      const shopId = item.value.id;
      isShowCartList.value = false;
      // 通过mutation, 修改vuex中的数据
      store.commit("clearCart", {
        shopId,
      });
    };
    // 跳转到订单页面
    const gotoOrder = () => {
      // 获取shopId
      const shopId = item.value.id;
      // 跳转到订单页面
      router.push({ path: "/orderConfirmation/" + shopId });
    };
    // 购物车遮罩层的点击事件处理函数
    const cartMaskClick = (event) => {
      // 查看触发事件的元素, 如果类名是cart-mask, 才触发
      if (event.target.className !== "cart-mask") {
        return;
      }
      // 相当于点击了购物车图标
      cartIconClick();
    };
    return {
      item,
      handleBackClick,
      leftItems,
      currentItemName,
      handleItemClick,
      rightItems,
      changeCartCount,
      cartMaskClick,
      total,
      sumPrice,
      isShowCartList,
      cartIconClick,
      cartItems,
      changeItemChecked,
      allChecked,
      changeAllChecked,
      clearCart,
      shopId,
      gotoOrder,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/shop.scss";
</style>
