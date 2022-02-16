<template>
  <main class="flex flex-col gap-8 sticky bottom-0 w-full left-0">
    <div
      v-if="$root.balance"
      class="text-white w-full prose max-w-none p-2 text-center rounded mb-2 leading-tight"
      :class="{ 'bg-green-800': $root.balance > 0, 'bg-red-800': $root.balance < 0 }"
      v-html="$root.fullTextTotal"
    ></div>
  </main>
</template>

<script>

export default {
  computed: {
    
  },
};
</script>
