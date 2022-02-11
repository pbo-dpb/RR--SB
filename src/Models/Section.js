import Question from "./Question";

export default class Section {
    constructor(o) {
        const language = document.documentElement.lang;
        this.title = o[`title_${language}`];
        this.description = o[`description_${language}`];
        this.questions = o.questions.map(q=>new Question(o))
    }
}