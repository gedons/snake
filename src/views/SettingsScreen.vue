<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h2 class="text-2xl font-bold mb-4">Settings</h2>
      <label class="mb-2">Difficulty</label>
      <select v-model="difficulty" class="text-black">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <label class="mb-2 mt-4">Sound</label>
      <input type="checkbox" v-model="soundEnabled" />
      <button @click="saveSettings" class="btn mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Save</button>
      <button @click="backToMenu" class="btn mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back to Menu</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        difficulty: localStorage.getItem('difficulty') || 'easy',
        soundEnabled: JSON.parse(localStorage.getItem('soundEnabled')) || true,
      };
    },
    methods: {
      saveSettings() {
        localStorage.setItem('difficulty', this.difficulty);
        localStorage.setItem('soundEnabled', this.soundEnabled);
        alert('Settings saved!');
      },
      backToMenu() {
        this.$router.push('/');
      },
    },
  };
  </script>
  
 