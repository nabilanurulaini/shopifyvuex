import { createStore } from 'vuex';
import axios from 'axios';
import moment from 'moment';

const store = createStore({
    state() {
        return {
            products: [],
            cart: [],
            orderHistory: JSON.parse(localStorage.getItem('orderHistory')) || [], // Load riwayat pesanan dari localStorage// Tambah state baru untuk menyimpan riwayat pesanan
            showOrderSuccessModal: false, // Menampilkan modal saat pesanan berhasil
            isProcessingOrder: false, // Menampilkan proses pesananUntuk menyimpan nomor pesanan terakhir
        };
    },
    //getter ini dpake untuk ambil data from state
    getters: {
        products: (state) => state.products,
        cart: (state) => state.cart,
        orderHistory: (state) => state.orderHistory,
        showOrderSuccessModal: (state) => state.showOrderSuccessModal,
        isProcessingOrder: (state) => state.isProcessingOrder,
    },
    actions: {
        async getProducts({ commit }) {
            try {
                const response = await axios.get('https://dummyjson.com/products/');
                commit("setProducts", response.data.products);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        async placeOrder({ commit, state }) {
            try {
                // Buat format tanggal dan waktu saat ini
                const now = moment().format("YYYYMMDD");
                // Tambahkan tiga digit angka random
                const randomNumbers = Math.floor(Math.random() * 1000) + 1;
                // Gabungkan tanggal, waktu, dan angka random
                const orderNumber = `${now}-${randomNumbers}`;

                // Dapatkan item-item yang ada di keranjang dengan jumlah > 0
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

                // commit disini utk simpen data ke saveOrderToHistory yg dimutation
                commit('saveOrderToHistory', order);

                //pakai stringify karena pakai penyimpanan local untuk item2 yang udah diorder
                localStorage.setItem('orderHistory', JSON.stringify(state.orderHistory));

                // kl udh berhasil checkout nanti cartnya direset
                commit('emptyCart');

                
                commit('showOrderSuccessModal', true);
            } catch (error) {
                console.error('Error placing order:', error);
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
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
        addToCart(state, item) {
            const productInCart = state.cart.find((product) => product.id === item.id);
            if (!productInCart) {
                state.cart.push({ ...item, qty: 1 });
            } else {
                productInCart.qty++;
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
        emptyCart(state) {
            state.cart = [];
        },
        saveOrderToHistory(state, order) {
            state.orderHistory.push(order);
        },
    }
});

export default store;
