<template>
	<tr>
		<td data-th="Product">
			<div class="row">
				<div class="col-sm-2 d-none d-sm-block">
					<img :src="cartItem.thumbnail_url" alt="..." class="img-fluid"/>
				</div>
				<div class="col-sm-10">
					<h4 class="nomargin">{{ cartItem.title }}</h4>
					<p>{{ cartItem.description }}</p>
				</div>
			</div>
		</td>
		<td data-th="Price">{{ cartItem.price }}</td>
		<td data-th="Quantity">
			<input type="number" class="form-control text-center"
				:value="cartItem.quantity"
				@input="updateQuantity"
				min="0">
		</td>
		<td data-th="Subtotal" class="text-center">${{ subtotal }}</td>
		<td class="actions" data-th="">
			<button class="btn btn-danger btn-sm" @click="removeItem"><i class="fa fa-trash-o"></i></button>
		</td>
	</tr>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		props: ['cartItem'],
		computed: {
			subtotal() {
				return this.cartItem.quantity * this.cartItem.price;
			}
		},
		methods: {
			...mapActions(['updateCart', 'removeItemInCart']),
			removeItem() {
				let vm = this;
				this.removeItemInCart({
					item: vm.cartItem
				});
			},
			updateQuantity(event) {
				let vm = this;
				this.updateCart({
					item: vm.cartItem,
					quantity: parseInt(event.target.value),
					isAdd: false
				});
			}
		}
	}
</script>
