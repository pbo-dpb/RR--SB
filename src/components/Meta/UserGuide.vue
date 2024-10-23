<template>
  <div class="flex flex-col gap-8">
    <button
      @click="updateRenderUserGuide(false)"
      class="flex flex-row justify-start gap-2 items-center border border-blue-300 rounded font-semibold text-sm text-blue-800 dark:bg-blue-200 p-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {{ localizer.user_guide_close_button }}
    </button>

    <h1 class="text-3xl font-thin">
      {{ localizer.user_guide_title }}
    </h1>

    <aside
      v-html="userguide"
      class="prose dark:prose-invert max-w-none prose-h3:font-thin prose-a:text-sky-800 prose-a:dark:text-sky-300"
    ></aside>

    <aside
      v-html="authors"
      class="dark:prose-invert bg-gray-100 dark:bg-slate-900 rounded p-4 prose max-w-none prose-h3:font-thin prose-a:text-sky-800 prose-a:dark:text-sky-300"
    ></aside>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Remarkable } from "remarkable";
import Localizer from "../../Localizer";

const props = defineProps<{
  renderUserGuide: boolean;
  strings: { [key: string]: any };
}>();

const emit = defineEmits(['update:renderUserGuide']);

const renderUserGuide = ref(props.renderUserGuide);

const updateRenderUserGuide = (newVal: boolean) => {
  renderUserGuide.value = newVal;
  emit('update:renderUserGuide', newVal);
};

const localizer = new Localizer();
const parser = new Remarkable();

const userguide = computed(() => {
  return parser.render(localizer.readme);
});

const authors = computed(() => {
  return parser.render(localizer.authors);
});
</script>