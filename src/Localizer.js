import rawStrings from "./assets/strings.json?raw";
import introEn from "./assets/intro_en.md?raw";
import introFr from "./assets/intro_fr.md?raw";
import outroEn from "./assets/outro_en.md?raw";
import outroFr from "./assets/outro_fr.md?raw";

import readmeEn from "../readme.md?raw";
import readmeFr from "../readme.fr.md?raw";

import authorsEn from "../authors.md?raw";
import authorsFr from "../authors.fr.md?raw";

export default class Localizer {
    constructor() {
        this.language = this.constructor.appLanguage;

        let strings = JSON.parse(rawStrings);

        // Assign blurbs to strings. We split them to separate files to make updating them easier.
        strings.intro.en = introEn;
        strings.intro.fr = introFr;
        strings.outro.en = outroEn;
        strings.outro.fr = outroFr;
        
        for (const [key, value] of Object.entries(strings)) {
            this[key] = value[this.language]
        }

        this.readme = this.language === 'fr' ? readmeFr : readmeEn;
        this.authors = this.language === 'fr' ? authorsFr : authorsEn;
    }

    __(key, replace={}) {
        let s = this[key];
        for (const replaceKey in replace) {
            s = s.replaceAll(`:${replaceKey}`, `${replace[replaceKey]}`)
          }
        return s;
    }

    /**
     * Formats a number with a specified number of significant digits.
     *
     * @param {Float} number A number
     * @param {Float} precision The number of significant digits
     * @return {String} Returns the number with a specified number of significant digits
     * @see https://github.com/pbo-dpb/readyreckoner.ca/blob/e237358123a46ea3583376eb55c0cfc0bbe2bc39/app/assets/javascripts/application.js#L45-L49
     */
    roundCurrency(number, precision=2) {
        var digits = number ? Math.floor(Math.log(Math.abs(number)) / Math.log(10) + 1) : 1
          , multiplier = Math.pow(10, digits - precision);
        return Math.round(number / multiplier) * multiplier;
      }

    formatNumber(number, style=":value") {
        const locale = `${this.language}-CA`;
        switch (style) {
            case 'currency':
                return new Intl.NumberFormat(locale, { style: 'currency',"currency": "CAD", maximumFractionDigits:0}).format(number);
            case 'percent':
                return new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits:2}).format(number/100);
        }
        
        return style.replaceAll(':value', (new Intl.NumberFormat(locale).format(number))); 
    }

    static get appLanguage() {
        const url = new URL(window.location.href);
let language;
if(url.searchParams && ['fr', 'en'].includes(url.searchParams.get('lang')))
  language = url.searchParams.get('lang');
else
  language = document.documentElement.lang;

  return language;
    }
}