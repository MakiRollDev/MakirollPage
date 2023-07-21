<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
    relativeMousePosition,
    backgroundSize,
} from "../stores/relativeMousePosition";

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
});

const titleLength = props.text!.length;
const viewWidth = 100 / titleLength;

const title = ref(null);

const maxShadowOffset = 25;

onMounted(() => {
    window.addEventListener("mousemove", mouseMove);
    if (title.value) {
        const titleEl = title.value as HTMLElement;

        titleEl.style.setProperty("--FonstSize", `min(20vh, ${viewWidth}vw)`);

        let fontSize = window
            .getComputedStyle(titleEl)
            .getPropertyValue("font-size");

        titleEl.style.setProperty("--FonstSize", fontSize);
    }
});

function mouseMove() {
    if (title.value) {
        let x =
            (relativeMousePosition.value.x / backgroundSize.value.width) * -1 +
            0.5;
        let y =
            (relativeMousePosition.value.y / backgroundSize.value.height) * -1 +
            0.5;

        x = x * (backgroundSize.value.height / innerHeight);
        y = y * (backgroundSize.value.width / innerWidth);

        (title.value as HTMLElement).style.setProperty(
            "--ShadowOffsetX",
            `${x * maxShadowOffset}px`
        );
        (title.value as HTMLElement).style.setProperty(
            "--ShadowOffsetY",
            `${y * maxShadowOffset}px`
        );
    }
}
</script>

<template>
    <div v-on:mousemove="mouseMove" class="title" ref="title">
        {{ props.text.toLocaleUpperCase() }}
    </div>
</template>

<style scoped>
.title {
    --ShadowOffsetX: 5px;
    --ShadowOffsetY: 5px;
    --FonstSize: min(20vh, 20vw);

    position: absolute;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: var(--FonstSize);
    font-weight: 900;
    color: #646cff;
    text-shadow: var(--ShadowOffsetX) var(--ShadowOffsetY) 0 #f0c258,
        calc(var(--ShadowOffsetX) * 2) calc(var(--ShadowOffsetY) * 2) 0 #e66a22,
        calc(var(--ShadowOffsetX) * 3) calc(var(--ShadowOffsetY) * 3) 0 #e91e63,
        calc(var(--ShadowOffsetX) * 4) calc(var(--ShadowOffsetY) * 4) 0 #9c27b0,
        calc(var(--ShadowOffsetX) * 5) calc(var(--ShadowOffsetY) * 5) 0 #673ab7,
        calc(var(--ShadowOffsetX) * 6) calc(var(--ShadowOffsetY) * 6) 0 #3f51b5,
        calc(var(--ShadowOffsetX) * 7) calc(var(--ShadowOffsetY) * 7) 0 #2196f3,
        calc(var(--ShadowOffsetX) * 8) calc(var(--ShadowOffsetY) * 8) 0 #03f4e4,
        calc(var(--ShadowOffsetX) * 9) calc(var(--ShadowOffsetY) * 9) 0 #00d47f,
        calc(var(--ShadowOffsetX) * 10) calc(var(--ShadowOffsetY) * 10) 0
            transparent;
    text-align: center;
    margin: 0;

    display: inline;
}
</style>
