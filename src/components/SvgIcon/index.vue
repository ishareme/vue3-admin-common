<template>
    <div class="icons">
        <!-- 展示外部图标 -->
        <div
            v-if="isExternal"
            :style="styleExternalIcon"
            :class="className"
            class="svg-external-icon svg-icon"
        ></div>
        <!-- 展示内容图标 -->
        <svg v-else class="svg-icon" :class="className" aria-hidden="true">
            <use :xlink:href="iconName" />
        </svg>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { isExternal as external } from '@/utils/validate';
const props = defineProps({
    icon: {
        type: String,
        require: true
    },
    className: {
        type: String,
        default: ''
    }
});
/**
 * 判断当前图标是否为外部图标
 */
const isExternal = computed(() => external(props.icon));
/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => ({
    mask: `url(${props.icon}) no-repeat 50% 50%;`,
    '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%;`
}));
/**
 * 项目内部图标
 */
const iconName = computed(() => `#icon-${props.icon}`);
</script>

<style lang="scss" scoped>
.icons {
    display: inline-block;
}
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    display: inline-block;
}
.svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
}
</style>
