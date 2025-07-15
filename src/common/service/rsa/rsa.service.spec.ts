import { Test, TestingModule } from "@nestjs/testing";
import { RsaService } from "./rsa.service";
import { ConfigService } from "@nestjs/config";
describe("RsaService", () => {
  let service: RsaService;

  const mockConfigService = {
    get: (key: string) => {
      if (key === "RSA_PUBLIC_KEY")
        return "-----BEGIN PUBLIC KEY-----\nFAKE\n-----END PUBLIC KEY-----";
      if (key === "RSA_PRIVATE_KEY")
        return "-----BEGIN PRIVATE KEY-----\nFAKE\n-----END PRIVATE KEY-----";
      return null;
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RsaService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<RsaService>(RsaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
