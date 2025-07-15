import { Test, TestingModule } from "@nestjs/testing";
import { AesService } from "./aes.service";
import { ConfigService } from "@nestjs/config";

describe("AesService", () => {
  let service: AesService;

  const mockConfigService = {
    get: (key: string) => {
      if (key === "PASSWORD") return "your-aes-password";
      if (key === "IV_KEY") return "your-iv-key";
      return null;
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AesService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AesService>(AesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
