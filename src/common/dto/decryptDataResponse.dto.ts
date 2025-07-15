import { DecryptDataResponseDataDto } from "./decryptDataResponseData.dto";

export class DecryptDataResponseDto {
  successful: boolean;
  error_code: string;
  data: DecryptDataResponseDataDto | null;
}
