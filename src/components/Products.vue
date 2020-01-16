<template>
	<section class="hero">
		<div class="hero-body">
		<div class="container">
			<div class="level">
				<div class="level-left">
					<h1 class="title">All Products</h1>
				</div>  
				<div class="level-right">
					<div class="level-item">
						<router-link to='/cart' class="button is-primary is-pulled-right">
							<span class="btn-icon">
								<font-awesome-icon icon="cart-arrow-down" />                                  
							</span>         
							<strong> Checkout </strong>
							<span class="tag tag-round is-white"><strong> {{cartLength}}</strong></span>
						</router-link>
					</div>
				</div>
			</div>
			<div class="columns is-multiline is-variable is-mobile is-pulled-left">
					<div class="column is-12-mobile is-6-tablet is-4-desktop" v-for="product in products" track-by="id" v-bind:key="product.id">
							<div class="card">
								<div class="card-image">
									<figure class="image is-4by3">
										<img :src="product.thumb" :alt="product.name">
									</figure>
								</div>
								<div class="card-content">
									<div class="content">
										<h2 class="title">
											{{product.name}}
										</h2>
										<p class="subtitle">Price: {{'$' + product.price}}</p>
										<button @click="addToCart(product)" class="button is-info">
											<span class="btn-icon">
												<font-awesome-icon icon="cart-plus" />                                  
											</span> 
											Add to cart
										</button>
									</div>
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
	name: 'productList',
	computed: {
		products () {
			return this.$store.getters.allProducts
		},
		cartLength(){ 
			return this.$store.getters.itemsInCart; 
		}
	},
	methods: {
		addToCart(id) {
			this.$store.dispatch('addToCart', id);
		},
		removeAllFromCart(length) {
			this.$store.dispatch('clearCart', length)
		}
	},
}
</script>

<style lang="scss">
.card {
	.card-image {
		.image {
			img {
				padding: 16px;
			}
		}
	}
}
    .tag {
        &-round {
            border-radius: 25%;
            margin-left: 10px;
        }
    }

</style>
