import { Injectable } from "@nestjs/common";
import { EncryptDataRequestDto } from "./common/dto/encryptDataRequest.dto";
import { RsaService } from "./common/service/rsa/rsa.service";
import { AesService } from "./common/service/aes/aes.service";
import { DecryptDataRequestDto } from "./common/dto/decryptDataRequest.dto";
import { DecryptDataResponseDto } from "./common/dto/decryptDataResponse.dto";
import { DecryptDataResponseDataDto } from "./common/dto/decryptDataResponseData.dto";

@Injectable()
export class AppService {
  constructor(
    private rsaService: RsaService,
    private aesService: AesService,
  ) {}
  getHello(): string {
    return "Hello World!";
  }

  getEncryptAndDecryptWiteAes(data: EncryptDataRequestDto): any {
    // Step 1: Validate – done automatically by DTO
    const payload = data.payload;
    // console.log("payload: ", payload);
    // Step 2: Get AES Key
    const aesKey = this.aesService.getAesKey();
    // console.log("aesKey: ", aesKey);

    // Step 3: Encrypt payload with AES
    const data2 = this.aesService.encryptWithAes(aesKey, payload);

    // console.log("data2: ", data2);

    // Strp 4: Decrypt AES with private key
    const data1 = this.aesService.decryptWithAes(aesKey, data2);

    // console.log("data1: ", data1);

    return {
      data1: data1,
      data2: data2,
    };
  }

  getEncryptAndDecryptWiteRsa(data: EncryptDataRequestDto): any {
    // Step 1: Validate – done automatically by DTO
    const payload = data.payload;
    // console.log("payload: ", payload);

    // Step 3: Eecrypt data with Private key
    // const data1 = this.rsaService.encryptWithPrivateKey(payload);
    // Step 3: Eecrypt data with Public key
    const data1 = this.rsaService.encryptWithPublicKey(payload);
    // console.log("data1: ", data1);

    // Step 4: Eecrypt data with Private key
    const data2 = this.rsaService.decryptWithPrivateKey(data1);
    // Step 4: Eecrypt data with Public key
    // const data2 = this.rsaService.decryptWithPublicKey(data1);

    // console.log("data2: ", data2);

    return {
      data1: data1,
      data2: data2,
    };
  }

  getEncryptData(data: EncryptDataRequestDto): any {
    // Step 1: Validate – done automatically by DTO
    const payload = data.payload;
    // console.log("payload: ", payload);
    // Step 2: Get AES Key
    const aesKey = this.aesService.getAesKey();
    // console.log("aesKey: ", aesKey);
    // Step 3: Encrypt payload with AES
    const data2 = this.aesService.encryptWithAes(aesKey, payload);
    // console.log("data2: ", data2);
    // Step 4: Encrypt AES key with private key
    const data1 = this.rsaService.encryptWithPrivateKey(
      aesKey.toString("base64"),
    );
    // console.log("data1: ", data1);
    return {
      data1: data1,
      data2: data2,
    };
  }

  getDecryptData(data: DecryptDataRequestDto): DecryptDataResponseDataDto {
    // Step 1: Validate – done automatically by DTO
    const data1 = data.data1;
    const data2 = data.data2;
    // console.log("data1: ", data1);
    // console.log("data2: ", data2);
    //step 2: Get AES Key, Decrypt data1 with public key
    const aeskey = this.rsaService.decryptWithPublicKey(data1);
    // console.log("aes: ", aeskey);
    const aeskeyBuffer = Buffer.from(aeskey, "base64");
    //step 3: Get AES Key, Decrypt data1 with public key
    const payload = this.aesService.decryptWithAes(aeskeyBuffer, data2);
    // console.log("payload: ", payload);

    return {
      payload: payload,
    };
  }
}
