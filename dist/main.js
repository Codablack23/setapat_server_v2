"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const lib_1 = require("./lib");
const config_1 = require("./config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: config_1.corsOptions
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Setapat API Docs')
        .setDescription("API documentation for all endpoints used by setapat services")
        .setVersion('1.0')
        .addTag('Setapat')
        .addBearerAuth()
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1/docs', app, documentFactory);
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new common_1.ValidationPipe({
        forbidNonWhitelisted: true,
        stopAtFirstError: true,
        whitelist: true,
        exceptionFactory: lib_1.useValidationException,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.enableVersioning({
        defaultVersion: "1",
        type: common_1.VersioningType.URI
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map