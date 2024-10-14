import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/genres',
			name: 'genres',
				component: () => import('../views/GenresView.vue')
		},
		{
			path: '/movie/:id',
			name: 'movie',
				component: () => import('../views/MovieView.vue')
		},
	]
})

export default router
