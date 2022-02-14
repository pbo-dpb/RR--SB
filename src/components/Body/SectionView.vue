<template>
  <figure class="">
    <h3 class="text-lg font-semibold mb-2">{{ section.title }}</h3>
    <p v-if="section.description" class="prose max-w-none mb-2">
      {{ section.description }}
    </p>
  </figure>
</template>
<script>
import Section from "../../Models/Section";
export default {
  props: {
    section: {
      type: Section,
      required: true,
    },
  },
};
</script>
