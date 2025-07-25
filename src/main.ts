import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Rsa Nest Api")
    .setDescription("The Rsa Api description")
    .setVersion("1.0")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
