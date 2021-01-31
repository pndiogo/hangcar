<template>
  <main class="main-container" :class="{ 'main-container--no-play': !getIsPlayable }">
    <section v-if="!getIsPlayable" class="game-no-play-container">
      <h1 class="app-title app-title--xl text-color-accent animate__animated animate__bounceInDown">
        Jogo do Carrinho
      </h1>
      <h2 class="app-title app-title--l animate__animated animate__bounceIn">
        Encontre a palavra escondida
      </h2>
      <h3 class="app-title app-title--m animate__animated animate__bounceInUp">
        É preciso configurar o jogo
      </h3>
      <button
        class="btn btn--primary btn--extra-large btn--shadow animate__animated animate__bounceInUp"
        @click="$router.push('/settings')"
      >
        Configurar
      </button>
    </section>

    <header v-if="getIsPlayable" class="app-header">
      <h1 class="app-title app-title--l text-color-accent">Jogo do Carrinho</h1>
      <h2 class="app-title app-title--s">Encontre a palavra escondida</h2>
      <h4 class="app-title app-title--xs">Insira uma letra...</h4>
    </header>

    <section v-if="getIsPlayable" class="game-container">
      <div class="figure-container">
        <svg height="260" width="400" class="figure">
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
          <circle cx="85" cy="222" r="35" class="figure-part" />
          <circle cx="315" cy="222" r="35" class="figure-part" />
        </svg>
      </div>
      <div v-if="getIsPlayable" class="status-container">
        <div class="player">
          <div class="player__turn">
            <h3 class="app-title app-title--m">Sua vez</h3>
            <p class="app-text app-text--s">Equipa {{ getPlayingTeam && getPlayingTeam.name }}</p>
          </div>

          <div class="player__category">
            <h3 class="app-title app-title--m">Categoria</h3>
            <p class="app-text app-text--s">
              {{ getPlayingTeamActiveWord && getPlayingTeamActiveWord.category.name }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="getIsPlayable" class="game-word-container">
      <div class="correct-word-container">
        <h4 class="app-title app-title--s text-color-accent">Palavra</h4>
        <div class="word app-text app-text--m" ref="wordEl"></div>
      </div>

      <div class="wrong-letters-container">
        <h4 class="app-title app-title--s text-color-orange">Letras erradas</h4>
        <div class="app-text app-text--m" ref="wrongLettersEl"></div>
      </div>
    </section>

    <!-- Container for final message -->
    <div class="modal-container" :class="{ show: showModal }">
      <div class="modal">
        <div class="modal__body">
          <h1 class="app-title app-title--m">{{ modalTitle }}</h1>
          <h2 class="app-title app-title--s">{{ modalSubTitle }}</h2>

          <h3 v-if="isGameOver" class="app-title app-title--s text-color-accent">
            {{ modalMessage }}
          </h3>

          <div v-if="modalStep === 'gameIsOver'">
            <div class="modal__results" v-for="team in getAllTeamsOrderedByScore" :key="team.id">
              <p class="app-text app-text--xs">Equipa: {{ team.name }}</p>
              <p class="app-text app-text--xs">Pontos: {{ team.score }}</p>
            </div>
          </div>
        </div>
        <div class="modal__footer">
          <template v-if="isGameOver && modalStep === 'gameIsRunning'">
            <button class="btn btn--primary" @click="showGameResults">Ver resultados</button>
          </template>

          <template v-if="!isGameOver || (isGameOver && modalStep === 'gameIsOver')">
            <button class="btn btn--primary" @click="checkGamePlayability">
              {{ isGameOver ? "Jogar de novo" : "Continuar" }}
            </button>
            <button v-if="isGameOver" class="btn btn--secondary" @click="$router.push('/settings')">
              Configurar
            </button>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { stringNormalize } from "../utils/utils";

let figureParts;

export default {
  name: "Game",
  data() {
    return {
      correctLetters: [],
      wrongLetters: [],
      showModal: false,
      modalTitle: "",
      modalSubTitle: "",
      modalMessage: "",
      modalMessageInitialState: "O jogo terminou!",
      modalMessageResults: "Resultados:",
      modalStep: "gameIsRunning",
    };
  },
  computed: {
    ...mapGetters({
      getAllTeamsOrderedByScore: ["teams/getAllTeamsOrderedByScore"],
      getPlayingTeam: ["teams/getPlayingTeam"],
      getPlayingTeamActiveWord: ["teams/getPlayingTeamActiveWord"],
      getTotalTeams: ["teams/getTotalTeams"],
      getIsPlayable: ["game/getIsPlayable"],
      getCurrentTeamIsLast: ["game/getCurrentTeamIsLast"],
      getCurrentWordIsLast: ["game/getCurrentWordIsLast"],
      getWinner: ["teams/getWinner"],
    }),
    isGameOver() {
      return this.getCurrentTeamIsLast && this.getCurrentWordIsLast;
    },
  },
  mounted() {
    if (this.getIsPlayable) {
      window.addEventListener("keydown", this.keyDownHanlder);
      figureParts = document.querySelectorAll(".figure-part");
      this.displayCorrectLetters();
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.keyDownHanlder);
  },
  methods: {
    ...mapActions({
      startGame: "game/startGame",
      endGame: "game/endGame",
      activateNextTeam: "game/activateNextTeam",
      activateFirstTeam: "game/activateFirstTeam",
      activateNextWord: "game/activateNextWord",
      subtractPointToTeam: "teams/subtractPointToTeam",
    }),
    displayCorrectLetters(letterToHighlight = "") {
      this.$refs.wordEl.innerHTML = `
        ${this.getPlayingTeamActiveWord.name
          .split("")
          .map(
            (letter) => `
                ${
                  stringNormalize(letterToHighlight) === stringNormalize(letter)
                    ? '<span class="letter animate__animated animate__heartBeat">'
                    : '<span class="letter">'
                }
                    ${
                      this.correctLetters.includes(stringNormalize(letter))
                        ? letter.toUpperCase()
                        : ""
                    }
                </span>
            `
          )
          .join("")}
        `;
    },
    displayWrongLetters(letterToHighlight = null) {
      this.$refs.wrongLettersEl.innerHTML = `
        ${this.wrongLetters
          .map(
            (letter) => `
          ${
            letterToHighlight === letter
              ? '<span class="wrong-letter animate__animated animate__heartBeat">'
              : '<span class="wrong-letter">'
          }
        ${letter.toUpperCase()}
        </span>
        `
          )
          .join(", ")}
    `;
    },
    highlightLetter(letter, isLetterCorrect) {
      // eslint-disable-next-line no-unused-expressions
      isLetterCorrect ? this.displayCorrectLetters(letter) : this.displayWrongLetters(letter);
    },
    updateFigureParts() {
      figureParts.forEach((part, index) => {
        const errors = this.wrongLetters.length;

        if (index < errors) {
          // eslint-disable-next-line
          part.classList.add('is-visible')
        } else {
          // eslint-disable-next-line
          part.classList.remove('is-visible')
        }
      });
    },
    checkTurnStatus() {
      const word = this.$refs.wordEl.innerText.replace(/ /g, "");

      if (stringNormalize(word) === this.getPlayingTeamActiveWord.parsedName) {
        //* won
        this.modalTitle = "Parabéns! Acertou! 😃";
        this.modalSubTitle = `...a palavra era: ${this.getPlayingTeamActiveWord.name}`;
        this.showModal = true;
      } else if (this.wrongLetters.length === figureParts.length) {
        //* lost
        this.modalTitle = "Infelizmente não acertou. 😕";
        this.modalSubTitle = `...a palavra era: ${this.getPlayingTeamActiveWord.name}`;
        this.showModal = true;
      }
    },
    checkGamePlayability() {
      //* check if is last team and last word
      if (this.getCurrentTeamIsLast && this.getCurrentWordIsLast) {
        this.startGame();
        //* check if last team
        //* if not, activate next team with same word category
      } else if (!this.getCurrentTeamIsLast) {
        this.activateNextTeam();
        //* check if last team
        //* if it is, but there's categories, activate first team with next category
      } else if (this.getCurrentTeamIsLast && !this.getCurrentWordIsLast) {
        this.activateFirstTeam();
        this.activateNextWord();
      }

      this.resetBoard();
      this.showModal = false;
    },
    resetBoard() {
      this.modalStep = "gameIsRunning";
      this.modalMessage = this.modalMessageInitialState;
      this.correctLetters = [];
      this.wrongLetters = [];
      this.displayCorrectLetters();
      this.displayWrongLetters();
      this.updateFigureParts();
    },
    keyDownHanlder(e) {
      if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 186) {
        const letter = e.key.toLowerCase();
        const parsedLetter = stringNormalize(letter);

        // if letter is corect
        if (this.getPlayingTeamActiveWord.parsedName.includes(parsedLetter)) {
          // if letter is corect and is not displayed
          if (!this.correctLetters.includes(parsedLetter)) {
            this.correctLetters.push(parsedLetter);
            this.displayCorrectLetters();
            this.checkTurnStatus();
          } else {
            // if letter is corect and displayed
            this.highlightLetter(letter, true);
          }
          // if letter is wrong and not displayed
        } else if (!this.wrongLetters.includes(letter)) {
          this.wrongLetters.push(letter);

          this.subtractPointToTeam(this.getPlayingTeam.id);
          this.displayWrongLetters();
          this.checkTurnStatus();
          this.updateFigureParts();
        } else {
          // if letter is wrong and displayed
          this.highlightLetter(letter, false);
        }
      }
    },
    showGameResults() {
      this.modalStep = "gameIsOver";
      this.modalMessage = this.modalMessageResults;

      // no winners, all teams with score = 0
      const allLosers = this.getWinner.every((team) => team.score === 0);
      // one winner
      const oneWinner = this.getWinner.length === 1;
      // multiple winners with tied scores
      const tiedWinners = this.getWinner.length > 1;

      if (allLosers) {
        this.modalTitle =
          this.getTotalTeams === 1
            ? "Infelizmente não ganhou..."
            : "Infelizmente ninguém ganhou...";
        this.modalSubTitle =
          this.getTotalTeams === 1 ? "Teve 0 pontos" : "Todas as equipas tiveram 0 pontos";
      } else if (oneWinner) {
        this.modalTitle = `Parabéns ${this.getWinner[0].name}! 👏`;
        this.modalSubTitle = `Ganhou com ${this.getWinner[0].score} pontos 🎉`;
      } else if (tiedWinners) {
        this.modalTitle = `Parabéns, temos vários vencedores! 👏`;
        this.modalSubTitle = this.getWinner
          .map((winner) => {
            return `
            ${winner.name} 🎉
          `;
          })
          .join("");
      }
    },
  },
};
</script>
