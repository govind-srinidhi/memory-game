<template lang="pug">
component(:is="layout")
  router-view
</template>

<script>
import DefaultLayout from "./layouts/default";

export default {
  name: "MemoryGame",

  components: {
    DefaultLayout,
  },

  data: () => ({
    //
  }),
};
</script>
