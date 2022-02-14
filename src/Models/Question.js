export default class Question {
    constructor(o) {
        const language = document.documentElement.lang;
        this.name = o[`name_${language}`];
        this.description = o[`description_${language}`];
        this.unit_name = o[`unit_name_${language}`];

        for (const [key, value] of Object.entries(o)) {
            this[key] = value
        }

        this.user_value = o.default_value.valueOf();
    }

    get isAltered() {
        if (this.user_value == this.default_value) return 0;
        return this.user_value > this.default_value ? 1 : -1;
    }
}