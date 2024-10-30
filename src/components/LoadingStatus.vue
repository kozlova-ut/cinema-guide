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
    <div class="text-center py-5">
        <div class="wrapper">
            <span v-if="isLoading" class="loader"></span>
            <span v-if="hasError">Не удалось получить данные, попробуйте позже</span>
        </div>
    </div>
</template>
