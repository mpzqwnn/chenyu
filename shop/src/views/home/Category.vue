<template>
	<div class="category">
		<div v-for="(category, index) of categoryItems" :key="index" class="category-row">
			<div v-for="(item, itemIndex) of category" :key="itemIndex" class="category-item">
				<img class="item-img" :src="item.img" alt="" />
				<p class="item-title">{{ item.title }}</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "Category",
	setup() {
		const categoryItems = [
			[
				{
					img: require("../../assets/img/超市@3x.png"),
					title: "超市便利",
				},
				{
					img: require("../../assets/img/菜市场@3x.png"),
					title: "菜市场",
				},
				{
					img: require("../../assets/img/水果店@3x.png"),
					title: "水果店",
				},
				{
					img: require("../../assets/img/鲜花@3x.png"),
					title: "鲜花绿植",
				},
				{
					img: require("../../assets/img/医药健康@3x.png"),
					title: "医药健康",
				},
			],
			[
				{
					img: require("../../assets/img/家居@3x.png"),
					title: "家居时尚",
				},
				{
					img: require("../../assets/img/蛋糕@3x.png"),
					title: "烘培蛋糕",
				},
				{
					img: require("../../assets/img/签到@3x.png"),
					title: "签到",
				},
				{
					img: require("../../assets/img/大牌免运@3x.png"),
					title: "大牌免运",
				},
				{
					img: require("../../assets/img/红包@3x.png"),
					title: "红包套餐",
				},
			],
		];
		return {
			categoryItems,
		};
	},
};
</script>
<style lang="scss" scoped>
</style>