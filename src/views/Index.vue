<template>
  <div class="flex flex-col items-center justify-center space-y-2 h-screen bg-gray-800 text-white">
    <h1 class="text-4xl font-bold mb-8">Simple Snake Game</h1>
    <button @click="startGame" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Start Game</button>
    <button @click="viewHighScores" class="btn">High Scores</button>
    <button @click="openSettings" class="btn">Settings</button>
    <!-- <button @click="exitGame" class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Exit</button> -->
  </div>
</template>

<script>
export default {
  methods: {
    startGame() {
      this.$router.push('/game');
    },
    viewHighScores() {
      this.$router.push('/high-scores');
    },
    openSettings() {
      this.$router.push('/settings');
    },
    exitGame() {
      // Handle exit logic, e.g., close the browser tab or redirect to a different site
    },
  },
};
</script>

 
