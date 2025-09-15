import { IsEmail, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty() name: string;

  @IsEmail() email: string;

  @IsNumber()
  @Min(0)
  salary: number;

  @IsUUID() groupId: string;
}