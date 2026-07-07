<template>
    <button
        @click="$root.renderUserGuide = true"
        class="flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-linear-to-br from-blue-200 to-blue-500 p-4 text-white">
        <sidebar-guide-icon></sidebar-guide-icon>

        <span class="text-lg font-semibold">{{
            $root.strings.user_guide_cta_title
        }}</span>

        <div
            @click="$root.renderUserGuide = true"
            class="rounded-sm border border-blue-600 bg-white p-2 text-sm font-semibold text-blue-600 shadow-sm hover:border-blue-800 hover:bg-gray-100 hover:text-blue-800 active:bg-blue-300"
            :active="$root.renderUserGuide"
            :aria-pressed="$root.renderUserGuide">
            {{ $root.strings.user_guide_cta_button }}
        </div>
    </button>
</template>
<script>
    import SidebarGuideIcon from "./SidebarGuideIcon.vue";

    export default {
        components: {
            SidebarGuideIcon,
        },
    };
</script>
