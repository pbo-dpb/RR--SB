import Localizer from "../Localizer";
import Question from "./Question";

export default class Section {
    constructor(o) {
        const language = Localizer.appLanguage;
        this.title = o[`title_${language}`];
        this.description = o[`description_${language}`];
        this.questions = o.questions.map(q=>new Question(q))
    }

}