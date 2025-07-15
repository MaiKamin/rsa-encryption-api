import { ApiProperty } from "@nestjs/swagger";
export class EncryptDataResponseDataDto {
  @ApiProperty()
  data1: string;
  @ApiProperty()
  data2: string;
}
