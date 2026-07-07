<template>
    <main class="sticky bottom-0 left-0 flex w-full flex-col gap-8">
        <div
            v-if="$root.balance"
            class="prose mb-2 w-full max-w-none rounded-sm p-2 text-center leading-tight text-white"
            :class="{
                'bg-green-800': $root.balance > 0,
                'bg-red-800': $root.balance < 0,
            }"
            v-html="$root.fullTextTotal"></div>
    </main>
</template>

<script>
    export default {
        computed: {},
    };
</script>
