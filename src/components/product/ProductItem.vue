<template>
    <div class="col-sm-4 col-lg-4 col-md-4 item" :class="{'list-group-item': displayList}">
        <div class="thumbnail ">
            <img :src="item.thumbnail_url" alt="" class="grow thumbnail-image">
            <div class="caption margin-left-sm">
                <h4 class="pull-right">${{ item.price }}</h4>
                <router-link :to="'/product/' + item.id" tag="h4"><a>{{ item.title }}</a></router-link>
                <p class="truncate">{{ item.description | shortDescription}}</p>
            </div>
            <div class="ratings margin-left-sm">
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
		props: ['item', 'displayList'],
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

<style scoped>
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

    .grow { 
        transition: all .2s ease-in-out; 
    }
    .thumbnail:hover .grow { 
        transform: scale(1.1); 
    }

    .item.list-group-item {
        border: none;
        float: none;
        width: 100%;
        background-color: #fff;
        margin-bottom: 10px;
    }
    
    .thumbnail-image {
        padding: 15px;
    }
    .list-group-item .thumbnail-image {
        margin-right: 10px;
        max-height: 150px;
    }

    .item.list-group-item .thumbnail {
        margin-bottom: 0px;
       
    }

    .item.list-group-item img {
        float: left;
    }

    .item.list-group-item:after {
        clear: both;
    }
</style>