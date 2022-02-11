<template>
  <Intro></Intro>
  <Meta v-if="payload"></Meta>
  <div v-if="payload">Loaded</div>
  <Outro></Outro>
</template>

<script setup>
import Intro from "./components/Layout/Intro.vue";
import Meta from "./components/Layout/Meta.vue";
import Outro from "./components/Layout/Outro.vue";
import { ref } from "vue";
import payloadUrl from "./assets/payload.json?url";
import Strings from "./Strings.js";

const language = document.documentElement.lang;
const strings = new Strings(language);
let payload = ref(null);
defineExpose({
  strings,
  language,
  payload,
});
</script>
<script>
export default {
  mounted() {
    fetch(payloadUrl)
      .then((r) => r.json())
      .then((j) => {
        this.payload = j;
      });
  },
};
</script>
<style>
@import "./index.css";
</style>
