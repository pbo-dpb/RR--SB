<template>
  <div class="mb-8">
    <Intro></Intro>
  </div>
  <div aria-live="polite" :aria-busy="!payload">
    <loading-indicator
      v-if="!payload"
      aria-hidden="true"
      class="w-8 h-8 mb-8"
    ></loading-indicator>
    <template v-else>
      <div class="flex flex-col gap-8 mb-8">
        <Meta></Meta>
        <Sections></Sections>
      </div>
    </template>
  </div>
  <Outro></Outro>
</template>

<script>
import Localizer from "./Localizer.js";
import payloadUrl from "./assets/payload.json?url";
import Intro from "./components/Meta/Intro.vue";
import Meta from "./components/Meta/Meta.vue";
import Outro from "./components/Meta/Outro.vue";
import Sections from "./components/Body/Sections.vue";
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
    Sections,
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
