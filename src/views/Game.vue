<template>
  <main class="main-container">
    <h1>Jogo do Carrinho</h1>
    <p>Encontre a palavra escondida</p>

    <section v-if="getIsPlayable" class="game-container">
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

      <div v-if="getIsPlayable" class="status-container">
        <div class="player">
          <h4>Sua vez</h4>
          <h2>Equipa {{ getPlayingTeam && getPlayingTeam.name }}</h2>
          <h2>
            Categoria {{ getPlayingTeamActiveWord && getPlayingTeamActiveWord.category.name }}
          </h2>
        </div>
      </div>
    </section>

    <section v-if="getIsPlayable" class="game-word-container">
      <p>Insira uma letra</p>
      <div class="wrong-letters-container">
        <p v-if="this.wrongLetters.length > 0">Erradas</p>
        <div id="wrong-letters" ref="wrongLettersEl"></div>
      </div>
      <div class="correct-word-container">
        <p v-if="this.correctLetters.length > 0">Palavra</p>
        <div class="word" id="word" ref="wordEl"></div>
      </div>
    </section>

    <section v-if="!getIsPlayable" class="game-not-ready-container">
      <h2 class="title">É preciso configurar o jogo</h2>
      <button class="btn btn-primary btn-large" @click="$router.push('/settings')">
        Configurar
      </button>
    </section>

    <!-- Container for final message -->
    <div id="popup-container" class="popup-container" :class="{ show: showPopup }">
      <div class="popup">
        <h2 id="final-message">{{ popupMessage }}</h2>
        <h3 id="final-message-reveal-word">{{ popupText }}</h3>
        <button class="btn btn-primary" @click="checkGamePlayability">
          {{ canGameContinue ? "Continuar" : "Jogar de novo" }}
        </button>
        <button v-if="!canGameContinue" class="btn btn-primary" @click="$router.push('/settings')">
          Configurar
        </button>
      </div>
    </div>

    <!-- Notification -->
    <div
      id="notification-container"
      class="notification-container"
      :class="{ show: showNotification }"
    >
      <p>Já selecionou esta letra</p>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

let figureParts;

export default {
  name: 'Game',
  data() {
    return {
      correctLetters: [],
      wrongLetters: [],
      showNotification: false,
      showPopup: false,
      popupMessage: '',
      popupText: '',
    };
  },
  computed: {
    ...mapGetters({
      allTeams: ['teams/getAllTeams'],
      getPlayingTeam: ['teams/getPlayingTeam'],
      getPlayingTeamActiveWord: ['teams/getPlayingTeamActiveWord'],
      getIsPlayable: ['game/getIsPlayable'],
      getCurrentTeamIsLast: ['game/getCurrentTeamIsLast'],
      getCurrentWordIsLast: ['game/getCurrentWordIsLast'],
    }),
    canGameContinue() {
      return !(this.getCurrentTeamIsLast && this.getCurrentWordIsLast);
    },
  },
  mounted() {
    if (this.getIsPlayable) {
      window.addEventListener('keydown', this.keyDownHanlder);
      figureParts = document.querySelectorAll('.figure-part');
    }
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyDownHanlder);
  },
  methods: {
    ...mapActions({
      startGame: 'game/startGame',
      endGame: 'game/endGame',
      activateNextTeam: 'game/activateNextTeam',
      activateFirstTeam: 'game/activateFirstTeam',
      activateNextWord: 'game/activateNextWord',
      addPointToPlayingTeamScore: 'teams/addPointToPlayingTeamScore',
    }),
    displayWord() {
      this.$refs.wordEl.innerHTML = `
        ${this.getPlayingTeamActiveWord.name
    .split('')
    .map(
      (letter) => `
                <span class="letter">
                    ${this.correctLetters.includes(letter) ? letter : ''}
                </span>
            `,
    )
    .join('')}
        `;
    },
    showNotificationHandler() {
      this.showNotification = true;

      setTimeout(() => {
        this.showNotification = false;
      }, 2000);
    },
    updateWrongLettersEl() {
      this.$refs.wrongLettersEl.innerHTML = `
        ${this.wrongLetters.map((letter) => ` ${letter}`)}
    `;
    },
    updateFigureParts() {
      figureParts.forEach((part, index) => {
        const errors = this.wrongLetters.length;

        if (index < errors) {
          // eslint-disable-next-line
          part.style.display = "block";
        } else {
          // eslint-disable-next-line
          part.style.display = "none";
        }
      });
    },
    checkIfLost() {
      const word = this.$refs.wordEl.innerText.replace(/ /g, '');

      if (word === this.getPlayingTeamActiveWord.name) {
        //* won
        this.popupMessage = 'Parabéns! Acertou! 😃';
        this.popupText = `...a palavra era: ${this.getPlayingTeamActiveWord.name}`;
        this.showPopup = true;

        // add one point to score
        this.addPointToPlayingTeamScore();
      } else if (this.wrongLetters.length === figureParts.length) {
        //* lost
        this.popupMessage = 'Infelizmente não acertou. 😕';
        this.popupText = `...a palavra era: ${this.getPlayingTeamActiveWord.name}`;
        this.showPopup = true;
      }
    },
    checkGamePlayability() {
      //* check if is last team and last word
      if (this.getCurrentTeamIsLast && this.getCurrentWordIsLast) {
        console.log(1);
        this.startGame();
        //* check if last team
        //* if not, activate next team with same word category
      } else if (!this.getCurrentTeamIsLast) {
        console.log(2);
        this.activateNextTeam();
        //* check if last team
        //* if it is, but there's categories, activate first team with next category
      } else if (this.getCurrentTeamIsLast && !this.getCurrentWordIsLast) {
        console.log(3);
        this.activateFirstTeam();
        this.activateNextWord();
      }

      this.resetBoard();
      this.showPopup = false;
    },
    resetBoard() {
      this.correctLetters = [];
      this.wrongLetters = [];
      this.displayWord();
      this.updateWrongLettersEl();
      this.updateFigureParts();
    },
    keyDownHanlder(e) {
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key.toLowerCase();

        if (this.getPlayingTeamActiveWord.name.toLowerCase().includes(letter)) {
          if (!this.correctLetters.includes(letter)) {
            this.correctLetters.push(letter);
            this.displayWord();
            this.checkIfLost();
          } else {
            this.showNotificationHandler();
          }
        } else if (!this.wrongLetters.includes(letter)) {
          this.wrongLetters.push(letter);

          this.updateWrongLettersEl();
          this.checkIfLost();
          this.updateFigureParts();
        } else {
          this.showNotificationHandler();
        }
      }
    },
  },
};
</script>
