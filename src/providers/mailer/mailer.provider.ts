/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import nodemailer from 'nodemailer';
import { ENVIRONMENT } from 'src/config';

export class MailerProvider {
  private static transporter = nodemailer.createTransport({
    host: ENVIRONMENT.MAILER.HOST,
    port: ENVIRONMENT.MAILER.PORT,
    secure: true,
    auth: {
      user: ENVIRONMENT.MAILER.USER,
      pass: ENVIRONMENT.MAILER.PASSWORD,
    },
  });

  static async sendMail(
    options: Parameters<typeof this.transporter.sendMail>[0],
  ) {
    const info = await this.transporter.sendMail({
      ...options,
      from: `"Setapat" <${ENVIRONMENT.MAILER.EMAIL}>`,
    });
    return info;
  }
}
