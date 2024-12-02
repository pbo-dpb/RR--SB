<template>
    <section
        class="-mx-8 border-y border-gray-300 px-8 py-4 mb-16 bg-gray-100 dark:bg-gray-950 flex flex-row justify-between items-center">
        <div class="font-mono text-gray-800 dark:text-white flex flex-col gap-2">
            <div>🔧 DEBUG</div>
        </div>
        <Button :href="language ==
            'en'
            ? './index.fr.html' : './index.html'">{{
                language ==
                    'en'
                    ? 'fr' : 'en' }}</Button>
    </section>
</template>

<script>
import Button from './Button.vue'

export default {
    computed: {
        language() {
            return this.$root.language;
        }
    },

    components: {
        Button,
    },

};
</script>
