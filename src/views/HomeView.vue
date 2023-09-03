<template>
  <div class="bg-transparent">
    <div class="mx-auto">
      <div
        class="relative isolate overflow-hidden bg-gray-400 px-6 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-4 lg:px-24 lg:pt-4">
        <div v-if="allQuestion.length > 0" class="flex items-start justify-center gap-4">
          <ButtonDefault texto="◀️ Previous" @clickbutton="onPrevious()" :visible="true"
            :disabled="disabledButtonPrevious || disbledButton" />

          <span class="flex justify-center items-center py-2">{{ index + 1 }}/{{ allQuestion.length }}</span>

          <ButtonDefault texto="Next ▶️" @clickbutton="onNext()" :visible="true"
            :disabled="disabledButtonNetx || disbledButton" />
        </div>
        <div
          class="mx-auto max-w-[450px] lg:mx-0 lg:flex-auto lg:py-14 lg:text-left min-h-[200px] min-w-[450px] flex items-center justify-center">
          <div v-if="allQuestion.length == 0">
            <VueJsIcon :width="24" :height="24" />

            <ButtonDefault texto="🚀 Start Quizz" @clickbutton="onStart()" visible="startQuizz" />
          </div>
          <div v-else>
            <b>{{ selectQuestion.question }}</b>
            <div v-if="selectQuestion.code != ''">
              <code-highlight language="javascript">
                {{ selectQuestion.code }}
              </code-highlight>
            </div>
            <ul class="mt-4">
              <li v-for="(answer, option) in selectQuestion.answers" :key="option" @click="onAnswer(option)"
                :class="classAnswer(option) + ' cursor-pointer shadow-sm py-2 ring-1 ring-gray-600/10  rounded-sm'">
                <pre class="px-2">{{ option + 1 }})<br>{{ answer }}</pre>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="mx-auto lg:flex-auto lg:text-left flex items-center justify-center mb-4">
          <ButtonDefault texto="🚀 Restart" @clickbutton="restartComponent()" :visible="allQuestion.length == numberTotalQuestionAnswers && allQuestion.length != 0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'

import VueConfetti from 'vue-confetti'

import ButtonDefault from '../components/ButtonDefualt.vue'
import CodeHighlight from 'vue-code-highlight/src/CodeHighlight.vue'
import VueJsIcon from '../components/icons/VueJsIcon.vue'

import 'vue-code-highlight/themes/duotone-sea.css'
import 'vue-code-highlight/themes/window.css'

export default {
  components: {
    ButtonDefault,
    CodeHighlight,
    VueJsIcon,
    VueConfetti
  },
  data() {
    return {
      disbledButton: false
    }
  },
  computed: {
    ...mapGetters({
      selectQuestion: 'selectQuestion',
      allQuestion: 'allQuestion',
      index: 'index',
      numberCurrectAnswer: 'numberCurrectAnswer',
      isLastQuestion: 'isLastQuestion',
      numberTotalQuestionAnswers: 'numberTotalQuestionAnswers'
    }),
    disabledButtonNetx() {
      return this.index + 1 >= this.allQuestion.length
    },
    disabledButtonPrevious() {
      return this.index - 1 < 0
    }
  },
  methods: {
    ...mapActions({
      fetchQuestions: 'fetchQuestions',
      selectAnswer: 'selectAnswer'
    }),

    classAnswer(index: Number) {
      if (this.selectQuestion.userSelectedAnswer == undefined) {
        return 'hover:bg-gray-300/90 bg-gray-600/10'
      } else if (
        this.selectQuestion.userSelectedAnswer == this.selectQuestion.correctAnswer &&
        index == this.selectQuestion.correctAnswer
      ) {
        return 'bg-green-500/30 cursor-not-allowed'
      } else if (
        index == this.selectQuestion.correctAnswer &&
        this.selectQuestion.userSelectedAnswer != this.selectQuestion.correctAnswer
      ) {
        return 'cursor-not-allowed'
      } else {
        return 'bg-red-600/30 cursor-not-allowed'
      }
    },
    onStart() {
      this.fetchQuestions()
    },
    onNext() {
      if (!this.isLastQuestion) {
        const next = this.index + 1
        this.$store.commit('SET_CURRENT_QUESTION', next)
      }
    },
    onPrevious() {
      if (this.index - 1 >= 0) {
        const next = this.index - 1
        this.$store.commit('SET_CURRENT_QUESTION', next)
      }
    },
    onAnswer(index: Number) {
      if (this.selectQuestion.userSelectedAnswer != undefined) return
      this.selectAnswer(index)
    },
    confetti() {
      if (this.numberCurrectAnswer == this.allQuestion.length) {
        this.$confetti.start()
        setTimeout(() => {
          this.$confetti.stop()
        }, 1000)
      }
    },
    restartComponent() {
      this.$store.commit('SET_CURRENT_QUESTION', 0)
      this.$store.commit('SET_NUMBER_CURRECT_ANSWER', 0)
      this.onStart()
    }
  },
  watch: {
    numberCurrectAnswer() {
      this.confetti()
    }
  }
}
</script>
