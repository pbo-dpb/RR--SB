<template><div v-html="outro" class="prose max-w-none"></div></template>
<script>
import { Remarkable } from "remarkable";

export default {
  computed: {
    outro() {
      if (!this.$root.strings.outro) return "";
      var md = new Remarkable();
      return md.render(this.$root.strings.outro);
    },
  },
};
</script>
