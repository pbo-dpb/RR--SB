<template>
  <Intro></Intro>
  <div aria-live="polite" :aria-busy="!payload">
    <loading-indicator
      v-if="!payload"
      aria-hidden="true"
      class="w-8 h-8"
    ></loading-indicator>
    <template v-else>
      <Meta></Meta>
    </template>
  </div>
  <Outro></Outro>
</template>

<script>
import Localizer from "./Localizer.js";
import payloadUrl from "./assets/payload.json?url";
import Intro from "./components/Layout/Intro.vue";
import Meta from "./components/Layout/Meta.vue";
import Outro from "./components/Layout/Outro.vue";
import LoadingIndicator from "./components/Utilities/LoadingIndicator.vue";
import Section from "./Models/Section.js";

const language = document.documentElement.lang;

export default {
  data() {
    return {
      language: language,
      strings: new Localizer(language),
      payload: null,
    };
  },
  components: {
    Intro,
    Meta,
    Outro,
    LoadingIndicator,
  },
  mounted() {
    fetch(payloadUrl)
      .then((r) => r.json())
      .then((j) => {
        j.sections = j.sections.map((section) => new Section(section));
        this.payload = j;
      });
  },
};
</script>
<style>
@import "./index.css";
</style>
