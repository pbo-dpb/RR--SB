<template>
<aside class="flex flex-col-reverse lg:flex-col gap-8">

<sidebar-report></sidebar-report>

<div v-if="$root.balance">

  <div ref="printable">
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

  <button class="hidden lg:block mt-4 text-sm font-semibold border border-blue-800 text-blue-800 rounded px-4 py-1 w-full hover:bg-blue-100" @click="triggerPrint">{{ $root.strings.print }}</button>

</div>

</aside>
</template>

<script>
import SectionRecap from "./SectionRecap.vue";
import SidebarKv from "./SidebarKv.vue";
import SidebarReport from "./SidebarReport.vue";

export default {
  components: {
    SectionRecap,
    SidebarKv,
    SidebarReport,
  },
  computed: {},
  methods: {
    triggerPrint() {
     

      const prHtml = document.createElement("html");
      const prBody = document.createElement("body");
      prHtml.appendChild(prBody);

      const tailwindCdn = document.createElement('script');
      tailwindCdn.setAttribute('src', 'https://cdn.tailwindcss.com');
      prBody.appendChild(tailwindCdn);
      
      const container = document.createElement('div');
      container.setAttribute('class', 'p-8');
      prBody.appendChild(container);

      const header = document.createElement('header');
      container.append(header)

      header.setAttribute('class', 'flex flex-col items-center gap-2 mb-8');
      const logoTag = document.createElement('img');
      logoTag.setAttribute('src', `https://www2.pbo-dpb.ca/cms/svg/logo.full.${this.$root.language}.svg`);
      logoTag.setAttribute('class', 'w-64');
      header.append(logoTag);
      const rrTitle = document.createElement('h1');
      rrTitle.setAttribute('class', 'text-xl font-semibold');
      rrTitle.append(this.$root.strings.title);
      header.append(rrTitle)

      header.insertAdjacentHTML( 'beforeend', "<small class='italic text-gray-800'>" + [this.$root.strings.impact_in_millions, (new Date()).toLocaleString(`${this.$root.language}-CA`)].join(' - ') + "</small>");
      
      container.append(this.$refs.printable.cloneNode(true));

      container.insertAdjacentHTML('beforeend', `<div class='mt-8 text-center font-semibold'>${this.$root.fullTextTotal}</div>`);
      
      const winUrl = URL.createObjectURL(
      new Blob([prHtml.outerHTML], { type: "text/html" }));
      const printWindow = window.open(winUrl, "Print-Window", `width=800,height=400,screenX=200,screenY=200`);
      printWindow.onload = ()=>{
          setTimeout(() => {printWindow.print()}, 500);
          
        };
    }
  }
};
</script>
