/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Mail from 'nodemailer/lib/mailer';
import { ENVIRONMENT } from 'src/config';
import { SendMailClient } from 'zeptomail';

// export class MailerProvider {
//   private static transporter = nodemailer.createTransport({
//     host: ENVIRONMENT.MAILER.HOST,
//     port: ENVIRONMENT.MAILER.PORT,
//     secure: true,
//     auth: {
//       user: ENVIRONMENT.MAILER.USER,
//       pass: ENVIRONMENT.MAILER.PASSWORD,
//     },
//   });

//   static async sendMail(
//     options: Parameters<typeof this.transporter.sendMail>[0],
//   ) {
//     const info = await this.transporter.sendMail({
//       ...options,
//       sender: 'Setapat',
//       from: `"Setapat" <${ENVIRONMENT.MAILER.EMAIL}>`,
//     });
//     return info;
//   }
// }

/* eslint-disable prettier/prettier */
 
// import * as nodemailer from "nodemailer"


// export class MailProvider{
//     private static transport = nodemailer.createTransport({
//         host:ENVIRONMENT.MAILER.HOST,
//         port:ENVIRONMENT.MAILER.PORT,
//         secure:ENVIRONMENT.MAILER.PORT === 465,
//         auth:{
//             user:ENVIRONMENT.MAILER.EMAIL,
//             pass:ENVIRONMENT.MAILER.PASSWORD
//         }
//     })
//     static async sendMail(options:Omit<Mail.Options,"from" | "sender">){
//         const mailInfo = await this.transport.sendMail({
//             sender:ENVIRONMENT.MAILER.EMAIL,
//             from:ENVIRONMENT.MAILER.EMAIL,
//             ...options,
//         })
//         return mailInfo.messageId
//     }
//}
export class MailProvider {
    private static url = "api.zeptomail.com/";
    private static token = ENVIRONMENT.MAILER.PASSWORD
    private static zeptoClient = new SendMailClient({
        url: this.url,
        token: this.token
    })

    static async sendMail(options: Omit<Mail.Options, "from" | "sender">) {

        try {
            await this.zeptoClient.sendMail({
                "from":
                {
                    "address": "noreply@setapat.com",
                    "name": "Setapat"
                },
                "to":
                    [
                        {
                            "email_address":
                            {
                                "address": options.to,
                                "name": options.to
                            }
                        }
                    ],
                "subject": options.subject,
                "htmlbody": options.html,
            })
        } catch (error) {
            console.log({...error})
        }
    }
}