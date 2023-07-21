import { ref } from "vue";

export const relativeMousePosition = ref({
    x: 0,
    y: 0,
    hasMoved: false,
});

export const backgroundSize = ref({
    width: 0,
    height: 0,
});

export const teleported = ref(false);
