<template>
    <div @click="onToggle" class="screenfull">
        <svg-icon
            :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
        ></svg-icon>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import screenfull from 'screenfull';
const isFullscreen = ref(false);

const onToggle = () => {
    screenfull.toggle();
};
const change = () => {
    isFullscreen.value = screenfull.isFullscreen;
};

// 监听 screenfull变化
onMounted(() => {
    screenfull.on('change', change);
});
onUnmounted(() => {
    screenfull.off('change', change);
});
</script>

<style lang="scss" scoped>
.screenfull {
    display: inline-block;
    font-size: 20px;
    vertical-align: text-bottom;
    margin-right: 16px;
    &.hover-effect {
        cursor: pointer;
    }
}
</style>
