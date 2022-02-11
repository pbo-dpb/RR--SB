<template>
  <div class="text-sm text-gray-800 mb-8">
    {{ $root.strings.__("last_updated", { date: localizedLastUpdate }) }}.
  </div>
</template>
<script>
export default {
  computed: {
    localizedLastUpdate() {
      let lastUpdate = new Date(`${this.$root.payload.last_update} 00:00`);
      const options = { year: "numeric", month: "long" };

      return lastUpdate.toLocaleDateString(`${this.$root.language}-CA`, options);
    },
  },
};
</script>
