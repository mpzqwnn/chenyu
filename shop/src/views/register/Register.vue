<template>
  <div class="login">
    <div class="head">
      <img src="../../assets/img/head-img.png" alt="" class="head-img" />
    </div>
    <div class="info">
      <input
        v-model="username"
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
      <input
	  v-model="confirmPassword"
        type="password"
        class="input-item confirm-pwd"
        placeholder="确认密码"
      />
    </div>
    <div @click="handleRegister" class="button">注册</div>
    <div class="button-group">
      <router-link to="Login" class="button-group-item login-now"
        >已有账号去登录</router-link
      >
    </div>
    <Toast v-if="isShow" :message="toastMessage" />
  </div>
</template>
<script>
// 引入useRouter, 用于路由跳转
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { post } from "../../utils/request";
import Toast, { showToastEffect } from "../../components/Toast.vue";
// 登录函数
const userRegisterEffect = (showToast) => {
  const data = reactive({
    phone: "",
    password: "",
	confirmPassword:"",
  });
  const router = useRouter();
  // src\views\login\Login.vue
  const handleRegister = async () => {
	// 判断手机号和密码是否为空
	if (data.phone.trim() === "" || data.password.trim() === "") {
		// 提示用户
		showToast("手机号或密码不能为空");
		// 终止代码执行
		return;
	}
	// 使用正则判断手机号是否合法
	const reg = /^1[3-9]\d{9}$/;
	// 使用正则.test(字符串), 判断字符串是否符合正则规则
	if (!reg.test(data.username)) {
		// 提示用户
		showToast("手机号不合法");
		// 终止代码执行
		return;
	}
	// 判断密码和确认密码是否一致
	if (data.password !== data.confirmPassword) {
		// 提示用户
		showToast("密码和确认密码不一致");
		// 终止代码执行
		return;
	}

	// 发送ajax请求, 通过手机号和密码注册新用户
	try {
		// 发送请求, 获取响应数据
		const res = await post("/user/register", {
			username: data.username,
			password: data.password,
		});
		// 判断错误码
		if (res.errno === 0) {
			// 注册成功
			// 设置登录状态, 把登录状态存储到localStorage中
			localStorage.setItem("isLogin", "true");
			// 跳转到首页, 通过路由跳转, push的参数是一个对象, 通过name指定跳转的路由
			router.push({ name: "Home" });
		} else {
			// 登录失败, 提示用户, res.msg是错误信息
			showToast(res.msg);
		}
	} catch (error) {
		showToast(error);
	}
};
  // 返回数据
  const { phone, password } = toRefs(data);
  return {
    phone,
    password,
    handleRegister,
  };
};
export default {
  components: { Toast },
  name: "Register",
  setup() {
    const { showToast, isShow, toastMessage } = showToastEffect();
    const { phone, password, handleRegister } = userRegisterEffect(showToast);
    return {
      handleRegister,
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
@import "../../style/login-register-common.scss";
</style>
