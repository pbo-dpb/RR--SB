<template>
<aside class="flex flex-col-reverse lg:flex-col gap-8">

<sidebar-report></sidebar-report>

<div v-if="$root.balance">
  <ul class="flex flex-col gap-2 border-b border-gray-100 mb-2 pb-2">
    <section-recap v-for="section in $root.payload.sections"
      :key="section.title"
      :section="section"></section-recap>
  </ul>
  
  <sidebar-kv>
  <template v-slot:key>{{ $root.strings.sidebar_total_impact }}</template>
  <template v-slot:value>{{ $root.strings.formatNumber($root.balance/1000000, "currency") }}</template>
  </sidebar-kv>

</div>

</aside>
</template>

<script>
import SectionRecap from "./SectionRecap.vue";
import SidebarKv from "./SidebarKv.vue"
import SidebarReport from "./SidebarReport.vue"

export default {
  components: {
    SectionRecap,
    SidebarKv,
    SidebarReport,
  },
  computed: {},
};
</script>
