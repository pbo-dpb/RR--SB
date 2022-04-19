<template>
  <ul
    class="pb-4 text-sm italic flex flex-col md:flex-row justify-center border-b border-gray-100"
  >
    <li class="text-gray-700 text-center">
      {{ $root.strings.__("last_updated", { date: localizedLastUpdate }) }}
    </li>
    <li class="hidden md:block text-gray-500 mx-2" aria-hidden="true" role="separator">
      •
    </li>

    <li class="text-gray-700 text-center">
      {{ $root.strings.impact_in_millions }}
    </li>
  </ul>

  <div class="md:hidden">
<sidebar-guide></sidebar-guide>
</div>
</template>
<script>
import SidebarGuide from "../Sidebar/SidebarGuide.vue";
export default {
  components: {
    SidebarGuide
  },
  computed: {
    localizedLastUpdate() {
      let lastUpdate = new Date(`${this.$root.payload.last_update} 00:00`);
      const options = { year: "numeric", month: "long" };

      return lastUpdate.toLocaleDateString(`${this.$root.language}-CA`, options);
    },
  },
};
</script>
