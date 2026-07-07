<template>
    <section
        class="-mx-8 mb-16 flex flex-row items-center justify-between border-y border-gray-300 bg-gray-100 px-8 py-4 dark:bg-gray-950">
        <div
            class="flex flex-col gap-2 font-mono text-gray-800 dark:text-white">
            <div>🔧 DEBUG</div>
        </div>
        <Button :href="language == 'en' ? './index.fr.html' : './index.html'">{{
            language == "en" ? "fr" : "en"
        }}</Button>
    </section>
</template>

<script>
    import Button from "./Button.vue";

    export default {
        computed: {
            language() {
                return this.$root.language;
            },
        },

        components: {
            Button,
        },
    };
</script>
