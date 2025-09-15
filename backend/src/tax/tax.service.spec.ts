import { TaxService } from './tax.service';

describe('TaxService', () => {
  let service: TaxService;

  beforeEach(() => {
    service = new TaxService();
  });

  it('should return 0 for income ≤ 250,000', () => {
    expect(service.computeAnnualTax(200_000)).toBe(0);
  });

  it('should compute correct tax for income between 250,001 and 400,000', () => {
    expect(service.computeAnnualTax(300_000)).toBe(7_500); // (300k - 250k) * 0.15
  });

  it('should compute correct tax for income between 400,001 and 800,000', () => {
    expect(service.computeAnnualTax(500_000)).toBe(42_500); // 22,500 + (100k * 0.20)
  });

  it('should compute correct tax for income between 800,001 and 2,000,000', () => {
    expect(service.computeAnnualTax(1_000_000)).toBe(152_500); // 102,500 + (200k * 0.25)
  });

  it('should compute correct tax for income above 2,000,000', () => {
    expect(service.computeAnnualTax(2_500_000)).toBe(552_500); // 402,500 + (500k * 0.30)
  });
});
