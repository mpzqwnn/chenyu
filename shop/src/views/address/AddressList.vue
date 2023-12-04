<template>
  <div class="address">
    <div class="head">
      <span @click="backToUser" class="iconfont icon-left"></span>
      <span class="title">管理收货地址</span>
      <span @click="createAddress" class="button">新建</span>
    </div>
    <div class="title">我的收货地址</div>
    <div
      @click="toEditAddress(address.id)"
      v-for="address of addressList"
      :key="address.id"
      class="address-list"
    >
      <div class="address-item">
        <div class="left">
          <div class="top">
            <span class="username">{{ address.username }}</span>
            <span class="phone">{{ address.phone }}</span>
          </div>
          <div class="bottom">
            <p class="address-info">
              {{ address.addressInfo }}
            </p>
          </div>
        </div>
        <div class="right">
          <span class="iconfont icon-right"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted } from "vue";
import { ref } from "vue";
// 引入get
import { get } from "@/utils/request";
import router from "@/router";
export default {
  name: "AddressList",
  setup() {
    const addressList = ref([]);
    const getAddressList = async () => {
      // 通过ajax, 商铺相关的信息
      const res = await get(`/address-list`);
      addressList.value = res.data;
      console.log(addressList.value);
    };
    // 调用接口
    onMounted(() => {
      getAddressList();
    });
    const backToUser = () => {
      router.push("/user");
    };
    // 跳转到新建地址页面
    const createAddress = () => {
      // 路由跳转
      router.push("/address-create");
    };
    const toEditAddress = (id) => {
      // 路由跳转
      router.push(`/address-edit/${id}`);
    };
    return {
      addressList,
      backToUser,
      createAddress,
      toEditAddress,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/address.scss";
</style>
