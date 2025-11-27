import { IsNumber, IsString, Min, MinLength, IsUUID } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  @Min(0)
  cost: number;

  @IsUUID()
  ownerId: string;
}
