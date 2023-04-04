<template>
    <div class="flex flex-col gap-8">
        <button @click="$root.renderUserGuide=false"
            class="flex flex-row justify-start gap-2 items-center border border-blue-300 rounded font-semibold text-sm text-blue-800 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {{ $root.strings.user_guide_close_button }}
        </button>

        <h1 class="text-3xl font-thin">
            {{ $root.strings.user_guide_title }}
        </h1>

        <figure v-html="userguide" class="prose dark:prose-invert max-w-none"></figure>

        <figure v-html="authors" class="bg-gray-100 rounded p-4 prose max-w-none"></figure>


    </div>
</template>
<script>
import { Remarkable } from 'remarkable';
export default {
  computed: {
      parser() {
          return new Remarkable();
      },
      userguide() {
          return this.parser.render(this.$root.strings.readme);
      },
      authors() {
          return this.parser.render(this.$root.strings.authors);
      }

  }
};
</script>
