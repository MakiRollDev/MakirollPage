<template>
    <div
        ref="container"
        class="container"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
    >
        <slot />
    </div>
</template>

<style scoped>
.container {
    position: absolute;

    --size: 20000px;
    width: var(--size);
    height: var(--size);

    top: calc(var(--size) / -2 + 50vh);
    left: calc(var(--size) / -2 + 50vw);

    overflow: hidden;
}
</style>

<script setup lang="ts">
import { Ref, ref, onMounted } from "vue";
import {
    relativeMousePosition,
    backgroundSize,
    teleported,
} from "../stores/relativeMousePosition";

const container: Ref = ref(null);

onMounted(() => {
    backgroundSize.value.width = container.value!.clientWidth;
    backgroundSize.value.height = container.value!.clientHeight;

    relativeMousePosition.value.x = backgroundSize.value.width / 2;
    relativeMousePosition.value.y = backgroundSize.value.height / 2;
});

function mouseMove(e: MouseEvent) {
    let containerEl = container.value as HTMLElement;
    let rect = containerEl.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    relativeMousePosition.value.x = x;
    relativeMousePosition.value.y = y;
    relativeMousePosition.value.hasMoved = true;
}

let isDragging = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;

function handleMouseDown(event: MouseEvent) {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
}

function handleMouseMove(event: MouseEvent) {
    if (isDragging) {
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;
        translateX += deltaX;
        translateY += deltaY;
        startX = event.clientX;
        startY = event.clientY;
        (
            container.value as HTMLElement
        ).style.transform = `translate(${translateX}px, ${translateY}px)`;
    }

    mouseMove(event);
}

function handleMouseUp() {
    isDragging = false;
    console.log("Mouse up");

    let tped = false;

    if (translateX > 6000) {
        translateX -= 12000;
        tped = true;
    }
    if (translateX < -6000) {
        translateX += 12000;
        tped = true;
    }
    if (translateY > 6000) {
        translateY -= 12000;
        tped = true;
    }
    if (translateY < -6000) {
        translateY += 12000;
        tped = true;
    }

    teleported.value = tped;

    (
        container.value as HTMLElement
    ).style.transform = `translate(${translateX}px, ${translateY}px)`;
}
</script>
