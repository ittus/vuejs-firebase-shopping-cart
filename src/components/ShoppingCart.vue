<template>
  <div class="container table-responsive">
    <table id="cart" class="table table-hover table-sm">
      <thead>
        <tr>
          <th style="width:50%">Product</th>
          <th style="width:10%">Price</th>
          <th style="width:8%">Quantity</th>
          <th style="width:22%" class="text-center">Subtotal</th>
          <th style="width:10%"></th>
        </tr>
      </thead>

      <transition-group name="list-shopping-cart" tag="tbody">
        <app-cart-item
          v-for="cartItem in cartItemList"
          :cartItem="cartItem"
          :key="cartItem.id"
        ></app-cart-item>
      </transition-group>

      <tfoot>
        <tr class="d-table-row d-sm-none">
          <td class="text-center">
            <strong>Total ${{ cartValue }}</strong>
          </td>
        </tr>
        <tr>
          <td>
            <button class="btn btn-warning" @click="saveShoppingCartLocal">
              <i class="fa fa-angle-left"></i> Save and Continue Shopping
            </button>
          </td>
          <td colspan="2" class="d-none d-sm-table-cell"></td>
          <td class="d-none d-sm-table-cell text-center">
            <strong>Total ${{ cartValue }}</strong>
          </td>
          <td class="px-0">
            <button class="btn btn-success" @click="checkout">
              <span class="text-nowrap"
                >Checkout <i class="fa fa-angle-right d-inline"></i
              ></span>
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CartItem from './cart/CartItem.vue'
export default {
  computed: {
    ...mapGetters([
      'cartItemList',
      'isLoggedIn',
      'products',
      'currentUser',
      'cartValue',
    ]),
  },
  components: {
    appCartItem: CartItem,
  },
  methods: {
    ...mapActions([
      'saveShoppingCart',
      'addMessage',
      'saveToTransaction',
      'clearCart',
    ]),
    checkValidCart(itemList, prodList) {
      let isValid = true
      let message = ''

      itemList.map((item) => {
        for (let prodIdx = 0; prodIdx < prodList.length; prodIdx++) {
          if (prodList[prodIdx].id == item.id) {
            if (prodList[prodIdx].quantity < item.quantity) {
              message = `Only ${prodList[prodIdx].quantity} ${item.title} available in stock`
              isValid = false
              return
            }
            break
          }
        }
      })
      return {
        isValid,
        message,
      }
    },
    saveShoppingCartLocal() {
      if (this.isLoggedIn) {
        let { isValid, message } = this.checkValidCart(
          this.cartItemList,
          this.products
        )

        if (isValid) {
          this.saveShoppingCart({
            cartItemList: this.cartItemList,
            uid: this.currentUser.uid,
          }).then(() => {
            this.addMessage({
              messageClass: 'success',
              message: 'Your shopping cart is saved successfully',
            })
            this.$router.push('/')
          })
        } else {
          this.addMessage({
            messageClass: 'danger',
            message: message,
          })
        }
      } else {
        this.addMessage({
          messageClass: 'warning',
          message: 'Please login to save your cart',
        })
      }
    },
    checkout() {
      if (this.isLoggedIn) {
        if (!this.cartItemList || this.cartItemList.length == 0) {
          this.addMessage({
            messageClass: 'warning',
            message: 'Your cart is empty!',
          })
          return
        }
        let { isValid, message } = this.checkValidCart(
          this.cartItemList,
          this.products
        )

        if (isValid) {
          this.saveToTransaction({
            cartItemList: this.cartItemList,
            uid: this.currentUser.uid,
          }).then(() => {
            this.addMessage({
              messageClass: 'success',
              message: 'Your order has been successfully processed!',
            })
            this.saveShoppingCart({
              cartItemList: [],
              uid: this.currentUser.uid,
            })
            this.clearCart()
            this.$router.push('/')
          })
        } else {
          this.addMessage({
            messageClass: 'danger',
            message: message,
          })
        }
      } else {
        this.addMessage({
          messageClass: 'warning',
          message: 'Please login to checkout',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.list-shopping-cart-leave-active {
  transition: all 0.4s;
}

.list-shopping-cart-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.table-sm {
  font-size: 0.875rem;
  ::v-deep h4 {
    font-size: 1.25rem;
  }
}
</style>
