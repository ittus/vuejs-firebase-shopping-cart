<template>
<nav class="navbar navbar-expand-sm navbar-dark bg-dark" role="navigation">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <router-link to="/" class="navbar-brand mr-auto">Online Store</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">

      </ul>
      <ul class="navbar-nav">
        <router-link to="/login" tag="li" v-if="!isLoggedIn" class="nav-item">
          <a class="nav-link">Login</a>
        </router-link>
        <li v-if="isLoggedIn" class="li-pointer nav-item">
          <a @click="logout" class="nav-link">Logout {{ userEmail }}</a>
        </li>
        <router-link to="/register" tag="li" v-if="!isLoggedIn" class="nav-item">
          <a class="nav-link">Register</a>
        </router-link>
        <li>
          <router-link to="/cart" class="btn btn-success navbar-btn" tag="button">
            Checkout <span class="badge badge-light">{{ numItems }} ($ {{ cartValue }})</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <!-- /.container -->
</nav>
</template>

<script>
import {
  mapActions, mapGetters
} from 'vuex';
export default {
  computed: {
    ...mapGetters(['isLoggedIn', 'cartValue', 'currentUser', 'cartItemList']),
    numItems() {
      return this.cartItemList.reduce((total, item) => {
        total += item.quantity;
        return total
      }, 0);
    },
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : ''
    }
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>


<style scoped lange="sass">
.navbar-btn a {
  color: white;
}

.li-pointer {
  cursor: pointer;
}

.li-pointer:hover {
  cursor: pointer;
}
</style>
