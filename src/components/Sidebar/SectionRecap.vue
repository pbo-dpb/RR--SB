<template>
  <li v-if="questions.length">
  <div class="font-semibold">{{ section.title }}</div>
  <ul  >
    <sidebar-kv v-for="question in questions">
    <template v-slot:key>
      {{ question.name }}
      <div class="text-gray-800 italic">{{
              $root.strings.formatNumber(question.user_value, question.unit_style)
            }}</div>
      </template>
      <template v-slot:value>
      {{ $root.strings.formatNumber(question.userValueImpact / 1000000.0, "currency") }}
      </template>     
    </sidebar-kv>
  </ul>
  </li>
</template>

<script>
import Section from "../../Models/Section";
import SidebarKv from "./SidebarKv.vue";

export default {
  components: {
    SidebarKv
  },
  props: {
    section: {
      type: Section,
      required: true,
    },
  },
  computed: {
    questions() {
      return this.section.questions.filter(q=>q.isAltered)
    }
  }
};
</script>
