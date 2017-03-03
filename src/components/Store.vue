<template>
	<div class="container is-flex" :class="{loadingItem: loading}">
		<div class="row text-center" v-if="loading">
			<grid-loader :loading="loading" :color="loaderColor" :size="loaderSize"></grid-loader>
		</div>
		
		<app-product-item v-for="prod in products" :item="prod" :key="prod.id" v-if="!loading"></app-product-item>
	</div>
</template>

<script>
	import ProductItem from './product/ProductItem.vue';
	import { mapActions } from 'vuex';
	import GridLoader from 'vue-spinner/src/GridLoader.vue';

	export default {
		data() {
			return {
				loaderColor: "#5cb85c",
				loaderSize: "50px"
			}
		},
		computed: {
			products() {
				return this.$store.getters.products;
			},
			loading() {
				console.log("isLoading", this.$store.getters.isProductLoading);
				return this.$store.getters.isProductLoading;
			}
		},
		components: {
			appProductItem: ProductItem,
			GridLoader
		}
	}
</script>

<style>
	.is-flex {
    	display: flex;
    	flex-wrap: wrap;
	}

	.loadingItem {
		align-items: center;
  		justify-content: center;
	}

	.is-flex > [class*='col-'] {
	    display: flex;
	    flex-direction: column;
	}
</style>