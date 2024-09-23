<template>
  <ul
    class="pb-4 text-sm italic flex flex-col md:flex-row justify-center border-b border-gray-100"
  >
    <li class="text-gray-700 dark:text-gray-300 text-center">
      {{ lastUpdatedString }}
    </li>
    <li
      class="hidden md:block text-gray-500 mx-2"
      aria-hidden="true"
      role="separator"
    >
      •
    </li>
    <li class="text-gray-700 dark:text-gray-300 text-center">
      {{ localizer.language === "en" ? impactInMillions.en:impactInMillions.fr }}
    </li>
  </ul>

  <div class="md:hidden">
    <SidebarGuide :render-user-guide="renderUserGuide" :strings="strings"</SidebarGuide>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SidebarGuide from "../Sidebar/SidebarGuide.vue";
import Localizer, { Strings } from "../../Localizer";

const props = defineProps<{ last_update: string, renderUserGuide:boolean, strings:Strings }>();
const localizer = new Localizer();
const strings = props.strings;

const localizedLastUpdate = computed(() => {
  const lastUpdate = new Date(`${props.last_update} 00:00`);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  return lastUpdate.toLocaleDateString(`${localizer.language}-CA`, options);
});

const lastUpdatedString = computed(() => {
  return localizer.__("last_updated", { date: localizedLastUpdate.value });
});

const impactInMillions = computed(() => {
  return strings.impact_in_millions;
});
</script>
