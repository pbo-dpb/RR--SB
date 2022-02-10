<template>
  <Intro></Intro>
</template>

<script setup>
import Intro from "./components/Layout/Intro.vue";
import { ref } from "vue";
import payloadUrl from "./assets/payload.json?url";
import Strings from "./Strings.js";

const language = document.documentElement.lang;
const strings = new Strings(language);

defineExpose({
  language,
  strings,
});
</script>
