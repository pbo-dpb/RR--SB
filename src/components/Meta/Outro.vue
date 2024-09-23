<template>
  <div
    v-html="outro"
    class="prose dark:prose-invert prose-sm max-w-none border-t border-gray-100 pt-4"
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Remarkable } from 'remarkable';
import Localizer, { Strings } from '../../Localizer';

const props = defineProps<{strings:Strings}>();
const strings = props.strings;
const localizer = new Localizer();

const outro = computed(() => {
  const md = new Remarkable();
    return md.render(localizer.language === "en" ? strings.outro.en : strings.outro.fr);
});
</script>
