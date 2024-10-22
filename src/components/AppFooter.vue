<script lang="ts" setup>
const socials = [
    { name: 'vk', icon: new URL('@/assets/img/vk.svg', import.meta.url).href, link: '#' },
    { name: 'youtube', icon: new URL('@/assets/img/youtube.svg', import.meta.url).href, link: '#' },
    { name: 'ok', icon: new URL('@/assets/img/ok.svg', import.meta.url).href, link: '#' },
    { name: 'telegram', icon: new URL('@/assets/img/telegram.svg', import.meta.url).href, link: '#' },
]
</script>

<template>
    <footer>
        <div class="wrapper">
            <div class="py-6 md:py-10 md:flex justify-between items-center">
                <div class="lg:flex lg:gap-3 lg:items-center">
                    <span class="font-play-bold text-lg/6">
                        LLC «Мультимедиа Визион»
                    </span>
                    <div class="flex items-center gap-3 mt-2 opacity-50 lg:mt-0 lg:opacity-70">
                        <img class="w-5 h-5 lg:w-6 lg:h-6" src="@/assets/img/copyright.svg" alt="copyright">
                        <span class="text-sm lg:text-lg/6">Все права защищены </span>
                    </div>
                </div>
                <div class="mt-8 md:mt-0 flex gap-6">
                    <a v-for="social in socials" :key="social.name" :href="social.link">
                        <img :src="social.icon" :alt="social.name" class="w-6 h-6 md:w-9 md:h-9">
                    </a>
                </div>
            </div>
        </div>
    </footer>
  
</template>
