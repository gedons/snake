import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Index.vue';
import GameScreen from '../views/GameScreen.vue';
import SettingsScreen from '../views/SettingsScreen.vue';
import HighScore from '../views/HighScore.vue';
 



const routes = [
  { path: '/', component: Home },
  { path: '/game', component: GameScreen },
  { path: '/settings', component: SettingsScreen },
  { path: '/high-scores', component: HighScore },  
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
