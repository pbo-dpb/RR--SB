<template>
  <div
    class="flex flex-col lg:grid grid-cols-6 gap-4 items-center bg-gray-50 rounded-sm -mx-2 p-2"
  >
    <div class="lg:col-span-3 w-full">
      <label class="font-semibold" :for="uid">{{ question.name }}</label>

      <ul class="text-sm font-light flex flex-col md:flex-row">
        <li>
          {{
            $root.strings.__("impact_per_unit", {
              unit: $root.strings.formatNumber(question.step, question.unit_style),
              impact: $root.strings.formatNumber(question.impactPerUnit, "currency"),
            })
          }}
        </li>

        <li
          class="hidden md:block text-gray-500 mx-2"
          aria-hidden="true"
          role="separator"
        >
          •
        </li>

        <li>
          {{ $root.strings.selected_value }}
          <span
            v-if="question.isAltered"
            class="print:text-black text-gray-800 line-through mr-1"
          >
            {{
              $root.strings.formatNumber(question.default_value, question.unit_style)
            }}</span
          ><span
            :class="{
              'text-red-600': question.isAltered,
            }"
            >{{
              $root.strings.formatNumber(question.user_value, question.unit_style)
            }}</span
          >
        </li>
      </ul>

      <p
        v-if="question.description"
        class="prose prose-sm max-w-none leading-tight text-gray-800 italic mt-2"
      >
        {{ question.description }}
      </p>
    </div>

    <div class="lg:col-span-2 w-full print:hidden">
      <question-range :uid="uid" :question="question"></question-range>
    </div>

    <div class="text-center">
      <span
        class="bordered text-white print:text-black font-semibold text-sm px-1 py-.5 rounded-sm"
        :class="{
          'bg-red-800': question.isAltered < 0,
          'bg-green-800': question.isAltered > 0,
          'bg-gray-500': !question.isAltered,
        }"
        >{{ question.user_value }}</span
      >
    </div>
  </div>
</template>

<script>
import Question from "../../Models/Question";
import QuestionRange from "./QuestionRange.vue";
export default {
  components: {
    QuestionRange,
  },
  props: {
    question: {
      type: Question,
      required: true,
    },
  },
  data() {
    return {
      ruid: `qura-${Math.floor(Math.random() * 65536)}`,
    };
  },
  computed: {
    uid() {
      return `${this.ruid}-${(
        "" +
        this.question.minimum +
        this.question.maximum +
        this.question.step
      )
        .match(/\d/g)
        .join("")}`;
    },
  },
};
</script>
