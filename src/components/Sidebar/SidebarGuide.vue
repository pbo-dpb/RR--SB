<template>
  <button
    @click="renderUserGuide = true"
    class="w-full bg-gradient-to-br from-blue-200 to-blue-500 p-4 flex flex-col items-center text-white gap-4 justify-center rounded-xl"
  >
    <SidebarGuideIcon></SidebarGuideIcon>

    <span class="text-lg font-semibold">{{
      localizer.language === "en"
        ? strings.user_guide_cta_title.en
        : strings.user_guide_cta_title.fr
    }}</span>

    <div
      @click="renderUserGuide = true"
      class="rounded bg-white hover:bg-gray-100 border border-blue-600 text-blue-600 hover:border-blue-800 hover:text-blue-800 p-2 text-sm font-semibold shadow active:bg-blue-300"
      :aria-pressed="renderUserGuide"
    >
      {{
        localizer.language === "en"
          ? strings.user_guide_cta_button.en
          : strings.user_guide_cta_button.fr
      }}
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SidebarGuideIcon from "./SidebarGuideIcon.vue";
import Localizer, { Strings } from "../../Localizer";

const props = defineProps<{ renderUserGuide: boolean; strings: Strings }>();

const renderUserGuide = ref(props.renderUserGuide);

const localizer = new Localizer();

const strings = props.strings;

renderUserGuide.value = true;
</script>
