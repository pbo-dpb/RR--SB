import rawStrings from "./assets/strings.json?raw";
import introEn from "./assets/intro_en.md?raw";
import introFr from "./assets/intro_fr.md?raw";
import outroEn from "./assets/outro_en.md?raw";
import outroFr from "./assets/outro_fr.md?raw";
import readmeEn from "../readme.md?raw";
import readmeFr from "../readme.fr.md?raw";
import authorsEn from "../authors.md?raw";
import authorsFr from "../authors.fr.md?raw";

/**
 * Interface for bilingual string pairs
 */
export interface Strings {
  [key: string]: {
    en: string;
    fr: string;
  };
}

/**
 * Interface for string replacement mappings
 */
export interface ReplaceMap {
  [key: string]: string;
}

/**
 * Handles localization for a bilingual (English/French) web application
 * Manages string resources, number formatting, and currency display
 */
export default class Localizer {
  public language: string;
  [key: string]: any;
  public strings: Strings;

  constructor() {
    this.language = Localizer.appLanguage;

    // Parse and initialize strings from JSON
    let strings: Strings = JSON.parse(rawStrings);
    this.strings = strings;

    // Add content blurbs from separate files
    strings.intro.en = introEn;
    strings.intro.fr = introFr;
    strings.outro.en = outroEn;
    strings.outro.fr = outroFr;

    // Assign localized strings based on current language
    for (const [key, value] of Object.entries(strings)) {
      this[key] = this.language === "en" ? value.en : value.fr;
    }

    // Handle README and authors content
    let readme = this.language === "fr" ? readmeFr : readmeEn;
    this.readme = readme.substring(0, readme.indexOf("---"));
    this.authors = this.language === "fr" ? authorsFr : authorsEn;
    this.string = strings;
  }

  /**
   * Retrieves a localized string and replaces placeholders with provided values
   * @param key - The string identifier
   * @param replace - Object containing replacement key-value pairs
   * @returns Localized string with replacements applied
   */
  __(key: string, replace: ReplaceMap = {}): string {
    let s = this[key];
    for (const replaceKey in replace) {
      s = s.replace(new RegExp(`:${replaceKey}`, "g"), replace[replaceKey]);
    }
    return s;
  }

  /**
   * Rounds a number to a specified number of significant digits
   * @param number - Number to round
   * @param precision - Number of significant digits (default: 2)
   * @returns Rounded number
   */
  roundCurrency(number: number, precision: number = 2): number {
    const digits = number
      ? Math.floor(Math.log(Math.abs(number)) / Math.log(10) + 1)
      : 1;
    const multiplier = Math.pow(10, digits - precision);
    return Math.round(number / multiplier) * multiplier;
  }

  /**
   * Formats a number according to Canadian locale standards
   * @param number - Number to format
   * @param style - Formatting style ('currency', 'percent', or custom pattern with :value)
   * @returns Formatted string
   */
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

  /**
   * Gets the application's current language from URL parameters or HTML lang attribute
   * @returns 'en' or 'fr'
   */
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

  /**
   * Gets the localized "selected value" string
   * @returns Localized selected value string
   */
  selectedValue(): string {
    let strings: Strings = JSON.parse(rawStrings);
    return this.language === "en"
      ? strings.selected_value.en
      : strings.selected_value.fr;
  }
}
