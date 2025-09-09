import { Module } from '@nestjs/common';
import { TaxService } from './tax.service';

@Module({
  providers: [TaxService],
  exports: [TaxService], // 👈 makes it available to other modules
})
export class TaxModule {}
