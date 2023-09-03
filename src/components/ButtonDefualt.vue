<template>
  <button
    v-if="visible"
    @click="clickButton"
    class="rounded-md bg-white/30 px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    :disabled="disabled"
  >
    {{ texto }}
  </button>
</template>

<script>
export default {
  props: ['texto', 'visible', 'disabled'],

  setup(props, context) {
    const clickButton = () => {
      context.emit('clickbutton')
    }

    return {
      clickButton
    }
  }
}
</script>
