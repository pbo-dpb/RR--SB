<template>
  <div class="w-full flex flex-col">
    <input
      type="range"
      :list="`tickmarks-${uid}`"
      :min="question.minimum"
      :max="question.maximum"
      :step="question.step"
      class="w-full"
      :id="uid"
      v-model="question.user_value"
    />
    <datalist :id="`tickmarks-${uid}`">
      <option
        v-for="tick in tickmarks"
        :value="tick"
        :key="`${question.name}-${tick}`"
      ></option>
    </datalist>
    <div
      class="flex flex-row justify-between text-sm text-gray-600 dark:text-gray-400"
      aria-hidden="true"
    >
      <span>{{ formatNumber(question.minimum, question.unit_style) }}</span>
      <span>{{
        formatNumber(question.default_value, question.unit_style)
      }}</span>
      <span>{{ formatNumber(question.maximum, question.unit_style) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Question from "../../Models/Question";
import Localizer from "../../Localizer";

const props = defineProps<{ uid: string; question: Question }>();
const localizer = new Localizer();

const tickmarks = computed(() => {
  const ticks: number[] = [];
  for (
    let i = props.question.minimum;
    i <= props.question.maximum;
    i += props.question.step
  ) {
    ticks.push(i);
  }
  return ticks;
});

const formatNumber = (value: number, style: string): string => {
  return localizer.formatNumber(value, style);
};
</script>
