<template>
  <div class="w-full flex flex-col">
    <input
      type="range"
      list="tickmarks"
      min="0"
      max="100"
      step="10"
      class="w-full"
      :id="uid"
      v-model="modelValue"
    />
    <datalist id="tickmarks">
      <option value="0"></option>
      <option value="10"></option>
      <option value="20"></option>
      <option value="30"></option>
      <option value="40"></option>
      <option value="50"></option>
      <option value="60"></option>
      <option value="70"></option>
      <option value="80"></option>
      <option value="90"></option>
      <option value="100"></option>
    </datalist>
    <div class="flex flex-row justify-between text-sm text-gray-600" aria-hidden="true">
      <span>0</span>
      <span>100</span>
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
  data() {
    return {
      modelValue: 50,
    };
  },
};
</script>
