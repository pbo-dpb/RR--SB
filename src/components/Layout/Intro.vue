<template><div v-html="intro" class="prose lg:prose-xl max-w-none"></div></template>
<script>
import { Remarkable } from "remarkable";

export default {
  computed: {
    intro() {
      if (!this.$root.strings.intro) return "";
      var md = new Remarkable();
      return md.render(this.$root.strings.intro);
    },
  },
};
</script>
