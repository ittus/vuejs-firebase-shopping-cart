<template>
	<div class="container">
		<div class="col-md-12">
            <div class="row text-center" v-if="loading">
                <grid-loader :loading="loading" :color="loaderColor" :size="loaderSize" class="inline-block"></grid-loader>
            </div>
            <div class="thumbnail" v-if="!loading">
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
                            :disabled="item.quantity === 0"
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
    import GridLoader from 'vue-spinner/src/GridLoader.vue';

    export default {
        data() {
            return {
                loaderColor: "#5cb85c",
                loaderSize: "50px",
            }
        },
        computed: {
            item() {
                let id = this.$route.params.id;
                if (this.$store.getters.products.length >= id) {
                    let filterArr = this.$store.getters.products.filter((item) => {
                        return item.id == id
                    });
                    if (filterArr.length > 0) {
                        return filterArr[0];
                    } 
                } 
                return {};
            },
            loading() {
                return this.$store.getters.isProductLoading;
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
                // console.log(order);
                this.updateCart(order);
            }
        },
        components: {
            GridLoader
        }
    }
</script>

<style scoped>
    .caption-full {
        padding-right: 10px;
        padding-left: 10px;
    }
    .ratings {
        padding-right: 10px;
        padding-left: 10px;
        color: #d17581;
    }
</style>