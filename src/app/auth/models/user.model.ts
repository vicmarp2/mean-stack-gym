import { Quota } from 'src/app/quotas/quota.model';

export class User {

  constructor(
    public id: string,
    public dni: string,
    public email: string,
    public password: string,
    public name: string,
    public surname: string,
    public quota: Quota,
    public purchaseDate: Date,
    public endDate: Date,
    public contactNumber: string,
    public birthdate: Date,
    public address: string,
    public postalCode: string,
    public city: string,
    public iban: string,
  ) {}
}
