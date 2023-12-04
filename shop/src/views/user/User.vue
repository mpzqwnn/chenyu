<template>
	<div class="user">
		<div class="head">
			<span class="iconfont icon-user-edit"></span>
		</div>
		<div class="info">
			<img src="../../assets/img/head-img.jpg" alt="" class="head-img" />
			<h1 class="user-title">热心市民李先生</h1>
			<span class="tag">16</span>
			<p class="user-id">ID: 1069643013</p>
			<div class="gap"></div>
			<div class="user-data">
				<div class="item">
					<span class="text">红包</span>
					<span class="count">218</span>
				</div>
				<div class="item">
					<span class="text">优惠券</span>
					<span class="count">12张</span>
				</div>
				<div class="item">
					<span class="text">鲜豆</span>
					<span class="count">88</span>
				</div>
				<div class="item">
					<span class="text">白条</span>
					<span class="count">1000</span>
				</div>
			</div>
		</div>
		<div class="list">
			<div class="item">
				<div class="left" @click="toAddressList">
					<span class="iconfont icon-rmb"></span>
					<span class="text">我的钱包</span>
				</div>
				<div class="right">
					<span class="iconfont icon-right"></span>
				</div>
			</div>
			<div @click="toAddressList" class="item">
				<div class="left">
					<span class="iconfont icon-locationfill"></span>
					<span class="text">我的地址</span>
				</div>
				<div class="right">
					<span class="iconfont icon-right"></span>
				</div>
			</div>
			<div class="item">
				<div class="left">
					<span class="iconfont icon-icon_users"></span>
					<span class="text">客服与帮助</span>
				</div>
				<div class="right">
					<span class="iconfont icon-right"></span>
				</div>
			</div>
		</div>
	</div>
	<Tabbar tag="user" />
</template>
<script>
import Tabbar from "@/components/Tabbar.vue";
import router from "@/router";
export default {
	name: "User",
	components: {
		Tabbar,
	},
	setup() {
		const toAddressList = () => {
			// 路由跳转
			router.push("/address-list");
		};
		return {
			toAddressList,
		};
	},
};
</script>
<style lang="scss" scoped>
@import "../../style/user.scss";
</style>