<template>
  <div
    v-html="intro"
    class="prose dark:prose-invert lg:prose-lg max-w-none"
  ></div>
</template>
<script>
import { Remarkable } from "remarkable";

export default {
  computed: {
    intro() {
      if (!this.$root.strings.intro) return "";
      const md = new Remarkable();
      return md.render(this.$root.strings.intro);
    },
  },
};
</script>
