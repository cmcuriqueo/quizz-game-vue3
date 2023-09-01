import { createStore } from 'vuex'


export const store = createStore({
    state: {
        questions:[],
        currentQuestion:0,
        startQuizzVJS:false,
      
    },
    mutations: {
      SET_QUESTIONS(state, questions) {
        state.questions = questions;
      },
      SET_CURRENT_QUESTION(state, index) {
        state.currentQuestion = index;
      },
      SET_START_QUIZZ(state, startQuizz) {
        state.startQuizzVJS = startQuizz;
      }
    },
    getters: {
      currentQuestion: state => state.questions[state.currentQuestion],
      isLastQuestion: state => state.currentQuestion === state.questions.length - 1,
      allQuestion: state => state.questions,
      startQuizz: state => state.startQuizzVJS
    },
    actions: {
      async fetchQuestions() {
        try {
          const response = await fetch("http://127.0.0.1:5174/preguntas.json");
          return await response.json();
        } catch (error) {
          console.log(error);
        }
      },
      selectAnswer({ state, commit }) {
        const nextQuestionIndex = state.currentQuestion + 1;
        if (nextQuestionIndex < state.questions.length) {
          commit("SET_CURRENT_QUESTION", nextQuestionIndex);
        }
      }
    }
})