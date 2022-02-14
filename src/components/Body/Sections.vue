<template>
  <main class="flex flex-col gap-4">
    <SectionView
      v-for="section in $root.payload.sections"
      :key="section.title_en"
      :section="section"
    ></SectionView>
  </main>
</template>

<script>
import SectionView from "./SectionView.vue";

export default {
  components: {
    SectionView,
  },
  computed: {},
};
</script>
