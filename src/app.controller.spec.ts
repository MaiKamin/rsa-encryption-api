import { Test } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { RsaService } from "./common/service/rsa/rsa.service";
import { AesService } from "./common/service/aes/aes.service";
import { ConfigModule } from "@nestjs/config";

describe("AppController", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [AppController],
      providers: [AppService, RsaService, AesService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("/POST get-encrypt-data", async () => {
    await request(app.getHttpServer())
      .post("/get-encrypt-data")
      .send({ payload: "hello world" })
      .expect(201);
  });

  //   it("/POST get-decrypt-data", async () => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //     await request(app.getHttpServer())
  //       .post("/get-decrypt-data")
  //       .send({ data1: "hello world", data2: "hello world" })
  //       .expect(201);
  //   });

  afterAll(async () => {
    await app.close();
  });
});
