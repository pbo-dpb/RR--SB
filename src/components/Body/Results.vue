<template>
  <main class="flex flex-col gap-8">
    <div
      v-if="balance"
      class="text-white w-full prose max-w-none p-4 text-center rounded"
      :class="{ 'bg-green-800': balance > 0, 'bg-red-800': balance < 0 }"
      v-html="fullTextTotal"
    ></div>
  </main>
</template>

<script>
import { Remarkable } from "remarkable";

export default {
  computed: {
    absoluteBalance() {
      return Math.abs(this.balance) / 1000000;
    },
    balance() {
      return this.$root.payload.sections.reduce((scarry, section) => {
        return (
          scarry +
          section.questions.reduce((qcarry, question) => {
            return qcarry + question.userValueImpact;
          }, 0)
        );
      }, 0);
    },
    percentageOfTotalRevenue() {
      return (this.balance * 100) / this.$root.payload.total_revenue;
    },
    fullTextTotal() {
      const md = new Remarkable();
      return md.render(
        this.$root.strings.__(this.balance > 0 ? "total_increase" : "total_decrease", {
          absbalance: this.$root.strings.formatNumber(this.absoluteBalance, "currency"),
          percent: this.$root.strings.formatNumber(
            Math.abs(this.percentageOfTotalRevenue),
            "percent"
          ),
        })
      );
    },
  },
};
</script>
