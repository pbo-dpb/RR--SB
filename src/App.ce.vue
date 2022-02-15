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
      <Meta></Meta>
      <div class="flex flex-col lg:grid lg:grid-cols-4 gap-8 my-8">
        <div class="col-span-3 flex flex-col gap-8">
          <Sections></Sections>
          <Results></Results>
        </div>
        <div class="lg:border-l border-gray-100 lg:pl-8">Sidebar</div>
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
import Results from "./components/Body/Results.vue";

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
    Results,
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
