<template>
    <component :is="layout"></component>
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
