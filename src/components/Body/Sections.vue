<template>
  <main class="flex flex-col gap-8">
    <SectionView
      v-for="section in $root.payload.sections"
      :key="section.title"
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
