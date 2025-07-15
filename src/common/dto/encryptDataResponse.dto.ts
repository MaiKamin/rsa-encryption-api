import { EncryptDataResponseDataDto } from "./encryptDataResponseData.dto";

export class EncryptDataResponseDto {
  successful: boolean;
  error_code: string;
  data: EncryptDataResponseDataDto | null;
}
