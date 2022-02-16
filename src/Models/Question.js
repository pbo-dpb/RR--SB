import Localizer from "../Localizer";

export default class Question {
    constructor(o) {
        const language = Localizer.appLanguage;
        this.name = o[`name_${language}`];
        this.description = o[`description_${language}`];
        this.unit_name = o[`unit_name_${language}`];

        for (const [key, value] of Object.entries(o)) {
            this[key] = value
        }

        this.user_value = o.default_value.valueOf();
    }

    get impactPerUnit() {
        return (Math.abs(this.unit_value_down) + Math.abs(this.unit_value_up)) / 2 * this.step;
    }

    get isAltered() {
        if (this.user_value == this.default_value) return 0;
        return this.user_value > this.default_value ? 1 : -1;
    }

    get userValueUnitDiffs() {
        if (!this.isAltered) return 0;
        return Math.abs(this.user_value-this.default_value) / this.step * this.isAltered;
    }

    get userValueImpact() {
        if (this.isAltered > 0) {
            return this.userValueUnitDiffs * (this.unit_value_up * this.step);
        }
        return this.userValueUnitDiffs * (this.unit_value_down * this.step);
        
    }
}