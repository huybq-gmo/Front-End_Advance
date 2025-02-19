<script setup lang="ts">
import Child from './Child.vue';
import { ref, watch, watchEffect } from 'vue';
import { computed } from 'vue';
const child = ref('')
const msg = 'Hello World';
const handleClick = (childValue: string) => {
    console.log('clicked');
    child.value = childValue;
}

const products = ref([{
    name: 'product 1',
    category: 'food',
    price: 100
}, {
    name: 'product 2',
    category: 'food',
    price: 200
}, {
    name: 'product 3',
    category: 'drink',
    price: 300
},
])
const category = ref('food');
const changeProducts = (value: string) => {
    category.value = value;
}
const filterProducts =computed(()=>{
    return products.value.filter(p=>p.category === category.value)
})

const isChange  = ref(false);
watch([isChange],(value)=>{
    console.log(value);
})
watchEffect(()=>{
    console.log('isChange',isChange.value);
})


</script>
<template>
    <Child :text='msg' @handle-click="handleClick" />

    <!-- <button @click="changeProducts('food')">Food</button>
    <button @click="changeProducts('drink')">Drink</button>
    {{ child }}
    <div v-for="p in filterProducts" :key="p.name">
   
            <p>{{ p.name }}</p>
            <p>{{ p.price }}</p>
            <p>{{ p.category }}</p>
    </div> -->
    <button @click="isChange=!isChange">Change</button>

</template>
<style></style>