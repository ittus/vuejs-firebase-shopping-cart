<template>
    <div class="col-sm-4 col-lg-4 col-md-4">
        <div class="thumbnail ">
            <img :src="item.thumbnail_url" alt="" class="grow">
            <div class="caption">
                <h4 class="pull-right">${{ item.price }}</h4>
                <router-link :to="'/product/' + item.id" tag="h4"><a>{{ item.title }}</a></router-link>
                <p class="truncate">{{ item.description | shortDescription}}</p>
            </div>
            <div class="ratings">
               <span>{{ item.quantity }} left in stock</span>
                <p class="pull-right">
                    <button 
                        class="btn btn-success"
                        :disabled="item.quantity === 0" 
                        @click="addItem">
                        Add to cart
                    </button>
                </p>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
	export default {
		props: ['item'],
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
        },
        filters: {
            shortDescription(value) {
                if (value && value.length > 100) {
                    return value.substring(0, 100) + '...';
                } else {
                    return value;
                }
            }
        }
	}
</script>

<style>
    div.thumbnail {
        height: 100%;
    }
	.favourite-icon {
		font-size: 25px;
	}
	.ratings {
	    padding-right: 10px;
	    padding-left: 10px;
	    color: #d17581;
	}

    .grow { transition: all .2s ease-in-out; }
    .thumbnail:hover .grow { transform: scale(1.03); }

</style>