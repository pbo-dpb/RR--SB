<template>
  <div class="flex flex-col lg:grid grid-cols-8 gap-4 items-center bg-gray-50 dark:bg-gray-800 rounded-xs -mx-2 p-2">
    <div class="lg:col-span-4 w-full">
      <label class="font-semibold" :for="uid">{{ question.name }}</label>

      <ul class="font-light flex flex-col">

        <li>
          {{ $root.strings.selected_value }}
          <span v-if="question.isAltered" class="print:text-black text-gray-800 dark:text-gray-200 line-through mr-1">
            {{
              $root.strings.formatNumber(
                question.default_value,
                question.unit_style
              )
            }}</span><span :class="{
              'text-orange-600': question.isAltered,
            }">{{
              $root.strings.formatNumber(
                question.user_value,
                question.unit_style
              )
            }}</span>
        </li>
      </ul>

      <p v-if="question.description"
        class="prose dark:prose-invert prose-sm max-w-none leading-tight text-gray-800 dark:text-gray-200 italic mt-2">
        {{ question.description }}
      </p>
    </div>

    <div class="lg:col-span-3 w-full print:hidden">
      <question-range :uid="uid" :question="question"></question-range>
    </div>

    <div class="text-center" :class="{ hidden: !question.isAltered, 'lg:block': !question.isAltered }">
      <span class="bordered text-white print:text-black font-semibold text-sm px-1 py-.5 rounded-xs" :class="{
        'bg-red-800': question.userValueImpact < 0,
        'bg-green-800': question.userValueImpact > 0,
        'bg-gray-500': !question.isAltered,
      }"><span v-if="question.isAltered">{{
          $root.strings.formatNumber(
            $root.strings.roundCurrency(question.userValueImpact / 1000000.0),
            "currency"
          )
        }}</span><span v-else>0</span></span>
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
