<template>
  <figure>
    <h3 class="text-lg font-semibold" :class="{ 'mb-4': !section.description, 'mb-2': section.description }">
      {{ section.title }}
    </h3>
    <p v-if="section.description" class="prose dark:prose-invert max-w-none mb-4 leading-tight">
      {{ section.description }}
    </p>

    <div class="flex flex-col gap-8">
      <QuestionWrapper 
        v-for="question in section.questions" 
        :key="question.name"
        :question="question"
      />
    </div>
  </figure>
</template>

<script setup lang="ts">
import Section from '../../Models/Section';
import QuestionWrapper from './QuestionWrapper.vue';

defineProps<{ section: Section }>();

// Registering the QuestionWrapper component
// Note: No need for an explicit components option with `script setup`.
</script>
