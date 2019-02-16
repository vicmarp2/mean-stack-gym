

export class Quota {

  constructor(
    public title: string,
    public numberOfPayments: number,
    public pricePerMonth: number,
    public periodInMonths: number,
    public isCardNeeded: boolean,
    public cardPrice: number
  ) {
    this.title = title,
    this.numberOfPayments = numberOfPayments;
    this.pricePerMonth = pricePerMonth;
    this.periodInMonths = periodInMonths;
    this.isCardNeeded = isCardNeeded;
    this.cardPrice = cardPrice;
  }
}
