import Localizer from "../Localizer";
import Question from "./Question";

interface SectionOptions {
  [key: string]: any;
  title_en?: string;
  title_fr?: string;
  description_en?: string;
  description_fr?: string;
  questions: any[];
}

export default class Section {
  public title: string;
  public description: string;
  public questions: Question[];

  constructor(o: SectionOptions) {
    const language = Localizer.appLanguage;
    this.title = o[`title_${language}`] || "";
    this.description = o[`description_${language}`] || "";
    this.questions = o.questions.map((q) => new Question(q));
  }
}
