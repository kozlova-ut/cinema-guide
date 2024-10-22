<script lang="ts" setup>
const props = defineProps<{
    content: string;
}>();
</script>

<template>
    <div class="absolute py-2 px-6 bg-white rounded-[50px] -top-3 -left-3">
        <span class="font-play-bold text-2xl text-accent-main">
            {{ content }}
        </span>
    </div>
</template>