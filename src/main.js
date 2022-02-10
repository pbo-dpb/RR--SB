import { defineCustomElement } from 'vue'

import PbotoolReadyReckoner from "./components/PbotoolReadyReckoner.ce.vue"
customElements.define('pbotool-rrsb', defineCustomElement(PbotoolReadyReckoner))