<template>
  <main v-if="!renderUserGuide">
    <div class="mb-8">
      <Intro :strings="localizer.strings" />
    </div>
    <div aria-live="polite" :aria-busy="!payload">
      <loading-indicator
        v-if="!payload"
        aria-hidden="true"
        class="w-8 h-8 mb-8"
      />
      <template v-else>
        <Meta
          :last_update="payload.last_update"
          :render-user-guide="renderUserGuide"
          :strings="localizer.strings"
        />
        <section class="flex flex-col lg:grid lg:grid-cols-4 gap-8 my-8">
          <div class="col-span-3 flex flex-col gap-8">
            <Sections :sections="payload.sections" />
          </div>
          <div class="lg:border-l border-gray-100 lg:pl-8">
            <Sidebar
              :balance="balance"
              :sections="payload.sections"
              :strings="localizer.strings"
              :render-user-guide="renderUserGuide"
              :full-text-total="fullTextTotal"
            />
          </div>
        </section>
        <Results :balance="balance" :full-text-total="fullTextTotal" />
      </template>
    </div>
    <Outro :strings="localizer.strings" />
  </main>

  <UserGuide
    :render-user-guide="renderUserGuide"
    :strings="localizer.strings"
    v-else
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Localizer from "./Localizer";
import payloadUrl from "./assets/payload.json?url";
import Intro from "./components/Meta/Intro.vue";
import Meta from "./components/Meta/Meta.vue";
import Outro from "./components/Meta/Outro.vue";
import Results from "./components/Body/Results.vue";
import Sidebar from "./components/Sidebar/Sidebar.vue";
import Sections from "./components/Body/Sections.vue";
import LoadingIndicator from "./components/Utilities/LoadingIndicator.vue";
import Section from "./Models/Section";
import { Remarkable } from "remarkable";
import UserGuide from "./components/Meta/UserGuide.vue";
import WrapperEventDispatcher from "./WrapperEventDispatcher";
import Question from "./Models/Question";

const localizer = new Localizer();
const payload = ref<any>(null);
const renderUserGuide = ref(false);

onMounted(() => {
  WrapperEventDispatcher.dispatch(
    localizer.language === "en"
      ? localizer.strings.title.en
      : localizer.strings.title.fr
  );
  fetch(payloadUrl)
    .then((r) => r.json())
    .then((j) => {
      j.sections = j.sections.map((section: Section) => new Section(section));
      payload.value = j;
    });
});

const balance = computed(() => {
  return (payload.value.sections as Section[]).reduce(
    (scarry: number, section: Section) => {
      return (
        scarry +
        section.questions.reduce((qcarry: number, question: Question) => {
          return qcarry + question.userValueImpact;
        }, 0)
      );
    },
    0
  );
});

const percentageOfTotalRevenue = computed(() => {
  return (balance.value * 100) / payload.value.total_revenue;
});

const absoluteBalance = computed(() => {
  return Math.abs(balance.value) / 1000000;
});

const fullTextTotal = computed(() => {
  const md = new Remarkable();
  return md.render(
    localizer.__(balance.value > 0 ? "total_increase" : "total_decrease", {
      absbalance: localizer.formatNumber(
        localizer.roundCurrency(absoluteBalance.value, 2),
        "currency"
      ),
      percent: localizer.formatNumber(
        Math.abs(percentageOfTotalRevenue.value),
        "percent"
      ),
    })
  );
});

</script>

<style>
@import "./style.css";
.footnote-backref {
  display: none;
}
</style>
