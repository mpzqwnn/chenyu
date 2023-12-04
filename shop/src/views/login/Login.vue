<template>
  <div class="login">
    <div class="head">
      <img src="../../assets/img/head-img.png" alt="" class="head-img" />
    </div>
    <div class="info">
      <input
        v-model="phone"
        type="text"
        class="input-item phone"
        placeholder="请输入手机号"
      />
      <input
        v-model="password"
        type="password"
        class="input-item pwd"
        placeholder="请输入密码"
      />
    </div>
    <div @click="handleLogin" class="button">登录</div>
    <div class="button-group">
      <router-link to="Register" class="button-group-item register-now"
        >立即注册</router-link
      >
      <span class="gap button-group-item">|</span>
      <a href="#" class="forget-password button-group-item">忘记密码</a>
    </div>
  </div>
  <Toast v-if="isShow" :message="toastMessage" />
</template>
<script>
// 引入useRouter, 用于路由跳转
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { post } from "../../utils/request";
import Toast, { showToastEffect } from "../../components/Toast.vue";
// 登录函数
const userLoginEffect = (showToast) => {
  const data = reactive({
    phone: "",
    password: "",
  });
  const router = useRouter();
  // src\views\login\Login.vue
  const handleLogin = async () => {
    // 调用接口
    try {
      const result = await post("/user/login", {
        phone: data.phone,
        password: data.password,
      });

      if (data.phone.trim() === "" || data.password.trim() === "") {
        // 提示用户
        showToast("手机号或密码不能为空");
        // 终止代码执行
        return;
      }
      if (result.errno === 0) {
        localStorage.setItem("isLogin", "true");
        router.push({ name: "Home" });
      } else {
        showToast("登录失败, 用户名或密码不正确...");
      }
    } catch (error) {
      showToast("发送请求失败!");
    }
  };
  // 返回数据
  const { phone, password } = toRefs(data);
  return {
    phone,
    password,
    handleLogin,
  };
};
export default {
  components: { Toast },
  name: "Login",
  setup() {
    const { showToast, isShow, toastMessage } = showToastEffect();
    const { phone, password, handleLogin } = userLoginEffect(showToast);
    return {
      handleLogin,
      phone,
      password,
      isShow,
      toastMessage,
    };
  },
};
</script>
<style lang="scss" scoped>
// 引入登录注册的公共样式
@import "../../style/_login-register-common.scss";
</style>
