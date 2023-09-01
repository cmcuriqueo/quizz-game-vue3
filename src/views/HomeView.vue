<template>
  <div class="bg-transparent">
    <div class="mx-auto">


      <div
        class="relative isolate overflow-hidden bg-gray-400 px-6 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-4 lg:px-24 lg:pt-4">



        <div v-if="startQuizz" class="flex items-start justify-center gap-4 ">
          <ButtonDefault texto="◀️ Previous" @clickbutton="onPrevious($event)" :visible="true"
            :disabled="disabledButtonPrevious" />

          <span class="flex justify-center items-center py-2">{{ index + 1 }}/{{ allQuestion.length }}</span>

          <ButtonDefault texto="Next ▶️" @clickbutton="onNext($event)" :visible="true" :disabled="disabledButtonNetx" />
        </div>
        <div
          class="mx-auto max-w-[450px] lg:mx-0 lg:flex-auto lg:py-14 lg:text-left min-h-[200px] min-w-[450px] flex items-center justify-center">
          <div v-if="!startQuizz">
            <svg class="w-24 h-24 text-green-500 animate-bounce" xmlns="http://www.w3.org/2000/svg" version="1.1"
              viewBox="0 0 261.76 226.69">
              <g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)">
                <g transform="translate(178.06 235.01)">
                  <path d="m0 0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z" fill="#41b883" />
                </g>
                <g transform="translate(178.06 235.01)">
                  <path d="m0 0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z" fill="#34495e" />
                </g>
              </g>
            </svg>

            <ButtonDefault texto="🚀 Start" @clickbutton="onStart();" visible="startQuizz" />
          </div>

          <div v-else>
            <b>{{ currentQuestion.question }}</b>
            <div v-if="currentQuestion.code != ''">


              <code-highlight language="javascript">
                {{ currentQuestion.code }}
              </code-highlight>
            </div>
            <ul class="mt-4">
              <li v-for="(answer, index2) in currentQuestion.answers" :key="index2"
                @click="console.log(index2 == currentQuestion.correctAnswer)"
                class="cursor-pointer shadow-sm py-2 ring-1 ring-inset ring-gray-300/20 hover:bg-gray-300/90">
                <pre class="px-2">{{ index2 + 1 }})<br>{{ answer }}</pre>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonDefault from '../components/ButtonDefualt.vue'
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";


import { mapGetters, mapActions } from 'vuex'


import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";

export default {
  components: {
    ButtonDefault,
    CodeHighlight
  },
  data() {
    return {
      startQuizzFalse: false,
      index: 0
    }
  },
  computed: {
    ...mapGetters(['allQuestion', 'currentQuestion', 'startQuizz']),
    disabledButtonNetx() {
      return this.index + 1 >= this.allQuestion.length
    },
    disabledButtonPrevious() {
      return this.index - 1 < 0
    }
  },
  methods: {
    ...mapActions(['fetchQuestions', 'selectAnswer']),
    async onStart() {
      const data = await this.fetchQuestions();
      //ademas las desordeno para que no se vean siempre en el mismo orden y limito a 5 preguntas
      this.$store.commit("SET_QUESTIONS",data.preguntas.sort(() => Math.random() - 0.5).slice(0, 5))
      //this.$store.commit("SET_QUESTIONS", data.preguntas);
      try {
        this.$store.commit('SET_START_QUIZZ', true)
      } catch (error) {
        console.error(error);
      }
    },
    onNext() {
      if (this.index + 1 < this.allQuestion.length) this.index++
    },
    onPrevious() {
      if (this.index - 1 >= 0) this.index--
    }
  }
}
</script>
