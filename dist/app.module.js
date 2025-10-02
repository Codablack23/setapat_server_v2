"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("./config");
const auth_module_1 = require("./auth/auth.module");
const orders_module_1 = require("./orders/orders.module");
const users_module_1 = require("./users/users.module");
const admin_module_1 = require("./admin/admin.module");
const conversations_module_1 = require("./conversations/conversations.module");
const samples_module_1 = require("./samples/samples.module");
const notifications_module_1 = require("./notifications/notifications.module");
const assets_module_1 = require("./assets/assets.module");
const discounts_module_1 = require("./discounts/discounts.module");
const seeders_module_1 = require("./seeders/seeders.module");
const applications_module_1 = require("./applications/applications.module");
const feedback_module_1 = require("./feedback/feedback.module");
const faqs_module_1 = require("./faqs/faqs.module");
const designer_module_1 = require("./designer/designer.module");
const supervisor_module_1 = require("./supervisor/supervisor.module");
const common_module_1 = require("./common/common.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory() {
                    return {
                        ...config_1.AppDataSource.options,
                        autoLoadEntities: true,
                    };
                },
            }),
            auth_module_1.AuthModule,
            orders_module_1.OrdersModule,
            users_module_1.UsersModule,
            admin_module_1.AdminModule,
            conversations_module_1.ConversationsModule,
            samples_module_1.SamplesModule,
            notifications_module_1.NotificationsModule,
            assets_module_1.AssetsModule,
            discounts_module_1.DiscountsModule,
            seeders_module_1.SeedersModule,
            applications_module_1.ApplicationsModule,
            feedback_module_1.FeedbackModule,
            faqs_module_1.FaqsModule,
            designer_module_1.DesignerModule,
            supervisor_module_1.SupervisorModule,
            common_module_1.CommonModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map