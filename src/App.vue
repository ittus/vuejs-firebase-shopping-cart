<template>
<div>
  <app-header></app-header>
  <message-component></message-component>
  <div class="container">
      
      <div class="row">
        <div class="col-md-12">
          <router-view></router-view>
          
          <div class="panel panel-warning" id="reset-store-panel">
            <div class="panel-heading">Admin Panel (Testing purpose)</div>
              <div class="panel-body text-center">
                <button class="btn btn-warning">Reset Store</button>
              </div>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
  import { mapActions } from 'vuex';
  import Header from './components/Header.vue';
  import MessageComponent from './components/common/messageComponent.vue';
  export default {
    components: {
      appHeader: Header,
      messageComponent: MessageComponent
    },
    methods: {
      ...mapActions(['getShoppingCart', 'listenToProductList'])
    },
    created() {
      let uid = this.$store.getters.currentUser.uid;
      this.listenToProductList();
      this.getShoppingCart({uid, currentCart: this.$store.getters.cartItemList});
    }
  }
</script>

<style scoped>
  #reset-store-panel {
    position: fixed; bottom: 0px; right: 0px;
  }
</style>
