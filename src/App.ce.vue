<template>
<main  v-if="!$root.renderUserGuide">
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
      <section class="flex flex-col lg:grid lg:grid-cols-4 gap-8 my-8">
        <div class="col-span-3 flex flex-col gap-8">
          <Sections></Sections>
          
        </div>
        <div class="lg:border-l border-gray-100 lg:pl-8">
          <Sidebar></Sidebar>
        </div>
      </section>
      <Results></Results>
    </template>
  </div>
  <Outro></Outro>
  </main>

  <UserGuide v-else></UserGuide>

</template>

<script>
import Localizer from "./Localizer.js";
import payloadUrl from "./assets/payload.json?url";
import Intro from "./components/Meta/Intro.vue";
import Meta from "./components/Meta/Meta.vue";
import Outro from "./components/Meta/Outro.vue";
import Results from "./components/Body/Results.vue";
import Sidebar from "./components/Sidebar/Sidebar.vue";

import Sections from "./components/Body/Sections.vue";
import LoadingIndicator from "./components/Utilities/LoadingIndicator.vue";
import Section from "./Models/Section.js";
import { Remarkable } from "remarkable";
import { findDir } from "@vue/compiler-core";
import UserGuide from "./components/Meta/UserGuide.vue";
import WrapperEventDispatcher from "./WrapperEventDispatcher.js";




export default {
  data() {
    return {
      strings: new Localizer(),
      payload: null,
      renderUserGuide: false
    };
  },
  components: {
    Intro,
    Meta,
    Outro,
    LoadingIndicator,
    Sections,
    Results,
    Sidebar,
    UserGuide
},
  mounted() {
    WrapperEventDispatcher.dispatch(this.strings.title);
    fetch(payloadUrl)
      .then((r) => r.json())
      .then((j) => {
        j.sections = j.sections.map((section) => new Section(section));
        this.payload = j;
      });
  },
  props: {
    publicPath: String,
  },
  computed: {
    language() {
      return this.strings.language;
    },
    balance() {
      return this.payload.sections.reduce((scarry, section) => {
        return (
          scarry +
          section.questions.reduce((qcarry, question) => {
            return qcarry + question.userValueImpact;
          }, 0)
        );
      }, 0);
    },
    percentageOfTotalRevenue() {
      return (this.balance * 100) / this.payload.total_revenue;
    },

    absoluteBalance() {
      return Math.abs(this.balance) / 1000000;
    },
    
    fullTextTotal() {
      const md = new Remarkable();
      return md.render(
        this.strings.__(this.balance > 0 ? "total_increase" : "total_decrease", {
          absbalance: this.strings.formatNumber(this.strings.roundCurrency(this.absoluteBalance, 2), "currency"),
          percent: this.strings.formatNumber(
            Math.abs(this.percentageOfTotalRevenue),
            "percent"
          ),
        })
      );
    },
  }
};
</script>
<style>
@import "./index.css";
.footnote-backref {
    display:none;
}
</style>
