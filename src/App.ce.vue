<template>
  <Intro></Intro>
  <div v-if="payload">Loaded</div>
  <Outro></Outro>
</template>

<script setup>
import Intro from "./components/Layout/Intro.vue";
import Outro from "./components/Layout/Outro.vue";

import { ref } from "vue";
import payloadUrl from "./assets/payload.json?url";
import Strings from "./Strings.js";

const language = document.documentElement.lang;
const strings = new Strings(language);

let payload = ref(null);
payload = fetch(payloadUrl).then((r) => r.json());

defineExpose({
  strings,
  language,
  payload,
});
</script>
