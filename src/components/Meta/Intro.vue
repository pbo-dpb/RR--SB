<template>
  <div
    v-html="intro"
    class="prose dark:prose-invert lg:prose-lg max-w-none"
  ></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Remarkable } from "remarkable";
import Localizer, { Strings } from "../../Localizer";

const props = defineProps<{strings:Strings}>();

const strings = props.strings;
const localizer = new Localizer();

const intro = computed(() => {
  const md = new Remarkable();
    return md.render(localizer.language === "en" ? strings.intro.en : strings.intro.fr);
});
</script>
