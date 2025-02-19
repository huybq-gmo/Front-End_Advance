<template>
    <p>text: {{props.text}}</p>
     <button @click="handleClick">click me</button>

</template>
<script setup lang="ts">
const props = defineProps(['text']);
const emit = defineEmits(['handleClick']);
const handleClick = () => {
    emit('handleClick',"hello, i from child");
}
</script>
<style>
</style>