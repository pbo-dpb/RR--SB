<template>
  <main class="flex flex-col gap-8 sticky bottom-0 w-full left-0">
    <div
      v-if="balance"
      class="text-white w-full prose max-w-none p-2 text-center rounded mb-2 leading-tight"
      :class="{ 'bg-green-800': balance > 0, 'bg-red-800': balance < 0 }"
      v-html="fullTextTotal"
    ></div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{balance:number, fullTextTotal:string}>();

const balance = computed(() => props.balance);
const fullTextTotal = computed(() => props.fullTextTotal);
</script>
