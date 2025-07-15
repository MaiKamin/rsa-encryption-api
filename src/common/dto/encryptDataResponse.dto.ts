import { EncryptDataResponseDataDto } from "./encryptDataResponseData.dto";
import { ApiProperty } from "@nestjs/swagger";
export class EncryptDataResponseDto {
  @ApiProperty()
  successful: boolean;
  @ApiProperty()
  error_code: string;
  @ApiProperty()
  data: EncryptDataResponseDataDto | null;
}
