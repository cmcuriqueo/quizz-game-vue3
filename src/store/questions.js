import { createStore } from 'vuex'


export const store = createStore({
    state: {
        questions:[],
        currentQuestion:0
      
    },
    mutations: {
      addQuestions: (state, questions) => {
        state.questions = questions;
      }
    },
    getters: {
      fetchQuestions: (state) => {
        return state.questions
      },
      fetchQuestion: (state) => (index) => {
        return state.questions[index]
      },
      getCurrentQuestion: (state) => {
        return state.currentQuestion
      }

    },
    actions: {
      addQuestions(context, questions) {
        context.commit('addQuestions', questions)
      },
      setCurrentQuestion(context, index) {
        context.state.currentQuestion = index
      }
    }
})