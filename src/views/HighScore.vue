<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h2 class="text-3xl font-bold mb-4">High Scores</h2>
      <ul>
        <li v-for="(score, index) in highScores" :key="index" class="mb-2">
          {{ index + 1 }}. {{ score }}
        </li>
      </ul>
      <button @click="backToMenu" class="btn mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back to Menu</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        highScores: JSON.parse(localStorage.getItem('highScores')) || [],
      };
    },
    methods: {
      backToMenu() {
        this.$router.push('/');
      },
    },
  };
  </script>
  
  
  