<template>
	<div class="container is-flex">
		<app-product-item v-for="prod in products" :item="prod" :key="prod.id"></app-product-item>
	</div>
</template>

<script>
	import ProductItem from './product/ProductItem.vue';
	import { mapActions } from 'vuex';

	export default {
		computed: {
			products() {
				return this.$store.getters.products;
			}
		},
		components: {
			appProductItem: ProductItem
		}
	}
</script>

<style>
	.is-flex {
    	display: flex;
    	flex-wrap: wrap;
	}
	.is-flex > [class*='col-'] {
	    display: flex;
	    flex-direction: column;
	}
</style>