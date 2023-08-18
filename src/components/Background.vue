<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
    relativeMousePosition,
    teleported,
} from "../stores/relativeMousePosition";

const background = ref(null);
const circle = ref(null);

let targetSize: number = 400;

function mouseDown() {
    // set the circle size
    targetSize = 1200;
}

function mouseUp() {
    // set the circle size
    targetSize = 400;

    if (teleported.value) {
    }
}

function moveCircle(circleEl: HTMLElement, rMousePos: any) {
    if (rMousePos.hasMoved === false) {
        return;
    }
    if (firstFollow) {
        console.log("First follow");
        console.log("Relative mouse position", rMousePos.x, rMousePos.y);

        let firstX = relativeMousePosition.value.x;
        let firstY = relativeMousePosition.value.y;

        circleEl.style.setProperty("--x", firstX + "");
        circleEl.style.setProperty("--y", firstY + "");

        firstFollow = false;
        return;
    }

    // get the circle position
    let currentX: number = Number(circleEl.style.getPropertyValue("--x"));
    let currentY: number = Number(circleEl.style.getPropertyValue("--y"));

    // console.log("Current:", currentX, currentY);
    // console.log("Target :", relativeMouseX, relativeMouseY);

    let distanceX = relativeMousePosition.value.x - currentX;
    let distanceY = relativeMousePosition.value.y - currentY;

    if (Math.abs(distanceX) > 5000 || Math.abs(distanceY) > 5000) {
        console.log("Teleported");
        // move circle to mouse position
        circleEl.style.setProperty("--x", rMousePos.x + "");
        circleEl.style.setProperty("--y", rMousePos.y + "");
        return;
    }

    // interpolate the circle position
    let xInterpolated = distanceX * 0.05;
    let yInterpolated = distanceY * 0.05;

    let x = currentX + xInterpolated;
    let y = currentY + yInterpolated;

    // console.log("Distance", distanceX, distanceY);

    // set the circle position
    circleEl.style.setProperty("--x", x + "");
    circleEl.style.setProperty("--y", y + "");
}

function adjustSize(circleEl: HTMLElement, rMousePos: any) {
    if (rMousePos.hasMoved === false) {
        return;
    }
    // get size
    let currentSize = Number(
        circleEl.style.getPropertyValue("--size").slice(0, -2)
    );

    // interpolate size
    let sizeInterpolated = (targetSize - currentSize) * 0.05;

    // set size
    let size = currentSize + sizeInterpolated;
    circleEl.style.setProperty("--size", size + "px");
}

let firstFollow = true;

onMounted(() => {
    // window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    const circleEl = circle.value! as HTMLElement;
    const rMousePos = relativeMousePosition.value;

    setInterval(() => {
        adjustSize(circleEl, rMousePos);

        moveCircle(circleEl, rMousePos);
    }, 10);
});
</script>

<template>
    <div class="background" ref="background">
        <div class="pattern" />
        <div class="circle" ref="circle" />
    </div>
</template>

<style scoped>
.background {
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;

    z-index: -3;

    background-color: black;
    overflow: hidden;

    padding: 0;
    margin: 0;
}

.pattern {
    background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.8) 0%,

        transparent 10%,
        rgba(0, 0, 0, 0.8) 15%,
        black 20%
    );
    background-size: 50px 50px;
    background-position: 50% 50%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
}

.circle {
    --x: 50%;
    --y: 50%;

    --size: 0;

    width: var(--size);
    height: var(--size);
    background: radial-gradient(circle, rgb(255, 255, 255) 0, transparent 60%);
    position: absolute;
    left: calc(var(--x) * 1px - (var(--size) / 2));
    top: calc(var(--y) * 1px - (var(--size) / 2));
    right: unset;
    bottom: unset;
    z-index: -2;
}
</style>
<!-- transition: all 0.1s ease-in-out; -->

<style>
:root {
    user-select: none;
}

.background > * {
    position: relative;

    padding: 0;
    margin: 0;
}
</style>
