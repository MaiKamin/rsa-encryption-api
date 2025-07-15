import { ApiProperty } from "@nestjs/swagger";
export class DecryptDataResponseDataDto {
  @ApiProperty()
  payload: string;
}
