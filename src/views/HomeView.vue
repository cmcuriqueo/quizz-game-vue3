<template>
  <div class="bg-transparent">
    <div class="mx-auto">


      <div
        class="relative isolate overflow-hidden bg-gray-400 px-6 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-4 lg:px-24 lg:pt-4">



        <div v-if="allQuestion.length > 0" class="flex items-start justify-center gap-4 ">
          <ButtonDefault texto="◀️ Previous" @clickbutton="onPrevious()" :visible="true"
            :disabled="disabledButtonPrevious" />

          <span class="flex justify-center items-center py-2">{{ index + 1 }}/{{ allQuestion.length }}</span>

          <ButtonDefault texto="Next ▶️" @clickbutton="onNext()" :visible="true" :disabled="disabledButtonNetx" />
        </div>
        <div
          class="mx-auto max-w-[450px] lg:mx-0 lg:flex-auto lg:py-14 lg:text-left min-h-[200px] min-w-[450px] flex items-center justify-center">
          <div v-if="allQuestion.length == 0">
            <VueJsIcon :width="24" :height="24"/>


            <ButtonDefault texto="🚀 Start" @clickbutton="onStart();" visible="startQuizz" />
          </div>

          <div v-else>
            <b>{{ selectQuestion.question }}</b>
            <div v-if="selectQuestion.code != ''">


              <code-highlight language="javascript">
                {{ selectQuestion.code }}
              </code-highlight>
            </div>
            <ul class="mt-4">
              <li v-for="(answer, option) in selectQuestion.answers" :key="option"
                @click="onAnswer(option)" 
                :class="classAnswer(option) + ' cursor-pointer shadow-sm py-2 ring-1 ring-inset'">
                <pre class="px-2">{{ index2 + 1 }})<br>{{ answer }}</pre>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ButtonDefault from '../components/ButtonDefualt.vue'
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import VueJsIcon from '../components/icons/VueJsIcon.vue'

import { mapGetters, mapActions } from 'vuex'
import { Question  } from '../types';


import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";

export default {
  components: {
    ButtonDefault,
    CodeHighlight,
    VueJsIcon
  },
  computed: {
    ...mapGetters({
      selectQuestion: 'selectQuestion',
      allQuestion: 'allQuestion',
      index: 'index',
      isLastQuestion: 'isLastQuestion',
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
        return 'hover:bg-gray-300/90'
      } else if(this.selectQuestion.userSelectedAnswer == this.selectQuestion.correctAnswer 
        && index == this.selectQuestion.correctAnswer) {
        return 'bg-green-500/30 cursor-not-allowed'
      } else if(index == this.selectQuestion.correctAnswer && this.selectQuestion.userSelectedAnswer != this.selectQuestion.correctAnswer) {
        return 'cursor-not-allowed'
      } else {
        return 'bg-red-600/30 cursor-not-allowed'
      }
    },
    onStart() {
      this.fetchQuestions();
    },
    onNext() {
      if (!this.isLastQuestion) {
        const next = this.index+1;
        this.$store.commit('SET_CURRENT_QUESTION', next)
      }
    },
    onPrevious() {
      if (this.index - 1 >= 0) {
        const next = this.index-1;
        this.$store.commit('SET_CURRENT_QUESTION', next)
      }
    },
    onAnswer(index: Number) {
      if(this.selectQuestion.userSelectedAnswer != undefined) return
      this.selectAnswer(index)

      setTimeout(() => {
        this.onNext();
      }, 1500);
      
    }

  }
}
</script>