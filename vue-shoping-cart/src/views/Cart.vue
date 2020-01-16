<template>
<section class="hero">
	<div class="hero-body">
    <div class="container">
      <div id="shopping-cart">
          <div v-show="!cartLength">
            <h1 class="title">Your cart is empty</h1>
            <router-link to="/" class="button is-info">
              <span class="btn-icon">
                <font-awesome-icon icon="arrow-left" />                                  
              </span>Go back to shopping
            </router-link>
          </div>
          <div class="level" v-show="cartLength">
            <div class="level-left">
                <router-link to="/" class="button is-info">
                  <span class="btn-icon">
                    <font-awesome-icon icon="arrow-left" />                                  
                  </span>Go back to shopping
                </router-link>
            </div>  
            <div class="level-right">
              <div class="level-item">
                <button @click="removeAllFromCart(cartLength)" class="button is-warning">
                  <span class="btn-icon">
                    <font-awesome-icon icon="window-close" />                                  
                  </span>Remove all goods
                </button>
              </div>
            </div>
          </div>
          
          <article class="media" v-for="(item, index) in cartProducts" :key="item.id" v-show="cartLength">
            <figure class="media-left">
              <p class="image is-64x64">
                <img :src="item.thumb">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <div class="columns is-multiline is-mobile">
                    <div class="column is-12-mobile is-7-desktop is-9-widescreen ">
                      <h5 class="title">{{ item.name }}</h5>
                      <p>{{ item.description }}</p>
                    </div>
                    <div class="column is-6-mobile is-3-desktop is-2-widescreen has-text-centered">
                      <p class="heading">price</p>
                      <p class="title">{{ '$' + item.price * item.quantity}}</p>
                    </div>
                    <div class="column is-6-mobile is-2-desktop is-1-widescreen has-text-centered">
                      <p class="heading">items</p>
                      <div class="level">
                        <div class="level-item">
                          <div class="icon-btn has-text-warning" @click="decrementQuantity(item)">
                            <font-awesome-icon icon="minus" />
                          </div>
                        </div>
                        <div class="level-item"><p class="title">{{ item.quantity }}</p></div>
                        <div class="level-item">
                          <div class="icon-btn has-text-warning" @click="incrementQuantity(item)">
                            <font-awesome-icon icon="plus" />
                          </div>
                        </div>                       
                      </div>
                    </div>
                </div>
              </div>
            </div>
            <div class="media-right">
              <button class="delete" @click="removeFromCart(index)"></button>
            </div>
          </article>
        <div class="level total" v-show="cartLength">
            <div class="level-left">
              <div class="level-item">
              </div>
            </div>  
            <div class="level-right">
              <div class="level-item has-text-centered total-price">
                  <div class="heading total-price-item">Total price </div>
                  <div class="title total-price-item">{{ '$' + total }}</div>
              </div>
            </div>
        </div>

        
        <div class="level" v-show="cartLength">
            <div class="level-left">
              <div class="level-item">
              </div>
            </div>  
            <div class="level-right">
              <div class="level-item">
                <button @click="checkout" class="button is-success" v-show="cartLength">
                  Checkout
                </button>
              </div>
            </div>
        </div>
        
        </div>
      </div>
    </div>
</section>
</template>

<script>
export default {
  name: 'shoppingCart',
  computed: {
    inCart() {
      return this.$store.getters.inCart;
    },
    cartLength(){
      return this.$store.getters.itemsInCart;
    },
    cartProducts(){
        return this.$store.getters.cartProducts;
    },
    total(){
        return this.cartProducts.reduce((acc, pr) => {
          return acc + pr.price * pr.quantity
        }, 0);
    }
  },
  methods: {
      removeFromCart(index) {
          this.$store.dispatch('removeFromCart', index)
      },
      removeAllFromCart(length) {
          this.$store.dispatch('clearCart', length)
      },
      incrementQuantity(item) {
        this.$store.dispatch('addToCart', item);
      },
      decrementQuantity(item) {
        this.$store.dispatch('decrementItems', item);
      },
      checkout(){
        alert('Pay us $' + this.total)
      }
  }
};
</script>

<style lang="scss">
  .media-content {
    overflow-x: unset;
    @media screen and (max-width: 768px) {
      overflow-x: unset;
    }
  }
  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;
  }
  .total {
    border-top: 1px solid rgba(219, 219, 219, 0.5);
    margin-top: 1rem;
    padding-top: 1rem;
    &-price {
      flex-direction: column;
      &-item {
      }
    }
  }
</style>