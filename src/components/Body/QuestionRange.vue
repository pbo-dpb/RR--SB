<style scoped></style>
<template>
  <div class="w-full flex flex-col">
    <input type="range" :list="`tickmarks-${uid}`" :min="question.minimum" :max="question.maximum" :step="question.step"
      class="w-full" :id="uid" v-model="question.user_value" />
    <datalist :id="`tickmarks-${uid}`">
      <option v-for="tick in tickmarks" :value="tick" :key="question.name + tick"></option>
    </datalist>
    <div class="flex flex-row justify-between text-sm text-gray-600 text-gray-400" aria-hidden="true">
      <span>{{ $root.strings.formatNumber(question.minimum, question.unit_style) }}</span>
      <span>{{ $root.strings.formatNumber(question.default_value, question.unit_style) }}</span>
      <span>{{ $root.strings.formatNumber(question.maximum, question.unit_style) }}</span>
    </div>
  </div>
</template>

<script>
import Question from "../../Models/Question";

export default {
  props: {
    /**
     * The unique ID associated with this question. Will be used for the <input>'s id.
     */
    uid: {
      type: String,
      required: true,
    },

    question: {
      type: Question,
      required: true,
    },
  },
  computed: {
    tickmarks() {
      let ticks = [];

      // Get default and under
      for (
        let i = this.question.minimum;
        i <= this.question.maximum;
        i = i + this.question.step
      ) {
        ticks.push(i);
      }
      return ticks;
    },
  },
};
</script>
