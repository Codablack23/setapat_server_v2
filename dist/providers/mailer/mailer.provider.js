"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerProvider = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../config");
class MailerProvider {
    static transporter = nodemailer_1.default.createTransport({
        host: config_1.ENVIRONMENT.MAILER.HOST,
        port: config_1.ENVIRONMENT.MAILER.PORT,
        secure: true,
        auth: {
            user: config_1.ENVIRONMENT.MAILER.USER,
            pass: config_1.ENVIRONMENT.MAILER.PASSWORD,
        },
    });
    static async sendMail(options) {
        const info = await this.transporter.sendMail({
            ...options,
            sender: 'Setapat',
            from: `"Setapat" <${config_1.ENVIRONMENT.MAILER.EMAIL}>`,
        });
        return info;
    }
}
exports.MailerProvider = MailerProvider;
//# sourceMappingURL=mailer.provider.js.map