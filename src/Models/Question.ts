import Localizer from "../Localizer";

interface QuestionOptions {
  [key: string]: any;
  name_en?: string;
  name_fr?: string;
  description_en?: string;
  description_fr?: string;
  unit_name_en?: string;
  unit_name_fr?: string;
  default_value: number;
  unit_value_down?: number;
  unit_value_up?: number;
  step?: number;
  function?: string;
  impactPerUnit?: number;
  minimum?: number;
  maximum?: number;
  unit_style?: string;
}

export default class Question {
  public name: string;
  public description: string;
  public unit_name: string;
  public user_value: number;
  public cached_dynamic_eval_results: Record<string, number>;
  public default_value: number;
  public unit_value_down: number;
  public unit_value_up: number;
  public step: number;
  public minimum: number;
  public maximum: number;
  public unit_style:string;
  public function?: string;

  constructor(o: QuestionOptions) {
    const language = Localizer.appLanguage;
    this.name = o[`name_${language}`] || "";
    this.description = o[`description_${language}`] || "";
    this.unit_name = o[`unit_name_${language}`] || "";

    for (const [key, value] of Object.entries(o)) {
      (this as any)[key] = value;
    }

    this.user_value = o.default_value.valueOf();
    this.cached_dynamic_eval_results = {};
    this.default_value = o.default_value;
    this.unit_value_down = o.unit_value_down || 0;
    this.unit_value_up = o.unit_value_up || 0;
    this.step = o.step || 1;
    this.function = o.function;
    this.maximum = o.maximum || 0;
    this.minimum = o.minimum || 0;
    this.unit_style = o.unit_style || "";
  }

  get impactPerUnit(): number {
    return (
      ((Math.abs(this.unit_value_down) + Math.abs(this.unit_value_up)) / 2) *
      this.step
    );
  }

  get isAltered(): number {
    if (this.user_value === this.default_value) return 0;
    return this.user_value > this.default_value ? 1 : -1;
  }

  get userValueUnitDiffs(): number {
    if (!this.isAltered) return 0;
    return (
      (Math.abs(this.user_value - this.default_value) / this.step) *
      this.isAltered
    );
  }

  private getDynamicUserImpact(): number {
    // Cache the results of the dynamic evaluation for speed
    const userValueStr = String(this.user_value);
    if (this.cached_dynamic_eval_results[userValueStr])
      return this.cached_dynamic_eval_results[userValueStr];

    const indirectEval = (q: Question, func: string): number => {
      "use strict";
      return new Function("q", func)(q);
    };

    const impact = indirectEval(
      JSON.parse(JSON.stringify(this)),
      this.function || ""
    );

    this.cached_dynamic_eval_results[userValueStr] = impact;

    return impact;
  }

  get userValueImpact(): number {
    if (this.function) {
      return this.getDynamicUserImpact();
    }

    if (this.isAltered > 0) {
      return this.userValueUnitDiffs * (this.unit_value_up * this.step);
    }
    return this.userValueUnitDiffs * (this.unit_value_down * this.step);
  }
}
