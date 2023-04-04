<template>
  <figure class="">
    <h3 class="text-lg font-semibold" :class="{ 'mb-4': !section.description, 'mb-2': section.description }">
      {{ section.title }}
    </h3>
    <p v-if="section.description" class="prose dark:prose-invert max-w-none mb-4 leading-tight">
      {{ section.description }}
    </p>

    <div class="flex flex-col gap-8">
      <Question-wrapper v-for="question in section.questions" :key="question.name"
        :question="question"></Question-wrapper>
    </div>
  </figure>
</template>
<script>
import Section from "../../Models/Section";
import QuestionWrapper from "./QuestionWrapper.vue";
export default {
  props: {
    section: {
      type: Section,
      required: true,
    },
  },
  components: { QuestionWrapper },
};
</script>
