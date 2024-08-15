<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div class="text-white mb-4">Score: {{ score }}</div>
      <canvas ref="gameCanvas" class="bg-gray-700" width="400" height="400"></canvas>
      <button @click="pauseGame" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mt-4">Pause</button>
  
      <div v-if="isPaused" class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <button @click="resumeGame" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Resume</button>
        <button @click="restartGame" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Restart</button>
        <button @click="exitToMenu" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Exit to Menu</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        score: 0,
        snake: [{ x: 10, y: 10 }],
        direction: 'right',
        food: { x: 15, y: 15 },
        isPaused: false,
        gameInterval: null,
        canvasContext: null,
        touchStartX: 0,
        touchStartY: 0,
      };
    },
    mounted() {
      const canvas = this.$refs.gameCanvas;
      this.canvasContext = canvas.getContext('2d');
      this.startGame();
      document.addEventListener('keydown', this.handleKeydown);
      document.addEventListener('touchstart', this.handleTouchStart);
      document.addEventListener('touchmove', this.handleTouchMove);
    },
    methods: {
      startGame() {
        this.resetGame();
        this.gameInterval = setInterval(this.gameLoop, 100);
      },
      resetGame() {
        this.score = 0;
        this.snake = [{ x: 10, y: 10 }];
        this.direction = 'right';
        this.food = this.randomPosition();
      },
      gameLoop() {
        this.moveSnake();
        this.checkCollision();
        this.checkFood();
        this.drawGame();
      },
      moveSnake() {
        const head = { ...this.snake[0] };
        if (this.direction === 'right') head.x += 1;
        if (this.direction === 'left') head.x -= 1;
        if (this.direction === 'up') head.y -= 1;
        if (this.direction === 'down') head.y += 1;
  
        this.snake.unshift(head);
        this.snake.pop();
      },
      handleKeydown(e) {
        if (e.key === 'ArrowUp' && this.direction !== 'down') this.direction = 'up';
        if (e.key === 'ArrowDown' && this.direction !== 'up') this.direction = 'down';
        if (e.key === 'ArrowLeft' && this.direction !== 'right') this.direction = 'left';
        if (e.key === 'ArrowRight' && this.direction !== 'left') this.direction = 'right';
      },
      handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
      },
      handleTouchMove(e) {
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
  
        const dx = touchEndX - this.touchStartX;
        const dy = touchEndY - this.touchStartY;
  
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0 && this.direction !== 'left') {
            this.direction = 'right';
          } else if (dx < 0 && this.direction !== 'right') {
            this.direction = 'left';
          }
        } else {
          if (dy > 0 && this.direction !== 'up') {
            this.direction = 'down';
          } else if (dy < 0 && this.direction !== 'down') {
            this.direction = 'up';
          }
        }
      },
      checkCollision() {
        const head = this.snake[0];
        if (head.x < 0 || head.y < 0 || head.x >= 20 || head.y >= 20 || this.snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
          clearInterval(this.gameInterval);
          alert('Game Over! Your score is ' + this.score);
          this.$router.push('/');
        }
      },
      checkFood() {
        const head = this.snake[0];
        if (head.x === this.food.x && head.y === this.food.y) {
          this.score += 1;
          this.snake.push({ ...this.snake[this.snake.length - 1] });
          this.food = this.randomPosition();
        }
      },
      randomPosition() {
        return { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
      },
      drawGame() {
        this.canvasContext.clearRect(0, 0, 400, 400);
        this.canvasContext.fillStyle = 'green';
        this.snake.forEach(segment => {
          this.canvasContext.fillRect(segment.x * 20, segment.y * 20, 20, 20);
        });
        this.canvasContext.fillStyle = 'red';
        this.canvasContext.fillRect(this.food.x * 20, this.food.y * 20, 20, 20);
      },
      pauseGame() {
        clearInterval(this.gameInterval);
        this.isPaused = true;
      },
      resumeGame() {
        this.isPaused = false;
        this.gameInterval = setInterval(this.gameLoop, 100);
      },
      restartGame() {
        this.isPaused = false;
        this.startGame();
      },
      exitToMenu() {
        clearInterval(this.gameInterval);
        this.$router.push('/');
      },
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.handleKeydown);
      document.removeEventListener('touchstart', this.handleTouchStart);
      document.removeEventListener('touchmove', this.handleTouchMove);
      clearInterval(this.gameInterval);
    },
  };
  </script>
  

  