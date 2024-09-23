import { defineCustomElement } from "vue";
import App from "./App.ce.vue";

const PbotoolRrsb = defineCustomElement(App);
customElements.define("pbotool-rrsb", PbotoolRrsb);
