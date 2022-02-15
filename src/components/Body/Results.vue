<template>
  <main class="flex flex-col gap-8 sticky bottom-0 w-full left-0">
    <div
      v-if="$root.balance"
      class="text-white w-full prose max-w-none p-2 text-center rounded mb-2 leading-tight"
      :class="{ 'bg-green-800': $root.balance > 0, 'bg-red-800': $root.balance < 0 }"
      v-html="fullTextTotal"
    ></div>
  </main>
</template>

<script>
import { Remarkable } from "remarkable";

export default {
  computed: {
    absoluteBalance() {
      return Math.abs(this.$root.balance) / 1000000;
    },
    
    fullTextTotal() {
      const md = new Remarkable();
      return md.render(
        this.$root.strings.__(this.$root.balance > 0 ? "total_increase" : "total_decrease", {
          absbalance: this.$root.strings.formatNumber(this.absoluteBalance, "currency"),
          percent: this.$root.strings.formatNumber(
            Math.abs(this.$root.percentageOfTotalRevenue),
            "percent"
          ),
        })
      );
    },
  },
};
</script>
