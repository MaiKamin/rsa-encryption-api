import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";

@Injectable()
export class RsaService {
  private publicKey: string;
  private privateKey: string;

  constructor(private configService: ConfigService) {
    // this.publicKey = this.configService.get<string>("RSA_PUBLIC_KEY") ?? "";
    // this.privateKey = this.configService.get<string>("RSA_PRIVATE_KEY") ?? "";
    this.init();
  }

  init(): void {
    this.publicKey = this.configService.get<string>("RSA_PUBLIC_KEY") ?? "";
    this.privateKey = this.configService.get<string>("RSA_PRIVATE_KEY") ?? "";
  }

  getPublicKey(): string {
    return this.publicKey;
  }

  getPrivateKey(): string {
    return this.privateKey;
  }

  encryptWithPrivateKey(data: string): string {
    try {
      const encrypted = crypto.privateEncrypt(this.privateKey, data);
      return encrypted.toString("base64");
    } catch (error) {
      console.log("error: ", error);
      throw new error("error encryptWithPrivateKey");
    }
  }

  decryptWithPrivateKey(encryptedData: string): string {
    try {
      const buffer = Buffer.from(encryptedData, "base64");
      const decrypted = crypto.privateDecrypt(this.privateKey, buffer);
      return decrypted.toString();
    } catch (error) {
      console.log("error: ", error);
      throw new error("error decryptWithPrivateKey");
    }
  }

  encryptWithPublicKey(data: string): string {
    try {
      const encrypted = crypto.publicEncrypt(this.publicKey, data);
      return encrypted.toString("base64");
    } catch (error) {
      console.log("error: ", error);
      throw new error("error encryptWithPublicKey");
    }
  }

  decryptWithPublicKey(encryptedData: string): string {
    try {
      const buffer = Buffer.from(encryptedData, "base64");
      const decrypted = crypto.publicDecrypt(this.publicKey, buffer);
      return decrypted.toString();
    } catch (error) {
      console.log("error: ", error);
      throw new error("error decryptWithPublicKey");
    }
  }
}
