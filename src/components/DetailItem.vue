<template>
    <div name="detail-item-section">
        <v-card>
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-subtitle>
                <v-icon color="yellow">mdi-star</v-icon>
                {{ item.rating }}
            </v-card-subtitle>
            <v-card-text>
                {{ Item.description }}
            </v-card-text>
            <v-card-text>
                Rp {{ item.price }}
            </v-card-text>  
            
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "DetailItem",
    mounted() {
        this.getProducts();
    },
    computed: {
        ...mapGetters(["products"]),

    },
    methods: {
        ...mapActions(["addItemToCart", "getProducts"]),
    },
};
</script>