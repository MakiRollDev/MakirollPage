<script setup lang="ts">
import Background from "./components/Background.vue";
import Landing from "./components/Landing.vue";
import Panable from "./components/Panable.vue";
</script>

<template>
    <Panable>
        <Background />
        <Landing />
    </Panable>
</template>

<style scoped></style>
