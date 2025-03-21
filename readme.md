The Parliamentary Budget Officer (PBO) frequently receives requests pertaining to the potential revenue impacts arising from adjustments to the federal tax system.[^1] In response to these requests, the PBO has developed an online tool to estimate the potential impacts on federal budgetary revenues that would arise from adjusting various federal tax rates, credits, and brackets. Ready Reckoner estimates should be considered stylized rules of thumb.[^2]

### Reference year

The 2025 calendar year is the reference year for all estimates.

### Models Used

- The estimates for Marginal Tax Rates, Tax Brackets, Basic Personal and Spousal Amounts, Goods and Services Tax (GST), GST Credit, and the Canada Child Benefit (CCB) were developed using the Statistics Canada Social Policy Simulation Database and Model (SPSD/M v. 30.2).[^3]
- The estimates for both alcohol and tobacco excise duty rates are generated in PBO’s Excise Tax Model, which accounts for consumption, prices and historical excise revenues.[^4]
- Estimates shown under the Corporate Income Taxes (CIT) section were developed using the PBO’s Corporate Tax Model. Simulations were performed on 2023 tax data using 2025 tax parameters and the results were scaled up to 2025 based on our March 2025 Economic and Fiscal Outlook projection of CIT revenue.[^5] For the General Corporate Rate and the Small Business Rate, SPSD/M v. 30.2 was used to adjust the dividend gross-up rate and the federal dividend tax credit rate for personal income taxes (PIT).
- The estimates in the Ready Reckoner are in line with our March 2025 Economic and Fiscal Outlook.

### Static or Behavioural Estimate

- The estimates for Marginal Tax Rates and Tax Bracket Thresholds include a behavioural effect.
  - The assumed elasticity of taxable income (ETI) is 0.1 the first three brackets of taxable income. PBO assumes an elasticity of 0.2 for the fourth bracket and 0.38 for the top bracket.[^6]  To illustrate, this means that a 10 per cent increase in the net of tax rate (that is, 1 minus the marginal tax rate) results in a 1 per cent increase in taxable income for individuals in the first three brackets, as compared to a 2 percent and 3.8 per cent increase in taxable income for individuals in the fourth and top brackets, respectively.[^7]
- The estimates for both alcohol and tobacco excise duty rates include a behavioural effect.
  - We assume a price-elasticity of -0.25 for cigarettes. That means, for example, a 10 per cent increase in cigarette prices results in a 2.5 per cent reduction in cigarette consumption.
  - We assume a price-elasticity of -1.23 for spirts and -0.28 for wine. That means a 10 per cent increase in spirt and wine prices would lead to a 12.3 per cent and 2.8 per cent reduction in spirit and wine consumption, respectively.
- All other estimates not mentioned above are static estimates:  Basic Personal and Spousal Amounts; GST; GST Credit; CCB; and CIT.[^8]

### Interaction Effects

- Any tax measures that are linked to the Personal Income Tax (PIT) bracket thresholds in legislation will be included when changing the PIT bracket thresholds. For example, the Basic Personal Amount (BPA) phase out rate is calculated using the fourth and fifth PIT bracket thresholds, therefore increasing the bracket thresholds will consequently result in a change in the BPA.
- Consistent with current legislation, when changing the first tax bracket rate, we assume a corresponding rate change for all federal non-refundable tax credits.
- Changing the fourth and/or fifth tax bracket rates also changes the charitable donation tax credit rates for amounts over $200.
- The Government announced on January 31, 2025, that the implementation of the change to the capital gains inclusion rate was deferred to January 1, 2026. Therefore, the amount of taxable income on which the simulations are performed is calculated including one half of capital gains.  
- Increasing the GST rate also increases the GST tax credit rate. Potential revenues from changing the GST rate are net of the GST tax credit and include the federal portion of HST where applicable.
- The Canada Child Benefit is non-taxable and is thus presented as a net fiscal cost.
- We assume that user changes to the General Corporate Rate will also involve changes to the eligible dividend gross-up rate and the federal eligible dividend tax credit rate for individuals. Similarly, user changes to the Small Business Rate will involve changes to the other than eligible dividend gross-up rate and the federal other than eligible dividend tax credit rate for individuals. These assumptions are based on the desire to maintain PIT-CIT tax integration. Thus, the revenue estimate for a change to the general rate or the small business rate includes revenue impacts from adjusting these two individual rates as well.[^9] 


[^1]: Information on the current federal tax structure is available on the [Canada Revenue Agency’s website](https://www.canada.ca/en/revenue-agency/services/tax/rates.html).
[^2]: For each estimate included in the Ready Reckoner, PBO standardizes the directional impact so that it is linear, except for the business limit applying to the small business deduction.
[^3]: PBO’s calculations are based on Statistics Canada’s [Social Policy Simulation Database and Model (SPSD/M)](https://www.statcan.gc.ca/en/microsimulation/spsdm/spsdm). The assumptions and calculations underlying the simulation results were prepared by PBO and the responsibility for the use and interpretation of these data is entirely that of the authors. PBO activated a modification in SPSD/M that turns off the calculation of commodity taxes, except for the calculation related to changes to the GST rate.
[^4]: The rates of excise duty on alcoholic products vary depending on the product, alcohol content, production volume of the brewer, and/or location of the brewer. As a result, PBO constructed an effective rate of excise duty for each of four alcoholic product categories: spirits, beer, spirit coolers, and wine. For more details on excise duty rates, visit Canada Revenue Agency, [Excise Duty Rates](https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/edrates/excise-duty-rates.html)
[^5]: Office of the Parliamentary Budget Officer, [Economic and Fiscal Outlook – March 2025](https://www.pbo-dpb.ca/en/publications/RP-2425-030-S--economic-fiscal-outlook-march-2025--perspectives-economiques-financieres-mars-2025).
[^6]: For more details regarding the PBO’s calculation of elasticity (ETI), refer to the PBO report [Costing personal income tax changes: the role of the elasticity of taxable income](https://www.pbo-dpb.ca/en/publications/RP-2425-019-S--costing-personal-income-tax-changes-role-elasticity-taxable-income--role-elasticite-revenu-imposable-dans-evaluation-couts-modifications-impot).
[^7]: A 10 per cent increase in the first bracket rate (currently 15 per cent) would be an increase of 1.5 percentage points (to 16.5 per cent overall). The calculation is as follows: 15 per cent * 0.1 = 1.5 percentage points.
[^8]: PBO did not include a behavioural response to changes in the BPA. PBO anticipates the behavioural response to be non-zero, but immaterial.
[^9]: The tax system contains many linkages between the personal and corporate income tax systems to ensure that an individual is indifferent between earning income through a corporation or directly. This concept is generally referred to as "tax integration".

---

## Technical Notes

The Ready Reckoner is a [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) built using [Vue.js](https://vuejs.org/). It adopts a similar design pattern as other PBO tools; see the [PBO Research Tool Boilerplate Project](https://github.com/pbo-dpb/pbo-research-tool-boilerplate--gabarit-des-outils-de-recherche).

### Development

To run the Ready Reckoner locally, clone the repository and run the following commands:

```bash
npm install
npm run dev
```

### Updating the Ready Reckoner

The Ready Reckoner uses a json payload file as a data source. To update the Ready Reckoner, modify the `src/assets/payload.json` file.

#### Payload Structure

```javascript
{
    "total_revenue": 000000000000, // Total revenue for the reference year in millions of dollars
    "last_update": "1970/01/01", // Last update date
    "sections": [ // An array of sections that will be used to populate the Ready Reckoner's user interface.
        {
            "title_en": "Personal Income Tax (Marginal Tax Rates)", // Section title in English
            "title_fr": "Impôt sur le revenu des particuliers (Taux marginaux d'imposition)", // Section title in French
            "description_en": "Users can adjust any or all of the four personal tax rates, as well as the corresponding tax-bracket thresholds...", // Section description in English
            "description_fr": "L'utilisateur peut modifier les quatre taux d'imposition du revenu des particuliers, ainsi que les seuils correspondant à chacun...", // Section description in French
            "questions": [ // An array of interactive parameters ("Questions").
                { // Typical hard coded question
                    "name_en": "Lowest Rate", // Parameter name in English
                    "name_fr": "Taux le moins élevé", // Parameter name in French
                    "description_en": null, // An optional parameter description in English (optional)
                    "description_fr": null, // An optional parameter description in French (optional)
                    "default_value": 15, // Default value for the parameter. Where is the cursor on load?
                    "unit_value_down": 0000000000, // Impact on revenue when the parameter is decreased by one unit.
                    "unit_value_up": 0000000000, // Impact on revenue when the parameter is increased by one unit.
                    "unit_style": "percent", // Unit style to display. Options: "percent" or "currency".
                    "minimum": 13.0, // Minimum value for the parameter.
                    "maximum": 17.0, // Maximum value for the parameter.
                    "step": 0.25 // Step value for the parameter. E.g. 0.25 will apply unit_value_down*-0.25 when use decreases the parameter by one step on the slider.
                    // "function": "" // Ommitted
                },
                { // Dynamic question
                    "name_en": "Lowest Rate", 
                    "name_fr": "Taux le moins élevé", 
                    "description_en": null, 
                    "description_fr": null, 
                    "default_value": 15, 
                    //"unit_value_down": 0000000000, // Ommitted
                    //"unit_value_up": 0000000000, // Ommitted
                    "unit_style": "percent", 
                    "minimum": 13.0, 
                    "maximum": 17.0, 
                    "step": 0.25,
                    "function": "return q.user_value ** 2", // A function that is evaluated after user interactions with that question. Will override the function that normally uses the unit_value_down and unit_value_up properties to compute the impact on total revenue/expenses. See Dynamic Questions for more information.
                },
            ]
        },
```

#### Dynamic Questions

> [!CAUTION]
> Dynamic questions are using an indirect eval() function to evaluate the function property. This is a potential security risk. The content of the payload.json should be carefully reviewed before being deployed.

Dynamic questions allow for more complex calculations to be performed when users interact with the slider. The `function` property is a string that is evaluated when the parameter is changed. The string should be a valid ECMAScript expression that uses the `q` object to access a copy of the `question` object and explicitely return a value, in millions of dollars.

The `q` object source can be found in the `src/Models/Question.js` file. In a nutshell, all the properties that are set in the `payload.json` for that question will be assigned to that object and could therefore be used to calculate the impact on revenue/expenses. The currently selected value of the question can be accessed using `q.user_value`.

The following question could be used to calculate the impact using a list of hard coded steps:

```javascript
{
                    "name_en": "Lorem Question", 
                    "name_fr": "Question Lorem", 
                    "description_en": null, 
                    "description_fr": null, 
                    "default_value": 1, 
                    "unit_style": "currency", 
                    "minimum": 0, 
                    "maximum": 2, 
                    "step": 1,
                    "_hard_coded_steps": {
                      "0": -1000000,
                      "1": 0,
                      "2" : 1000000
                      },
                    "function": "return q._hard_coded_steps[q.user_value]"
},
```
Where the `_hard_coded_steps` object is used to map the user value to the impact on revenue/expenses. In this case, sliding the cursor to the left (to `0`) would decrease the revenue by 1,000,000, while sliding it to the right (to `2`) will increase the revenue by 1,000,000.

