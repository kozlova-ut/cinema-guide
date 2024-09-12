<script lang="ts" setup>
	
</script>

<template>
	<div class="banner">
		<div class="movie__image">
			<div class="img"></div>
			<div class="overlay"></div>
		</div>
		<div class="movie__info">
			<div class="content">
				<div class="info">
					<div class="rating">7,5</div>
					<div class="year">1979</div>
					<div class="genre">детектив</div>
					<div class="duration">1ч 7м</div>
				</div>
				<h2 class="title">
					Шерлок Холмс и доктор Ватсон: Знакомство
				</h2>
				<span class="description">Увлекательные приключения самого известного сыщика всех времен</span>
				<div class="buttons"></div>
			</div>
		</div>

	</div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.banner {
	position: relative;

}

.movie {

	&__info {

		.content {
			padding: 0px 80px;
		}
		

		.title {
			@include zxcvbn3;
		}
	}

	&__image {
		position: absolute;
		top: 0px;
		right: 0px;
		width: 62.5%;
		height: auto;
		aspect-ratio: 1.541095890410959;
		
		.img {
			width: 100%;
			height: 100%;
			background: url('@/assets/img/banner.png') no-repeat;
			background-size: cover;
			background-position: center;
		}

		.overlay {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0.5) 20.41%, rgba(0, 0, 0, 0) 100%);
		}
	}
}


</style>