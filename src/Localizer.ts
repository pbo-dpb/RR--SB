import rawStrings from "./assets/strings.json?raw";
import introEn from "./assets/intro_en.md?raw";
import introFr from "./assets/intro_fr.md?raw";
import outroEn from "./assets/outro_en.md?raw";
import outroFr from "./assets/outro_fr.md?raw";

import readmeEn from "../readme.md?raw";
import readmeFr from "../readme.fr.md?raw";

import authorsEn from "../authors.md?raw";
import authorsFr from "../authors.fr.md?raw";

export interface Strings {
  [key: string]: {
    en: string;
    fr: string;
  };
}

export interface ReplaceMap {
  [key: string]: string;
}

export default class Localizer {
  public language: string;
  [key: string]: any;
  public strings:Strings;

  constructor() {
    this.language = Localizer.appLanguage;

    let strings: Strings = JSON.parse(rawStrings);
    this.strings = strings;
    // Assign blurbs to strings. We split them to separate files to make updating them easier.
    strings.intro.en = introEn;
    strings.intro.fr = introFr;
    strings.outro.en = outroEn;
    strings.outro.fr = outroFr;

    for (const [key, value] of Object.entries(strings)) {
        this[key] = this.language === "en" ? value.en : value.fr;
    }

    let readme = this.language === "fr" ? readmeFr : readmeEn;
    this.readme = readme.substring(0, readme.indexOf("---"));
    this.authors = this.language === "fr" ? authorsFr : authorsEn;
    this.string = strings;
  }

  __(key: string, replace: ReplaceMap = {}): string {
    let s = this[key];
    for (const replaceKey in replace) {
      s = s.replace(new RegExp(`:${replaceKey}`, "g"), replace[replaceKey]);
    }
    return s;
  }

  /**
   * Formats a number with a specified number of significant digits.
   *
   * @param {number} number A number
   * @param {number} precision The number of significant digits
   * @return {string} Returns the number with a specified number of significant digits
   * @see https://github.com/pbo-dpb/readyreckoner.ca/blob/e237358123a46ea3583376eb55c0cfc0bbe2bc39/app/assets/javascripts/application.js#L45-L49
   */
  roundCurrency(number: number, precision: number = 2): number {
    const digits = number
      ? Math.floor(Math.log(Math.abs(number)) / Math.log(10) + 1)
      : 1;
    const multiplier = Math.pow(10, digits - precision);
    return Math.round(number / multiplier) * multiplier;
  }

  formatNumber(number: number, style: string = ":value"): string {
    const locale = `${this.language}-CA`;
    switch (style) {
      case "currency":
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency: "CAD",
          maximumFractionDigits: 0,
        }).format(number);
      case "percent":
        return new Intl.NumberFormat(locale, {
          style: "percent",
          maximumFractionDigits: 2,
        }).format(number / 100);
    }

    return style.replace(
      ":value",
      new Intl.NumberFormat(locale).format(number)
    );
  }

  static get appLanguage(): string {
    const url = new URL(window.location.href);
    let language: string | null;
    if (
      url.searchParams &&
      ["fr", "en"].includes(url.searchParams.get("lang") || "")
    ) {
      language = url.searchParams.get("lang");
    } else {
      language = document.documentElement.lang;
    }

    return language || "en";
  }

  selectedValue():string{
    let strings: Strings = JSON.parse(rawStrings);
    return this.language === "en" ? strings.selected_value.en : strings.selected_value.fr;
  }
}
