import Mail from 'nodemailer/lib/mailer';
export declare class MailerProvider {
    private static url;
    private static token;
    private static zeptoClient;
    static sendMail(options: Omit<Mail.Options, "from" | "sender">): Promise<void>;
}
