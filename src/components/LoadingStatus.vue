<script lang="ts" setup>
import { computed, watch } from 'vue';
import type { ApiResponse } from '@/types/service';

const props = defineProps<{
    responseArray: ApiResponse<any>[];
}>();

const emit = defineEmits<{
    (event: 'loading-finished'): void;
}>();

const isLoading = computed(() => {
    return props.responseArray.some(status => status.isLoading) && 
           !props.responseArray.some(status => status.hasError);
});

const hasError = computed(() => {
    return props.responseArray.some(status => status.hasError);
});

watch([isLoading, hasError], ([loading, error]) => {
    if (!loading && !error) {
        emit('loading-finished');
    }
});

</script>

<template>
    <div v-if="isLoading" class="py-10 text-center">
        <span class="loader"></span>
    </div>
    <div v-if="hasError">
        <div class="wrapper">
            <div class="py-10 text-center">
                <span class="text-lg/6 md:text-2xl opacity-70">Не удалось получить данные, попробуйте позже</span>
            </div>
        </div>
    </div>
</template>
