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
      sender: 'Setapat',
      from: `"Setapat" <${ENVIRONMENT.MAILER.EMAIL}>`,
    });
    return info;
  }
}
