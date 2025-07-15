import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// describe("AppController", () => {
//   let appController: AppController;

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [AppController],
//       providers: [AppService],
//     }).compile();

//     appController = app.get<AppController>(AppController);
//   });

//   describe("root", () => {
//     it('should return "encrypt data"', () => {
//       expect(appController.getEncryptData()).toBe("encrypt data");
//     });

//     it('should return "decrypt data"', () => {
//       expect(appController.getDecryptData()).toBe("decrypt data");
//     });
//   });
// });
