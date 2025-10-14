"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerProvider = void 0;
const config_1 = require("../../config");
const zeptomail_1 = require("zeptomail");
class MailerProvider {
    static url = "api.zeptomail.com/";
    static token = config_1.ENVIRONMENT.MAILER.PASSWORD;
    static zeptoClient = new zeptomail_1.SendMailClient({
        url: this.url,
        token: this.token
    });
    static async sendMail(options) {
        try {
            await this.zeptoClient.sendMail({
                "from": {
                    "address": "noreply@setapat.com",
                    "name": "Setapat"
                },
                "to": [
                    {
                        "email_address": {
                            "address": options.to,
                            "name": options.to
                        }
                    }
                ],
                "subject": options.subject,
                "htmlbody": options.html,
            });
        }
        catch (error) {
            console.log({ ...error });
        }
    }
}
exports.MailerProvider = MailerProvider;
//# sourceMappingURL=mailer.provider.js.map