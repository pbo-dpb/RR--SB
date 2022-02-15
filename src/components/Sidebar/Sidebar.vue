<template>
<aside>
  <ul class="flex flex-col gap-2 border-b mb-2 pb-2 border-gray-100">
    <section-recap v-for="section in $root.payload.sections"
      :key="section.title"
      :section="section"></section-recap>
  </ul>
  
  <sidebar-kv>
  <template v-slot:key>{{ $root.strings.sidebar_total_impact }}</template>
  <template v-slot:value>{{ $root.strings.formatNumber($root.balance/1000000, "currency") }}</template>
  </sidebar-kv>

</aside>
</template>

<script>
import SectionRecap from "./SectionRecap.vue";
import SidebarKv from "./SidebarKv.vue"

export default {
  components: {
    SectionRecap,
    SidebarKv
  },
  computed: {},
};
</script>
