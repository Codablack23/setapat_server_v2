export declare class MailerProvider {
    private static transporter;
    static sendMail(options: Parameters<typeof this.transporter.sendMail>[0]): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
