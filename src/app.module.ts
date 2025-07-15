import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { RsaService } from "./common/service/rsa/rsa.service";
import { AesService } from "./common/service/aes/aes.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RsaService, AesService],
})
export class AppModule {}
