<template>
  <div
    class="flex flex-col lg:grid grid-cols-6 gap-4 items-center bg-gray-50 rounded-sm -mx-2 p-2"
  >
    <div class="lg:col-span-2 w-full">
      <label class="text-sm font-semibold" :for="uid">{{ question.name }}</label>
      <p
        v-if="question.description"
        class="prose prose-sm max-w-none leading-tight text-gray-800"
      >
        {{ question.description }}
      </p>
    </div>
    <div class="text-center">
      <span
        class="bordered text-white print:text-black font-semibold text-sm px-1 py-.5 rounded-sm"
        :class="{
          'bg-teal-600': question.isAltered,
          'bg-gray-500': !question.isAltered,
        }"
        >{{ $root.strings.formatNumber(question.user_value, question.unit_style) }}</span
      >
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
      uid: `question-range-${Math.floor(Math.random() * 65536)}`,
    };
  },
};
</script>
