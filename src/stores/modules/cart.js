const state = {
	cartItemList: [
		// {
		// 	id: 1,
		// 	title: 'macbook Retina 13.3" ME662 (2013)',
		// 	thumbnail_url: 'http://media.bizwebmedia.net//sites/72783/data/images/2016/2/4713895macbook_pro_retina.png',
		// 	price: 1000,
		// 	quantity: 10,
		// 	description: "3.0GHz Dual-core Haswell Intel Core i5 Turbo Boost up to 3.2 GHz, 3MB L3 cache 8GB (two 4GB SO-DIMMs) of 1600MHz DDR3 SDRAM"
		// },{
		// 	id: 2,
		// 	title: 'Macbook Pro 13.3" Retina MF841LL/A',
		// 	thumbnail_url: 'http://media.bizwebmedia.net//sites/72783/data/images/2015/11/3220113retina13.jpg',
		// 	price: 1200,
		// 	quantity: 15,
		// 	description: 'Macbook Pro 13.3" Retina MF841LL/A Model 2015 Option Ram Care 12/2016'
		// },{
		// 	id: 3,
		// 	title: 'Macbook Pro 15.4" Retina MC975LL/A Model 2012',
		// 	thumbnail_url: 'http://media.bizwebmedia.net//sites/72783/data/images/2015/7/2913337mf841_13_inch_2_9ghz_with_retina_display_early_2015.png',
		// 	price: 1800,
		// 	quantity: 1,
		// 	description: "3.0GHz Dual-core Haswell Intel Core i5 Turbo Boost up to 3.2 GHz, 3MB L3 cache 8GB (two 4GB SO-DIMMs) of 1600MHz DDR3 SDRAM"
		// },{
		// 	id: 4,
		// 	title: 'Retina MacBook Pro 13 inch MF841',
		// 	thumbnail_url: 'http://media.bizwebmedia.net//sites/72783/data/images/2016/2/4713895macbook_pro_retina.png',
		// 	price: 1000,
		// 	quantity: 20,
		// 	description: "2.9 Ghz Dual-Core Intel Core i5 Broadwell Tubro boost up to 3.3 GHz with L3 3MB cache"
		// }
	]
}

const mutations = {
	'UPDATE_CART' (state, {item, quantity, isAdd}) {
		const record = state.cartItemList.find(element => element.id == item.id);
		if (record) {
			if (isAdd) {
				record.quantity += quantity;
			} else {
				record.quantity = quantity;
			}
		} else {
			state.cartItemList.push({
				...item,
				quantity
			});
		}
	},
	'SET_CART' (state, productList) {
		if (productList) {
			state.cartItemList = productList;
		}
	},
	'REMOVE_CART_ITEM' (state, {item}) {
		const record = state.cartItemList.find(element => element.id == item.id);
		state.cartItemList.splice(state.cartItemList.indexOf(record), 1);
	}
}

const actions = {
	clearCart: ({commit}) => {
		commit('SET_CART', []);
	}
}

const getters = {
	cartItemList: (state) => {
		return state.cartItemList;
	},
	cartValue: (state) => {
		let res = 0;
		state.cartItemList.map(item => {
			res += item.price * item.quantity;
		});
		return res;
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}
