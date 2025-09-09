import { Body, Controller, Post } from '@nestjs/common';
import { TaxService } from './tax.service';
import { CalculateTaxDto } from './dto/calculate-tax.dto';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post()
  calculate(@Body() dto: CalculateTaxDto) {
    return this.taxService.computeMonthlyWithholding(dto.salary);
  }
}
