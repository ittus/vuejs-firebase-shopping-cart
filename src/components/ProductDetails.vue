<template>
	<div class="container">
		<div class="col-md-12">
			
                <div class="thumbnail">
                    <img class="img-responsive" :src="item.thumbnail_url" alt="">
                    <div class="caption-full">
                        <h4 class="pull-right">$ {{ item.price }}</h4>
                        <h4> {{ item.title }}</h4>
                        <p> {{ item.description }} </p>
                    </div>
                    <div class="ratings">
                        <span>{{ item.quantity }} left in stock</span>
                        <p class="pull-right">
                            <button 
                                @click="addItem"
                                class="btn btn-success" >
                                Add to cart
                            </button>
                        </p>
                        <div class="clearfix"></div>
                    </div>
                </div>

            
		</div>
		
	</div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        computed: {
            item() {
                if (this.$store.getters.products.length > this.$route.params.id) {
                    return this.$store.getters.products[this.$route.params.id];
                } else {
                    return {};
                }
            }
        },
        methods: {
            ...mapActions(['updateCart']),
            addItem() {
                const order = {
                    item: Object.assign({}, this.item),
                    quantity: 1,
                    isAdd: true
                };
                console.log(order);
                this.updateCart(order);
            }
        }
    }
</script>

<style scoped>
    .caption-full {
        padding-right: 10px;
        padding-left: 10px;
    }
</style>