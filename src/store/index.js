import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let inCart = window.localStorage.getItem('inCart');

export default new Vuex.Store({
  state: {
    //{id: , quantity:}
    inCart: inCart ? JSON.parse(inCart) : [],
    prodcuts: [
      {
        id: '11',
        name: 'Turntable Record Player Portable',
        description: 'Wirelessly record player connection, SD and USB play function. Enjoy high definition stereo sound with an impressive volume whether you are partying, dining, or resting. It s a good Thanksgiving or Christmas present. It can bring your music enjoyment and decorate your room',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/61xPZujQq0L._SL1000_.jpg',
        price: 69
      },
      {
        id: '12',
        name: 'Record Player Vintage Vinyl',
        description: 'Good Sound Quality:The turntable base is equipped with a spring to provide shock absorption and improve sound quality. You can enjoy vinyl records music with incredible sound quality by our dual stereo speaker. BT Record Player:Built-in BT to wirelessly play music from your phone and speaker. Not only can play vinyl records to experience the retro-style music and atmosphere, you can also play all your favorite digital music at any time via BT.',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51ouLPDyU-L._SL1200_.jpg',
        price: 75
      },
      {
        id: '13',
        name: 'Audio-Technica AT-LP120XUSB',
        description: 'Fully manual operation featuring adjustable dynamic anti-skate control, variable pitch control with quartz speed lock, and balanced S-shaped tonearm with hydraulically damped lift control and lockable rest',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/81hU1YoIlvL._SL1500_.jpg',
        price: 249
      },
      {
        id: '14',
        name: 'Victrola 50 Retro 3-Speed Bluetooth Turntable',
        description: 'USB Encoding: Connect to PC via USB and Easy-to-Use Recording Software (PC and Mac Compatible)',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/71XiuubDeZL._SL1500_.jpg',
        price: 82
      },
      {
        id: '15',
        name: 'VSC-550BT-TQ',
        description: 'Three-speed turntable (33 1/3, 45, 78 RPM) plays all of your vinyl records and favorite albums.',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/61FSnPYsXzL._SL1200_.jpg',
        price: 39
      },
      {
        id: '16',
        name: 'VOKSUN Vintage Turntable 3-Speed',
        description: 'Premium sound quality help you truly appreciate the warm and smooth sound of your vinyls. Dual built-in stereo speakers ready to blast out of the box',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/718%2BYzgt7qL._SL1500_.jpg',
        price: 595
      }
    ]
  },
  actions: {
    addToCart(context, product) {
      const cartItem = context.state.inCart.find(item => item.id === product.id)
      if(!cartItem){
        context.commit('ADD_TO_CART', product.id);
      } else {
        context.commit('INCREMENT_ITEM_QUANTITY', cartItem)
      }
      context.commit('SAVE_CART');
    },     
    removeFromCart(context, index) {   
      context.commit('REMOVE_FROM_CART', index);
      context.commit('SAVE_CART');
    },
    decrementItems(context, product) {
      if(product.quantity > 1) {
        const cartItem = context.state.inCart.find(item => item.id === product.id)
        if(cartItem){
          context.commit('DECREMENT_ITEM_QUANTITY', cartItem);
          context.commit('SAVE_CART');
        } 
      }
    },
    clearCart(context, lenght) {   
      context.commit('REMOVE_ALL_CART', lenght);
      context.commit('SAVE_CART');
    }
  },
  mutations: {
    ADD_TO_CART(state, id) {
      state.inCart.push({
        id: id,
        quantity: 1
      }); 
    },
    INCREMENT_ITEM_QUANTITY(state, cartItem) {
      cartItem.quantity++
    },
    DECREMENT_ITEM_QUANTITY(state, cartItem) {
      cartItem.quantity--
    },
    REMOVE_FROM_CART(state, index) {
      state.inCart.splice(index, 1)
    },
    REMOVE_ALL_CART(state, lenght) {
      state.inCart.splice(0, lenght)
    },
    SAVE_CART(state) {
      window.localStorage.setItem('inCart', JSON.stringify(state.inCart));
    }
  },
  getters: {
    allProducts: state => state.prodcuts,
    getNumberOfProducts: state => (state.prodcuts) ? state.prodcuts.length : 0,
    inCart:  state  =>  state.inCart,
    itemsInCart: state  =>  state.inCart.length,
    cartProducts: state => {
      return state.inCart.map(({ id, quantity }) => {
        const product = state.prodcuts.find(p => p.id === id)
        return {
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                thumb: product.thumb,
                quantity
              }
        })
    }
  },
  modules: {
  }
})
