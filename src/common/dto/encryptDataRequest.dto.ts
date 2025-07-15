import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class EncryptDataRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  payload: string;
}
