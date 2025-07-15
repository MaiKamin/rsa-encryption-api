import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";

@Injectable()
export class AesService {
  private password: string;
  private ivKey: Buffer;
  private aesKey: Buffer;
  private algorithm: string;

  constructor(private configService: ConfigService) {
    void this.init();
  }

  async init(): Promise<void> {
    this.algorithm =
      this.configService.get<string>("ALGORITHM") ?? "aes-256-ctr";

    this.password =
      this.configService.get<string>("PASSWORD") ?? this.generatePassword();

    this.ivKey =
      this.configService.get<Buffer>("IV_KEY") ?? this.generateIvKey();

    await this.generateAesKey();
  }

  generatePassword(): string {
    return (this.password = randomBytes(16).toString("base64"));
  }

  generateIvKey(): Buffer {
    return (this.ivKey = randomBytes(16));
  }

  async generateAesKey(): Promise<void> {
    const password = this.getPassword();
    this.aesKey = (await promisify(scrypt)(password, "salt", 32)) as Buffer;
  }

  getPassword(): Buffer {
    return this.ivKey;
  }

  getIvKey(): Buffer {
    return this.ivKey;
  }

  getAesKey(): Buffer {
    return this.aesKey;
  }

  encryptWithAes(key: Buffer, text: string): string {
    try {
      const iv = this.getIvKey();
      const cipher = createCipheriv(this.algorithm, key, iv);
      const encryptedText = Buffer.concat([
        cipher.update(text),
        cipher.final(),
      ]);

      const encryptedResult = encryptedText.toString("base64");
      return encryptedResult;
    } catch (error) {
      // console.log("error: ", error);
      throw new error("error encryptWithAes");
      // return "error encryptWithAes";
    }
  }

  decryptWithAes(key: Buffer, text: string): string {
    try {
      const iv = this.getIvKey();
      const dataBuffer = Buffer.from(text, "base64");
      const decipher = createDecipheriv(this.algorithm, key, iv);
      const decryptedText = Buffer.concat([
        decipher.update(dataBuffer),
        decipher.final(),
      ]);

      return decryptedText.toString();
    } catch (error) {
      // console.log("error: ", error);
      throw new error("error decryptWithAes");
    }
  }
}
