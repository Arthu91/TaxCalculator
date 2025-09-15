import { Test, TestingModule } from '@nestjs/testing';
import { TaxController } from './tax.controller';
import { TaxService } from './tax.service';

describe('TaxController', () => {
  let controller: TaxController;
  let service: TaxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxController],
      providers: [TaxService],
    }).compile();

    controller = module.get<TaxController>(TaxController);
    service = module.get<TaxService>(TaxService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return computed tax from service', () => {
    jest.spyOn(service, 'computeAnnualTax').mockReturnValue(1000);

    const result = controller.calculate({ salary: 500_000 });

    expect(result).toEqual({
      annualTax: 1000,
      monthlyTax: 83.33,
    });
    expect(service.computeAnnualTax).toHaveBeenCalledWith(500_000 * 12);
  });
});