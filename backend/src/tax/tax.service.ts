import { Injectable } from '@nestjs/common';

@Injectable()
export class TaxService {
  computeAnnualTax(income: number): number {
    if (income <= 250_000) return 0;
    if (income <= 400_000) return (income - 250_000) * 0.15;
    if (income <= 800_000) return 22_500 + (income - 400_000) * 0.20;
    if (income <= 2_000_000) return 102_500 + (income - 800_000) * 0.25;
    if (income <= 8_000_000) return 402_500 + (income - 2_000_000) * 0.30;
    return 2_202_500 + (income - 8_000_000) * 0.35;
  }

  computeMonthlyWithholding(grossMonthly: number) {
    const annual = grossMonthly * 12;
    const annualTax = this.computeAnnualTax(annual);
    return { annualTax, monthlyTax: +(annualTax / 12).toFixed(2) };
  }
}
