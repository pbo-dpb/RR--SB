<template>
  <div class="text-sm italic text-gray-700 text-center border-b border-gray-100 pb-4">
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
