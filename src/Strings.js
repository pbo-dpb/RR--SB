import rawStrings from "./assets/strings.json?raw";
import introEn from "./assets/intro_en.md?raw";
import introFr from "./assets/intro_fr.md?raw";
import outroEn from "./assets/outro_en.md?raw";
import outroFr from "./assets/outro_fr.md?raw";

export default class Strings {
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
        
    }

    __(key, replace={}) {
        let s = this[key];
        for (const replaceKey in replace) {
            s = s.replaceAll(`:${replaceKey}`, `${replace[replaceKey]}`)
          }
        return s;
    }
}