import rawStrings from "./assets/strings.json?raw";
import introEn from "./assets/intro_en.md?raw";
import introFr from "./assets/intro_fr.md?raw";
import outroEn from "./assets/outro_en.md?raw";
import outroFr from "./assets/outro_fr.md?raw";

export default class Localizer {
    constructor(language) {
        let strings = JSON.parse(rawStrings);

        // Assign blurbs to strings. We split them to separate files to make updating them easier.
        strings.intro.en = introEn;
        strings.intro.fr = introFr;
        strings.outro.en = outroEn;
        strings.outro.fr = outroFr;
        
        for (const [key, value] of Object.entries(strings)) {
            this[key] = value[language]
        }
        this.language = language;
    }

    __(key, replace={}) {
        let s = this[key];
        for (const replaceKey in replace) {
            s = s.replaceAll(`:${replaceKey}`, `${replace[replaceKey]}`)
          }
        return s;
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
}