import { IsBoolean, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsNumber()
  @Min(0)
  salary: number;

  @IsBoolean()
  employee: boolean;
}
