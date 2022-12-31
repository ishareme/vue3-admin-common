<template>
    <div class="hamburger-container" @click="toggleClick">
        <svg-icon className="hamburger" :icon="icon"></svg-icon>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const toggleClick = () => {
    store.commit('app/triggerSidebarOpened');
};

const icon = computed(() =>
    store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
);
</script>

<style lang="scss" scoped>
.hamburger-container {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background 0.5s ease;
    &:hover {
        background: rgba($color: #000000, $alpha: 0.1);
    }
}
</style>
