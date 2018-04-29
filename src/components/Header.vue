<template>
<nav class="navbar navbar-inverse" role="navigation">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand">Online Store</router-link>
    </div>
    <ul class="nav navbar-nav navbar-right">
      <router-link to="/login" tag="li" v-if="!isLoggedIn"><a>Login</a></router-link>
      <li v-if="isLoggedIn" class="li-pointer"><a @click="logout">Logout {{ userEmail }}</a></li>
      <router-link to="/register" tag="li" v-if="!isLoggedIn"><a>Register</a></router-link>
      <li>
        <router-link to="/cart" class="btn btn-success navbar-btn" tag="button">
          Checkout <span class="badge">{{ numItems }} ($ {{ cartValue }})</span>
        </router-link>
      </li>
    </ul>

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
