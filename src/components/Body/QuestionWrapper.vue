<template>
  <div
    class="flex flex-col lg:grid grid-cols-8 gap-4 items-center bg-gray-50 dark:bg-gray-800 rounded-sm -mx-2 p-2"
  >
    <div class="lg:col-span-4 w-full">
      <label class="font-semibold" :for="uid">{{ question.name }}</label>

      <ul class="font-light flex flex-col">
        <li v-if="!question.function">
          {{
            __("impact_per_unit", {
              unit: formatNumber(question.step, question.unit_style),
              impact: formatNumber(
                roundCurrency(question.impactPerUnit / 1000000.0, 2),
                "currency"
              ),
            })
          }}
        </li>

        <li>
          {{ localizer.selectedValue() }}
          <span
            v-if="question.isAltered"
            class="print:text-black text-gray-800 dark:text-gray-200 line-through mr-1"
          >
            {{
              formatNumber(question.default_value, question.unit_style)
            }}</span
          ><span
            :class="{
              'text-orange-600': question.isAltered,
            }"
            >{{ formatNumber(question.user_value, question.unit_style) }}</span
          >
        </li>
      </ul>

      <p
        v-if="question.description"
        class="prose dark:prose-invert prose-sm max-w-none leading-tight text-gray-800 dark:text-gray-200 italic mt-2"
      >
        {{ question.description }}
      </p>
    </div>

    <div class="lg:col-span-3 w-full print:hidden">
      <QuestionRange :uid="uid" :question="question"></QuestionRange>
    </div>

    <div
      class="text-center"
      :class="{ hidden: !question.isAltered, 'lg:block': !question.isAltered }"
    >
      <span
        class="bordered text-white print:text-black font-semibold text-sm px-1 py-.5 rounded-sm"
        :class="{
          'bg-red-800': question.userValueImpact < 0,
          'bg-green-800': question.userValueImpact > 0,
          'bg-gray-500': !question.isAltered,
        }"
        ><span v-if="question.isAltered">{{
          formatNumber(
            roundCurrency(question.userValueImpact / 1000000.0, 2),
            "currency"
          )
        }}</span
        ><span v-else>0</span></span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Question from "../../Models/Question";
import QuestionRange from "./QuestionRange.vue";
import Localizer, { ReplaceMap } from "../../Localizer";

const props = defineProps<{ question: Question }>();

const localizer = new Localizer();

const ruid = ref(`qura-${Math.floor(Math.random() * 65536)}`);

const uid = computed(() => {
  return `${ruid.value}-${(
    "" +
    props.question.minimum +
    props.question.maximum +
    props.question.step
  )
    .match(/\d/g)
    ?.join("")}`;
});

const formatNumber = (value: number, style: string): string => {
  return localizer.formatNumber(value, style);
};
const roundCurrency = (number: number, precision: number): number => {
  return localizer.roundCurrency(number, precision);
};
const __ = (key: string, replace: ReplaceMap = {}): string => {
  return localizer.__(key, replace);
};
</script>
