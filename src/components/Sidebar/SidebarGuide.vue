<template>

<button @click="$root.renderUserGuide=true" class="w-full bg-gradient-to-br from-blue-200 to-blue-400 h-48 flex flex-col items-center text-white gap-4 justify-center rounded-xl">

<sidebar-guide-icon></sidebar-guide-icon>

<span class="text-lg font-semibold">{{ $root.strings.user_guide_cta_title }}</span>

<div @click="$root.renderUserGuide=true" class="rounded bg-white hover:bg-gray-100 border border-blue-600 text-blue-600 hover:border-blue-800 hover:text-blue-800 p-2 text-sm font-semibold shadow active:bg-blue-300 " :active="$root.renderUserGuide" :aria-pressed="$root.renderUserGuide">{{ $root.strings.user_guide_cta_button }}</div>
</button>

</template>
<script>
import SidebarGuideIcon from "./SidebarGuideIcon.vue";

export default {
  components: {
    SidebarGuideIcon
  },

};
</script>