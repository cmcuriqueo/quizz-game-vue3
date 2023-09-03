import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

import createPersistedState from 'vuex-persistedstate'
import { Question } from '../types'

export interface State {
  questions: Question[]
  currentQuestion: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    questions: [] as Question[],
    currentQuestion: 0
  },
  mutations: {
    SET_QUESTIONS(state: State, questions: Question[]) {
      console.log('SET_QUESTIONS')
      state.questions = questions
    },
    SET_CURRENT_QUESTION(state: State, index: number) {
      console.log('SET_CURRENT_QUESTION')
      state.currentQuestion = index
    },
    SET_ANSWER(state: State, answer: number) {
      console.log('SET_ANSWER')
      state.questions[state.currentQuestion].userSelectedAnswer = answer
    },
    SET_IS_CORRECT_USER_ANSWER(state: State, isCorrect: boolean) {
      console.log('SET_IS_CORRECT_USER_ANSWER')
      state.questions[state.currentQuestion].isCorrectUserAnswer = isCorrect
    }
  },
  getters: {
    selectQuestion: (state: State) => state.questions[state.currentQuestion],
    index: function (state: State) {
      console.log('getters index')
      console.log(state.currentQuestion)
      return state.currentQuestion
    },
    isLastQuestion: (state: State) => state.currentQuestion === state.questions.length - 1,
    allQuestion: (state: State) => state.questions,
    numberCurrectAnswer: (state: State) =>
      state.questions.filter((question) => question.isCorrectUserAnswer).length,
    numberIncorrectAnswer: (state: State) =>
      state.questions.filter((question) => !question.isCorrectUserAnswer).length,
    numberUnanswered: (state: State) =>
      state.questions.filter((question) => question.userSelectedAnswer === null).length,
    numberTotalQuestionAnswers: (state: State) =>
      state.questions.filter((question) => question.userSelectedAnswer != undefined).length,

  },
  actions: {
    async fetchQuestions({ commit }) {
      try {
        const response = await fetch('http://127.0.0.1:5174/preguntas.json')
        const questions = await response.json()
        commit('SET_QUESTIONS', questions.preguntas.sort(() => Math.random() - 0.5).slice(0, 5))
      } catch (error) {
        console.log(error)
      }
    },
    selectAnswer({ state, commit }, selectAnswer: number) {
      const nextQuestionIndex = state.currentQuestion + 1

      console.log('selectAnswer')
      commit('SET_ANSWER', selectAnswer)

      const isCorrect = selectAnswer == state.questions[state.currentQuestion].correctAnswer
      commit('SET_IS_CORRECT_USER_ANSWER', isCorrect)
    }
  }
})
