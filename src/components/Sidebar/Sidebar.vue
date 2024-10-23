<template>
  <aside class="flex flex-col-reverse lg:flex-col gap-8">
    <div class="md:block">
      <SidebarGuide :render-user-guide="renderUserGuide" @update:renderUserGuide="updateRenderUserGuide" :strings="strings" />
    </div>
    <div v-if="balance">
      <div ref="printable">
        <ul class="flex flex-col gap-2 border-b border-gray-100 mb-2 pb-2">
          <SectionRecap
            v-for="section in sections"
            :key="section.title"
            :section="section"
          />
        </ul>
        <SidebarKv>
          <template v-slot:key>{{
            localizer.language === "en"
              ? strings.sidebar_total_impact.en
              : strings.sidebar_total_impact.fr
          }}</template>
          <template v-slot:value>
            {{
              localizer.formatNumber(
                localizer.roundCurrency(balance / 1000000),
                "currency"
              )
            }}
          </template>
        </SidebarKv>
      </div>

      <button
        class="hidden lg:block mt-4 text-sm font-semibold border border-blue-800 text-blue-800 dark:text-blue-200 dark:border-blue-200 rounded px-4 py-1 w-full hover:bg-blue-100 dark:hover:bg-blue-800"
        @click="triggerPrint"
      >
        {{ localizer.language === "en" ? strings.print.en : strings.print.fr }}
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import SectionRecap from "./SectionRecap.vue";
import SidebarKv from "./SidebarKv.vue";
import SidebarGuide from "./SidebarGuide.vue";
import Section from "../../Models/Section";
import Localizer, { Strings } from "../../Localizer";

const props = defineProps<{
  balance: number;
  sections: Section[];
  strings: Strings;
  renderUserGuide: boolean;
  fullTextTotal: string;
}>();

const balance = computed(() => props.balance);
const sections = computed(() => props.sections);

const emit = defineEmits(['update:renderUserGuide']);

const renderUserGuide = ref(props.renderUserGuide);

const updateRenderUserGuide = (newVal: boolean) => {
  renderUserGuide.value = newVal;
  emit('update:renderUserGuide', newVal);
};

const localizer = new Localizer();
const strings = props.strings;
const fullTextTotal = computed(() => props.fullTextTotal);

const printable = ref<HTMLDivElement | null>(null);

const triggerPrint = () => {
  if (!printable.value) return;

  const prHtml = document.createElement("html");
  prHtml.insertAdjacentHTML(
    "afterbegin",
    '<head><meta charset="UTF-8" /></head>'
  );
  const prBody = document.createElement("body");
  prHtml.appendChild(prBody);

  const tailwindCdn = document.createElement("script");
  tailwindCdn.setAttribute("src", "https://cdn.tailwindcss.com");
  prBody.appendChild(tailwindCdn);

  const container = document.createElement("div");
  container.setAttribute("class", "p-8");
  prBody.appendChild(container);

  const header = document.createElement("header");
  container.append(header);

  header.setAttribute("class", "flex flex-col items-center gap-2 mb-8");
  const logoTag = document.createElement("img");
  logoTag.setAttribute(
    "src",
    `https://www.pbo-dpb.ca/cms/svg/logo.full.${localizer.language}.svg`
  );
  logoTag.setAttribute("class", "w-64");
  header.append(logoTag);

  const rrTitle = document.createElement("h1");
  rrTitle.setAttribute("class", "text-xl font-semibold");
  rrTitle.append(
    localizer.language === "en" ? strings.title.en : strings.title.fr
  );
  header.append(rrTitle);

  header.insertAdjacentHTML(
    "beforeend",
    "<small class='italic text-gray-800'>" +
      [
        localizer.language === "en"
          ? strings.impact_in_millions.en
          : strings.impact_in_millions.fr,
        new Date().toLocaleString(`${localizer.language}-CA`),
      ].join(" - ") +
      "</small>"
  );

  container.append(printable.value.cloneNode(true));

  container.insertAdjacentHTML(
    "beforeend",
    `<div class='mt-8 text-center font-semibold'>${fullTextTotal.value}</div>`
  );

  const winUrl = URL.createObjectURL(
    new Blob([`<!DOCTYPE html>`, prHtml.outerHTML], { type: "text/html" })
  );
  const printWindow = window.open(
    winUrl,
    "Print-Window",
    `width=800,height=400,screenX=200,screenY=200`
  );
  printWindow
    ? (printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 500);
      })
    : console.error("Print Window is null");
};
</script>
