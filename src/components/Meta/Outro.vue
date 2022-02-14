<template>
  <div
    v-html="outro"
    class="prose prose-sm max-w-none border-t border-gray-100 pt-4"
  ></div>
</template>

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
