<template>
  <div class="bg-transparent">
    <div class="mx-auto">

      
      <div
        class="relative isolate overflow-hidden bg-gray-400 px-6 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-4 lg:px-24 lg:pt-4"
      >



        <div v-if="startQuiz" class="flex items-start justify-center gap-4 ">
          <ButtonDefault texto="◀️ Previous" @clickbutton="onPrevious($event)" :visible="true" :disabled="disabledButtonPrevious"/>

          <span class="flex justify-center items-center py-2"
            >{{ index + 1 }}/{{ preguntas.length }}</span
          >

          <ButtonDefault texto="Next ▶️" @clickbutton="onNext($event)" :visible="true"  :disabled="disabledButtonNetx"/>
        </div>
        <div
          class="mx-auto max-w-[450px] lg:mx-0 lg:flex-auto lg:py-14 lg:text-left min-h-[200px] min-w-[450px] flex items-center justify-center"
        >
          <div v-if="!startQuiz">
            <svg 
            class="w-24 h-24 text-green-500 animate-bounce"
              xmlns="http://www.w3.org/2000/svg" 
              version="1.1" 
              viewBox="0 0 261.76 226.69">
              <g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)">
                <g transform="translate(178.06 235.01)">
                  <path d="m0 0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z" 
                  fill="#41b883"/>
                </g>
                <g transform="translate(178.06 235.01)">
                  <path d="m0 0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z" fill="#34495e"/>
                </g>
              </g>
            </svg>

            <ButtonDefault texto="🚀 Start" @clickbutton="onStart();" visible="startQuiz" />
          </div>


          <div v-else>
            <b>{{ preguntas[index].question }}</b>
            <div v-if="preguntas[index].code != ''">
       

              <code-highlight language="javascript">
                {{ preguntas[index].code }}
              </code-highlight>

            </div>
            <ul class="mt-4">
              <li
                v-for="(answer, index2) in preguntas[index].answers"
                :key="index2"
                @click="console.log(index2 == preguntas[index].correctAnswer)"
                class="cursor-pointer shadow-sm py-2 ring-1 ring-inset ring-gray-300/20 hover:bg-gray-300/90"
              >
                <pre class="px-2">{{ index2+1}})<br>{{ answer }}</pre>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import ButtonDefault from '../components/ButtonDefualt.vue'
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import { useStore } from 'vuex'


import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";

export default {
  components: {
    ButtonDefault,
    CodeHighlight
  },
  setup() {
    const store = useStore()

    // preguntas = ref([])

    const index = ref(0)


    console.log('fetchQuestions()')
    const preguntas = ref([])

    
    const startQuiz = ref(false)

    async function addQuestions(url) {
    const response = await fetch(url);
    const data = await response.json();
    store.dispatch('addQuestions', data.preguntas);
  }


    const disabledButtonNetx = computed(() => {
      return index.value + 1 >= preguntas.value.length
    })

    const disabledButtonPrevious = computed(() => {
      return index.value - 1 < 0
    })

    const onStart = () => {
      addQuestions("http://127.0.0.1:5174/preguntas.json")
      preguntas.value = store.getters.fetchQuestions

      console.log('onStart')
      console.log(preguntas.value)
      
            
      startQuiz.value = true
    }

    const onNext = () => {
      if (index.value + 1 < preguntas.value.length) index.value++
    }

    const onPrevious = () => {
      if (index.value - 1 >= 0) index.value--
    }

    return {
      startQuiz,
      preguntas,
      index,
      onNext,
      onPrevious,
      onStart,
      disabledButtonNetx,
      disabledButtonPrevious
    }
  }
}
</script>
