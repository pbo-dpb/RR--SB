<template>
  <main class="flex flex-col gap-8">
    <SectionView
      v-for="section in sections"
      :key="section.title"
      :section="section"
    />
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SectionView from "./SectionView.vue";
import Section from "../../Models/Section";

const props = defineProps<{ sections: Section[] }>();

const sections = computed(() => props.sections);
</script>
