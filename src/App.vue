<template lang="pug">
component(:is="layout")
  router-view
</template>

<script>
import BlankLayout from "./layouts/blank";
import DefaultLayout from "./layouts/default";

export default {
  name: "MemoryGame",
  components: {
    BlankLayout,
    DefaultLayout,
  },
  computed: {
    layout() {
      let layout = this.$route.meta.layout;
      if (layout) {
        return `${layout}Layout`;
      }
      return "BlankLayout";
    },
  },
};
</script>