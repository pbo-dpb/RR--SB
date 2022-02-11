<template>
  <Intro></Intro>
  <Meta v-if="payload"></Meta>
  <div v-if="payload">Loaded</div>

  <Outro></Outro>
</template>

<script>
import Strings from "./Strings.js";
import payloadUrl from "./assets/payload.json?url";
import Intro from "./components/Layout/Intro.vue";
import Meta from "./components/Layout/Meta.vue";
import Outro from "./components/Layout/Outro.vue";

const language = document.documentElement.lang;

export default {
  data() {
    return {
      language: language,
      strings: new Strings(language),
      payload: null,
    };
  },
  components: {
    Intro: Intro,
    Meta: Meta,
    Outro: Outro,
  },
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
