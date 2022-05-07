<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>

<script>
import AppLayout from './components/layout/AppLayout.vue';

export default {
  name: "App",

  data: () => ({
    layout: 'AppLayout'
  }),

  components: {
    AppLayout,
  }
};
</script>
