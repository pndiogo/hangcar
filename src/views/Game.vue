<template>
  <div class="game">
    <h1>Jogo do Carrinho</h1>
    <p>Encontre a palavra escondida - Insira uma letra</p>

    <div class="game-container">
      <svg height="260" width="400" class="figure-container">
        <!-- Chassis -->
        <line x1="100" y1="0" x2="100" y2="100" class="figure-part" />
        <line x1="100" y1="2" x2="300" y2="2" class="figure-part" />
        <line x1="300" y1="0" x2="300" y2="100" class="figure-part" />
        <line x1="0" y1="100" x2="400" y2="100" class="figure-part" />

        <line x1="2" y1="100" x2="2" y2="185" class="figure-part" />
        <line x1="398" y1="100" x2="398" y2="185" class="figure-part" />
        <line x1="0" y1="185" x2="400" y2="185" class="figure-part" />

        <line x1="200" y1="0" x2="200" y2="185" class="figure-part" />

        <!-- Wheels -->
        <circle cx="85" cy="220" r="35" class="figure-part" />
        <circle cx="315" cy="220" r="35" class="figure-part" />
      </svg>

      <div class="wrong-letters-container">
        <div id="wrong-letters"></div>
      </div>

      <div class="word" id="word"></div>
    </div>

    <!-- Container for final message -->
    <div class="popup-container" id="popup-container">
      <div class="popup">
        <h2 id="final-message"></h2>
        <h3 id="final-message-reveal-word"></h3>
        <button id="play-button">Jogar de novo</button>
      </div>
    </div>

    <!-- Notification -->
    <div class="notification-container" id="notification-container">
      <p>Já selecionou esta letra</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Game',
};
</script>