<template>
    <ul
        class="flex flex-col justify-center border-b border-gray-100 pb-4 text-sm italic md:flex-row">
        <li class="text-center text-gray-700 dark:text-gray-300">
            {{
                $root.strings.__("last_updated", { date: localizedLastUpdate })
            }}
        </li>
        <li
            class="mx-2 hidden text-gray-500 md:block"
            aria-hidden="true"
            role="separator">
            •
        </li>

        <li class="text-center text-gray-700 dark:text-gray-300">
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
            SidebarGuide,
        },
        computed: {
            localizedLastUpdate() {
                let lastUpdate = new Date(
                    `${this.$root.payload.last_update} 00:00`,
                );
                const options = { year: "numeric", month: "long" };

                return lastUpdate.toLocaleDateString(
                    `${this.$root.language}-CA`,
                    options,
                );
            },
        },
    };
</script>
