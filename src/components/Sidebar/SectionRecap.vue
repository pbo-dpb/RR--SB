<template>
  <li v-if="questions.length">
    <div class="font-semibold">{{ section.title }}</div>
    <ul>
      <SidebarKv v-for="question in questions" :key="question.name">
        <template v-slot:key>
          {{ question.name }}
          <div class="text-gray-800 dark:text-gray-200 italic">
            {{
              localizer.formatNumber(question.user_value, question.unit_style)
            }}
          </div>
        </template>
        <template v-slot:value>
          {{
            localizer.formatNumber(
              localizer.roundCurrency(question.userValueImpact / 1000000.0),
              "currency"
            )
          }}
        </template>
      </SidebarKv>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Section from "../../Models/Section";
import SidebarKv from "./SidebarKv.vue";
import Localizer from "../../Localizer";

const localizer = new Localizer();

const props = defineProps<{ section: Section }>();

const questions = computed(() => {
  return props.section.questions.filter((question) => question.isAltered);
});
</script>
