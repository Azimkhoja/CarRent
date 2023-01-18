import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configure = new DocumentBuilder()
    .setTitle("RentCar")
    .setDescription("REST API")
    .setVersion("1.0.0")
    .addTag("Project consist of NestJS, Postgres, Sequelize")
    .build();

  const document = SwaggerModule.createDocument(app, configure);
  SwaggerModule.setup("/api/docs", app, document);

  const port = process.env.PORT
  app.use(cookieParser());
  await app.listen(port, () => {
    console.log(`server running on port http://localhost:${port}/api/docs`);
  });
}
bootstrap();
