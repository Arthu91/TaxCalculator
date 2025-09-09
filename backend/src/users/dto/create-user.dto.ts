import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty() name: string;
  @IsEmail() email: string;
  @IsUUID() groupId: string;
}