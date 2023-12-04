import { createStore } from "vuex";

// 把购物车放入缓存
const setLocalCartData = (state) => {
	// 把购物相关数据解构出来/获取购物车数据
	const { cartData } = state;
	// 对象转json字符串
	const cartDataString = JSON.stringify(cartData);
	// 保存到localStorage
	localStorage.cartData = cartDataString;
};

// 从缓存中获取购物车数据
const getLocalCartData = () => {
	let result = [];
	// 判断localStorage里面是否有数据
	if (localStorage.cartData) {
		result = JSON.parse(localStorage.cartData);
	}
	// 返回数据
	return result;
};
// ...
export default createStore({
	state: {
		cartData: [
			getLocalCartData()
		],
	},
	getters: {},
	mutations: {
		clearCart(state, payload) {
			// 获取shopId
			const { shopId } = payload;
			// 把对应的商铺删除
			state.cartData = state.cartData.filter((item) => {
				if (item.id === shopId) {
					return false;
				} else {
					return true;
				}
			});
		},
		changeAllChecked(state, payload) {
			// 获取shopId和checked
			const { shopId, checked } = payload;
			// 通过shopId找到对应的商铺
			const shop = state.cartData.find((item) => {
				if (item.id === shopId) {
					return true;
				}
			});
			// 修改商铺的所有购物车商品的选中状态
			shop.products.forEach((item) => {
				item.checked = checked;
			});
		},
		changeItemChecked(state, payload) {
			// 获取shopId和productId
			const { shopId, productId } = payload;
			// 通过shopId和productId找到对应的商品
			// 通过shopId找到对应的商铺
			const shop = state.cartData.find((item) => {
				if (item.id === shopId) {
					return true;
				}
			});
			// 通过productId找到对应的商品
			const product = shop.products.find((item) => {
				if (item.id === productId) {
					return true;
				}
			});
			// 修改商品的选中状态
			product.checked = !product.checked;
		},
		changeCartCount(state, payload) {
			// 从payload中获取传过来的参数
			const { shopInfo, productInfo, cartNumber } = payload;
			// 先判断state中是否有shopInfo这个商铺
			const shop = state.cartData.find((item) => {
				if (item.id === shopInfo.id) {
					return true;
				}
			});
			// 如果没有这个商铺, 则添加这个商铺, 已经商品的购物车信息
			if (!shop) {
				// 修改商品的购物车数量
				productInfo.cartCount += cartNumber;
				productInfo.checked = true
				// 把商品加入到shopInfo中
				shopInfo.products = [];
				shopInfo.products.push(productInfo);
				// 把shopInfo加入到state.cartData中
				state.cartData.push(shopInfo);
			} else {
				// 如果有这个商铺, 则判断这个商铺中是否有这个商品
				const product = shop.products.find((item) => {
					if (item.id === productInfo.id) {
						return true;
					}
				});
				// 如果没有这个商品, 则添加这个商品
				if (!product) {
					// 修改商品的购物车数量
					productInfo.cartCount += cartNumber;
					productInfo.checked = true
					// 把商品加入到shopInfo中
					shop.products.push(productInfo);
				} else {
					// 如果有这个商品, 则修改这个商品的购物车数量
					product.cartCount += cartNumber;
					product.checked = true
					// 如果购物车数量为0, 则删除这个商品
					if (product.cartCount === 0) {
						// 获取这个商品的索引
						const index = shop.products.findIndex((item) => {
							if (item.id === product.id) {
								return true;
							}
						});
						// 删除这个商品
						shop.products.splice(index, 1);
						// 如果这个商铺中没有商品了, 则删除这个商铺
						if (shop.products.length === 0) {
							// 获取这个商铺的索引
							const index = state.cartData.findIndex((item) => {
								if (item.id === shop.id) {
									return true;
								}
							});
							// 删除这个商铺
							state.cartData.splice(index, 1);
						}
					}
				}
			}
			setLocalCartData(state);
		},
	},
	actions: {},
	modules: {},
});
