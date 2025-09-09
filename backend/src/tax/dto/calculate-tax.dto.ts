import { IsNumber } from 'class-validator';

export class CalculateTaxDto {
  @IsNumber()
  salary: number;
}