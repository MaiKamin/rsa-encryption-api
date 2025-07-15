import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { EncryptDataRequestDto } from "./common/dto/encryptDataRequest.dto";
import { EncryptDataResponseDto } from "./common/dto/encryptDataResponse.dto";
import { DecryptDataRequestDto } from "./common/dto/decryptDataRequest.dto";
import { DecryptDataResponseDto } from "./common/dto/decryptDataResponse.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("get-encrypt-data")
  getEncryptData(@Body() req: EncryptDataRequestDto): EncryptDataResponseDto {
    try {
      const result = this.appService.getEncryptData(req) || null;
      const res: EncryptDataResponseDto = {
        successful: true,
        error_code: "",
        data: result,
      };
      return res;
    } catch {
      throw new InternalServerErrorException("Encryption failed");
    }
  }

  @Post("get-decrypt-data")
  getDecryptData(@Body() req: DecryptDataRequestDto): DecryptDataResponseDto {
    try {
      const result = this.appService.getDecryptData(req) || null;
      const res: DecryptDataResponseDto = {
        successful: true,
        error_code: "",
        data: result,
      };
      return res;
    } catch {
      throw new InternalServerErrorException("Encryption failed");
    }
  }

  @Post("get-encrypt-decrypt-with-aes")
  getEncryptAndDecryptWiteAes(
    @Body() req: EncryptDataRequestDto,
  ): EncryptDataResponseDto {
    try {
      const result = this.appService.getEncryptAndDecryptWiteAes(req) || null;
      const res: EncryptDataResponseDto = {
        successful: true,
        error_code: "",
        data: result,
      };
      return res;
    } catch {
      throw new InternalServerErrorException("Encryption failed");
    }
  }

  @Post("get-encrypt-decrypt-with-rsa")
  getEncryptAndDecryptWiteRsa(
    @Body() req: EncryptDataRequestDto,
  ): EncryptDataResponseDto {
    try {
      const result = this.appService.getEncryptAndDecryptWiteRsa(req) || null;
      const res: EncryptDataResponseDto = {
        successful: true,
        error_code: "",
        data: result,
      };
      return res;
    } catch {
      throw new InternalServerErrorException("Encryption failed");
    }
  }
}
