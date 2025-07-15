import { DecryptDataResponseDataDto } from "./decryptDataResponseData.dto";
import { ApiProperty } from "@nestjs/swagger";
export class DecryptDataResponseDto {
  @ApiProperty()
  successful: boolean;
  @ApiProperty()
  error_code: string;
  @ApiProperty()
  data: DecryptDataResponseDataDto | null;
}
