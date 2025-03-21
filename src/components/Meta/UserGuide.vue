<template>
    <div class="flex flex-col gap-8">
        <button @click="$root.renderUserGuide = false"
            class="flex flex-row justify-start gap-2 items-center border border-blue-300 rounded-sm font-semibold text-sm text-blue-800 dark:bg-blue-200 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {{ $root.strings.user_guide_close_button }}
        </button>

        <h1 class="text-3xl font-thin">
            {{ $root.strings.user_guide_title }}
        </h1>

        <aside v-html="userguide"
            class="prose dark:prose-invert max-w-none prose-h3:font-thin prose-a:text-sky-800 dark:prose-a:text-sky-300">
        </aside>

        <aside v-html="authors"
            class="dark:prose-invert bg-gray-100 dark:bg-slate-900 rounded-sm p-4 prose max-w-none prose-h3:font-thin prose-a:text-sky-800 dark:prose-a:text-sky-300">
        </aside>


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
