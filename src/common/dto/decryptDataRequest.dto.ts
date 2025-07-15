import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class DecryptDataRequestDto {
  @IsString()
  @IsNotEmpty()
  data1: string;

  @IsString()
  @IsNotEmpty()
  data2: string;
}
