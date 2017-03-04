<template>
	<div class="container">
		<table id="cart" class="table table-hover table-condensed">
			<thead>
				<tr>
					<th style="width:50%">Product</th>
					<th style="width:10%">Price</th>
					<th style="width:8%">Quantity</th>
					<th style="width:22%" class="text-center">Subtotal</th>
					<th style="width:10%"></th>
				</tr>
			</thead>

			<transition-group name="list-shopping-cart" tag="tbody">
				<app-cart-item v-for="cartItem in cartItemList" :cartItem="cartItem" :key="cartItem.id"></app-cart-item>
			</transition-group>

			<tfoot>
				<tr class="visible-xs">
					<td class="text-center"><strong>Total {{ totalValue }}</strong></td>
				</tr>
				<tr>
					<td>
						<button class="btn btn-warning" @click="saveShoppingCartLocal">
							<i class="fa fa-angle-left"></i>Save and Continue Shopping
						</button>
					</td>
					<td colspan="2" class="hidden-xs"></td>
					<td class="hidden-xs text-center"><strong>Total ${{ totalValue }}</strong></td>
					<td>
						<button class="btn btn-success btn-block" @click="checkout">
							Checkout <i class="fa fa-angle-right"></i>
						</button>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import CartItem from './cart/CartItem.vue';
	export default {
		computed: {
			cartItemList() {
				return this.$store.getters.cartItemList;
			},
			totalValue() {
				let res = 0;
				this.cartItemList.map((item, idx) => {
					res += item.price * item.quantity;
				});
				return res;
			}
		},
		components: {
			appCartItem: CartItem
		},
		methods: {
			...mapActions(['saveShoppingCart', 'addMessage', 'saveToTransaction', 'clearCart']),
			checkValidCart(itemList, prodList) {
				let isValid = true;
				let message = "";

				itemList.map((item, idx) => {
					for (let prodIdx = 0; prodIdx < prodList.length; prodIdx++) {
						if (prodList[prodIdx].id == item.id) {
							if (prodList[prodIdx].quantity < item.quantity) {
							
								message = `Only ${prodList[prodIdx].quantity} ${item.title} available in stock`; 
								isValid = false;
								return;
							}
							break;
						}
					}
				});
				return {
					isValid,
					message
				}
			},
			saveShoppingCartLocal() {
				let vm = this;
				if (this.$store.getters.isLoggedIn) {
					let { isValid, message } = this.checkValidCart(this.$store.getters.cartItemList, this.$store.getters.products);

					if (isValid) {
						this.saveShoppingCart({
							cartItemList: vm.$store.getters.cartItemList,
							uid: vm.$store.getters.currentUser.uid
						}).then(() => {
							this.addMessage({
								messageClass: 'success',
								message: 'Your shopping cart is saved successfully'
							});
							this.$router.push('/');
						});
					} else {
						this.addMessage({
							messageClass: 'danger',
							message: message
						});
					}
				} else {
					this.addMessage({
						messageClass: 'warning',
						message: 'Please login to save your cart'
					});
				}
			},
			checkout() {
				let vm = this;
				if (this.$store.getters.isLoggedIn) {
					if (!this.$store.getters.cartItemList || this.$store.getters.cartItemList.length == 0) {
						this.addMessage({
							messageClass: 'warning',
							message: 'Your cart is empty!'
						});
						return;
					}
					let { isValid, message } = this.checkValidCart(this.$store.getters.cartItemList, this.$store.getters.products);

					if (isValid) {
						this.saveToTransaction({
							cartItemList: vm.$store.getters.cartItemList,
							uid: vm.$store.getters.currentUser.uid
						}).then(()=>{
							this.addMessage({
								messageClass: 'success',
								message: 'Your order has been successfully processed!'
							});
							this.saveShoppingCart({
								cartItemList: [],
								uid: vm.$store.getters.currentUser.uid
							});
							this.clearCart();
							this.$router.push('/');
						});
					} else {
						this.addMessage({
							messageClass: 'danger',
							message: message
						});
					}
				} else {
					this.addMessage({
						messageClass: 'warning',
						message: 'Please login to checkout'
					});
				}
			}
		}
	}
</script>

<style scoped>
	.list-shopping-cart-leave-active {
	  transition: all 0.4s;
	}
	.list-shopping-cart-leave-to {
	  opacity: 0;
	  transform: translateX(50px);
	}
</style>