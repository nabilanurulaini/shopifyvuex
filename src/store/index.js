import { createStore } from 'vuex';
import axios from 'axios';
import moment from 'moment';

const store = createStore({
    state() {
        return {
            products: [],
            cart: [],
            categories: [],
            orderHistory: JSON.parse(localStorage.getItem('orderHistory')) || [], // Load riwayat pesanan dari localStorage// Tambah state baru untuk menyimpan riwayat pesanan
           
        };
    },
    //getter ini dpake untuk ambil data from state
    getters: {
        products: (state) => state.products,
        cart: (state) => state.cart,
        categories: (state) => state.categories,
        orderHistory: (state) => state.orderHistory,
    },
    actions: {
        async getProducts({ commit }) {
            try {
                const response = await axios.get('https://dummyjson.com/products/');
                commit("setProducts", response.data.products);
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        async getCategories({ commit }) {
            try {
                const response = await axios.get('https://dummyjson.com/products/categories/');
                commit("setCategories", response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        async updateProduct({ commit }, productData) {
            try {
                const response = await axios.put(`https://dummyjson.com/products/${productData.id}`, productData);
                commit("updateProduct", response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error updating product:', error);
            }
        },
        
        async placeOrder({ commit, state }) {
            try {
                
                const now = moment().format("YYYYMMDD");
                const randomNumbers = Math.floor(Math.random() * 1000) + 1;
                const orderNumber = `${now}-${randomNumbers}`;
                const orderItems = state.cart.filter((item) => item.qty > 0).map((item) => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    qty: item.qty
                }));
                const totalPrice = orderItems.reduce((total, item) => total + item.qty * item.price, 0);
                const order = {
                    orderNumber,
                    items: orderItems,
                    totalPrice,
                };
                this.confirmCheckoutDialog = true;
                // commit disini utk simpen data ke saveOrderToHistory yg dimutation
                commit('saveOrderToHistory', order);
                //pakai stringify karena pakai penyimpanan local untuk item2 yang udah diorder
                localStorage.setItem('orderHistory', JSON.stringify(state.orderHistory));
                // kl udh berhasil checkout nanti cartnya direset
                commit('emptyCart');
            } catch (error) {
                console.error('Error placing order:', error);
            }
        },
        async deleteOrder({ commit, state }, orderNumber) {
            try {
                const orderIndex = state.orderHistory.findIndex((order) => order.orderNumber === orderNumber);
                if (orderIndex !== -1) {
                    state.orderHistory.splice(orderIndex, 1);
                    localStorage.setItem('orderHistory', JSON.stringify(state.orderHistory));
                    commit('saveOrderToHistory', state.orderHistory);
                }
                if(orderIndex === 0)
                {
                    localStorage.removeItem('orderHistory');
                    commit('emptyOrderHistory', state.orderHistory);
                }
                
    
            } catch (error) {
                console.error('Error deleting order:', error);

            }
        },
        async searchProducts({ commit }, query) {
            try {
                const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
                commit("setProducts", response.data.products);
            } catch (error) {
                console.error('Error searching products:', error);
            }
        },
        addItemToCart({ commit }, item) {
            commit("addToCart", item);
        },
        removeItemFromCart({ commit }, id) {
            commit("removeFromCart", id);
        },
        addQty({ commit }, id) {
            commit("addQty", id);
        },
        reduceQty({ commit }, id) {
            commit("reduceQty", id);
        },
        emptyCart({ commit }) {
            commit("emptyCart");
        },
        emptyOrderHistory({ commit }) {
            commit("emptyOrderHistory");
        }
    },
    // mutation gunanya miripdg useeffect di react, buat merubah state (nilainya ganti2)
    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
        setCategories(state, categories) {
            state.categories = categories;
        },
        updateProduct(state, updatedProduct) {
            const index = state.products.findIndex((product) => product.id === updatedProduct.id);
            if (index !== -1) {
                
                state.products.splice(index, 1, updatedProduct);
            }
        },
        addToCart(state, item) {
            const productInCart = state.cart.find((product) => product.id === item.id);
            if (!productInCart) {
                state.cart.push({ ...item, qty: 1 });
            } else {
                productInCart.qty++;
            }
        },
        deleteOrder(state, orderNumber) {
            
            state.orderHistory = state.orderHistory.filter((order) => order.orderNumber !== orderNumber);
            //cek jika orderHistorynya kosong maka akan langsung hapus
            if(state.orderHistory.length === 0){
                localStorage.removeItem('orderHistory');
            }
        },
        removeFromCart(state, id) {
            state.cart = state.cart.filter((item) => item.id !== id);
        },
        addQty(state, id) {
            const productInCart = state.cart.find((product) => product.id === id);
            productInCart.qty++;
        },
        reduceQty(state, id) {
            const productInCart = state.cart.find((product) => product.id === id);
            if (productInCart.qty > 1) {
                productInCart.qty--;
            } else {
                state.cart.splice(state.cart.indexOf(productInCart), 1);
            }
        },
        //kl abis checkout keranjangnya nu;;
        emptyCart(state) {
            state.cart = [];
        },
        emptyOrderHistory(state) {
            state.orderHistory = [];
            localStorage.removeItem('orderHistory');
        },
        saveOrderToHistory(state, order) {
            state.orderHistory.push(order);
        },
    }
});

export default store;
