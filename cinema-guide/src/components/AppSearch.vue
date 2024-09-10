<script lang="ts" setup>
</script>

<template>
<div class="search">
	<input type="text">
</div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.search {
	padding: 12px 16px 12px 52px;
	flex-grow: 1;
	background: $gray;
	border-radius: 8px;
	
	input {
		width: 100%;
		background: none;
		border: none;
		outline: none;
	}
}
</style>