import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class DecryptDataRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  data1: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  data2: string;
}
